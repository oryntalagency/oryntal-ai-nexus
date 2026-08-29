import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { g as getDb } from "./mongodb-7utz71PX.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "mongodb";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
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
import "node:path";
async function listTags$1(facet) {
  const db = await getDb();
  const filter = facet ? { facet } : {};
  const docs = await db.collection("tags").find(filter).sort({ facet: 1, label: 1 }).toArray();
  return docs.map((doc) => ({
    label: doc.label,
    facet: doc.facet,
    slug: doc.slug
  }));
}
const listTags_createServerFn_handler = createServerRpc({
  id: "917d7db902f6c80f5a6dc5299f3a7bb1ddb02d1963bb2bb0b02fff73781402a8",
  name: "listTags",
  filename: "src/lib/api/tags.ts"
}, (opts) => listTags.__executeServer(opts));
const listTags = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  facet: enumType(["problem", "industry", "tech"]).optional()
})).handler(listTags_createServerFn_handler, async ({
  data
}) => {
  try {
    const items = await listTags$1(data.facet);
    return {
      ok: true,
      items
    };
  } catch (error) {
    console.error("[tags][list]", error);
    return {
      ok: false,
      error: "Failed to load tags."
    };
  }
});
export {
  listTags_createServerFn_handler
};
