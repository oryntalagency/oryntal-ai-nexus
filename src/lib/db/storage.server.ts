import { randomUUID } from "node:crypto";
import { extname } from "node:path";

import { put } from "@vercel/blob";

import { ensureEnvForServer } from "../env.server";

ensureEnvForServer();

// Media storage abstraction. The client never sends raw bytes straight into a
// Mongo document — the admin upload handlers call into this module, which
// hands back the public URL from Vercel Blob, and only that URL is stored on
// the document.
//
// Uploads go straight to Vercel Blob via put() — never to the local
// filesystem, which does not exist on Vercel's read-only serverless runtime.
// The returned URL (https://*.public.blob.vercel-storage.com/...) is what the
// admin saves into the image / video / cover fields. The administrator must
// have created a Blob store and set BLOB_READ_WRITE_TOKEN (Vercel injects it
// into serverless functions automatically once the store is linked).
//
// Format handling: the upload's MIME type is resolved from the file (client
// `file.type`, falling back to the file extension), validated against an
// allowlist that includes image/webp and video/webm, and passed as the
// content-type so Blob serves each file with the correct Content-Type.

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
  const mime = resolveUploadMime(options.kind, options.mime, options.name);
  const ext = extname(options.name).toLowerCase() || MIME_TO_EXTENSION[mime] || ".bin";
  const base = sanitizeName(options.name.slice(0, options.name.length - ext.length));
  const pathname = `uploads/${options.kind}s/${base}-${randomUUID().slice(0, 8)}${ext}`;

  try {
    const body = new Blob([options.buffer as unknown as BlobPart], { type: mime });
    const blob = await put(pathname, body, {
      access: "public",
      contentType: mime,
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
    return { url: blob.url, name: blob.pathname, size: options.buffer.byteLength };
  } catch (error) {
    console.error("[storage][blob]", error);
    if (String(error instanceof Error ? error.message : error).includes("BLOB_READ_WRITE_TOKEN")) {
      throw new Error(
        "Uploads are not configured yet — the Vercel Blob store is missing (no BLOB_READ_WRITE_TOKEN).",
      );
    }
    throw new Error("Upload failed — Vercel Blob rejected the file.");
  }
}
