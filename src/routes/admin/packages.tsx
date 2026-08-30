import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { createPackage, deletePackage, listPackages, updatePackage } from "@/lib/api/packages";
import { NICHE_ICONS, NICHE_ICON_OPTIONS } from "@/lib/mockData";
import type { AIPackage } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/admin-ui";
import { BulletEditor } from "@/components/admin/BulletEditor";

export const Route = createFileRoute("/admin/packages")({
  component: PackagesPage,
});

const MIN_VISION_POINTS = 4;

function emptyPkg(): AIPackage {
  return {
    id: "pkg-" + String(Date.now()),
    name: "",
    tagline: "",
    icon: "shopping-cart",
    vision_points: ["", "", "", ""],
    slug: "",
  };
}

function PackagesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AIPackage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["packages", "all"],
    queryFn: () => listPackages(),
  });
  const packages = data?.ok ? data.items : [];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["packages"] });

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p: AIPackage) => {
    setEditing(structuredClone(p));
    setOpen(true);
  };

  const savePackage = async (p: AIPackage): Promise<{ ok: boolean; error?: string }> => {
    const data = {
      name: p.name,
      tagline: p.tagline,
      icon: p.icon,
      vision_points: p.vision_points,
    };
    const res = editing
      ? await updatePackage({ data: { id: p.id, ...data } })
      : await createPackage({ data });
    if (res.ok) {
      await invalidate();
      return { ok: true as const };
    }
    return { ok: false as const, error: res.error ?? "Could not save the niche." };
  };

  const confirmDelete = async (id: string) => {
    if (deletingId !== id) {
      setDeletingId(id);
      return;
    }
    const res = await deletePackage({ data: { id } });
    if (res.ok) await invalidate();
    setDeletingId(null);
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Packages"
        title={
          <>
            <span className="text-platinum-gradient">Niche</span>{" "}
            <span className="text-gold-gradient">editions</span>
          </>
        }
        description="One package per industry — a vision pitch for what the client's business looks like after working with Oryntal. No pricing, no deliverable checklists."
        actions={
          <Button onClick={openCreate} className="rounded-full shadow-gold-glow">
            <Plus className="h-4 w-4" /> Add niche
          </Button>
        }
      />

      <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        <div className="divide-y divide-border">
          {packages.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No niches yet.</p>
          )}
          {packages.map((p) => {
            const deleting = deletingId === p.id;
            const Icon = NICHE_ICONS[p.icon] ?? Sparkles;
            const filled = p.vision_points.filter((v) => v.trim()).length;
            return (
              <div key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] text-muted-foreground ring-1 ring-border">
                      /{p.slug}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {p.tagline} · {filled} point{filled === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(p)}
                    className="h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
                    aria-label="Edit niche"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant={deleting ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => confirmDelete(p.id)}
                    className="h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
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
          <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-none overflow-y-auto sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit niche" : "New niche"}</DialogTitle>
            </DialogHeader>
            <PkgForm
              initial={editing ?? emptyPkg()}
              onClose={() => setOpen(false)}
              onSave={savePackage}
              isEdit={!!editing}
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
  isEdit,
}: {
  initial: AIPackage;
  onClose: () => void;
  onSave: (p: AIPackage) => Promise<{ ok: boolean; error?: string }>;
  isEdit: boolean;
}) {
  const [f, setF] = useState<AIPackage>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof AIPackage>(key: K, value: AIPackage[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  const filledCount = f.vision_points.filter((v) => v.trim()).length;
  const valid = f.name.trim().length > 0 && filledCount >= MIN_VISION_POINTS;

  const submit = async () => {
    if (!valid) return;
    const cleaned: AIPackage = {
      ...f,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      vision_points: f.vision_points.map((v) => v.trim()).filter(Boolean),
      slug: f.slug,
    };
    setSaving(true);
    setError(null);
    const result = await onSave(cleaned);
    setSaving(false);
    if (result.ok) {
      onClose();
    } else {
      setError(result.error ?? "Could not save the niche.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Niche / industry name *
        </Label>
        <Input
          value={f.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. E-Commerce"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Vision tagline *</Label>
        <Input
          value={f.tagline}
          onChange={(e) => set("tagline", e.target.value)}
          placeholder="e.g. Where Browsers Become Buyers, Automatically"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Icon</Label>
        <div className="mt-1.5 grid max-h-56 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
          {NICHE_ICON_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => set("icon", value)}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-[11px] font-semibold ring-1 transition ${
                f.icon === value
                  ? "bg-primary/15 text-primary ring-primary/40"
                  : "glass text-muted-foreground ring-border hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <BulletEditor
          title={`Vision points (min ${MIN_VISION_POINTS})`}
          items={f.vision_points}
          onChange={(items) => set("vision_points", items)}
          placeholder="e.g. Every visitor gets a tailored route to checkout"
          error={
            f.name.trim() !== "" && filledCount < MIN_VISION_POINTS
              ? `Add at least ${MIN_VISION_POINTS} vision points to describe the outcome.`
              : undefined
          }
        />
      </div>

      {!valid && f.name.trim() === "" && (
        <p className="text-xs text-destructive">A niche name is required.</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit} disabled={!valid || saving} className="rounded-full">
          {saving ? "Saving…" : isEdit ? "Save niche" : "Add niche"}
        </Button>
      </div>
    </div>
  );
}
