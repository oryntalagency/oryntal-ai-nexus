import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { listTags as listTagRecords } from "../db/tags.server";
import type { TagSummary } from "../db/tags.server";

// Tags API — powers the public facet filter bar AND the admin product form
// chip pickers so both always use the exact labels stored on documents.

export const listTags = createServerFn({ method: "GET" })
  .validator(z.object({ facet: z.enum(["problem", "industry", "tech"]).optional() }))
  .handler(async ({ data }) => {
    try {
      const items = await listTagRecords(data.facet);
      return { ok: true as const, items };
    } catch (error) {
      console.error("[tags][list]", error);
      return { ok: false as const, error: "Failed to load tags." };
    }
  });

export type ListTagsResult = Awaited<ReturnType<typeof listTags>>;
export type { TagSummary };
