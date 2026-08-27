import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Layers,
  Briefcase,
  Rocket,
  Bot,
  Code2,
  Sparkles,
  LifeBuoy,
  Database,
  Users,
} from "lucide-react";
import { adminActions, useAdminStore } from "@/lib/adminStore";
import type { AIPackage } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/packages")({
  component: PackagesPage,
});

const TIER_OPTIONS = [
  { value: "layers", label: "Layers", icon: Layers },
  { value: "briefcase", label: "Briefcase", icon: Briefcase },
  { value: "rocket", label: "Rocket", icon: Rocket },
] as const;

const ITEM_ICON_OPTIONS = [
  { value: "workflow", label: "Workflow", icon: Bot },
  { value: "dev", label: "Development", icon: Code2 },
  { value: "fine", label: "Fine-tuning", icon: Sparkles },
  { value: "support", label: "Support", icon: LifeBuoy },
  { value: "data", label: "Data", icon: Database },
  { value: "squad", label: "Squad", icon: Users },
] as const;

type ItemRow = { icon: string; label: string };

function emptyPkg(): AIPackage {
  return {
    id: "pkg-" + String(Date.now()),
    name: "",
    tierIcon: "briefcase",
    tagline: "",
    positioning: "",
    items: [],
    cta: "Talk to us",
    featured: false,
  };
}

function PackagesPage() {
  const { packages } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AIPackage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p: AIPackage) => {
    setEditing(structuredClone(p));
    setOpen(true);
  };

  const confirmDelete = (id: string) => {
    if (deletingId === id) {
      adminActions.deletePackage(id);
      setDeletingId(null);
    } else {
      setDeletingId(id);
    }
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Packages"
        title={
          <>
            <span className="text-platinum-gradient">Engagement</span>{" "}
            <span className="text-gold-gradient">tiers</span>
          </>
        }
        description="Managed delivery tiers for buying AI work. No pricing in the form — good doesn't need a price tag."
        actions={
          <Button onClick={openCreate} className="rounded-full shadow-gold-glow">
            <Plus className="h-4 w-4" /> Add tier
          </Button>
        }
      />

      <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        <div className="divide-y divide-border">
          {packages.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No tiers yet.</p>
          )}
          {packages.map((p) => {
            const deleting = deletingId === p.id;
            const TierIcon = TIER_OPTIONS.find((t) => t.value === p.tierIcon)?.icon ?? Briefcase;
            return (
              <div key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <TierIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{p.name}</p>
                    {p.featured && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
                        Most asked for
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {p.tagline} — {p.items.length} items
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(p)}
                    className="h-8 px-2.5 rounded-full"
                    aria-label="Edit tier"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant={deleting ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => confirmDelete(p.id)}
                    className="h-8 px-2.5 rounded-full"
                    aria-label={deleting ? "Confirm delete" : "Delete"}
                  >
                    {deleting ? (
                      <span className="text-[10px] font-semibold">Sure?</span>
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {open && (
        <Dialog open onOpenChange={(o) => !o && setOpen(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit tier" : "New tier"}</DialogTitle>
            </DialogHeader>
            <PkgForm
              initial={editing ?? emptyPkg()}
              onClose={() => setOpen(false)}
              onSave={(p) => {
                adminActions.upsertPackage(p);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function PkgForm({
  initial,
  onClose,
  onSave,
}: {
  initial: AIPackage;
  onClose: () => void;
  onSave: (p: AIPackage) => void;
}) {
  const [f, setF] = useState<AIPackage>(initial);

  const set = <K extends keyof AIPackage>(key: K, value: AIPackage[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  const setItem = (i: number, patch: Partial<ItemRow>) => {
    setF((prev) => {
      const items = prev.items.map((it, j) => (j === i ? { ...it, ...patch } : it));
      return { ...prev, items };
    });
  };

  const valid = f.name.trim().length > 0;

  const submit = () => {
    if (!valid) return;
    onSave({
      ...f,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      positioning: f.positioning.trim(),
      items: f.items
        .filter((it) => it.label.trim())
        .map((it) => ({ icon: it.icon, label: it.label.trim() })),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide">Tier name *</Label>
          <Input
            value={f.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Foundation"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide">
            One-line positioning
          </Label>
          <Input
            value={f.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            placeholder="Best for: getting started"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Positioning detail</Label>
        <Input
          value={f.positioning}
          onChange={(e) => set("positioning", e.target.value)}
          placeholder="For teams that want a working system fast"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Tier icon</Label>
        <div className="mt-1.5 grid grid-cols-3 gap-2">
          {TIER_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => set("tierIcon", value)}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ring-1 transition ${
                f.tierIcon === value
                  ? "bg-primary/15 text-primary ring-primary/40"
                  : "glass text-muted-foreground ring-border hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wide">Managed items</Label>
          <span className="text-[10px] text-muted-foreground">
            {f.items.filter((i) => i.label.trim()).length} items
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {f.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={item.icon}
                onChange={(e) => setItem(i, { icon: e.target.value })}
                className="h-10 flex-1 rounded-lg glass px-3 text-xs ring-1 ring-border outline-none transition focus:ring-primary/50"
              >
                {ITEM_ICON_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <Input
                value={item.label}
                onChange={(e) => setItem(i, { label: e.target.value })}
                placeholder="e.g. AI Workflow Automation"
                className="h-10 flex-[2] text-xs"
              />
              <button
                type="button"
                onClick={() => setF((p) => ({ ...p, items: p.items.filter((_, j) => j !== i) }))}
                className="shrink-0 rounded-md p-2 text-muted-foreground transition hover:text-destructive"
                aria-label="Remove item"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setF((p) => ({ ...p, items: [...p.items, { icon: "workflow", label: "" }] }))
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground"
          >
            <Plus className="h-3 w-3" /> Add item
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="pkg-featured"
          checked={f.featured ?? false}
          onCheckedChange={(v) => set("featured", v)}
        />
        <Label htmlFor="pkg-featured" className="text-sm">
          Mark as “Most asked for”
        </Label>
      </div>

      {!valid && f.name.trim() === "" && (
        <p className="text-xs text-destructive">A tier name is required.</p>
      )}

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit} disabled={!valid} className="rounded-full">
          Save tier
        </Button>
      </div>
    </div>
  );
}
