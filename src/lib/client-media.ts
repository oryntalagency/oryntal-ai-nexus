import { upload } from "@vercel/blob/client";

import { buildUploadPathname, resolveUploadMime } from "@/lib/blob-uploads";
import { uploadLimitError, UPLOAD_LIMITS } from "@/lib/upload-limits";

export type UploadMediaResult = { ok: true; url: string } | { ok: false; error: string };

// Vercel Blob's client-side direct upload. The picked file is streamed by the
// browser straight to blob.vercel-storage.com — the only thing that touches
// this app's server is a tiny JSON request to /api/upload-media (POST to
// handleUploadUrl), which mints a short-lived, path-scoped token via
// handleUpload on the server. The file bytes never pass through a serverless
// function or a TanStack Start server function, so Vercel's 4.5 MB request
// body cap never applies and multi-MB demo videos upload reliably.
export async function uploadMedia(file: File, kind: "image" | "video"): Promise<UploadMediaResult> {
  const limit = UPLOAD_LIMITS[kind];
  if (file.size > limit.bytes) {
    return { ok: false as const, error: uploadLimitError(kind) };
  }

  let mime: string;
  try {
    mime = resolveUploadMime(kind, file.type, file.name);
  } catch (error) {
    return {
      ok: false as const,
      error: error instanceof Error ? error.message : "Unsupported file type.",
    };
  }

  const pathname = buildUploadPathname(file.name, mime);

  try {
    const blob = await upload(pathname, file, {
      access: "public",
      handleUploadUrl: "/api/upload-media",
      clientPayload: JSON.stringify({ kind }),
      contentType: mime,
    });
    return { ok: true as const, url: blob.url };
  } catch (error) {
    console.error("[media][client]", error);
    const message = error instanceof Error ? error.message.trim() : "";
    return { ok: false as const, error: message || "Upload failed." };
  }
}
