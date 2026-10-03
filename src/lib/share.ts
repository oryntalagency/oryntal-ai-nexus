import { toast } from "sonner";
import type { Listing } from "@/lib/mockData";

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
