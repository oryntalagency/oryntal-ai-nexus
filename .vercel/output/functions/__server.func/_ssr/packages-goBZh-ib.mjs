import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { c as currentAdmin } from "./admins.server-1QQJDc-F.mjs";
import { ObjectId } from "mongodb";
import { g as getDb } from "./mongodb-7utz71PX.mjs";
import { o as omitUndefined, k as kebab } from "./shared.server-Ba483pzE.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/bcryptjs.mjs";
import { o as objectType, b as booleanType, s as stringType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
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
const TIER_ICONS = ["layers", "briefcase", "rocket"];
function toPackageDoc(pkg, timestamps) {
  return omitUndefined({
    name: pkg.name,
    slug: kebab(pkg.name),
    tagline: pkg.tagline,
    icon: pkg.tierIcon,
    managed_items: pkg.items,
    positioning: pkg.positioning,
    cta: pkg.cta,
    featured: pkg.featured,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  });
}
function fromPackageDoc(doc) {
  const tierIcon = TIER_ICONS.includes(doc.icon) ? doc.icon : "briefcase";
  return {
    id: doc._id.toString(),
    name: doc.name,
    tierIcon,
    tagline: doc.tagline,
    positioning: doc.positioning ?? "",
    items: doc.managed_items ?? [],
    cta: doc.cta ?? "Talk to us",
    featured: doc.featured ?? false
  };
}
async function listPackages$1() {
  const db = await getDb();
  const docs = await db.collection("packages").find({}).sort({ featured: -1, createdAt: 1 }).toArray();
  return docs.map((doc) => fromPackageDoc(doc));
}
async function createPackage$1(pkg) {
  const db = await getDb();
  const now = /* @__PURE__ */ new Date();
  const doc = toPackageDoc(pkg, { createdAt: now, updatedAt: now });
  const result = await db.collection("packages").insertOne(doc);
  return fromPackageDoc({ ...doc, _id: result.insertedId });
}
async function updatePackage$1(id, pkg) {
  const db = await getDb();
  const packages = db.collection("packages");
  const existing = await packages.findOne({ _id: new ObjectId(id) });
  if (!existing) return null;
  const original = existing;
  const next = toPackageDoc(pkg, {
    createdAt: original.createdAt,
    updatedAt: /* @__PURE__ */ new Date()
  });
  await packages.replaceOne({ _id: new ObjectId(id) }, next);
  return fromPackageDoc({ ...next, _id: new ObjectId(id) });
}
async function deletePackage$1(id) {
  const db = await getDb();
  const result = await db.collection("packages").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
const packageInput = objectType({
  name: stringType().min(1),
  tierIcon: enumType(["layers", "briefcase", "rocket"]),
  tagline: stringType().optional(),
  positioning: stringType().optional(),
  items: arrayType(objectType({
    icon: stringType(),
    label: stringType()
  })).min(1),
  cta: stringType().optional(),
  featured: booleanType().optional()
});
function toAIPackage(data, id) {
  return {
    id,
    name: data.name,
    tierIcon: data.tierIcon,
    tagline: data.tagline ?? "",
    positioning: data.positioning ?? "",
    items: data.items,
    cta: data.cta ?? "Talk to us",
    featured: data.featured ?? false
  };
}
const listPackages_createServerFn_handler = createServerRpc({
  id: "748bd546fd025e0fc09ef9595f3919e919fae6ad268e6fd048d71de69914bd90",
  name: "listPackages",
  filename: "src/lib/api/packages.ts"
}, (opts) => listPackages.__executeServer(opts));
const listPackages = createServerFn({
  method: "GET"
}).handler(listPackages_createServerFn_handler, async () => {
  try {
    const items = await listPackages$1();
    return {
      ok: true,
      items
    };
  } catch (error) {
    console.error("[packages][list]", error);
    return {
      ok: false,
      error: "Failed to load packages."
    };
  }
});
const createPackage_createServerFn_handler = createServerRpc({
  id: "a967cf0b9fd1d1c3b67a41ef7e9441d684ddc7a64ffd27d95ab762a10be7e19b",
  name: "createPackage",
  filename: "src/lib/api/packages.ts"
}, (opts) => createPackage.__executeServer(opts));
const createPackage = createServerFn({
  method: "POST"
}).inputValidator(packageInput).handler(createPackage_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  try {
    const item = await createPackage$1(toAIPackage(data, "new"));
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[packages][create]", error);
    return {
      ok: false,
      error: "Could not save the package."
    };
  }
});
const updatePackage_createServerFn_handler = createServerRpc({
  id: "21872e4dddb99457312fbaece1519ad9f57221a1a4a98bed2dd03c0863b5158f",
  name: "updatePackage",
  filename: "src/lib/api/packages.ts"
}, (opts) => updatePackage.__executeServer(opts));
const updatePackage = createServerFn({
  method: "POST"
}).inputValidator(packageInput.extend({
  id: stringType().min(1)
})).handler(updatePackage_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  const {
    id,
    ...rest
  } = data;
  try {
    const item = await updatePackage$1(id, toAIPackage(rest, id));
    if (!item) return {
      ok: false,
      error: "Package not found."
    };
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[packages][update]", error);
    return {
      ok: false,
      error: "Could not save the package."
    };
  }
});
const deletePackage_createServerFn_handler = createServerRpc({
  id: "e22697e5f465077d541e7fa0749c003deaa7fa44785500b79727465c2f768c76",
  name: "deletePackage",
  filename: "src/lib/api/packages.ts"
}, (opts) => deletePackage.__executeServer(opts));
const deletePackage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deletePackage_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  try {
    const deleted = await deletePackage$1(data.id);
    return deleted ? {
      ok: true,
      item: {
        id: data.id
      }
    } : {
      ok: false,
      error: "Package not found."
    };
  } catch (error) {
    console.error("[packages][delete]", error);
    return {
      ok: false,
      error: "Could not delete the package."
    };
  }
});
export {
  createPackage_createServerFn_handler,
  deletePackage_createServerFn_handler,
  listPackages_createServerFn_handler,
  updatePackage_createServerFn_handler
};
