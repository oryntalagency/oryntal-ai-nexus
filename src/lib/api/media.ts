import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import { uploadObject } from "../db/storage.server";

// Media upload. Admin-only. The client sends file bytes (base64) here, the
// storage layer persists them through the configured provider (or the local
// dev fallback), and the handler returns the public URL. Only that URL is ever
// written onto Mongo documents — never the binary payload.

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB cap

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      kind: z.enum(["image", "video"]),
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
      if (buffer.byteLength > MAX_BYTES) {
        return { ok: false as const, error: "The file exceeds the 25 MB upload limit." };
      }

      const stored = await uploadObject({
        name: data.name,
        kind: data.kind,
        buffer: new Uint8Array(buffer),
      });
      return { ok: true as const, url: stored.url, name: stored.name, size: stored.size };
    } catch (error) {
      console.error("[media][upload]", error);
      return { ok: false as const, error: "Upload failed." };
    }
  });

export type UploadMediaResult = Awaited<ReturnType<typeof uploadMedia>>;
