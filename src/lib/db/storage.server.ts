import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

import { ensureEnvForServer } from "../env.server";

ensureEnvForServer();

// Media storage abstraction. The client never sends raw bytes straight into a
// Mongo document — the admin upload handlers call into this module, which
// hands back a public URL, and only that URL is stored on the document.
//
// Format handling: the upload's MIME type is resolved from the file (client
// `file.type`, falling back to the file extension), validated against an
// allowlist that includes image/webp and video/webm, and passed to the
// provider as the content-type so format-aware providers route webp/webm
// uploads correctly instead of rejecting ambiguous bytes.
//
// Wiring order:
//   1. If STORAGE_UPLOAD_ENDPOINT (+ optional STORAGE_API_KEY) is set, the file
//      bytes are POSTed to the provider endpoint, which must answer with
//      JSON `{ "url": "https://…" }`.
//   2. Otherwise (local dev, no provider configured yet) the file is written
//      under `public/uploads/` so Vite serves it statically — the returned URL
//      is `/uploads/<name>`.

export type StoredObject = { url: string; name: string; size: number };

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/gif": ".gif",
  "image/webp": ".webp",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

const EXTENSION_TO_MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

const ALLOWED_BY_KIND: Record<"image" | "video", string[]> = {
  image: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

function resolveUploadMime(
  kind: "image" | "video",
  mime: string | undefined,
  name: string,
): string {
  const fromClient = mime ? (mime.trim().toLowerCase().split(";")[0] ?? "") : "";
  const candidate =
    fromClient && fromClient !== "application/octet-stream"
      ? fromClient
      : (EXTENSION_TO_MIME[extname(name).toLowerCase()] ?? "");
  if (!candidate) {
    throw new Error(
      `Could not detect the ${kind} format. Upload an allowed file: ${ALLOWED_BY_KIND[kind].join(", ")}.`,
    );
  }
  if (!ALLOWED_BY_KIND[kind].includes(candidate)) {
    throw new Error(
      `Unsupported ${kind} format "${candidate}" — allowed: ${ALLOWED_BY_KIND[kind].join(", ")}.`,
    );
  }
  return candidate;
}

function sanitizeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^[-.]+/, "") || "asset";
}

export async function uploadObject(options: {
  name: string;
  kind: "image" | "video";
  mime?: string;
  buffer: Uint8Array;
}): Promise<StoredObject> {
  ensureEnvForServer();
  const mime = resolveUploadMime(options.kind, options.mime, options.name);
  const endpoint = process.env.STORAGE_UPLOAD_ENDPOINT;

  if (endpoint) {
    const apiKey = process.env.STORAGE_API_KEY;
    const payload = new Uint8Array(new ArrayBuffer(options.buffer.byteLength));
    payload.set(options.buffer);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": mime,
        ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {}),
      },
      body: payload,
    });
    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).replace(/\s+/g, " ").slice(0, 200);
      throw new Error(
        detail
          ? `Storage provider rejected the upload (HTTP ${response.status}): ${detail}`
          : `Storage provider rejected the upload (HTTP ${response.status}).`,
      );
    }
    const result = (await response.json().catch(() => ({}))) as { url?: string };
    if (!result.url) {
      throw new Error("Storage provider accepted the upload but did not return a URL.");
    }
    return { url: result.url, name: options.name, size: options.buffer.byteLength };
  }

  const extension = extname(options.name) || MIME_TO_EXTENSION[mime] || ".bin";
  const base = sanitizeName(options.name.slice(0, options.name.length - extension.length));
  const stored = `${base}-${randomUUID().slice(0, 8)}${extension}`;
  const directory = resolve(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, stored), options.buffer);
  return { url: `/uploads/${stored}`, name: stored, size: options.buffer.byteLength };
}
