import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Cpu,
  Package,
  BookOpen,
  Plus,
  Trash2,
  Boxes,
  Download,
  ShieldCheck,
  Layers,
  Briefcase,
  Rocket,
} from "lucide-react";
import {
  listings as seedListings,
  packages as seedPackages,
  blogs as seedBlogs,
  PROBLEMS,
  OFFERING_META,
} from "@/lib/mockData";
import type { Listing, AIPackage, Blog, OfferingType } from "@/lib/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Oryntal AI Labs" },
      { name: "description", content: "Oryntal AI Labs publisher panel." },
    ],
  }),
  component: Admin,
});

type Section = "overview" | "listings" | "packages" | "community";

const TIER_ICONS = { layers: Layers, briefcase: Briefcase, rocket: Rocket };

const GRADIENTS = [
  "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
  "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]",
  "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
  "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
  "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
  "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]",
];

const PROBLEM_OPTIONS = PROBLEMS.filter((p) => p !== "All");

const EMPTY_FORM = {
  title: "",
  creator: "Oryntal AI Labs",
  tagline: "",
  offeringType: "saas" as OfferingType,
  price: "Free" as "Free" | "Premium",
  height: "300",
  glyph: "◉",
  gradient: GRADIENTS[0],
  problems: [] as string[],
};

