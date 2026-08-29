import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { c as currentAdmin } from "./admins.server-1QQJDc-F.mjs";
import { ObjectId } from "mongodb";
import { g as getDb } from "./mongodb-7utz71PX.mjs";
import { O as OFFERING_TYPE_TO_DB, S as STATUS_TO_DB, D as DB_TO_STATUS, a as DB_TO_OFFERING_TYPE, o as omitUndefined } from "./shared.server-Ba483pzE.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/bcryptjs.mjs";
import { e as enumType, o as objectType, s as stringType, a as arrayType, b as booleanType, n as numberType } from "../_libs/zod.mjs";
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
import "node:crypto";
import "node:fs";
import "node:path";
function toProductDoc(listing, timestamps) {
  const video = listing.video;
  return omitUndefined({
    title: listing.title,
    slug: listing.slug ?? kebabFromTitle(listing.title),
    offering_type: OFFERING_TYPE_TO_DB[listing.offeringType],
    problem_tags: listing.problems,
    industry_tags: listing.industries,
    tech_tags: listing.techs,
    problem_points: listing.problemPoints,
    advantage_points: listing.advantagePoints,
    image: listing.image,
    video,
    loom_url: video && video.includes("loom.com") ? video : void 0,
    cta_url: listing.liveUrl,
    status: STATUS_TO_DB[listing.status ?? "live"],
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
    tagline: listing.tagline,
    creator: listing.creator,
    price: listing.price,
    gradient: listing.gradient,
    glyph: listing.glyph,
    height: listing.height,
    featured: listing.featured
  });
}
function kebabFromTitle(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function fromProductDoc(doc) {
  const status = DB_TO_STATUS[doc.status] ?? "live";
  const offeringType = DB_TO_OFFERING_TYPE[doc.offering_type] ?? "automation";
  return {
    id: doc._id.toString(),
    title: doc.title,
    slug: doc.slug,
    tagline: doc.tagline ?? "",
    creator: doc.creator ?? "Oryntal AI Labs",
    offeringType,
    problems: doc.problem_tags ?? [],
    industries: doc.industry_tags ?? [],
    techs: doc.tech_tags ?? [],
    problemPoints: doc.problem_points ?? [],
    advantagePoints: doc.advantage_points ?? [],
    image: doc.image,
    video: doc.video,
    liveUrl: doc.cta_url,
    price: doc.price ?? "Free",
    gradient: doc.gradient ?? "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
    glyph: doc.glyph ?? "✦",
    height: doc.height ?? 300,
    featured: doc.featured ?? false,
    status
  };
}
async function listProducts$1(input = {}) {
  const db = await getDb();
  const products = db.collection("products");
  const filter = {};
  const problems = input.problems ?? [];
  const industries = input.industries ?? [];
  const techs = input.techs ?? [];
  if (problems.length > 0) filter.problem_tags = { $in: problems };
  if (input.offering && input.offering !== "all") {
    filter.offering_type = OFFERING_TYPE_TO_DB[input.offering];
  }
  if (industries.length > 0) filter.industry_tags = { $in: industries };
  if (techs.length > 0) filter.tech_tags = { $in: techs };
  if (input.status && input.status !== "all") filter.status = STATUS_TO_DB[input.status];
  const q = (input.query ?? "").trim().toLowerCase();
  if (q) {
    const pattern = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [
      { title: pattern },
      { tagline: pattern },
      { creator: pattern },
      { problem_tags: pattern },
      { industry_tags: pattern },
      { tech_tags: pattern }
    ];
  }
  const cursor = products.find(filter);
  cursor.sort({ featured: -1, updatedAt: -1 });
  const docs = await cursor.toArray();
  return docs.map((doc) => fromProductDoc(doc));
}
async function createProduct$1(listing) {
  const db = await getDb();
  const now = /* @__PURE__ */ new Date();
  const doc = toProductDoc(listing, { createdAt: now, updatedAt: now });
  const result = await db.collection("products").insertOne(doc);
  return fromProductDoc({ ...doc, _id: result.insertedId });
}
async function updateProduct$1(id, listing) {
  const db = await getDb();
  const products = db.collection("products");
  const existing = await products.findOne({ _id: new ObjectId(id) });
  if (!existing) return null;
  const original = existing;
  const next = toProductDoc(listing, {
    createdAt: original.createdAt,
    updatedAt: /* @__PURE__ */ new Date()
  });
  await products.replaceOne({ _id: new ObjectId(id) }, next);
  return fromProductDoc({ ...next, _id: new ObjectId(id) });
}
async function deleteProduct$1(id) {
  const db = await getDb();
  const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
const offeringFilter = enumType(["saas", "automation", "model", "all"]);
const statusFilter = enumType(["live", "beta", "coming", "all"]);
const listProducts_createServerFn_handler = createServerRpc({
  id: "8c043fe5e33ca88dc069e5f365006f24e7f14e8a80a334f08652dec76c740e7b",
  name: "listProducts",
  filename: "src/lib/api/products.ts"
}, (opts) => listProducts.__executeServer(opts));
const listProducts = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  problems: arrayType(stringType()).optional(),
  offering: offeringFilter.optional(),
  industries: arrayType(stringType()).optional(),
  techs: arrayType(stringType()).optional(),
  status: statusFilter.optional(),
  query: stringType().optional()
})).handler(listProducts_createServerFn_handler, async ({
  data
}) => {
  try {
    const items = await listProducts$1({
      problems: data.problems,
      offering: data.offering === "all" ? void 0 : data.offering,
      industries: data.industries,
      techs: data.techs,
      status: data.status === "all" ? void 0 : data.status,
      query: data.query
    });
    return {
      ok: true,
      items
    };
  } catch (error) {
    console.error("[products][list]", error);
    return {
      ok: false,
      error: "Failed to load products."
    };
  }
});
const createProduct_createServerFn_handler = createServerRpc({
  id: "071d3e76962d8aedf14b7eb3f9f693aab823595f9fa1e3d6ee4d3851fdc03db7",
  name: "createProduct",
  filename: "src/lib/api/products.ts"
}, (opts) => createProduct.__executeServer(opts));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  title: stringType().min(1),
  slug: stringType().optional(),
  tagline: stringType().optional(),
  creator: stringType().optional(),
  offeringType: enumType(["saas", "automation", "model"]),
  problems: arrayType(stringType()),
  industries: arrayType(stringType()),
  techs: arrayType(stringType()),
  problemPoints: arrayType(stringType()),
  advantagePoints: arrayType(stringType()),
  image: stringType(),
  video: stringType().optional(),
  liveUrl: stringType().optional(),
  price: enumType(["Free", "Premium"]),
  gradient: stringType().optional(),
  glyph: stringType().optional(),
  height: numberType().optional(),
  featured: booleanType().optional(),
  status: enumType(["live", "beta", "coming"])
})).handler(createProduct_createServerFn_handler, async ({
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
    const listing = {
      id: data.slug ?? data.title,
      title: data.title,
      slug: data.slug,
      tagline: data.tagline ?? "",
      creator: data.creator ?? "Oryntal AI Labs",
      offeringType: data.offeringType,
      problems: data.problems,
      industries: data.industries,
      techs: data.techs,
      problemPoints: data.problemPoints,
      advantagePoints: data.advantagePoints,
      image: data.image,
      video: data.video,
      liveUrl: data.liveUrl,
      price: data.price,
      gradient: data.gradient ?? "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
      glyph: data.glyph ?? "✦",
      height: data.height ?? 300,
      featured: data.featured ?? false,
      status: data.status
    };
    const item = await createProduct$1(listing);
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[products][create]", error);
    return {
      ok: false,
      error: "Could not save the product. Check the slug is unique."
    };
  }
});
const updateProduct_createServerFn_handler = createServerRpc({
  id: "e3b5eb71359407d6d88ad1269ba5879332bc9ed446121bbf220a296f86f30b5f",
  name: "updateProduct",
  filename: "src/lib/api/products.ts"
}, (opts) => updateProduct.__executeServer(opts));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  title: stringType().min(1),
  slug: stringType().optional(),
  tagline: stringType().optional(),
  creator: stringType().optional(),
  offeringType: enumType(["saas", "automation", "model"]),
  problems: arrayType(stringType()),
  industries: arrayType(stringType()),
  techs: arrayType(stringType()),
  problemPoints: arrayType(stringType()),
  advantagePoints: arrayType(stringType()),
  image: stringType(),
  video: stringType().optional(),
  liveUrl: stringType().optional(),
  price: enumType(["Free", "Premium"]),
  gradient: stringType().optional(),
  glyph: stringType().optional(),
  height: numberType().optional(),
  featured: booleanType().optional(),
  status: enumType(["live", "beta", "coming"])
})).handler(updateProduct_createServerFn_handler, async ({
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
    const listing = {
      id: data.id,
      title: data.title,
      slug: data.slug,
      tagline: data.tagline ?? "",
      creator: data.creator ?? "Oryntal AI Labs",
      offeringType: data.offeringType,
      problems: data.problems,
      industries: data.industries,
      techs: data.techs,
      problemPoints: data.problemPoints,
      advantagePoints: data.advantagePoints,
      image: data.image,
      video: data.video,
      liveUrl: data.liveUrl,
      price: data.price,
      gradient: data.gradient ?? "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
      glyph: data.glyph ?? "✦",
      height: data.height ?? 300,
      featured: data.featured ?? false,
      status: data.status
    };
    const item = await updateProduct$1(data.id, listing);
    if (!item) return {
      ok: false,
      error: "Product not found."
    };
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[products][update]", error);
    return {
      ok: false,
      error: "Could not save the product."
    };
  }
});
const deleteProduct_createServerFn_handler = createServerRpc({
  id: "42b7eecb730fa01dbdb05dc58e38f4adf995ebed3b73a53cd065b0569701cc40",
  name: "deleteProduct",
  filename: "src/lib/api/products.ts"
}, (opts) => deleteProduct.__executeServer(opts));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteProduct_createServerFn_handler, async ({
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
    const deleted = await deleteProduct$1(data.id);
    return deleted ? {
      ok: true,
      item: {
        id: data.id
      }
    } : {
      ok: false,
      error: "Product not found."
    };
  } catch (error) {
    console.error("[products][delete]", error);
    return {
      ok: false,
      error: "Could not delete the product."
    };
  }
});
export {
  createProduct_createServerFn_handler,
  deleteProduct_createServerFn_handler,
  listProducts_createServerFn_handler,
  updateProduct_createServerFn_handler
};
