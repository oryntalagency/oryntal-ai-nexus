import { ObjectId, type WithId } from "mongodb";

import { getDb } from "../mongodb";
import type { AIPackage } from "../mockData";
import { kebab } from "./shared.server";

// Repository for the `packages` collection. Each row is one niche edition —
// a vision-style pitch for what the client's business looks like after working
// with Oryntal, never a list of specific deliverables.

export type PackageDoc = {
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  vision_points: string[];
  createdAt: Date;
  updatedAt: Date;
};

function toPackageDoc(
  pkg: AIPackage,
  timestamps: { createdAt: Date; updatedAt: Date },
): PackageDoc {
  return {
    name: pkg.name,
    slug: kebab(pkg.name),
    tagline: pkg.tagline,
    icon: pkg.icon,
    vision_points: pkg.vision_points,
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
    slug: doc.slug,
  };
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
  const now = new Date();
  const doc = toPackageDoc(pkg, { createdAt: now, updatedAt: now });
  const result = await db.collection<PackageDoc>("packages").insertOne(doc);
  return fromPackageDoc({ ...doc, _id: result.insertedId });
}

export async function updatePackage(id: string, pkg: AIPackage): Promise<AIPackage | null> {
  const db = await getDb();
  const packages = db.collection<PackageDoc>("packages");
  const existing = await packages.findOne({ _id: new ObjectId(id) });
  if (!existing) return null;

  const original = existing as unknown as PackageDoc;
  const next = toPackageDoc(pkg, {
    createdAt: original.createdAt,
    updatedAt: new Date(),
  });

  await packages.replaceOne({ _id: new ObjectId(id) }, next);
  return fromPackageDoc({ ...next, _id: new ObjectId(id) });
}

export async function deletePackage(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection<PackageDoc>("packages").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
