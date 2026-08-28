import { ObjectId, type WithId } from "mongodb";

import { getDb } from "../mongodb";
import type { AIPackage } from "../mockData";
import { kebab, omitUndefined } from "./shared.server";

// Repository for the `packages` collection.

export type PackageDoc = {
  name: string;
  slug: string;
  tagline: string;
  icon: string;
  managed_items: Array<{ icon: string; label: string }>;
  positioning?: string;
  cta?: string;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const TIER_ICONS = ["layers", "briefcase", "rocket"] as const;

function toPackageDoc(
  pkg: AIPackage,
  timestamps: { createdAt: Date; updatedAt: Date },
): PackageDoc {
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
    updatedAt: timestamps.updatedAt,
  });
}

function fromPackageDoc(doc: WithId<PackageDoc>): AIPackage {
  const tierIcon = (TIER_ICONS as readonly string[]).includes(doc.icon)
    ? (doc.icon as AIPackage["tierIcon"])
    : "briefcase";
  return {
    id: doc._id.toString(),
    name: doc.name,
    tierIcon,
    tagline: doc.tagline,
    positioning: doc.positioning ?? "",
    items: doc.managed_items ?? [],
    cta: doc.cta ?? "Talk to us",
    featured: doc.featured ?? false,
  };
}

export async function listPackages(): Promise<AIPackage[]> {
  const db = await getDb();
  const docs = await db
    .collection<PackageDoc>("packages")
    .find({})
    .sort({ featured: -1, createdAt: 1 })
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
