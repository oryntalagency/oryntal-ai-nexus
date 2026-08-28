import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

import { ensureEnvForServer } from "../env.server";

ensureEnvForServer();

// Media storage abstraction. The client never sends raw bytes straight into a
// Mongo document — the admin upload handlers call into this module, which
// hands back a public URL, and only that URL is stored on the document.
//
// Wiring order:
//   1. If STORAGE_UPLOAD_ENDPOINT (+ optional STORAGE_API_KEY) is set, the file
//      bytes are POSTed to the provider endpoint, which must answer with
//      JSON `{ "url": "https://…" }`.
//   2. Otherwise (local dev, no provider configured yet) the file is written
//      under `public/uploads/` so Vite serves it statically — the returned URL
//      is `/uploads/<name>`.

export type StoredObject = { url: string; name: string; size: number };

function sanitizeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^[-.]+/, "") || "asset";
}

export async function uploadObject(options: {
  name: string;
  kind: "image" | "video";
  buffer: Uint8Array;
}): Promise<StoredObject> {
  ensureEnvForServer();
  const endpoint = process.env.STORAGE_UPLOAD_ENDPOINT;

  if (endpoint) {
    const apiKey = process.env.STORAGE_API_KEY;
    const payload = new Uint8Array(new ArrayBuffer(options.buffer.byteLength));
    payload.set(options.buffer);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/octet-stream",
        ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
      },
      body: payload,
    });
    if (!response.ok) {
      throw new Error(`Storage provider upload failed (HTTP ${response.status}).`);
    }
    const result = (await response.json().catch(() => ({}))) as { url?: string };
    if (!result.url) {
      throw new Error("Storage provider did not return a URL.");
    }
    return { url: result.url, name: options.name, size: options.buffer.byteLength };
  }

  const extension = extname(options.name) || (options.kind === "image" ? ".png" : ".mp4");
  const base = sanitizeName(options.name.slice(0, options.name.length - extension.length));
  const stored = `${base}-${randomUUID().slice(0, 8)}${extension}`;
  const directory = resolve(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, stored), options.buffer);
  return { url: `/uploads/${stored}`, name: stored, size: options.buffer.byteLength };
}
