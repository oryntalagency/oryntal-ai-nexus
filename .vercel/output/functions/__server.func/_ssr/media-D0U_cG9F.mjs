import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { c as currentAdmin } from "./admins.server-1QQJDc-F.mjs";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, resolve, join } from "node:path";
import { e as ensureEnvForServer } from "./mongodb-7utz71PX.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/bcryptjs.mjs";
import "mongodb";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "node:stream/promises";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "node:fs";
ensureEnvForServer();
function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^[-.]+/, "") || "asset";
}
async function uploadObject(options) {
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
        ...apiKey ? { authorization: `Bearer ${apiKey}` } : {}
      },
      body: payload
    });
    if (!response.ok) {
      throw new Error(`Storage provider upload failed (HTTP ${response.status}).`);
    }
    const result = await response.json().catch(() => ({}));
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
const MAX_BYTES = 25 * 1024 * 1024;
const uploadMedia_createServerFn_handler = createServerRpc({
  id: "4b16bf50c41c177dc6b01f4f6070e4c11c9d088cf876207a74711f3500a11379",
  name: "uploadMedia",
  filename: "src/lib/api/media.ts"
}, (opts) => uploadMedia.__executeServer(opts));
const uploadMedia = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  kind: enumType(["image", "video"]),
  dataBase64: stringType().min(1)
})).handler(uploadMedia_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) {
    return {
      ok: false,
      error: "You must be signed in as an admin."
    };
  }
  try {
    const buffer = Buffer.from(data.dataBase64, "base64");
    if (buffer.byteLength === 0) {
      return {
        ok: false,
        error: "The uploaded file was empty."
      };
    }
    if (buffer.byteLength > MAX_BYTES) {
      return {
        ok: false,
        error: "The file exceeds the 25 MB upload limit."
      };
    }
    const stored = await uploadObject({
      name: data.name,
      kind: data.kind,
      buffer: new Uint8Array(buffer)
    });
    return {
      ok: true,
      url: stored.url,
      name: stored.name,
      size: stored.size
    };
  } catch (error) {
    console.error("[media][upload]", error);
    return {
      ok: false,
      error: "Upload failed."
    };
  }
});
export {
  uploadMedia_createServerFn_handler
};
