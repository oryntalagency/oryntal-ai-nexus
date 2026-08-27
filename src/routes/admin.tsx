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
  Zap,
  Download,
  ShieldCheck,
} from "lucide-react";
import {
  models as seedModels,
  packages as seedPackages,
  blogs as seedBlogs,
  categories,
} from "@/lib/mockData";
import type { ModelCard, AIPackage, Blog } from "@/lib/mockData";
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

type Section = "overview" | "models" | "packages" | "community";

const GRADIENTS = [
  "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
  "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]",
  "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
  "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
  "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
  "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]",
];

const EMPTY_FORM = {
  title: "",
  creator: "",
  category: "LLMs",
  latency: "<40ms",
  size: "7B",
  price: "Free" as "Free" | "Premium",
  height: "280",
  glyph: "◉",
  gradient: GRADIENTS[0],
};

function Admin() {
  const [section, setSection] = useState<Section>("overview");
  const [modellist, setModellist] = useState<ModelCard[]>(seedModels);
  const [pkglist, setPkglist] = useState<AIPackage[]>(seedPackages);
  const [bloglist, setBloglist] = useState<Blog[]>(seedBlogs);
  const [published, setPublished] = useState<Record<string, boolean>>(() =>
    Object.fromEntries([...seedModels, ...seedPackages, ...seedBlogs].map((x) => [x.id, true])),
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });

  const publishedCount = Object.values(published).filter(Boolean).length;

  const togglePublished = (id: string) => setPublished((p) => ({ ...p, [id]: !p[id] }));

  const removeModel = (id: string) => {
    setModellist((list) => list.filter((m) => m.id !== id));
    setPublished((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
  };

  const submitModel = () => {
    if (!form.title.trim() || !form.creator.trim()) return;
    const model: ModelCard = {
      id: `m-${Math.random().toString(36).slice(2)}`,
      title: form.title.trim(),
      creator: form.creator.trim().startsWith("@")
        ? form.creator.trim()
        : `@${form.creator.trim()}`,
      category: form.category,
      latency: form.latency,
      size: form.size,
      price: form.price,
      height: Number(form.height) || 280,
      glyph: form.glyph.trim() || "◉",
      gradient: form.gradient,
    };
    setModellist((list) => [model, ...list]);
    setPublished((p) => ({ ...p, [model.id]: true }));
    setDialogOpen(false);
    setForm({ ...EMPTY_FORM });
  };

  const tabs: { key: Section; label: string; icon: typeof Cpu }[] = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "models", label: "Models", icon: Cpu },
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
            You publish the listings here. The public marketplace only reflects what you mark live.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="self-start md:self-auto h-11 rounded-full px-5 text-sm font-semibold shadow-gold-glow"
        >
          <Plus className="h-4 w-4" /> Publish a model
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
            models={modellist}
            packages={pkglist}
            blogs={bloglist}
            published={published}
            publishedCount={publishedCount}
          />
        )}
        {section === "models" && (
          <ModelsManager
            models={modellist}
            published={published}
            onToggle={togglePublished}
            onRemove={removeModel}
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

      {/* Publish model dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish a model</DialogTitle>
            <p className="text-sm text-muted-foreground">
              New listings default to live. Toggle them off anytime below.
            </p>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="m-title">Title</Label>
                <Input
                  id="m-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Oryntal-Reason-70B"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-creator">Creator</Label>
                <Input
                  id="m-creator"
                  value={form.creator}
                  onChange={(e) => setForm({ ...form, creator: e.target.value })}
                  placeholder="@oryntal"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="m-category">Category</Label>
                <select
                  id="m-category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {categories
                    .filter((c) => c !== "All")
                    .map((c) => (
                      <option key={c} value={c} className="bg-popover">
                        {c}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-latency">Latency</Label>
                <Input
                  id="m-latency"
                  value={form.latency}
                  onChange={(e) => setForm({ ...form, latency: e.target.value })}
                  placeholder="<40ms"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-size">Size</Label>
                <Input
                  id="m-size"
                  value={form.size}
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  placeholder="7B"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="m-height">Card height (px)</Label>
                <Input
                  id="m-height"
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="m-glyph">Glyph</Label>
                <Input
                  id="m-glyph"
                  value={form.glyph}
                  onChange={(e) => setForm({ ...form, glyph: e.target.value })}
                  placeholder="◉"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Price</Label>
              <div className="inline-flex rounded-full glass p-1 ring-1 ring-border">
                {(["Free", "Premium"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setForm({ ...form, price: p })}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
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
              onClick={submitModel}
              disabled={!form.title.trim() || !form.creator.trim()}
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
  models,
  packages,
  blogs,
  published,
  publishedCount,
}: {
  models: ModelCard[];
  packages: AIPackage[];
  blogs: Blog[];
  published: Record<string, boolean>;
  publishedCount: number;
}) {
  const stats = [
    { icon: Cpu, label: "Models", value: models.filter((m) => published[m.id]).length },
    { icon: Package, label: "Packages", value: packages.filter((p) => published[p.id]).length },
    { icon: BookOpen, label: "Posts", value: blogs.filter((b) => published[b.id]).length },
    { icon: Download, label: "Live listings", value: publishedCount },
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
            <Boxes className="h-3.5 w-3.5" /> {models.length} total models
          </span>
        </div>
        <div className="mt-4 divide-y divide-border">
          {models.slice(0, 5).map((m) => (
            <div key={m.id} className="flex items-center gap-3 py-3">
              <div className={`h-9 w-9 shrink-0 rounded-lg bg-gradient-to-br ${m.gradient}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.title}</p>
                <p className="truncate text-xs text-muted-foreground">{m.creator}</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium ring-1 ring-border">
                <Zap className="h-3 w-3" /> {m.latency}
              </span>
              <Sw status={!!published[m.id]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ModelsManager({
  models,
  published,
  onToggle,
  onRemove,
  onPublish,
}: {
  models: ModelCard[];
  published: Record<string, boolean>;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onPublish: () => void;
}) {
  return (
    <div>
      <SectionHeader
        title="Model listings"
        hint={`${models.length} total`}
        actionLabel="Publish a model"
        onAction={onPublish}
      />
      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        {models.map((m, i) => (
          <div
            key={m.id}
            className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${m.gradient}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{m.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {m.creator} · {m.category}
              </p>
            </div>
            <div className="hidden sm:flex gap-1.5">
              <MiniTag>{m.latency}</MiniTag>
              <MiniTag>{m.size}</MiniTag>
              <MiniTag gold={m.price === "Premium"}>{m.price}</MiniTag>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={published[m.id] ? "text-primary" : ""}>
                  {published[m.id] ? "Live" : "Draft"}
                </span>
                <Switch checked={!!published[m.id]} onCheckedChange={() => onToggle(m.id)} />
              </div>
              <button
                type="button"
                onClick={() => onRemove(m.id)}
                className="text-muted-foreground transition hover:text-destructive"
                aria-label={`Delete ${m.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {models.length === 0 && <Empty label="No models yet. Publish your first one." />}
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
  return (
    <div>
      <SectionHeader title="Package listings" hint={`${packages.length} total`} />
      <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        {packages.map((p, i) => (
          <div
            key={p.id}
            className={`flex flex-wrap items-center gap-3 px-5 py-4 ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}>
              <div className="grid h-full w-full place-items-center">
                <span className="text-platinum-gradient font-display text-lg leading-none opacity-60">
                  {p.glyph}
                </span>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {p.tagline} · {p.price}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={published[p.id] ? "text-primary" : ""}>
                {published[p.id] ? "Live" : "Draft"}
              </span>
              <Switch checked={!!published[p.id]} onCheckedChange={() => onToggle(p.id)} />
            </div>
          </div>
        ))}
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
