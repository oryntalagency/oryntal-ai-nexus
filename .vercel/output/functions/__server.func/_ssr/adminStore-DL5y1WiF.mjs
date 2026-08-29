import { r as reactExports } from "../_libs/react.mjs";
import { b as blogs, p as packages, l as listings } from "./mockData-CPS7xFcy.mjs";
const COVER_SEED = Array.from({ length: 12 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `cov-${n}`,
    name: `cover-${n}.svg`,
    kind: "image",
    url: `/assets/covers/cover-${n}.svg`,
    size: 0
  };
});
let state = {
  listings,
  packages,
  posts: blogs,
  media: COVER_SEED
};
const listeners = /* @__PURE__ */ new Set();
function set(next) {
  state = next;
  listeners.forEach((l) => l());
}
function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function useAdminStore() {
  return reactExports.useSyncExternalStore(subscribe, () => state);
}
const adminActions = {
  upsertListing(listing) {
    set({
      ...state,
      listings: [listing, ...state.listings.filter((l) => l.id !== listing.id)]
    });
  },
  deleteListing(id) {
    set({ ...state, listings: state.listings.filter((l) => l.id !== id) });
  },
  upsertPackage(pkg) {
    set({
      ...state,
      packages: [pkg, ...state.packages.filter((p) => p.id !== pkg.id)]
    });
  },
  deletePackage(id) {
    set({ ...state, packages: state.packages.filter((p) => p.id !== id) });
  },
  upsertPost(post) {
    set({
      ...state,
      posts: [post, ...state.posts.filter((p) => p.id !== post.id)]
    });
  },
  deletePost(id) {
    set({ ...state, posts: state.posts.filter((p) => p.id !== id) });
  },
  addMedia(asset) {
    set({ ...state, media: [asset, ...state.media] });
  },
  deleteMedia(id) {
    set({ ...state, media: state.media.filter((m) => m.id !== id) });
  }
};
export {
  adminActions as a,
  useAdminStore as u
};
