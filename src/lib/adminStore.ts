import { useSyncExternalStore } from "react";
import { blogs as seedBlogs, listings as seedListings, packages as seedPackages } from "./mockData";
import type { Listing, AIPackage, Blog } from "./mockData";

export type MediaAsset = {
  id: string;
  name: string;
  kind: "image" | "video";
  url: string;
  size: number;
};

export type AdminState = {
  listings: Listing[];
  packages: AIPackage[];
  posts: Blog[];
  media: MediaAsset[];
};

const COVER_SEED: MediaAsset[] = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `cov-${n}`,
    name: `cover-${n}.svg`,
    kind: "image",
    url: `/assets/covers/cover-${n}.svg`,
    size: 0,
  };
});

let state: AdminState = {
  listings: seedListings,
  packages: seedPackages,
  posts: seedBlogs,
  media: COVER_SEED,
};

const listeners = new Set<() => void>();

function set(next: AdminState) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAdminStore(): AdminState {
  return useSyncExternalStore(subscribe, () => state);
}

export const adminActions = {
  upsertListing(listing: Listing) {
    set({
      ...state,
      listings: [listing, ...state.listings.filter((l) => l.id !== listing.id)],
    });
  },
  deleteListing(id: string) {
    set({ ...state, listings: state.listings.filter((l) => l.id !== id) });
  },
  upsertPackage(pkg: AIPackage) {
    set({
      ...state,
      packages: [pkg, ...state.packages.filter((p) => p.id !== pkg.id)],
    });
  },
  deletePackage(id: string) {
    set({ ...state, packages: state.packages.filter((p) => p.id !== id) });
  },
  upsertPost(post: Blog) {
    set({
      ...state,
      posts: [post, ...state.posts.filter((p) => p.id !== post.id)],
    });
  },
  deletePost(id: string) {
    set({ ...state, posts: state.posts.filter((p) => p.id !== id) });
  },
  addMedia(asset: MediaAsset) {
    set({ ...state, media: [asset, ...state.media] });
  },
  deleteMedia(id: string) {
    set({ ...state, media: state.media.filter((m) => m.id !== id) });
  },
};
