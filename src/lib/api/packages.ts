import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import {
  createPackage as createPackageRecord,
  deletePackage as deletePackageRecord,
  getPackageBySlug as getPackageBySlugRecord,
  listPackages as listPackageRecords,
  updatePackage as updatePackageRecord,
} from "../db/packages.server";
import type { AIPackage } from "../mockData";

const packageInput = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  icon: z.string().min(1),
  vision_points: z.array(z.string().min(1)).min(4),
  delivery_points: z.array(z.string().min(1)).min(1),
});

function toAIPackage(data: z.infer<typeof packageInput>, id: string): AIPackage {
  return {
    id,
    name: data.name,
    tagline: data.tagline,
    icon: data.icon,
    vision_points: data.vision_points,
    delivery_points: data.delivery_points,
    slug: "",
  };
}

function packageWriteError(error: unknown): string {
  const err = error as { code?: number; codeName?: string; message?: string; errmsg?: string };
  const detail = err?.message ?? err?.errmsg;
  if (err?.code === 11000 || err?.codeName === "DuplicateKey") {
    return "A niche with this name already exists. Try a different name.";
  }
  // 121 = Document failed validation (e.g. a stale collection validator). Keep
  // the real server detail so admin isn't told to blame the name when it isn't.
  const prefix = "Could not save the package.";
  return detail ? `${prefix} ${detail}` : prefix;
}

export const listPackages = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const items = await listPackageRecords();
    return { ok: true as const, items };
  } catch (error) {
    console.error("[packages][list]", error);
    return { ok: false as const, error: "Failed to load packages." };
  }
});

export const getPackageBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const item = await getPackageBySlugRecord(slug);
      if (!item) return { ok: false as const, error: "Package not found." };
      return { ok: true as const, item };
    } catch (error) {
      console.error("[packages][getBySlug]", error);
      return { ok: false as const, error: "Failed to load package." };
    }
  });

export const createPackage = createServerFn({ method: "POST" })
  .inputValidator(packageInput)
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    try {
      const item = await createPackageRecord(toAIPackage(data, "new"));
      return { ok: true as const, item };
    } catch (error) {
      console.error("[packages][create]", error);
      return { ok: false as const, error: packageWriteError(error) };
    }
  });

export const updatePackage = createServerFn({ method: "POST" })
  .inputValidator(packageInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    const { id, ...rest } = data;
    try {
      const item = await updatePackageRecord(id, toAIPackage(rest, id));
      if (!item) return { ok: false as const, error: "Package not found." };
      return { ok: true as const, item };
    } catch (error) {
      console.error("[packages][update]", error);
      return { ok: false as const, error: packageWriteError(error) };
    }
  });

export const deletePackage = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    try {
      const deleted = await deletePackageRecord(data.id);
      return deleted
        ? ({ ok: true as const, item: { id: data.id } } as const)
        : ({ ok: false as const, error: "Package not found." } as const);
    } catch (error) {
      console.error("[packages][delete]", error);
      return { ok: false as const, error: "Could not delete the package." };
    }
  });

export type ListPackagesResult = Awaited<ReturnType<typeof listPackages>>;
export type PackageWriteResult = Awaited<ReturnType<typeof createPackage>>;
