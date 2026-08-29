// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { cpSync, existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import type { Plugin } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Copies a package (and its full runtime dependency subgraph) from this project's
// node_modules into the serverless function directory. Nitro's nft tracer does
// not ship packages that are only reached through dynamically-loaded SSR chunks,
// so for the externally-imported mongodb driver we do it explicitly here.
function copyPackageTree(serverDir: string, rootName: string) {
  const root = resolve(process.cwd(), "node_modules");
  const seen = new Set<string>();
  const queue: string[] = [];
  const findRoot = (name: string): string | undefined => {
    let dir = root;
    for (;;) {
      const candidate = join(dir, name);
      if (existsSync(join(candidate, "package.json"))) return candidate;
      const next = dirname(dirname(dir));
      if (next === dir) return undefined;
      dir = next;
    }
  };

  const seed = findRoot(rootName);
  if (!seed) {
    console.error(`[mongodb-ship] could not locate package "${rootName}"`);
    return;
  }
  queue.push(seed);

  while (queue.length) {
    const pkgDir = queue.pop()!;
    if (seen.has(pkgDir)) continue;
    seen.add(pkgDir);

    const pkgJsonPath = join(pkgDir, "package.json");
    if (!existsSync(pkgJsonPath)) continue;

    // Relative package name => destination under serverDir/node_modules/<scoped name>
    const rel = pkgDir.replace(/^.*node_modules[\\/]/, "");
    const dest = join(serverDir, "node_modules", rel);
    cpSync(pkgDir, dest, { recursive: true, dereference: true });

    const meta = JSON.parse(readFileSync(pkgJsonPath, "utf8")) as {
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };
    for (const names of [meta.dependencies, meta.peerDependencies]) {
      if (!names) continue;
      for (const name of Object.keys(names)) {
        const resolved = findRoot(name);
        if (resolved) queue.push(resolved);
      }
    }
  }
  console.error(`[mongodb-ship] copied ${seen.size} packages into ${serverDir}`);
  return seen.size;
}

// The native mongodb driver must stay external in every server-side bundle so
// it is resolved from node_modules (CommonJS) at runtime. Inlining it into an
// ESM chunk rewrites `require("crypto")` to a bare `require` that is undefined
// in ESM, throwing "ReferenceError: require is not defined" and the SCRAM-SHA-1
// "Node.js crypto module is required" error on Node.
const MONGO_EXTERNAL = ["mongodb", "bson", "mongodb-connection-string-url", "@mongodb-js/saslprep"];

function externalizeMongoInSsr(): Plugin {
  return {
    name: "externalize-mongodb",
    enforce: "post",
    config(userConfig) {
      const environments: Record<string, unknown> = {};
      for (const env of ["ssr", "nitro"]) {
        environments[env] = {
          build: { rollupOptions: { external: MONGO_EXTERNAL } },
        };
      }
      return { environments };
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // This app is deployed on Vercel, so build for the Vercel (Node.js) preset
  // rather than the default cloudflare-module (Workers/Edge) target. The native
  // mongodb driver requires the Node.js runtime and cannot run on Edge.
  nitro: {
    preset: "vercel",
    vercel: {
      // Explicitly run server functions on the Node.js runtime (not Edge).
      functions: { runtime: "nodejs22.x" },
      // Use the Node handler format so Node.js APIs (e.g. node:crypto) remain
      // available to the mongodb driver at runtime.
      entryFormat: "node",
    },
    // Because mongodb is kept external, nitro must ship it (plus its native
    // deps) as node_modules inside the serverless function so the runtime
    // `import "mongodb"` can resolve them. Nitro's nft tracer does not trace
    // deps reached only through dynamic SSR chunks, so we copy the dependency
    // tree ourselves.
    //
    // IMPORTANT: This MUST be done via a nitro module that registers the hook
    // programmatically (nitro.hooks.hook(...)), NOT via the top-level
    // `nitro.hooks` config object. The vercel preset registers its own
    // `compiled` hook (which generates Vercel's Build Output API config.json
    // and .vc-config.json). Nitro's config loading deep-merges per-event hooks
    // by key, so declaring `hooks: { compiled }` here would REPLACE the
    // preset's handler and prevent config.json from ever being written.
    // Registering with `nitro.hooks.hook("compiled", ...)` instead APPENDS our
    // handler alongside the preset's, so both run.
    modules: [
      {
        name: "ship-mongodb-node-modules",
        setup(nitro) {
          nitro.hooks.hook("compiled", (buildNitro) => {
            const serverDir = buildNitro.options.output.serverDir;
            for (const pkg of MONGO_EXTERNAL) {
              copyPackageTree(serverDir, pkg);
            }
          });
        },
      },
    ],
  },
  environments: {
    ssr: {
      build: {
        rollupOptions: { external: MONGO_EXTERNAL },
      },
    },
  },
  plugins: [externalizeMongoInSsr()],
});
