import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Upload,
  ImagePlus,
  Wand2,
  AlertCircle,
  CheckCircle2,
  Eye,
  X,
  Loader2,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { createProduct, deleteProduct, listProducts, updateProduct } from "@/lib/api/products";
import { listTags } from "@/lib/api/tags";
import { uploadMedia } from "@/lib/api/media";
import { FEATURED_CAP, OFFERING_LABEL, OFFERING_META } from "@/lib/mockData";
import { uploadLimitError, UPLOAD_LIMITS } from "@/lib/upload-limits";
import type { Listing, ListingStatus, OfferingType } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader, StatusBadge } from "@/components/admin/admin-ui";
import { ListingCard } from "@/components/ListingCard";
import { ListingDetail, VideoLightbox } from "@/components/ListingModals";

export const Route = createFileRoute("/admin/products")({
  component: ProductsPage,
});

const GRADIENT = "from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]";
const GLYPH = "✦";
const LOOM_RE = /^https?:\/\/(www\.)?loom\.com(\/(share|video|embed)\/)/;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function dataUrlToBase64(dataUrl: string): string {
  const comma = dataUrl.indexOf(",");
  return comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
}

function dataUrlToExtension(dataUrl: string): string {
  const m = /^data:([^;]+);/.exec(dataUrl);
  if (!m) return "bin";
  return (m[1].split("/")[1] ?? "bin").split("+")[0] || "bin";
}

type FormState = {
  title: string;
  tagline: string;
  creator: string;
  offering: OfferingType;
  slug: string;
  slugTouched: boolean;
  problems: string[];
  industries: string[];
  techs: string[];
  problemPoints: string[];
  advantagePoints: string[];
  image: string;
  video: string;
  videoMode: "skip" | "add";
  loomUrl: string;
  ctaUrl: string;
  status: ListingStatus;
  price: "Free" | "Premium";
  featured: boolean;
};

function emptyForm(): FormState {
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
    featured: false,
  };
}

function formFromListing(l: Listing): FormState {
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
    loomUrl: l.loomUrl ?? "",
    ctaUrl: l.liveUrl ?? "",
    status: l.status ?? "live",
    price: l.price,
    featured: l.featured ?? false,
  };
}

function formToListing(f: FormState, editing: Listing | null): Listing {
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
    video: f.videoMode === "add" ? f.video || undefined : undefined,
    loomUrl: f.loomUrl.trim() || undefined,
    liveUrl: f.ctaUrl.trim() || undefined,
    price: f.price,
    gradient: editing?.gradient ?? GRADIENT,
    glyph: editing?.glyph ?? GLYPH,
    height: editing?.height ?? 300,
    featured: f.featured,
    slug: f.slug.trim() || slugify(f.title),
    status: f.status,
  };
}