function Admin() {
  const [section, setSection] = useState<Section>("overview");
  const [listings, setListings] = useState<Listing[]>(seedListings);
  const [pkglist, setPkglist] = useState<AIPackage[]>(seedPackages);
  const [bloglist, setBloglist] = useState<Blog[]>(seedBlogs);
  const [published, setPublished] = useState<Record<string, boolean>>(() =>
    Object.fromEntries([...seedListings, ...seedPackages, ...seedBlogs].map((x) => [x.id, true])),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM, problems: [...EMPTY_FORM.problems] });

  const publishedCount = Object.values(published).filter(Boolean).length;

  const togglePublished = (id: string) => setPublished((p) => ({ ...p, [id]: !p[id] }));

  const removeListing = (id: string) => {
    setListings((list) => list.filter((l) => l.id !== id));
    setPublished((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
  };

  const submitListing = () => {
    if (!form.title.trim() || !form.tagline.trim()) return;
    const listing: Listing = {
      id: `m-${Math.random().toString(36).slice(2)}`,
      title: form.title.trim(),
      tagline: form.tagline.trim(),
      creator: form.creator.trim(),
      offeringType: form.offeringType,
      problems: form.problems,
      industries: [],
      techs: [],
      problemPoints: [],
      advantagePoints: [],
      image: "",
      price: form.price,
      gradient: form.gradient,
      glyph: form.glyph.trim() || "◉",
      height: Number(form.height) || 300,
    };
    setListings((list) => [listing, ...list]);
    setPublished((p) => ({ ...p, [listing.id]: true }));
    setDialogOpen(false);
    setForm({ ...EMPTY_FORM, problems: [...EMPTY_FORM.problems] });
  };

  const toggleProblemForm = (p: string) =>
    setForm((f) => ({
      ...f,
      problems: f.problems.includes(p) ? f.problems.filter((x) => x !== p) : [...f.problems, p],
    }));

  const tabs: { key: Section; label: string; icon: typeof Cpu }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "listings", label: "Listings", icon: Cpu },
    { key: "packages", label: "Packages", icon: Package },
    { key: "community", label: "Community", icon: BookOpen },
  ];

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Publisher panel · private
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Admin</span>{" "}
            <span className="text-gold-gradient">Panel</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You publish the listings here. The public catalog only reflects what you mark live.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="self-start md:self-auto h-11 rounded-full px-5 text-sm font-semibold shadow-gold-glow"
        >
          <Plus className="h-4 w-4" /> Publish a listing
        </Button>
      </div>

      {/* Tabs */}
      <div className="mt-8 inline-flex flex-wrap rounded-full glass p-1 ring-1 ring-border">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setSection(key)}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition ${
              section === key
                ? "bg-primary text-primary-foreground shadow-gold-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {section === "overview" && (
          <Overview
            listings={listings}
            packages={pkglist}
            blogs={bloglist}
            published={published}
            publishedCount={publishedCount}
          />
        )}
        {section === "listings" && (
          <ListingsManager
            listings={listings}
            published={published}
            onToggle={togglePublished}
            onRemove={removeListing}
            onPublish={() => setDialogOpen(true)}
          />
        )}
        {section === "packages" && (
          <PackagesManager packages={pkglist} published={published} onToggle={togglePublished} />
        )}
        {section === "community" && (
          <CommunityManager blogs={bloglist} published={published} onToggle={togglePublished} />
        )}
      </div>

      {/* Publish listing dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish a listing</DialogTitle>
            <p className="text-sm text-muted-foreground">
              New listings default to live. Toggle them off anytime below.
            </p>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="l-title">Title</Label>
              <Input
                id="l-title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="LeadPilot"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="l-tagline">One-line hook</Label>
                <Input
                  id="l-tagline"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="Qualify, enrich, and route leads."
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="l-creator">Brand / creator</Label>
                <Input
                  id="l-creator"
                  value={form.creator}
                  onChange={(e) => setForm({ ...form, creator: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Offering type</Label>
              <div className="inline-flex flex-wrap rounded-full glass p-1 ring-1 ring-border">
                {(["saas", "automation", "model"] as OfferingType[]).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setForm({ ...form, offeringType: o })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                      form.offeringType === o
                        ? "bg-primary text-primary-foreground shadow-gold-glow"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {OFFERING_META[o].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Problem solved</Label>
              <div className="flex flex-wrap gap-1.5">
                {PROBLEM_OPTIONS.map((p) => {
                  const on = form.problems.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => toggleProblemForm(p)}
                      className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition ${
                        on
                          ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                          : "glass text-muted-foreground ring-border hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Price</Label>
                <div className="inline-flex rounded-full glass p-1 ring-1 ring-border">
                  {(["Free", "Premium"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, price: p })}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                        form.price === p
                          ? "bg-primary text-primary-foreground shadow-gold-glow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="l-height">Card height (px)</Label>
                <Input
                  id="l-height"
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="l-glyph">Glyph</Label>
                <Input
                  id="l-glyph"
                  value={form.glyph}
                  onChange={(e) => setForm({ ...form, glyph: e.target.value })}
                  placeholder="◉"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Art gradient</Label>
              <div className="flex flex-wrap gap-2">
                {GRADIENTS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, gradient: g })}
                    className={`h-8 w-8 rounded-lg bg-gradient-to-br ${g} ring-2 transition ${
                      form.gradient === g
                        ? "ring-primary"
                        : "ring-transparent hover:ring-primary/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button
              onClick={submitListing}
              disabled={!form.title.trim() || !form.tagline.trim()}
              className="rounded-full shadow-gold-glow"
            >
              <Plus className="h-4 w-4" /> Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <p className="mt-10 text-center text-[11px] text-muted-foreground">
        Changes in this panel apply to the current session. Production sync arrives with the data
        layer.
      </p>
    </div>
  );
}

function Overview({
  listings,
  packages,
  blogs,
  published,
  publishedCount,
}: {
  listings: Listing[];
  packages: AIPackage[];
  blogs: Blog[];
  published: Record<string, boolean>;
  publishedCount: number;
}) {
  const stats = [
    { icon: Boxes, label: "Live listings", value: listings.filter((l) => published[l.id]).length },
    { icon: Package, label: "Packages", value: packages.filter((p) => published[p.id]).length },
    { icon: BookOpen, label: "Posts", value: blogs.filter((b) => published[b.id]).length },
    { icon: Download, label: "Total live", value: publishedCount },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl glass p-5 ring-1 ring-border">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <div className="mt-4 font-display text-3xl font-semibold">{value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl glass p-6 ring-1 ring-border">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recently published</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Cpu className="h-3.5 w-3.5" /> {listings.length} total listings
          </span>
        </div>
        <div className="mt-4 divide-y divide-border">
          {listings.slice(0, 5).map((l) => (
            <div key={l.id} className="flex items-center gap-3 py-3">
              <div
                className={`h-9 w-9 shrink-0 overflow-hidden rounded-lg ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`}
              >
                {l.image ? (
                  <img src={l.image} alt="" className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{l.title}</p>
                <p className="truncate text-xs text-muted-foreground">{l.creator}</p>
              </div>
              <MiniTag gold={l.offeringType === "saas"}>
                {OFFERING_META[l.offeringType].label}
              </MiniTag>
              <Sw status={!!published[l.id]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListingsManager({
  listings,
  published,
  onToggle,
  onRemove,
  onPublish,
}: {
  listings: Listing[];
  published: Record<string, boolean>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onPublish: () => void;
}) {
  return (
    <div>
      <SectionHeader
        title="Catalog listings"
        hint={`${listings.length} total`}
        actionLabel="Publish a listing"
        onAction={onPublish}
      />
      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        {listings.map((l, i) => (
          <div
            key={l.id}
            className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div
              className={`h-10 w-10 shrink-0 overflow-hidden rounded-xl ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`}
            >
              {l.image ? <img src={l.image} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{l.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {l.creator} · {OFFERING_META[l.offeringType].label}
              </p>
            </div>
            <div className="hidden sm:flex gap-1.5">
              {l.problems.slice(0, 2).map((p) => (
                <MiniTag key={p}>{p}</MiniTag>
              ))}
              {l.problems.length > 2 && <MiniTag>+{l.problems.length - 2}</MiniTag>}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={published[l.id] ? "text-primary" : ""}>
                  {published[l.id] ? "Live" : "Draft"}
                </span>
                <Switch checked={!!published[l.id]} onCheckedChange={() => onToggle(l.id)} />
              </div>
              <button
                type="button"
                onClick={() => onRemove(l.id)}
                className="text-muted-foreground transition hover:text-destructive"
                aria-label={`Delete ${l.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {listings.length === 0 && <Empty label="No listings yet. Publish your first one." />}
      </div>
    </div>
  );
}

function PackagesManager({
  packages,
  published,
  onToggle,
}: {
  packages: AIPackage[];
  published: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const tierIcons = TIER_ICONS;
  return (
    <div>
      <SectionHeader title="Engagement tiers" hint={`${packages.length} total`} />
      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        {packages.map((p, i) => {
          const TierIcon = tierIcons[p.tierIcon];
          return (
            <div
              key={p.id}
              className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                <TierIcon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {p.tagline} · {p.items.length} managed items
                </p>
              </div>
              <MiniTag gold={!!p.featured}>{p.featured ? "Most asked for" : p.cta}</MiniTag>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={published[p.id] ? "text-primary" : ""}>
                  {published[p.id] ? "Live" : "Draft"}
                </span>
                <Switch checked={!!published[p.id]} onCheckedChange={() => onToggle(p.id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CommunityManager({
  blogs,
  published,
  onToggle,
}: {
  blogs: Blog[];
  published: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <SectionHeader title="Community posts" hint={`${blogs.length} total`} />
      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        {blogs.map((b, i) => (
          <div
            key={b.id}
            className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${b.gradient}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{b.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {b.author} · {b.readTime}
              </p>
            </div>
            <MiniTag gold={b.trending}>{b.trending ? "Trending" : "Post"}</MiniTag>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={published[b.id] ? "text-primary" : ""}>
                {published[b.id] ? "Live" : "Draft"}
              </span>
              <Switch checked={!!published[b.id]} onCheckedChange={() => onToggle(b.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  hint,
  actionLabel,
  onAction,
}: {
  title: string;
  hint: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="h-10 rounded-full text-sm font-semibold shadow-gold-glow"
        >
          <Plus className="h-4 w-4" /> {actionLabel}
        </Button>
      )}
    </div>
  );
}

function Sw({ status }: { status: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${status ? "bg-primary shadow-gold-glow" : "bg-muted"}`}
    />
  );
}

function MiniTag({ children, gold }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${
        gold
          ? "bg-primary/10 text-primary ring-primary/30"
          : "bg-secondary text-muted-foreground ring-border"
      }`}
    >
      {children}
    </span>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="px-5 py-8 text-center text-sm text-muted-foreground">{label}</p>;
}
