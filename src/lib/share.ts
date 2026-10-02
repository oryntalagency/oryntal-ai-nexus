import { toast } from "sonner";
import type { AIPackage, Listing, PackageTier } from "@/lib/mockData";

const SITE_BASE = "https://oryntal-ai-labs.vercel.app";

// Every project gets its own shareable page (like packages do). The slug is
// the one persisted on the products collection, falling back to a slug derived
// from the title for rows that predate the slug field.

export function productSlug(listing: Pick<Listing, "slug" | "title">): string {
  if (listing.slug) return listing.slug;
  return listing.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function productShareUrl(listing: Pick<Listing, "slug" | "title">): string {
  return `${SITE_BASE}/products/${productSlug(listing)}`;
}

export async function shareProduct(listing: Pick<Listing, "slug" | "title" | "tagline">) {
  const url = productShareUrl(listing);
  const title = `Oryntal AI Labs — ${listing.title}`;
  const text = listing.tagline;

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // user cancelled or the native sheet isn't available — fall through to copy
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast("Link copied", {
      description: "This project's link is now on your clipboard.",
    });
  } catch {
    toast("Couldn't copy", {
      description: "Copy this link manually: " + url,
    });
  }
}

// ---- packages --------------------------------------------------------------
// Each niche edition has its own shareable page, and each of its three pricing
// tiers is shareable on its own via `?tier=<n>`, which the detail page reads to
// scroll straight to that card.

export function packageShareUrl(pkg: Pick<AIPackage, "slug">): string {
  return `${SITE_BASE}/packages/${pkg.slug}`;
}

// 1-based so the links read naturally (?tier=1, not ?tier=0).
export function tierShareUrl(pkg: Pick<AIPackage, "slug">, tierIndex: number): string {
  return `${packageShareUrl(pkg)}?tier=${tierIndex + 1}`;
}

async function shareLink(url: string, title: string, text: string, copiedLabel: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // user cancelled or the native sheet isn't available — fall through to copy
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast("Link copied", { description: copiedLabel });
  } catch {
    toast("Couldn't copy", {
      description: "Copy this link manually: " + url,
    });
  }
}

export async function sharePackage(pkg: Pick<AIPackage, "slug" | "name" | "tagline">) {
  await shareLink(
    packageShareUrl(pkg),
    `Oryntal AI Labs — ${pkg.name}`,
    pkg.tagline,
    "This package's link is now on your clipboard.",
  );
}

export async function shareTier(
  pkg: Pick<AIPackage, "slug" | "name">,
  tier: Pick<PackageTier, "tier_name" | "setup_price" | "monthly_price">,
  tierIndex: number,
) {
  await shareLink(
    tierShareUrl(pkg, tierIndex),
    `Oryntal AI Labs — ${pkg.name}: ${tier.tier_name}`,
    `${tier.setup_price} one-time setup + ${tier.monthly_price}`,
    `${tier.tier_name}'s link is now on your clipboard.`,
  );
}