function ProductsPage() {
  const queryClient = useQueryClient();
  const { media } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Listing | null>(null);
  const [query, setQuery] = useState("");
  const [offeringFilter, setOfferingFilter] = useState<"all" | OfferingType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | ListingStatus>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => listProducts({ data: {} }),
  });
  const listings = data?.ok ? data.items : [];
  const featuredCount = listings.filter((l) => l.featured).length;

  const invalidateListings = () => queryClient.invalidateQueries({ queryKey: ["products"] });

  const saveListing = async (listing: Listing, editing: Listing | null) => {
    const res = editing
      ? await updateProduct({
          data: {
            id: editing.id,
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
            loomUrl: listing.loomUrl,
            liveUrl: listing.liveUrl,
            price: listing.price,
            gradient: listing.gradient,
            glyph: listing.glyph,
            height: listing.height,
            featured: listing.featured,
            status: listing.status ?? "live",
          },
        })
      : await createProduct({
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
            loomUrl: listing.loomUrl,
            liveUrl: listing.liveUrl,
            price: listing.price,
            gradient: listing.gradient,
            glyph: listing.glyph,
            height: listing.height,
            featured: listing.featured,
            status: listing.status ?? "live",
          },
        });
    if (res.ok) {
      await invalidateListings();
      return { ok: true as const };
    }
    return { ok: false as const, error: res.error ?? "Could not save the product." };
  };

  const deleteOne = async (id: string) => {
    const res = await deleteProduct({ data: { id } });
    if (res.ok) {
      await invalidateListings();
    }
    return res.ok;
  };

  useEffect(() => {
    if (!deletingId) return;
    const t = setTimeout(() => setDeletingId(null), 3000);
    return () => clearTimeout(t);
  }, [deletingId]);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (l: Listing) => {
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

  const confirmDelete = (id: string) => {
    if (deletingId === id) {
      void deleteOne(id);
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Products"
        title={
          <>
            <span className="text-platinum-gradient">Manage the</span>{" "}
            <span className="text-gold-gradient">catalog</span>
          </>
        }
        description="Create and edit SaaS products, AI automations, and models. Live preview updates as you type."
        actions={
          <Button onClick={openCreate} className="rounded-full shadow-gold-glow">
            <Plus className="h-4 w-4" /> Add product
          </Button>
        }
      />

      {/* Filters */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="rounded-full pl-10"
          />
        </div>
        <select
          value={offeringFilter}
          onChange={(e) => setOfferingFilter(e.target.value as "all" | OfferingType)}
          className="h-10 w-full rounded-full glass px-4 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50 sm:w-auto"
        >
          <option value="all">All types</option>
          {Object.entries(OFFERING_LABEL).map(([k, label]) => (
            <option key={k} value={k}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | ListingStatus)}
          className="h-10 w-full rounded-full glass px-4 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50 sm:w-auto"
        >
          <option value="all">All statuses</option>
          <option value="live">Live</option>
          <option value="beta">Beta</option>
          <option value="coming">Coming soon</option>
        </select>
      </div>

      {/* List */}
      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {filtered.length} listing{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="divide-y divide-border">
          {filtered.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No listings match.
            </p>
          )}
          {filtered.map((l) => {
            const Meta = OFFERING_META[l.offeringType];
            const deleting = deletingId === l.id;
            return (
              <div key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div
                  className={`h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/50 ${
                    l.image ? "" : "bg-gradient-to-br " + l.gradient
                  }`}
                >
                  {l.image ? (
                    <img src={l.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      to="/"
                      className="truncate text-sm font-semibold transition hover:text-primary"
                      title={l.title}
                    >
                      {l.title}
                    </Link>
                    {l.featured && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    <Meta.icon className="mr-1 inline h-3 w-3 text-primary" />
                    {Meta.label} · /{l.slug ?? slugify(l.title)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={l.status ?? "live"} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(l)}
                    className="h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant={deleting ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => confirmDelete(l.id)}
                    className="h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
                    aria-label={deleting ? "Confirm delete" : "Delete"}
                  >
                    {deleting ? <X className="h-3.5 w-3.5" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && (
        <ProductForm
          editing={editing}
          mediaImages={media.filter((m) => m.kind === "image").map((m) => m.url)}
          featuredCount={featuredCount}
          onClose={() => setOpen(false)}
          onSave={saveListing}
        />
      )}
    </div>
  );
}

function ProductForm({
  editing,
  mediaImages,
  featuredCount,
  onClose,
  onSave,
}: {
  editing: Listing | null;
  mediaImages: string[];
  featuredCount: number;
  onClose: () => void;
  onSave: (listing: Listing, editing: Listing | null) => Promise<{ ok: boolean; error?: string }>;
}) {
  const [f, setF] = useState<FormState>(editing ? formFromListing(editing) : emptyForm());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Listing | null>(null);
  const [play, setPlay] = useState<Listing | null>(null);

  const { data: tagData } = useQuery({
    queryKey: ["tags"],
    queryFn: () => listTags({ data: {} }),
  });
  const tagItems = tagData?.ok ? tagData.items : [];
  const problemOptions = tagItems
    .filter((t) => t.facet === "problem" && t.label !== "All")
    .map((t) => t.label);
  const industryOptions = tagItems.filter((t) => t.facet === "industry").map((t) => t.label);
  const techOptions = tagItems.filter((t) => t.facet === "tech").map((t) => t.label);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  const onTitle = (title: string) => {
    setF((prev) => ({
      ...prev,
      title,
      slug: prev.slugTouched ? prev.slug : slugify(title),
    }));
  };

  const draft: Listing = formToListing(f, editing ?? null);

  const toggle = (list: string[], item: string) =>
    list.includes(item) ? list.filter((x) => x !== item) : [...list, item];

  const setBullet = (key: "problemPoints" | "advantagePoints", index: number, value: string) =>
    setF((prev) => {
      const next = [...prev[key]];
      next[index] = value;
      return { ...prev, [key]: next };
    });

  const loomValid = !f.loomUrl.trim() || LOOM_RE.test(f.loomUrl.trim());

  const alreadyFeatured = featuredCount - (editing?.featured ? 1 : 0);
  const showFeaturedWarning = f.featured && alreadyFeatured >= FEATURED_CAP;

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!f.title.trim()) next.title = "Title is required.";
    if (!f.image) next.image = "An image is required.";
    if (f.problems.length === 0) next.problems = "Pick at least one problem you solve.";
    if (f.problemPoints.filter((p) => p.trim()).length === 0)
      next.problemPoints = "Add at least one problem point.";
    if (f.advantagePoints.filter((p) => p.trim()).length === 0)
      next.advantagePoints = "Add at least one advantage point.";
    if (!loomValid) next.loomUrl = "Must be a loom.com link, e.g. https://loom.com/share/…";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
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

  const selectCls =
    "h-10 rounded-lg glass px-3 text-sm ring-1 ring-border outline-none transition focus:ring-primary/50";

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="flex max-h-[92vh] w-[calc(100vw-2rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={submit}
          className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_320px]"
        >
          {/* LEFT — form fields */}
          <div className="space-y-8 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  {editing ? "Edit product" : "New product"}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Fields marked * are required before this can go live.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border">
                <Wand2 className="h-3 w-3 text-primary" /> Live preview
              </span>
            </div>

            {/* Basics */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Basics
              </h3>
              <Field label="Title *" error={errors.title}>
                <Input
                  value={f.title}
                  onChange={(e) => onTitle(e.target.value)}
                  placeholder="e.g. Outbound OS"
                />
              </Field>
              <Field label="Slug">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 shrink-0 items-center rounded-lg bg-secondary px-3 text-xs text-muted-foreground ring-1 ring-border">
                    /
                  </div>
                  <Input
                    value={f.slug}
                    onChange={(e) =>
                      setF((prev) => ({ ...prev, slug: e.target.value, slugTouched: true }))
                    }
                    placeholder="outbound-os"
                    className="min-w-0 flex-1 font-mono text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-lg px-3"
                    onClick={() =>
                      setF((prev) => ({ ...prev, slug: slugify(prev.title), slugTouched: true }))
                    }
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Tagline">
                  <Input
                    value={f.tagline}
                    onChange={(e) => set("tagline", e.target.value)}
                    placeholder="One line on the card"
                  />
                </Field>
                <Field label="Creator / vendor">
                  <Input
                    value={f.creator}
                    onChange={(e) => set("creator", e.target.value)}
                    placeholder="Oryntal AI Labs"
                  />
                </Field>
                <Field label="Offering type *">
                  <select
                    value={f.offering}
                    onChange={(e) => set("offering", e.target.value as OfferingType)}
                    className={selectCls + " w-full"}
                  >
                    {Object.entries(OFFERING_LABEL).map(([k, label]) => (
                      <option key={k} value={k}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    value={f.status}
                    onChange={(e) => set("status", e.target.value as ListingStatus)}
                    className={selectCls + " w-full"}
                  >
                    <option value="live">Live</option>
                    <option value="beta">Beta</option>
                    <option value="coming">Coming soon</option>
                  </select>
                </Field>
                <Field label="Price">
                  <select
                    value={f.price}
                    onChange={(e) => set("price", e.target.value as "Free" | "Premium")}
                    className={selectCls + " w-full"}
                  >
                    <option>Free</option>
                    <option>Premium</option>
                  </select>
                </Field>
                <Field label="CTA URL">
                  <Input
                    value={f.ctaUrl}
                    onChange={(e) => set("ctaUrl", e.target.value)}
                    placeholder="https://…  (Try it / View target)"
                  />
                </Field>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="featured"
                      checked={f.featured}
                      onCheckedChange={(v) => set("featured", v)}
                    />
                    <Label htmlFor="featured" className="text-sm">
                      Featured on Home
                    </Label>
                  </div>
                  {showFeaturedWarning && (
                    <p className="flex items-center gap-1.5 text-[11px] text-amber-400/90">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {alreadyFeatured} product{alreadyFeatured === 1 ? "" : "s"} already featured —
                      the homepage shows the {FEATURED_CAP} most recently updated. Consider
                      unfeaturing one.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Tags */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Positioning
              </h3>
              <Field
                label="Problems solved *"
                error={errors.problems}
                hint="Pick every problem this offering directly addresses."
              >
                <ChipPicker
                  options={problemOptions}
                  selected={f.problems}
                  onToggle={(p) => set("problems", toggle(f.problems, p))}
                />
              </Field>
              <Field label="Industries" hint="Optional — helps buyers find it faster.">
                <ChipPicker
                  options={industryOptions}
                  selected={f.industries}
                  onToggle={(p) => set("industries", toggle(f.industries, p))}
                />
              </Field>
              <Field label="Tech stack" hint="Optional.">
                <ChipPicker
                  options={techOptions}
                  selected={f.techs}
                  onToggle={(p) => set("techs", toggle(f.techs, p))}
                />
              </Field>
            </section>

            {/* Bullet points */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Voice
              </h3>
              <BulletEditor
                title="Problem points"
                items={f.problemPoints}
                onChange={(items) => set("problemPoints", items)}
                placeholder="e.g. Manually stitching 6 tools to move a lead"
                error={errors.problemPoints}
              />
              <BulletEditor
                title="Advantage points"
                items={f.advantagePoints}
                onChange={(items) => set("advantagePoints", items)}
                placeholder="e.g. One dashboard, zero spreadsheet"
                error={errors.advantagePoints}
              />
            </section>

            {/* Media */}
            <section className="space-y-4">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Media
              </h3>

              <Field label="Cover image *" error={errors.image}>
                <Dropzone value={f.image} kind="image" onChange={(url) => set("image", url)} />
                {mediaImages.length > 0 && (
                  <div className="mt-2">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      Or pick from media library
                    </p>
                    <MediaStrip urls={mediaImages} onSelect={(url) => set("image", url)} />
                  </div>
                )}
              </Field>

              <Field
                label="Demo video"
                hint="Optional — a short Loom or mp4 walkthrough. Skipping is fine."
              >
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => set("videoMode", "skip")}
                    className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold ring-1 transition ${
                      f.videoMode === "skip"
                        ? "bg-muted text-muted-foreground ring-border"
                        : "glass text-muted-foreground ring-border hover:text-foreground"
                    }`}
                  >
                    Skip video
                  </button>
                  <button
                    type="button"
                    onClick={() => set("videoMode", "add")}
                    className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold ring-1 transition ${
                      f.videoMode === "add"
                        ? "bg-primary/15 text-primary ring-primary/40"
                        : "glass text-muted-foreground ring-border hover:text-foreground"
                    }`}
                  >
                    Add a video
                  </button>
                </div>
                {f.videoMode === "skip" && (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
                    <CheckCircle2 className="h-3 w-3 text-primary" /> Skipped — no video attached
                  </p>
                )}
                {f.videoMode === "add" && (
                  <div className="mt-2 space-y-2">
                    <Dropzone value={f.video} kind="video" onChange={(url) => set("video", url)} />
                    <Input
                      value={f.video}
                      onChange={(e) => set("video", e.target.value)}
                      placeholder="…or paste a direct mp4 / file URL"
                      className="font-mono text-xs"
                    />
                  </div>
                )}
              </Field>

              <Field label="Loom link" error={!loomValid ? errors.loomUrl : undefined}>
                <Input
                  value={f.loomUrl}
                  onChange={(e) => set("loomUrl", e.target.value)}
                  placeholder="https://loom.com/share/…"
                />
                {f.loomUrl.trim() && !loomValid && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="h-3 w-3" /> Not a valid loom.com link
                  </p>
                )}
              </Field>
            </section>
          </div>

          {/* RIGHT — live preview */}
          <div className="border-t lg:border-t-0 lg:border-l border-border bg-black/20">
            <div className="sticky top-0 max-h-full overflow-y-auto p-6">
              <p className="mb-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Eye className="h-3.5 w-3.5 text-primary" /> Card preview
              </p>
              <div className="mx-auto max-w-[340px]">
                <ListingCard listing={draft} onShow={setDetail} onPlay={(l) => setPlay(l)} />
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Renders the same card the public catalog uses.
              </p>
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-surface px-6 py-4">
          {submitError ? (
            <p className="flex items-center gap-1.5 text-xs text-destructive">
              <AlertCircle className="h-3.5 w-3.5" /> {submitError}
            </p>
          ) : (
            <span />
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={submit}
              disabled={saving}
              className="rounded-full shadow-gold-glow"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Saving…
                </>
              ) : editing ? (
                "Save Changes"
              ) : (
                "Publish"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>

      <ListingDetail
        listing={detail}
        onClose={() => setDetail(null)}
        onPlay={(l) => {
          setDetail(null);
          setPlay(l);
        }}
      />
      <VideoLightbox url={play?.video ?? null} onClose={() => setPlay(null)} />
    </Dialog>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-xs font-semibold uppercase tracking-wide text-foreground/70">
        {label}
      </Label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
          <AlertCircle className="h-3 w-3" /> {error}
        </p>
      )}
    </div>
  );
}

function ChipPicker({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const on = selected.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onToggle(o)}
            className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${
              on
                ? "bg-primary/15 text-primary ring-primary/40"
                : "glass text-muted-foreground ring-border hover:text-foreground"
            }`}
          >
            {on && <span className="mr-1 text-primary">✓</span>}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function BulletEditor({
  title,
  items,
  onChange,
  placeholder,
  error,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  error?: string;
}) {
  const setItem = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className={`rounded-xl glass p-4 ring-1 ${error ? "ring-destructive/60" : "ring-border"}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <Input
              value={item}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={placeholder}
              className="min-w-0 flex-1 text-xs"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:text-destructive"
              aria-label="Remove point"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground"
        >
          <Plus className="h-3 w-3" /> Add point
        </button>
      </div>
      {error && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}

function Dropzone({
  value,
  kind,
  onChange,
}: {
  value: string;
  kind: "image" | "video";
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onFile = async (file: File) => {
    const limit = UPLOAD_LIMITS[kind];
    if (file.size > limit.bytes) {
      setUploadError(uploadLimitError(kind));
      return;
    }
    const dataUrl = await readFileAsDataUrl(file);
    setUploading(true);
    setUploadError(null);
    try {
      const res = await uploadMedia({
        data: {
          name: file.name,
          kind,
          mime: file.type,
          dataBase64: dataUrlToBase64(dataUrl),
        },
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

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={kind === "image" ? "image/*" : "video/*"}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void onFile(file);
        }}
      />
      {value ? (
        <div className="relative overflow-hidden rounded-xl ring-1 ring-border">
          {kind === "image" ? (
            <img src={value} alt="Cover" className="h-40 w-full object-cover" />
          ) : (
            <video src={value} controls className="h-40 w-full bg-black object-contain" />
          )}
          <div className="absolute right-2 top-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-full glass px-3 py-1 text-[11px] font-semibold ring-1 ring-border transition hover:text-primary"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-full glass px-3 py-1 text-[11px] font-semibold ring-1 ring-border transition hover:text-destructive"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-black/10 px-4 py-8 text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:cursor-wait disabled:opacity-60"
        >
          {kind === "image" ? <ImagePlus className="h-6 w-6" /> : <Upload className="h-6 w-6" />}
          <span className="text-xs font-medium">
            {uploading
              ? "Uploading…"
              : `Click to upload ${kind === "image" ? "an image" : "a video"}`}
          </span>
        </button>
      )}
      {uploadError && (
        <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive">
          <AlertCircle className="h-3 w-3" /> {uploadError}
        </p>
      )}
    </div>
  );
}

function MediaStrip({ urls, onSelect }: { urls: string[]; onSelect: (url: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {urls.slice(0, 12).map((url) => (
        <button
          key={url}
          type="button"
          onClick={() => onSelect(url)}
          className="h-12 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-border transition hover:ring-primary/60 hover:brightness-110"
        >
          <img src={url} alt="" className="h-full w-full object-cover" />
        </button>
      ))}
    </div>
  );
}
