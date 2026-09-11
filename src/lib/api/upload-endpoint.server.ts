import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

import { allowedMimesFor, resolveUploadMime } from "../blob-uploads";
import { currentAdminFromRequest } from "../db/admins.server";
import { UPLOAD_LIMITS } from "../upload-limits";

export const UPLOAD_HANDLE_PATH = "/api/upload-media";

// Token handshake for the browser→Blob direct upload.
//
// upload() in @vercel/blob/client (src/lib/client-media.ts) POSTs a small
// JSON payload here ("blob.generate-client-token") to receive a short-lived,
// path-scoped client token, then streams the file straight to Vercel Blob.
// This handler only ever sends/receives that token JSON — never file bytes —
// so it cannot hit Vercel Functions' 4.5 MB request-body cap. handleUpload
// bakes the format allowlist and the 10 MB / 100 MB size caps into the token.
export async function handleUploadTokenRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { allow: "POST", "content-type": "application/json" },
    });
  }

  const admin = await currentAdminFromRequest(request);
  if (!admin) {
    return new Response(JSON.stringify({ error: "You must be signed in as an admin." }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const jsonResponse = await handleUpload({
      body: body as HandleUploadBody,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload, multipart) => {
        if (multipart) {
          throw new Error("Multipart uploads are not supported for media.");
        }

        let kind: "image" | "video" = "image";
        try {
          const parsed = clientPayload ? JSON.parse(clientPayload) : null;
          if (parsed && typeof parsed.kind === "string" && parsed.kind === "video") {
            kind = "video";
          }
        } catch {
          // Default to image if the payload is unusable; the MIME check below
          // still rejects anything that does not match the resolved kind.
        }

        const prefix = kind === "image" ? "uploads/images/" : "uploads/videos/";
        if (!pathname.startsWith(prefix)) {
          throw new Error(`Upload pathname must start with "${prefix}".`);
        }

        // Validates the extension against the allowlist and throws on anything
        // unsupported, which aborts the token mint for that pathname.
        resolveUploadMime(kind, undefined, pathname);

        return {
          allowedContentTypes: allowedMimesFor(kind),
          maximumSizeInBytes: UPLOAD_LIMITS[kind].bytes,
          cacheControlMaxAge: 31536000,
        };
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    console.error("[media][token]", error);
    const message = error instanceof Error ? error.message.trim() : "";
    return new Response(JSON.stringify({ error: message || "Upload failed." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
}
