import { getDb } from "../mongodb";

// Repository for the `tags` taxonomy (seeded by scripts/seed-tags.mjs /
// scripts/init-db.mjs). Public filter bars read this so the options always
// match the exact labels stored on product documents.

export type TagFacet = "problem" | "industry" | "tech";

export type TagDoc = {
  label: string;
  facet: TagFacet;
  slug: string;
};

export type TagSummary = TagDoc;

export async function listTags(facet?: TagFacet): Promise<TagSummary[]> {
  const db = await getDb();
  const filter = facet ? { facet } : {};
  const docs = await db.collection("tags").find(filter).sort({ facet: 1, label: 1 }).toArray();
  return docs.map((doc) => ({
    label: doc.label as string,
    facet: doc.facet as TagFacet,
    slug: doc.slug as string,
  }));
}
