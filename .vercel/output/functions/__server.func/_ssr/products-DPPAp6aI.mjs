import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useAdminStore } from "./adminStore-DL5y1WiF.mjs";
import { u as updateProduct, c as createProduct, d as deleteProduct, l as listProducts } from "./products-DszPI45d.mjs";
import { L as ListingCard, a as ListingDetail, V as VideoLightbox, l as listTags } from "./ListingModals-BvMELYlb.mjs";
import { u as uploadMedia } from "./media-7qbO_Ewy.mjs";
import { a as OFFERING_LABEL, O as OFFERING_META, P as PROBLEMS, I as INDUSTRIES, T as TECHS } from "./mockData-CPS7xFcy.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-tCTvTz3m.mjs";
import { P as PageHeader, a as StatusBadge } from "./admin-ui-vkuwaPr_.mjs";
import "../_libs/seroval.mjs";
import { _ as Plus, e as Search, $ as Pencil, X, a0 as Trash2, h as WandSparkles, Y as CircleCheck, o as CircleAlert, E as Eye, a4 as ImagePlus, a5 as Upload } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-jYxGnsDr.mjs";
import "./server-B_dwi7jl.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream/promises";
import "../_libs/zod.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const GRADIENT = "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]";
const GLYPH = "✦";
const LOOM_RE = /^https?:\/\/(www\.)?loom\.com(\/(share|video|embed)\/)/;
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
function dataUrlToBase64(dataUrl) {
  const comma = dataUrl.indexOf(",");
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}
function emptyForm() {
  return {
    title: "",
    tagline: "",
    creator: "Oryntal AI Labs",
    offering: "saas",
    slug: "",
    slugTouched: false,
    problems: [],
    industries: [],
    techs: [],
    problemPoints: [],
    advantagePoints: [],
    image: "",
    video: "",
    videoMode: "skip",
    loomUrl: "",
    ctaUrl: "",
    status: "live",
    price: "Free",
    featured: false
  };
}
function formFromListing(l) {
  return {
    title: l.title,
    tagline: l.tagline,
    creator: l.creator,
    offering: l.offeringType,
    slug: l.slug ?? slugify(l.title),
    slugTouched: true,
    problems: l.problems,
    industries: l.industries,
    techs: l.techs,
    problemPoints: l.problemPoints,
    advantagePoints: l.advantagePoints,
    image: l.image,
    video: l.video ?? "",
    videoMode: l.video ? "add" : "skip",
    loomUrl: "",
    ctaUrl: l.liveUrl ?? "",
    status: l.status ?? "live",
    price: l.price,
    featured: l.featured ?? false
  };
}
function formToListing(f, editing) {
  return {
    id: editing?.id ?? "edit-" + String(Date.now()),
    title: f.title.trim(),
    tagline: f.tagline.trim(),
    creator: f.creator.trim() || "Oryntal AI Labs",
    offeringType: f.offering,
    problems: f.problems,
    industries: f.industries,
    techs: f.techs,
    problemPoints: f.problemPoints.map((p) => p.trim()).filter(Boolean),
    advantagePoints: f.advantagePoints.map((p) => p.trim()).filter(Boolean),
    image: f.image,
    video: f.videoMode === "add" ? f.video || void 0 : void 0,
    liveUrl: f.ctaUrl.trim() || void 0,
    price: f.price,
    gradient: editing?.gradient ?? GRADIENT,
    glyph: editing?.glyph ?? GLYPH,
    height: editing?.height ?? 300,
    featured: f.featured,
    slug: f.slug.trim() || slugify(f.title),
    status: f.status
  };
}
function ProductsPage() {
  const queryClient = useQueryClient();
  const {
    media
  } = useAdminStore();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [offeringFilter, setOfferingFilter] = reactExports.useState("all");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const {
    data
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => listProducts({
      data: {}
    })
  });
  const listings = data?.ok ? data.items : [];
  const invalidateListings = () => queryClient.invalidateQueries({
    queryKey: ["products"]
  });
  const saveListing = async (listing, editing2) => {
    const res = editing2 ? await updateProduct({
      data: {
        id: editing2.id,
        title: listing.title,
        slug: listing.slug,
        tagline: listing.tagline,
        creator: listing.creator,
        offeringType: listing.offeringType,
        problems: listing.problems,
        industries: listing.industries,
        techs: listing.techs,
        problemPoints: listing.problemPoints,
        advantagePoints: listing.advantagePoints,
        image: listing.image,
        video: listing.video,
        liveUrl: listing.liveUrl,
        price: listing.price,
        gradient: listing.gradient,
        glyph: listing.glyph,
        height: listing.height,
        featured: listing.featured,
        status: listing.status ?? "live"
      }
    }) : await createProduct({
      data: {
        title: listing.title,
        slug: listing.slug,
        tagline: listing.tagline,
        creator: listing.creator,
        offeringType: listing.offeringType,
        problems: listing.problems,
        industries: listing.industries,
        techs: listing.techs,
        problemPoints: listing.problemPoints,
        advantagePoints: listing.advantagePoints,
        image: listing.image,
        video: listing.video,
        liveUrl: listing.liveUrl,
        price: listing.price,
        gradient: listing.gradient,
        glyph: listing.glyph,
        height: listing.height,
        featured: listing.featured,
        status: listing.status ?? "live"
      }
    });
    if (res.ok) {
      await invalidateListings();
      return {
        ok: true
      };
    }
    return {
      ok: false,
      error: res.error ?? "Could not save the product."
    };
  };
  const deleteOne = async (id) => {
    const res = await deleteProduct({
      data: {
        id
      }
    });
    if (res.ok) {
      await invalidateListings();
    }
    return res.ok;
  };
  reactExports.useEffect(() => {
    if (!deletingId) return;
    const t = setTimeout(() => setDeletingId(null), 3e3);
    return () => clearTimeout(t);
  }, [deletingId]);
  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (l) => {
    setEditing(l);
    setOpen(true);
  };
  const filtered = listings.filter((l) => {
    const q = query.trim().toLowerCase();
    const matchQ = !q || l.title.toLowerCase().includes(q) || l.tagline.toLowerCase().includes(q);
    const matchO = offeringFilter === "all" || l.offeringType === offeringFilter;
    const matchS = statusFilter === "all" || (l.status ?? "live") === statusFilter;
    return matchQ && matchO && matchS;
  });
  const confirmDelete = (id) => {
    if (deletingId === id) {
      void deleteOne(id);
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { kicker: "Products", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Manage the" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "catalog" })
    ] }), description: "Create and edit SaaS products, AI automations, and models. Live preview updates as you type.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "rounded-full shadow-gold-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Add product"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[220px] flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search products…", className: "rounded-full pl-10" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: offeringFilter, onChange: (e) => setOfferingFilter(e.target.value), className: "h-10 w-full rounded-full glass px-4 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50 sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All types" }),
        Object.entries(OFFERING_LABEL).map(([k, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: label }, k))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "h-10 w-full rounded-full glass px-4 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50 sm:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All statuses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "live", children: "Live" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beta", children: "Beta" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "coming", children: "Coming soon" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 overflow-hidden rounded-2xl ring-1 ring-border bg-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-5 py-3 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
        filtered.length,
        " listing",
        filtered.length === 1 ? "" : "s"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 py-10 text-center text-sm text-muted-foreground", children: "No listings match." }),
        filtered.map((l) => {
          const Meta = OFFERING_META[l.offeringType];
          const deleting = deletingId === l.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/50 ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`, children: l.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: "", className: "h-full w-full object-cover" }) : null }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "truncate text-sm font-semibold transition hover:text-primary", title: l.title, children: l.title }),
                l.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30", children: "Featured" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Meta.icon, { className: "mr-1 inline h-3 w-3 text-primary" }),
                Meta.label,
                " · /",
                l.slug ?? slugify(l.title)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: l.status ?? "live" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => openEdit(l), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": "Edit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: deleting ? "destructive" : "outline", size: "sm", onClick: () => confirmDelete(l.id), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": deleting ? "Confirm delete" : "Delete", children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] })
          ] }, l.id);
        })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(ProductForm, { editing, mediaImages: media.filter((m) => m.kind === "image").map((m) => m.url), onClose: () => setOpen(false), onSave: saveListing })
  ] });
}
function ProductForm({
  editing,
  mediaImages,
  onClose,
  onSave
}) {
  const [f, setF] = reactExports.useState(editing ? formFromListing(editing) : emptyForm());
  const [errors, setErrors] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [submitError, setSubmitError] = reactExports.useState(null);
  const [detail, setDetail] = reactExports.useState(null);
  const [play, setPlay] = reactExports.useState(null);
  const {
    data: tagData
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => listTags({
      data: {}
    })
  });
  const tagItems = tagData?.ok ? tagData.items : [];
  const problemOptions = tagItems.length > 0 ? tagItems.filter((t) => t.facet === "problem").map((t) => t.label).filter((p) => p !== "All") : PROBLEMS.filter((p) => p !== "All");
  const industryOptions = tagItems.length > 0 ? tagItems.filter((t) => t.facet === "industry").map((t) => t.label) : [...INDUSTRIES];
  const techOptions = tagItems.length > 0 ? tagItems.filter((t) => t.facet === "tech").map((t) => t.label) : [...TECHS];
  const set = (key, value) => setF((prev) => ({
    ...prev,
    [key]: value
  }));
  const onTitle = (title) => {
    setF((prev) => ({
      ...prev,
      title,
      slug: prev.slugTouched ? prev.slug : slugify(title)
    }));
  };
  const draft = formToListing(f, editing ?? null);
  const toggle = (list, item) => list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
  const loomValid = !f.loomUrl.trim() || LOOM_RE.test(f.loomUrl.trim());
  const validate = () => {
    const next = {};
    if (!f.title.trim()) next.title = "Title is required.";
    if (!f.image) next.image = "An image is required.";
    if (f.problems.length === 0) next.problems = "Pick at least one problem you solve.";
    if (!loomValid) next.loomUrl = "Must be a loom.com link, e.g. https://loom.com/share/…";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setSubmitError(null);
    const result = await onSave(formToListing(f, editing ?? null), editing ?? null);
    setSaving(false);
    if (result.ok) {
      onClose();
    } else {
      setSubmitError(result.error ?? "Could not save the product.");
    }
  };
  const selectCls = "h-10 rounded-lg glass px-3 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: true, onOpenChange: (o) => !o && onClose(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-hidden p-0 sm:max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { className: "sr-only", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit product" : "New product" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid lg:grid-cols-[1fr_320px] overflow-y-auto max-h-[92vh]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 p-6 sm:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: editing ? "Edit product" : "New product" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: "Fields marked * are required before this can go live." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-3 w-3 text-primary" }),
              " Live preview"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: "Basics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title *", error: errors.title, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.title, onChange: (e) => onTitle(e.target.value), placeholder: "e.g. Outbound OS" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 shrink-0 items-center rounded-lg bg-secondary px-3 text-xs text-muted-foreground ring-1 ring-border", children: "/" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.slug, onChange: (e) => setF((prev) => ({
                ...prev,
                slug: e.target.value,
                slugTouched: true
              })), placeholder: "outbound-os", className: "min-w-0 flex-1 font-mono text-xs" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", className: "h-10 rounded-lg px-3", onClick: () => setF((prev) => ({
                ...prev,
                slug: slugify(prev.title),
                slugTouched: true
              })), children: /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-3.5 w-3.5" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tagline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.tagline, onChange: (e) => set("tagline", e.target.value), placeholder: "One line on the card" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Creator / vendor", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.creator, onChange: (e) => set("creator", e.target.value), placeholder: "Oryntal AI Labs" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Offering type *", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: f.offering, onChange: (e) => set("offering", e.target.value), className: selectCls + " w-full", children: Object.entries(OFFERING_LABEL).map(([k, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: k, children: label }, k)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: f.status, onChange: (e) => set("status", e.target.value), className: selectCls + " w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "live", children: "Live" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "beta", children: "Beta" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "coming", children: "Coming soon" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Price", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: f.price, onChange: (e) => set("price", e.target.value), className: selectCls + " w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Free" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Premium" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "CTA URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.ctaUrl, onChange: (e) => set("ctaUrl", e.target.value), placeholder: "https://…  (Try it / View target)" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "featured", checked: f.featured, onCheckedChange: (v) => set("featured", v) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "featured", className: "text-sm", children: "Feature on public homepage" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: "Positioning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Problems solved *", error: errors.problems, hint: "Pick every problem this offering directly addresses.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChipPicker, { options: problemOptions, selected: f.problems, onToggle: (p) => set("problems", toggle(f.problems, p)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Industries", hint: "Optional — helps buyers find it faster.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChipPicker, { options: industryOptions, selected: f.industries, onToggle: (p) => set("industries", toggle(f.industries, p)) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tech stack", hint: "Optional.", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChipPicker, { options: techOptions, selected: f.techs, onToggle: (p) => set("techs", toggle(f.techs, p)) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: "Voice" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BulletEditor, { title: "Problem points", items: f.problemPoints, onChange: (items) => set("problemPoints", items), placeholder: "e.g. Manually stitching 6 tools to move a lead" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BulletEditor, { title: "Advantage points", items: f.advantagePoints, onChange: (items) => set("advantagePoints", items), placeholder: "e.g. One dashboard, zero spreadsheet" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: "Media" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Cover image *", error: errors.image, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dropzone, { value: f.image, kind: "image", onChange: (url) => set("image", url) }),
              mediaImages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground", children: "Or pick from media library" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MediaStrip, { urls: mediaImages, onSelect: (url) => set("image", url) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Demo video", hint: "Optional — a short Loom or mp4 walkthrough. Skipping is fine.", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set("videoMode", "skip"), className: `flex-1 rounded-lg px-3 py-2 text-xs font-semibold ring-1 transition ${f.videoMode === "skip" ? "bg-muted text-muted-foreground ring-border" : "glass text-muted-foreground ring-border hover:text-foreground"}`, children: "Skip video" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set("videoMode", "add"), className: `flex-1 rounded-lg px-3 py-2 text-xs font-semibold ring-1 transition ${f.videoMode === "add" ? "bg-primary/15 text-primary ring-primary/40" : "glass text-muted-foreground ring-border hover:text-foreground"}`, children: "Add a video" })
              ] }),
              f.videoMode === "skip" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3 text-primary" }),
                " Skipped — no video attached"
              ] }),
              f.videoMode === "add" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Dropzone, { value: f.video, kind: "video", onChange: (url) => set("video", url) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.video, onChange: (e) => set("video", e.target.value), placeholder: "…or paste a direct mp4 / file URL", className: "font-mono text-xs" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Loom link", error: !loomValid ? errors.loomUrl : void 0, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.loomUrl, onChange: (e) => set("loomUrl", e.target.value), placeholder: "https://loom.com/share/…" }),
              f.loomUrl.trim() && !loomValid && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-xs text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                " Not a valid loom.com link"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t lg:border-t-0 lg:border-l border-border bg-black/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 max-h-[92vh] overflow-y-auto p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-primary" }),
            " Card preview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[340px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing: draft, onShow: setDetail, onPlay: (l) => setPlay(l) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[11px] text-muted-foreground", children: "Renders the same card the public catalog uses." })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4", children: [
        submitError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-xs text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
          " ",
          submitError
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", type: "button", onClick: onClose, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", onClick: submit, disabled: saving, className: "rounded-full shadow-gold-glow", children: saving ? "Saving…" : editing ? "Save changes" : "Publish product" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListingDetail, { listing: detail, onClose: () => setDetail(null), onPlay: (l) => {
      setDetail(null);
      setPlay(l);
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoLightbox, { url: play?.video ?? null, onClose: () => setPlay(null) })
  ] });
}
function Field({
  label,
  error,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide text-foreground/70", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5", children }),
    hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: hint }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-[11px] text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      " ",
      error
    ] })
  ] });
}
function ChipPicker({
  options,
  selected,
  onToggle
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: options.map((o) => {
    const on = selected.includes(o);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onToggle(o), className: `inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${on ? "bg-primary/15 text-primary ring-primary/40" : "glass text-muted-foreground ring-border hover:text-foreground"}`, children: [
      on && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1 text-primary", children: "✓" }),
      o
    ] }, o);
  }) });
}
function BulletEditor({
  title,
  items,
  onChange,
  placeholder
}) {
  const setItem = (i, v) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass p-4 ring-1 ring-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: item, onChange: (e) => setItem(i, e.target.value), placeholder, className: "min-w-0 flex-1 text-xs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(items.filter((_, j) => j !== i)), className: "shrink-0 rounded-md p-1 text-muted-foreground transition hover:text-destructive", "aria-label": "Remove point", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] }, i)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => onChange([...items, ""]), className: "mt-1 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
        " Add point"
      ] })
    ] })
  ] });
}
function Dropzone({
  value,
  kind,
  onChange
}) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [uploadError, setUploadError] = reactExports.useState(null);
  const onFile = async (file) => {
    const dataUrl = await readFileAsDataUrl(file);
    setUploading(true);
    setUploadError(null);
    try {
      const res = await uploadMedia({
        data: {
          name: file.name,
          kind,
          dataBase64: dataUrlToBase64(dataUrl)
        }
      });
      if (res.ok) {
        onChange(res.url);
      } else {
        setUploadError(res.error ?? "Upload failed.");
      }
    } catch {
      setUploadError("Upload failed.");
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, type: "file", accept: kind === "image" ? "image/*" : "video/*", className: "hidden", onChange: (e) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (file) void onFile(file);
    } }),
    value ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl ring-1 ring-border", children: [
      kind === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "Cover", className: "h-40 w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: value, controls: true, className: "h-40 w-full bg-black object-contain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-2 top-2 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => inputRef.current?.click(), className: "rounded-full glass px-3 py-1 text-[11px] font-semibold ring-1 ring-border transition hover:text-primary", children: "Replace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onChange(""), className: "rounded-full glass px-3 py-1 text-[11px] font-semibold ring-1 ring-border transition hover:text-destructive", children: "Remove" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => inputRef.current?.click(), disabled: uploading, className: "flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-black/10 px-4 py-8 text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:cursor-wait disabled:opacity-60", children: [
      kind === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-6 w-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: uploading ? "Uploading…" : `Click to upload ${kind === "image" ? "an image" : "a video"}` })
    ] }),
    uploadError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-[11px] text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      " ",
      uploadError
    ] })
  ] });
}
function MediaStrip({
  urls,
  onSelect
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-1", children: urls.slice(0, 12).map((url) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onSelect(url), className: "h-12 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-border transition hover:ring-primary/60 hover:brightness-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "h-full w-full object-cover" }) }, url)) });
}
export {
  ProductsPage as component
};
