import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import { uploadObject } from "../db/storage.server";
import { uploadLimitError, UPLOAD_LIMITS } from "../upload-limits";

// Media upload. Admin-only. The client sends file bytes (base64) here, the
// storage layer persists them to Vercel Blob, and the handler returns the
// public URL. Only that URL is ever written onto Mongo documents — never the
// binary payload.

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      kind: z.enum(["image", "video"]),
      mime: z.string().optional(),
      dataBase64: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }

    try {
      const buffer = Buffer.from(data.dataBase64, "base64");
      if (buffer.byteLength === 0) {
        return { ok: false as const, error: "The uploaded file was empty." };
      }
      const limit = UPLOAD_LIMITS[data.kind];
      if (buffer.byteLength > limit.bytes) {
        return { ok: false as const, error: uploadLimitError(data.kind) };
      }

      const stored = await uploadObject({
        name: data.name,
        kind: data.kind,
        mime: data.mime,
        buffer: new Uint8Array(buffer),
      });
      return { ok: true as const, url: stored.url, name: stored.name, size: stored.size };
    } catch (error) {
      console.error("[media][upload]", error);
      const message = error instanceof Error ? error.message.trim() : "";
      return { ok: false as const, error: message || "Upload failed." };
    }
  });

export type UploadMediaResult = Awaited<ReturnType<typeof uploadMedia>>;
