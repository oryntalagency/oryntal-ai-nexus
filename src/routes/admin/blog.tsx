import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, BookOpen, AlertCircle } from "lucide-react";
import { createBlogPost, deleteBlogPost, listBlogPosts, updateBlogPost } from "@/lib/api/blog";
import { uploadMedia } from "@/lib/api/media";
import { uploadLimitError, UPLOAD_LIMITS } from "@/lib/upload-limits";
import type { Blog } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/blog")({
  component: BlogPage,
});

const GRADIENT_PRESETS = [
  "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
  "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]",
  "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
  "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
  "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
];

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function BlogPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts(),
  });
  const posts = data?.ok ? data.items : [];

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["blog"] });

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p: Blog) => {
    setEditing(structuredClone(p));
    setOpen(true);
  };

  const editMode = editing !== null;

  const savePost = async (post: Blog) => {
    const payload = {
      title: post.title,
      hook: post.hook,
      author: post.author,
      initials: post.initials,
      readTime: post.readTime,
      tags: post.tags,
      likes: post.likes,
      comments: post.comments,
      gradient: post.gradient,
      height: post.height,
      trending: post.trending,
      cover: post.cover,
      body: post.body,
      linkedinUrl: post.linkedinUrl,
      instagramUrl: post.instagramUrl,
    };
    const res = editMode
      ? await updateBlogPost({ data: { ...payload, id: editing!.id } })
      : await createBlogPost({ data: payload });
    if (res.ok) await invalidate();
    return res.ok;
  };

  const confirmDelete = async (id: string) => {
    if (deletingId !== id) {
      setDeletingId(id);
      return;
    }
    const res = await deleteBlogPost({ data: { id } });
    if (res.ok) await invalidate();
    setDeletingId(null);
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Blog"
        title={
          <>
            <span className="text-platinum-gradient">Stories</span>{" "}
            <span className="text-gold-gradient">& notes</span>
          </>
        }
        description="Draft, moderate, and publish field notes. The public blogs page keeps its existing structure."
        actions={
          <Button onClick={openCreate} className="rounded-full shadow-gold-glow">
            <Plus className="h-4 w-4" /> New post
          </Button>
        }
      />

      <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
        <div className="divide-y divide-border">
          {posts.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No posts yet.</p>
          )}
          {posts.map((p) => {
            const deleting = deletingId === p.id;
            return (
              <div key={p.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt=""
                    className="h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border/50"
                  />
                ) : (
                  <div
                    className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-semibold">{p.title}</p>
                    {p.trending && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30">
                        Trending
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    <BookOpen className="mr-1 inline h-3 w-3" />
                    {p.author} · {p.readTime} · {p.tags.slice(0, 3).join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(p)}
                    className="h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5"
                    aria-label="Edit post"
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
              <DialogTitle>{editing ? "Edit post" : "New post"}</DialogTitle>
            </DialogHeader>
            <PostForm initial={editing} onClose={() => setOpen(false)} onSave={savePost} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function PostForm({
  initial,
  onClose,
  onSave,
}: {
  initial: Blog | null;
  onClose: () => void;
  onSave: (post: Blog) => Promise<boolean>;
}) {
  const [f, setF] = useState<Blog>(
    initial ?? {
      id: "blog-" + String(Date.now()),
      title: "",
      hook: "",
      author: "Oryntal AI Labs",
      initials: "OA",
      readTime: "3 min read",
      tags: [],
      likes: 0,
      comments: 0,
      gradient: GRADIENT_PRESETS[0],
      height: 260,
      trending: false,
    },
  );
  const [tagsInput, setTagsInput] = useState(f.tags.join(", "));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const set = <K extends keyof Blog>(key: K, value: Blog[K]) =>
    setF((prev) => ({ ...prev, [key]: value }));

  const onAuthor = (name: string) => {
    const next: Blog = { ...f, author: name, initials: initialsOf(name) || "OA" };
    setF(next);
  };

  const onCoverUpload = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > UPLOAD_LIMITS.image.bytes) {
      setCoverError(uploadLimitError("image"));
      return;
    }
    setCoverLoading(true);
    setCoverError(null);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const res = await uploadMedia({
        data: {
          name: file.name,
          kind: "image",
          mime: file.type,
          dataBase64: dataUrl.split(",")[1] ?? dataUrl,
        },
      });
      if (res.ok) {
        setF((prev) => ({ ...prev, cover: res.url }));
      } else {
        setCoverError(res.error ?? "Upload failed.");
      }
    } catch {
      setCoverError("Upload failed.");
    } finally {
      setCoverLoading(false);
    }
  };

  const valid = f.title.trim().length > 0 && f.hook.trim().length > 0;

  const submit = async () => {
    const next: Record<string, string> = {};
    if (!f.title.trim()) next.title = "Title is required.";
    if (!f.hook.trim()) next.hook = "A one-line hook is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSaving(true);
    setSaveError(null);
    const ok = await onSave({
      ...f,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
    setSaving(false);
    if (ok) {
      onClose();
    } else {
      setSaveError("Could not save the post.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Title *</Label>
        {errors.title && <span className="ml-2 text-[11px] text-destructive">{errors.title}</span>}
        <Input
          value={f.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Why we stopped selling dashboards"
          className="mt-1.5"
        />
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">One-line hook *</Label>
        {errors.hook && <span className="ml-2 text-[11px] text-destructive">{errors.hook}</span>}
        <Textarea
          value={f.hook}
          onChange={(e) => set("hook", e.target.value)}
          rows={2}
          placeholder="The line under the title on the card…"
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide">Author</Label>
          <Input value={f.author} onChange={(e) => onAuthor(e.target.value)} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase tracking-wide">Read time</Label>
          <Input
            value={f.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="3 min read"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Tags</Label>
        <Input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="agents, learning, build-log (comma separated)"
          className="mt-1.5"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <Switch
            id="post-trending"
            checked={f.trending}
            onCheckedChange={(v) => set("trending", v)}
          />
          <Label htmlFor="post-trending" className="text-sm">
            Mark as trending
          </Label>
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Cover image</Label>
        <div className="mt-1.5 space-y-2">
          <div className="relative overflow-hidden rounded-xl ring-1 ring-border">
            {f.cover ? (
              <img src={f.cover} alt="Cover" className="h-40 w-full object-cover" />
            ) : (
              <div
                className={`flex h-40 w-full items-center justify-center bg-gradient-to-br ${f.gradient}`}
              >
                <span className="font-display text-5xl text-white/40">{f.initials}</span>
              </div>
            )}
            {coverLoading && (
              <div className="absolute inset-0 grid place-items-center bg-black/40 text-xs text-muted-foreground">
                Uploading…
              </div>
            )}
          </div>
          {coverError && (
            <p className="flex items-center gap-1 text-[11px] text-destructive">
              <AlertCircle className="h-3 w-3" /> {coverError}
            </p>
          )}
          <div className="flex gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground">
              <Plus className="h-3 w-3" /> {f.cover ? "Replace" : "Upload"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onCoverUpload(e.target.files?.[0])}
              />
            </label>
            {f.cover && (
              <button
                type="button"
                onClick={() => set("cover", undefined)}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" /> Remove
              </button>
            )}
          </div>
          {!f.cover && (
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <AlertCircle className="h-3 w-3" /> No cover — the gradient tile will be used on the
              public page.
            </p>
          )}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">
          Gradient (shown without a cover)
        </Label>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {GRADIENT_PRESETS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => set("gradient", g)}
              className={`h-10 w-16 rounded-lg bg-gradient-to-br ${g} ring-2 transition ${
                f.gradient === g ? "ring-primary" : "ring-transparent hover:ring-border"
              }`}
              aria-label="Choose gradient"
            />
          ))}
        </div>
      </div>

      <div>
        <Label className="text-xs font-semibold uppercase tracking-wide">Body (markdown)</Label>
        <Textarea
          value={f.body ?? ""}
          onChange={(e) => set("body", e.target.value)}
          rows={8}
          placeholder={"## Notes\n\nWrite the full post in markdown…"}
          className="mt-1.5 font-mono text-xs"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit} disabled={!valid || saving} className="rounded-full">
          {saving ? "Saving…" : "Save post"}
        </Button>
      </div>
      {saveError && (
        <p className="flex items-center gap-1 text-[11px] text-destructive">
          <AlertCircle className="h-3 w-3" /> {saveError}
        </p>
      )}
      <p className="text-[11px] text-muted-foreground">
        Posts are saved to the database and publish to the public blogs page immediately.
      </p>
    </div>
  );
}
