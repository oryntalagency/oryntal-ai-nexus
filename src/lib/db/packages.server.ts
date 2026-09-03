import { ObjectId, type Db, type WithId } from "mongodb";

import { getDb } from "../mongodb";
import type { AIPackage } from "../mockData";
import { kebab } from "./shared.server";

// Repository for the `packages` collection. Each row is one niche edition —
// a vision-style pitch for what the client's business looks like after working
// with Oryntal, never a list of specific deliverables.
//
// Keep PACKAGES_VALIDATOR in sync with the packages schema in
// scripts/init-db.mjs — ensurePackageSchema() below applies the same validator
// to collections that were created before a schema change, so a stale
// validator can't silently reject new-shape writes.

export type PackageDoc = {
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  vision_points: string[];
  delivery_points: string[];
  createdAt: Date;
  updatedAt: Date;
};

const PACKAGES_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "slug", "tagline", "icon", "vision_points", "delivery_points"],
    additionalProperties: true,
    properties: {
      _id: { bsonType: "objectId" },
      name: { bsonType: "string", description: "'name' must be the niche/industry name." },
      slug: { bsonType: "string", description: "'slug' must be a unique string." },
      tagline: { bsonType: "string", description: "'tagline' must be the vision-style hook." },
      icon: {
        bsonType: "string",
        description: "'icon' must be a Lucide icon token (e.g. 'shopping-cart', 'sun').",
      },
      vision_points: {
        bsonType: "array",
        minItems: 4,
        items: { bsonType: "string" },
        description: "'vision_points' must be an array of at least 4 outcome-framed strings.",
      },
      delivery_points: {
        bsonType: "array",
        minItems: 1,
        items: { bsonType: "string" },
        description: "'delivery_points' must be an array of at least 1 deliverable string.",
      },
      createdAt: { bsonType: "date", description: "'createdAt' must be a date." },
      updatedAt: { bsonType: "date", description: "'updatedAt' must be a date." },
    },
  },
};

let schemaSynced: Promise<void> | null = null;

async function ensurePackageSchema(db: Db): Promise<void> {
  const exists = (await db.listCollections({ name: "packages" }).toArray()).length > 0;
  if (!exists) {
    await db.createCollection("packages", {
      validator: PACKAGES_VALIDATOR,
      validationLevel: "strict",
    });
  } else {
    // Idempotent — replaces a validator left over from an earlier deploy (for
    // example one that still required `managed_items`) with the current one.
    await db.command({
      collMod: "packages",
      validator: PACKAGES_VALIDATOR,
      validationLevel: "strict",
    });
  }
  await db
    .collection("packages")
    .createIndex({ slug: 1 }, { unique: true, name: "packages_slug_unique" });
}

// Memoized per process so a serverless lambda only syncs the schema once,
// whether the collection was created now or long ago under an old validator.
function ensureSchema(): Promise<void> {
  if (!schemaSynced) {
    schemaSynced = getDb().then(ensurePackageSchema);
    schemaSynced.catch(() => {
      schemaSynced = null;
    });
  }
  return schemaSynced;
}

function toPackageDoc(
  pkg: AIPackage,
  timestamps: { createdAt: Date; updatedAt: Date },
): PackageDoc {
  const slug = kebab(pkg.name);
  if (!slug) {
    // Guards the "every name produces the same empty slug" failure mode: an
    // empty unique-key value is shared by any number of documents and would
    // bubble up as a confusing duplicate-key error on the very first insert.
    throw new Error(`Cannot derive a slug from package name ${JSON.stringify(pkg.name)}.`);
  }
  return {
    name: pkg.name,
    slug,
    tagline: pkg.tagline,
    icon: pkg.icon,
    vision_points: pkg.vision_points,
    delivery_points: pkg.delivery_points,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
  };
}

function fromPackageDoc(doc: WithId<PackageDoc>): AIPackage {
  return {
    id: doc._id.toString(),
    name: doc.name,
    tagline: doc.tagline,
    icon: doc.icon,
    vision_points: doc.vision_points ?? [],
    delivery_points: doc.delivery_points ?? [],
    slug: doc.slug,
  };
}

export async function getPackageBySlug(slug: string): Promise<AIPackage | null> {
  const db = await getDb();
  const doc = await db.collection<PackageDoc>("packages").findOne({ slug });
  return doc ? fromPackageDoc({ ...doc, _id: doc._id }) : null;
}

export async function listPackages(): Promise<AIPackage[]> {
  const db = await getDb();
  const docs = await db
    .collection<PackageDoc>("packages")
    .find({ vision_points: { $exists: true, $type: "array" } })
    .sort({ createdAt: 1 })
    .toArray();
  return docs.map((doc) => fromPackageDoc(doc));
}

export async function createPackage(pkg: AIPackage): Promise<AIPackage> {
  const db = await getDb();
  await ensureSchema();
  const now = new Date();
  const doc = toPackageDoc(pkg, { createdAt: now, updatedAt: now });
  console.log(
    "[packages][create] slug:",
    doc.slug,
    "| target:",
    `${db.databaseName}.packages`,
    "| doc:",
    JSON.stringify(doc),
  );
  const result = await db.collection<PackageDoc>("packages").insertOne(doc);
  return fromPackageDoc({ ...doc, _id: result.insertedId });
}

export async function updatePackage(id: string, pkg: AIPackage): Promise<AIPackage | null> {
  const db = await getDb();
  await ensureSchema();
  const packages = db.collection<PackageDoc>("packages");
  const existing = await packages.findOne({ _id: new ObjectId(id) });
  if (!existing) return null;

  const original = existing as unknown as PackageDoc;
  const next = toPackageDoc(pkg, {
    createdAt: original.createdAt,
    updatedAt: new Date(),
  });
  console.log(
    "[packages][update] slug:",
    next.slug,
    "| filter:",
    JSON.stringify({ _id: new ObjectId(id) }),
    "| doc:",
    JSON.stringify(next),
  );

  await packages.replaceOne({ _id: new ObjectId(id) }, next);
  return fromPackageDoc({ ...next, _id: new ObjectId(id) });
}

export async function deletePackage(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection<PackageDoc>("packages").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
