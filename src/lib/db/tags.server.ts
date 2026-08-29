import { getDb } from "../mongodb";
import { kebab } from "./shared.server";

// Repository for the `tags` taxonomy (seeded by scripts/seed-tags.mjs /
// scripts/init-db.mjs). Public filter bars and the admin product form read
// this so the options always match the exact labels stored on product
// documents.
//
// Products reference tags by *label* in their `problem_tags` /
// `industry_tags` / `tech_tags` arrays. That means:
//   - deleting is only allowed when no product references the label;
//   - renaming a label must also rename references on every product so the
//     filters never silently drift from the catalog.

export type TagFacet = "problem" | "industry" | "tech";

export type TagDoc = {
  label: string;
  facet: TagFacet;
  slug: string;
};

export type TagSummary = TagDoc;

export type DeleteTagResult =
  { status: "deleted" } | { status: "in-use"; usage: number } | { status: "missing" };

const FACET_FIELD: Record<TagFacet, "problem_tags" | "industry_tags" | "tech_tags"> = {
  problem: "problem_tags",
  industry: "industry_tags",
  tech: "tech_tags",
};

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

export async function createTag(input: {
  label: string;
  facet: TagFacet;
}): Promise<TagSummary | null> {
  const db = await getDb();
  const label = input.label.trim();
  const slug = kebab(label);
  if (!label || !slug) return null;

  const tags = db.collection("tags");
  const exists = await tags.findOne({ facet: input.facet, slug });
  if (exists) return null;

  const tag: TagDoc = { label, facet: input.facet, slug };
  await tags.insertOne(tag);
  return tag;
}

export async function updateTag(input: {
  facet: TagFacet;
  slug: string;
  label: string;
}): Promise<TagSummary | null> {
  const db = await getDb();
  const label = input.label.trim();
  const nextSlug = kebab(label);
  if (!label || !nextSlug) return null;

  const tags = db.collection("tags");
  const existing = await tags.findOne({ facet: input.facet, slug: input.slug });
  if (!existing) return null;

  const clash = await tags.findOne({
    facet: input.facet,
    slug: nextSlug,
    _id: { $ne: existing._id },
  });
  if (clash) return null;

  await tags.updateOne({ _id: existing._id }, { $set: { label, slug: nextSlug } });

  // Keep product documents in sync — filters read from the tags collection,
  // but products store labels, so rename references on every matching row.
  if (label !== (existing.label as string)) {
    const field = FACET_FIELD[input.facet];
    await db
      .collection("products")
      .updateMany(
        { [field]: existing.label as string },
        { $set: { [`${field}.$[tag]`]: label } },
        { arrayFilters: [{ tag: existing.label as string }] },
      );
  }

  return { label, facet: input.facet, slug: nextSlug };
}

export async function deleteTag(input: {
  facet: TagFacet;
  slug: string;
}): Promise<DeleteTagResult> {
  const db = await getDb();
  const tags = db.collection("tags");
  const existing = await tags.findOne({ facet: input.facet, slug: input.slug });
  if (!existing) return { status: "missing" };

  const label = existing.label as string;
  const field = FACET_FIELD[input.facet];
  const usage = await db.collection("products").countDocuments({ [field]: label });
  if (usage > 0) return { status: "in-use", usage };

  await tags.deleteOne({ _id: existing._id });
  return { status: "deleted" };
}
