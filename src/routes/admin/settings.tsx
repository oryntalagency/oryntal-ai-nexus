import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Save,
  LogOut,
  ArrowLeft,
  Building2,
  Tag,
  Tags,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  Check,
} from "lucide-react";
import { adminLogout } from "@/lib/api/admin";
import {
  createTag as createTagApi,
  deleteTag as deleteTagApi,
  listTags,
  updateTag as updateTagApi,
} from "@/lib/api/tags";
import type { TagFacet } from "@/lib/api/tags";
import { listProducts } from "@/lib/api/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

const IDENTITY_KEY = "oryntal_identity";

function loadIdentity() {
  if (typeof window === "undefined")
    return { name: "Oryntal AI Labs", tagline: "We build intelligent systems." };
  try {
    const raw = window.localStorage.getItem(IDENTITY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { name: "Oryntal AI Labs", tagline: "We build intelligent systems." };
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function SettingsPage() {
  const identity = loadIdentity();
  const [name, setName] = useState(identity.name);
  const [tagline, setTagline] = useState(identity.tagline);
  const [saved, setSaved] = useState(false);

  const logout = useMutation({
    mutationFn: () => adminLogout(),
    onSuccess: () => {
      window.location.href = "/admin";
    },
  });

  const save = () => {
    window.localStorage.setItem(
      IDENTITY_KEY,
      JSON.stringify({ name: name.trim(), tagline: tagline.trim() }),
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const signOut = () => {
    logout.mutate();
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1000px] mx-auto">
      <PageHeader
        kicker="Settings"
        title={
          <>
            <span className="text-platinum-gradient">Lab</span>{" "}
            <span className="text-gold-gradient">preferences</span>
          </>
        }
        description="Identity copy, the tag taxonomy, and session control."
      />

      <Tabs defaultValue="general" className="mt-8">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="general" className="flex-1 sm:flex-none">
            General
          </TabsTrigger>
          <TabsTrigger value="tags" className="flex-1 sm:flex-none">
            <Tags className="mr-1.5 h-3.5 w-3.5 text-primary" /> Tags
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* Identity */}
          <div className="rounded-2xl glass p-6 ring-1 ring-border">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
              <Building2 className="h-4 w-4 text-primary" /> Identity
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Shown on the public profile and contact pages.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide">Lab name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide">Tagline</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={save} className="rounded-full shadow-gold-glow">
              <Save className="h-4 w-4" /> {saved ? "Saved" : "Save changes"}
            </Button>
            <Button
              variant="outline"
              onClick={signOut}
              disabled={logout.isPending}
              className="rounded-full"
            >
              <LogOut className="h-4 w-4" /> {logout.isPending ? "Signing out…" : "Sign out"}
            </Button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to site
            </Link>
          </div>

          <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Tag className="h-3 w-3" /> Signed-in publisher session, issued by the server. Sign out
            clears the session cookie.
          </p>
        </TabsContent>

        <TabsContent value="tags">
          <TagsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const FACET_OPTIONS: Array<{ value: TagFacet; label: string; heading: string; hint: string }> = [
  {
    value: "problem",
    label: "Problem Solved",
    heading: "Problems solved",
    hint: "The primary facet on the public filter bar.",
  },
  {
    value: "industry",
    label: "Industry",
    heading: "Industries",
    hint: "Secondary facet, available behind “More filters”.",
  },
  {
    value: "tech",
    label: "Tech Stack",
    heading: "Tech stack",
    hint: "Secondary facet, available behind “More filters”.",
  },
];

function TagsSection() {
  const queryClient = useQueryClient();
  const [facet, setFacet] = useState<TagFacet>("problem");
  const [label, setLabel] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [editing, setEditing] = useState<{ slug: string; label: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirming, setConfirming] = useState<string | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);

  const { data: tagData } = useQuery({
    queryKey: ["tags"],
    queryFn: () => listTags({ data: {} }),
  });
  const tags = tagData?.ok ? tagData.items : [];

  const { data: productData } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => listProducts({ data: {} }),
  });
  const usageCounts = useMemo(() => {
    const items = productData?.ok ? productData.items : [];
    const map = new Map<string, number>();
    items.forEach((p) => {
      const arr = facet === "problem" ? p.problems : facet === "industry" ? p.industries : p.techs;
      arr.forEach((l) => map.set(l, (map.get(l) ?? 0) + 1));
    });
    return map;
  }, [productData, facet]);

  const facetTags = tags.filter((t) => t.facet === facet);
  const active = FACET_OPTIONS.find((o) => o.value === facet)!;

  const switchFacet = (next: TagFacet) => {
    setFacet(next);
    setEditing(null);
    setConfirming(null);
    setRowError(null);
    setFormError(null);
  };

  const createTagMutation = useMutation({
    mutationFn: () => createTagApi({ data: { label, facet } }),
    onSuccess: (res) => {
      if (res.ok) {
        setLabel("");
        setFormError(null);
        queryClient.invalidateQueries({ queryKey: ["tags"] });
      } else {
        setFormError(res.error ?? "Could not create the tag.");
      }
    },
  });

  const updateTagMutation = useMutation({
    mutationFn: ({ slug, newLabel }: { slug: string; newLabel: string }) =>
      updateTagApi({ data: { facet, slug, label: newLabel } }),
    onSuccess: (res) => {
      if (res.ok) {
        setEditing(null);
        setEditValue("");
        setRowError(null);
        queryClient.invalidateQueries({ queryKey: ["tags"] });
        queryClient.invalidateQueries({ queryKey: ["products"] });
      } else {
        setRowError(res.error ?? "Could not update the tag.");
      }
    },
  });

  const deleteTagMutation = useMutation({
    mutationFn: ({ slug }: { slug: string }) => deleteTagApi({ data: { facet, slug } }),
    onSuccess: (res) => {
      if (res.ok) {
        setConfirming(null);
        setRowError(null);
        queryClient.invalidateQueries({ queryKey: ["tags"] });
      } else {
        setRowError(res.error ?? "Could not delete the tag.");
      }
    },
  });

  const submitAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setFormError("Type a tag name first.");
      return;
    }
    setFormError(null);
    createTagMutation.mutate();
  };

  const startEdit = (slug: string, currentLabel: string) => {
    setEditing({ slug, label: currentLabel });
    setEditValue(currentLabel);
    setRowError(null);
    setConfirming(null);
  };

  const confirmDelete = (slug: string, tagLabel: string) => {
    const usage = usageCounts.get(tagLabel) ?? 0;
    if (usage > 0) {
      setRowError(
        `“${tagLabel}” is used by ${usage} product${usage === 1 ? "" : "s"} — remove it from those products before deleting.`,
      );
      setConfirming(null);
      return;
    }
    if (confirming === slug) {
      deleteTagMutation.mutate({ slug });
    } else {
      setConfirming(slug);
      setRowError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Facet picker */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Tag facet
        </span>
        <div className="inline-flex max-w-full flex-wrap rounded-full glass p-1 ring-1 ring-border">
          {FACET_OPTIONS.map(({ value, label: fLabel }) => (
            <button
              key={value}
              type="button"
              onClick={() => switchFacet(value)}
              className={`inline-flex min-h-10 items-center rounded-full px-4 py-2 text-xs font-medium transition sm:min-h-0 sm:py-1.5 ${
                facet === value
                  ? "bg-primary text-primary-foreground shadow-gold-glow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {fLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Add form */}
      <div className="rounded-2xl glass p-6 ring-1 ring-border">
        <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
          <Plus className="h-4 w-4 text-primary" /> Add a {active.heading.toLowerCase()} tag
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {active.hint} The slug is generated automatically. Once saved, the tag becomes selectable
          in the product form and appears in the public filters immediately.
        </p>
        <form onSubmit={submitAdd} className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide">Label</Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={`e.g. ${active.value === "problem" ? "Lead Generation" : active.value === "industry" ? "Real Estate" : "Voice AI"}`}
              className="mt-1.5"
            />
            {label.trim() && (
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">/{slugify(label)}</p>
            )}
          </div>
          <div className="flex sm:self-end">
            <Button
              type="submit"
              disabled={createTagMutation.isPending}
              className="min-h-10 w-full rounded-full shadow-gold-glow sm:w-auto"
            >
              {createTagMutation.isPending ? "Adding…" : "Add tag"}
            </Button>
          </div>
        </form>
        {formError && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" /> {formError}
          </p>
        )}
      </div>

      {/* Existing tags */}
      <div className="overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">
            {active.heading}{" "}
            <span className="text-sm text-muted-foreground">({facetTags.length})</span>
          </h2>
        </div>
        {rowError && (
          <p className="flex items-center gap-1.5 border-b border-border px-5 py-3 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" /> {rowError}
          </p>
        )}
        <div className="divide-y divide-border">
          {facetTags.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">
              No {active.heading.toLowerCase()} tags yet — add the first one above.
            </p>
          )}
          {facetTags.map((tag) => {
            const usage = usageCounts.get(tag.label) ?? 0;
            const isEditing = editing?.slug === tag.slug;
            const isConfirming = confirming === tag.slug;
            return (
              <div key={tag.slug} className="flex flex-wrap items-center gap-3 px-5 py-4">
                <div className="min-w-0 flex-1">
                  {isEditing ? (
                    <div className="flex max-w-md items-center gap-2">
                      <Input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="h-9 flex-1 text-sm"
                        autoFocus
                      />
                      <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
                        /{slugify(editValue)}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="truncate text-sm font-semibold">{tag.label}</p>
                      <p className="truncate font-mono text-[11px] text-muted-foreground">
                        /{tag.slug}
                      </p>
                    </>
                  )}
                </div>

                {usage > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground ring-1 ring-border">
                    <Tag className="h-2.5 w-2.5" /> In use · {usage}
                  </span>
                )}
                {isConfirming && (
                  <span className="text-[11px] font-medium text-destructive">Delete this tag?</span>
                )}

                <div className="flex items-center gap-1.5">
                  {isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-full px-2.5"
                        onClick={() => {
                          setEditing(null);
                          setEditValue("");
                          setRowError(null);
                        }}
                      >
                        <X className="h-3.5 w-3.5" /> Cancel
                      </Button>
                      <Button
                        size="sm"
                        disabled={updateTagMutation.isPending}
                        onClick={() => {
                          if (!editValue.trim()) {
                            setRowError("Label can't be empty.");
                            return;
                          }
                          updateTagMutation.mutate({ slug: tag.slug, newLabel: editValue.trim() });
                        }}
                        className="h-8 rounded-full shadow-gold-glow"
                      >
                        <Check className="h-3.5 w-3.5" /> Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(tag.slug, tag.label)}
                        className="h-9 w-9 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
                        aria-label={`Edit ${tag.label}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant={isConfirming ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => confirmDelete(tag.slug, tag.label)}
                        className={`h-9 w-9 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5 ${
                          usage > 0 ? "opacity-50" : ""
                        }`}
                        aria-label={isConfirming ? "Confirm delete" : `Delete ${tag.label}`}
                      >
                        {isConfirming ? (
                          <X className="h-3.5 w-3.5" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
        <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />A tag linked to a product can't be
        deleted — the product form and public filters both read from this list, so removing one
        that's in use would orphan the catalog.
      </p>
    </div>
  );
}
