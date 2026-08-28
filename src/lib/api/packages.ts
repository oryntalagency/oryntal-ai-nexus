import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import {
  createPackage as createPackageRecord,
  deletePackage as deletePackageRecord,
  listPackages as listPackageRecords,
  updatePackage as updatePackageRecord,
} from "../db/packages.server";
import type { AIPackage } from "../mockData";

const packageInput = z.object({
  name: z.string().min(1),
  tierIcon: z.enum(["layers", "briefcase", "rocket"]),
  tagline: z.string().optional(),
  positioning: z.string().optional(),
  items: z.array(z.object({ icon: z.string(), label: z.string() })).min(1),
  cta: z.string().optional(),
  featured: z.boolean().optional(),
});

function toAIPackage(data: z.infer<typeof packageInput>, id: string): AIPackage {
  return {
    id,
    name: data.name,
    tierIcon: data.tierIcon,
    tagline: data.tagline ?? "",
    positioning: data.positioning ?? "",
    items: data.items,
    cta: data.cta ?? "Talk to us",
    featured: data.featured ?? false,
  };
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

export const createPackage = createServerFn({ method: "POST" })
  .validator(packageInput)
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    try {
      const item = await createPackageRecord(toAIPackage(data, "new"));
      return { ok: true as const, item };
    } catch (error) {
      console.error("[packages][create]", error);
      return { ok: false as const, error: "Could not save the package." };
    }
  });

export const updatePackage = createServerFn({ method: "POST" })
  .validator(packageInput.extend({ id: z.string().min(1) }))
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
      return { ok: false as const, error: "Could not save the package." };
    }
  });

export const deletePackage = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
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
