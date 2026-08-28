import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import {
  createProduct as createProductRecord,
  deleteProduct as deleteProductRecord,
  listProducts as listProductRecords,
  updateProduct as updateProductRecord,
} from "../db/products.server";
import type { Listing } from "../mockData";

// Products API. The public read path is a GET server fn; every write path is
// guarded by the signed admin session (see adminLogin in ./admin).

const offeringFilter = z.enum(["saas", "automation", "model", "all"]);
const statusFilter = z.enum(["live", "beta", "coming", "all"]);

export const listProducts = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      problems: z.array(z.string()).optional(),
      offering: offeringFilter.optional(),
      industries: z.array(z.string()).optional(),
      techs: z.array(z.string()).optional(),
      status: statusFilter.optional(),
      query: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const items = await listProductRecords({
        problems: data.problems,
        offering: data.offering === "all" ? undefined : data.offering,
        industries: data.industries,
        techs: data.techs,
        status: data.status === "all" ? undefined : data.status,
        query: data.query,
      });
      return { ok: true as const, items };
    } catch (error) {
      console.error("[products][list]", error);
      return { ok: false as const, error: "Failed to load products." };
    }
  });

export const createProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      title: z.string().min(1),
      slug: z.string().optional(),
      tagline: z.string().optional(),
      creator: z.string().optional(),
      offeringType: z.enum(["saas", "automation", "model"]),
      problems: z.array(z.string()),
      industries: z.array(z.string()),
      techs: z.array(z.string()),
      problemPoints: z.array(z.string()),
      advantagePoints: z.array(z.string()),
      image: z.string(),
      video: z.string().optional(),
      liveUrl: z.string().optional(),
      price: z.enum(["Free", "Premium"]),
      gradient: z.string().optional(),
      glyph: z.string().optional(),
      height: z.number().optional(),
      featured: z.boolean().optional(),
      status: z.enum(["live", "beta", "coming"]),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const listing: Listing = {
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
        gradient:
          data.gradient ??
          "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
        glyph: data.glyph ?? "✦",
        height: data.height ?? 300,
        featured: data.featured ?? false,
        status: data.status,
      };
      const item = await createProductRecord(listing);
      return { ok: true as const, item };
    } catch (error) {
      console.error("[products][create]", error);
      return { ok: false as const, error: "Could not save the product. Check the slug is unique." };
    }
  });

export const updateProduct = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      slug: z.string().optional(),
      tagline: z.string().optional(),
      creator: z.string().optional(),
      offeringType: z.enum(["saas", "automation", "model"]),
      problems: z.array(z.string()),
      industries: z.array(z.string()),
      techs: z.array(z.string()),
      problemPoints: z.array(z.string()),
      advantagePoints: z.array(z.string()),
      image: z.string(),
      video: z.string().optional(),
      liveUrl: z.string().optional(),
      price: z.enum(["Free", "Premium"]),
      gradient: z.string().optional(),
      glyph: z.string().optional(),
      height: z.number().optional(),
      featured: z.boolean().optional(),
      status: z.enum(["live", "beta", "coming"]),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const listing: Listing = {
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
        gradient:
          data.gradient ??
          "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]",
        glyph: data.glyph ?? "✦",
        height: data.height ?? 300,
        featured: data.featured ?? false,
        status: data.status,
      };
      const item = await updateProductRecord(data.id, listing);
      if (!item) return { ok: false as const, error: "Product not found." };
      return { ok: true as const, item };
    } catch (error) {
      console.error("[products][update]", error);
      return { ok: false as const, error: "Could not save the product." };
    }
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) {
      return { ok: false as const, error: "You must be signed in as an admin." };
    }
    try {
      const deleted = await deleteProductRecord(data.id);
      return deleted
        ? ({ ok: true as const, item: { id: data.id } } as const)
        : ({ ok: false as const, error: "Product not found." } as const);
    } catch (error) {
      console.error("[products][delete]", error);
      return { ok: false as const, error: "Could not delete the product." };
    }
  });

export type ListProductsResult = Awaited<ReturnType<typeof listProducts>>;
export type ProductWriteResult = Awaited<ReturnType<typeof createProduct>>;
