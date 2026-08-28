import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Server-only env bootstrap for the app server.
//
// TanStack Start / Vite does not push `.env` files into `process.env` by
// default (only `import.meta.env.VITE_*` is injected and it is public). The
// repository keeps real secrets in `.env.local`, so this loader mirrors the
// exact behaviour of `scripts/*.mjs`: prefer `.env.local`, fall back to
// `.env`, never overwrite an already-set process env var. In production the
// hosting provider injects MONGODB_URI etc. directly, so this is a no-op
// there (the branch below only runs in dev).

let loaded = false;

export function ensureEnvForServer(env: NodeJS.ProcessEnv = process.env): void {
  if (loaded) return;
  loaded = true;

  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;

    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      if (!key) continue;
      let value = line.slice(eq + 1).trim();
      value = value.replace(/^["']|["']$/g, "");
      if (env[key] === undefined) env[key] = value;
    }
    break;
  }
}
