import { ObjectId, type Filter, type WithId } from "mongodb";

import { getDb } from "../mongodb";
import type { Listing, ListingStatus, OfferingType } from "../mockData";
import {
  DB_TO_OFFERING_TYPE,
  DB_TO_STATUS,
  OFFERING_TYPE_TO_DB,
  STATUS_TO_DB,
  omitUndefined,
} from "./shared.server";

// Repository for the `products` collection. Docs follow the JSON Schema from
// scripts/init-db.mjs; UI-only fields (tagline, creator, gradient, glyph,
// height, price, featured) are stored as extra fields because the validator
// allows `additionalProperties: true`.

export type ProductDoc = {
  title: string;
  slug: string;
  offering_type: string;
  problem_tags: string[];
  industry_tags: string[];
  tech_tags: string[];
  problem_points: string[];
  advantage_points: string[];
  image: string;
  video?: string;
  loom_url?: string;
  cta_url?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  tagline?: string;
  creator?: string;
  price?: "Free" | "Premium";
  gradient?: string;
  glyph?: string;
  height?: number;
  featured?: boolean;
};

export type ProductFilterInput = {
  problems?: string[];
  offering?: OfferingType | "all";
  industries?: string[];
  techs?: string[];
  status?: ListingStatus | "all";
  featured?: boolean;
  query?: string;
};

function toProductDoc(
  listing: Listing,
  timestamps: { createdAt: Date; updatedAt: Date },
): ProductDoc {
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
    loom_url: video && video.includes("loom.com") ? video : undefined,
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
    featured: listing.featured,
  });
}

function kebabFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function fromProductDoc(doc: WithId<ProductDoc>): Listing {
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
    gradient:
      doc.gradient ??
      "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
    glyph: doc.glyph ?? "✦",
    height: doc.height ?? 300,
    featured: doc.featured ?? false,
    status,
  };
}

export async function listProducts(input: ProductFilterInput = {}): Promise<Listing[]> {
  const db = await getDb();
  const products = db.collection<ProductDoc>("products");

  const filter: Filter<WithId<ProductDoc>> = {};
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
  if (input.featured === true) filter.featured = true;

  const q = (input.query ?? "").trim().toLowerCase();
  if (q) {
    const pattern = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [
      { title: pattern },
      { tagline: pattern },
      { creator: pattern },
      { problem_tags: pattern },
      { industry_tags: pattern },
      { tech_tags: pattern },
    ];
  }

  const cursor = products.find(filter);
  cursor.sort({ featured: -1, updatedAt: -1 });

  const docs = await cursor.toArray();
  return docs.map((doc) => fromProductDoc(doc));
}

export async function createProduct(listing: Listing): Promise<Listing> {
  const db = await getDb();
  const now = new Date();
  const doc = toProductDoc(listing, { createdAt: now, updatedAt: now });
  const result = await db.collection("products").insertOne(doc);
  return fromProductDoc({ ...doc, _id: result.insertedId });
}

export async function updateProduct(id: string, listing: Listing): Promise<Listing | null> {
  const db = await getDb();
  const products = db.collection("products");
  const existing = await products.findOne({ _id: new ObjectId(id) });
  if (!existing) return null;

  const original = existing as unknown as ProductDoc;
  const next = toProductDoc(listing, {
    createdAt: original.createdAt,
    updatedAt: new Date(),
  });

  await products.replaceOne({ _id: new ObjectId(id) }, next);
  return fromProductDoc({ ...next, _id: new ObjectId(id) });
}

export async function deleteProduct(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount === 1;
}
