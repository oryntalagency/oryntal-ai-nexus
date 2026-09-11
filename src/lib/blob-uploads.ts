// Shared, environment-neutral helpers for Vercel Blob uploads.
//
// These run in both the browser (pathname building + MIME resolution before the
// file is streamed to Blob) and the server (validation before a client token is
// minted). No Node-only imports, no env access, so the exact same rules are
// enforced on both sides of the wire.
//
// Upload path: the browser calls upload() from @vercel/blob/client with a
// handleUploadUrl pointing at /api/upload-media (see
// src/lib/api/upload-endpoint.server.ts). That endpoint mints a short-lived,
// path-scoped client token via handleUpload; the file bytes themselves are PUT
// by the browser straight to Vercel Blob and never pass through this app's
// server or any TanStack Start server function.

export type UploadKind = "image" | "video";

export const ALLOWED_BY_KIND: Record<UploadKind, string[]> = {
  image: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  video: ["video/mp4", "video/webm", "video/quicktime"],
};

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

export function allowedMimesFor(kind: UploadKind): string[] {
  return ALLOWED_BY_KIND[kind];
}

/** Return the pathname's extension (lowercased, with leading dot) or "". */
function extname(name: string): string {
  const clean = name.replace(/\\/g, "/").split("/").pop() ?? "";
  const dot = clean.lastIndexOf(".");
  return dot > 0 ? clean.slice(dot).toLowerCase() : "";
}

export function resolveUploadMime(
  kind: UploadKind,
  mime: string | undefined,
  name: string,
): string {
  const fromClient = mime ? (mime.trim().toLowerCase().split(";")[0] ?? "") : "";
  const candidate =
    fromClient && fromClient !== "application/octet-stream"
      ? fromClient
      : (EXTENSION_TO_MIME[extname(name)] ?? "");
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

function randomHex(bytes: number): string {
  const array = new Uint8Array(bytes);
  if (typeof globalThis.crypto !== "undefined" && "getRandomValues" in globalThis.crypto) {
    globalThis.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < bytes; i++) array[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Build a unique destination pathname, e.g. uploads/videos/demo-3f9b1c02.mp4. */
export function buildUploadPathname(name: string, mime: string): string {
  const ext = extname(name) || MIME_TO_EXTENSION[mime] || ".bin";
  const base = sanitizeName(name.slice(0, name.length - ext.length));
  const folder = mime.startsWith("image/") ? "images" : "videos";
  return `uploads/${folder}/${base}-${randomHex(4)}${ext}`;
}
