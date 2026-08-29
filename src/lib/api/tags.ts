import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import {
  createTag as createTagRecord,
  deleteTag as deleteTagRecord,
  listTags as listTagRecords,
  updateTag as updateTagRecord,
} from "../db/tags.server";
import type { TagSummary } from "../db/tags.server";

// Tags API — powers the public facet filter bar AND the admin product form
// chip pickers so both always use the exact labels stored on documents.
// Read is public; every write is guarded by the signed admin session.

const facetSchema = z.enum(["problem", "industry", "tech"]);

export const listTags = createServerFn({ method: "GET" })
  .inputValidator(z.object({ facet: facetSchema.optional() }))
  .handler(async ({ data }) => {
    try {
      const items = await listTagRecords(data.facet);
      return { ok: true as const, items };
    } catch (error) {
      console.error("[tags][list]", error);
      return { ok: false as const, error: "Failed to load tags." };
    }
  });

export const createTag = createServerFn({ method: "POST" })
  .inputValidator(z.object({ label: z.string().trim().min(1).max(80), facet: facetSchema }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const tag = await createTagRecord({ label: data.label, facet: data.facet });
      if (!tag) {
        return {
          ok: false as const,
          error: "A tag with that name already exists in this facet.",
        };
      }
      return { ok: true as const, tag };
    } catch (error) {
      console.error("[tags][create]", error);
      return { ok: false as const, error: "Could not create the tag." };
    }
  });

export const updateTag = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      facet: facetSchema,
      slug: z.string().min(1),
      label: z.string().trim().min(1).max(80),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const tag = await updateTagRecord({
        facet: data.facet,
        slug: data.slug,
        label: data.label,
      });
      if (!tag) {
        return {
          ok: false as const,
          error: "Tag not found, or another tag already uses that name.",
        };
      }
      return { ok: true as const, tag };
    } catch (error) {
      console.error("[tags][update]", error);
      return { ok: false as const, error: "Could not update the tag." };
    }
  });

export const deleteTag = createServerFn({ method: "POST" })
  .inputValidator(z.object({ facet: facetSchema, slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const result = await deleteTagRecord({ facet: data.facet, slug: data.slug });
      if (result.status === "deleted") return { ok: true as const, ...result };
      if (result.status === "in-use") {
        return {
          ok: false as const,
          error: `This tag is used by ${result.usage} product${result.usage === 1 ? "" : "s"}. Remove it from those products first.`,
        };
      }
      return { ok: false as const, error: "Tag not found." };
    } catch (error) {
      console.error("[tags][delete]", error);
      return { ok: false as const, error: "Could not delete the tag." };
    }
  });

export type ListTagsResult = Awaited<ReturnType<typeof listTags>>;
export type TagWriteResult = Awaited<ReturnType<typeof createTag>>;
export type { TagSummary };

export type { TagFacet } from "../db/tags.server";
