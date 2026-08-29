import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as deleteBlogPost, u as updateBlogPost, c as createBlogPost, l as listBlogPosts } from "./blog-v7oFkFpO.mjs";
import { u as uploadMedia } from "./media-7qbO_Ewy.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-tCTvTz3m.mjs";
import { P as PageHeader } from "./admin-ui-vkuwaPr_.mjs";
import "../_libs/seroval.mjs";
import { _ as Plus, B as BookOpen, $ as Pencil, a0 as Trash2, o as CircleAlert } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-jYxGnsDr.mjs";
import "./server-B_dwi7jl.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "node:stream/promises";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
const GRADIENT_PRESETS = ["from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]", "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]", "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]", "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]", "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]"];
function initialsOf(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function BlogPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const {
    data
  } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts()
  });
  const posts = data?.ok ? data.items : [];
  const invalidate = () => queryClient.invalidateQueries({
    queryKey: ["blog"]
  });
  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p) => {
    setEditing(structuredClone(p));
    setOpen(true);
  };
  const editMode = editing !== null;
  const savePost = async (post) => {
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
      instagramUrl: post.instagramUrl
    };
    const res = editMode ? await updateBlogPost({
      data: {
        ...payload,
        id: editing.id
      }
    }) : await createBlogPost({
      data: payload
    });
    if (res.ok) await invalidate();
    return res.ok;
  };
  const confirmDelete = async (id) => {
    if (deletingId !== id) {
      setDeletingId(id);
      return;
    }
    const res = await deleteBlogPost({
      data: {
        id
      }
    });
    if (res.ok) await invalidate();
    setDeletingId(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { kicker: "Blog", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Stories" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "& notes" })
    ] }), description: "Draft, moderate, and publish field notes. The public blogs page keeps its existing structure.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "rounded-full shadow-gold-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " New post"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-hidden rounded-2xl ring-1 ring-border bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
      posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 py-10 text-center text-sm text-muted-foreground", children: "No posts yet." }),
      posts.map((p) => {
        const deleting = deletingId === p.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-5 py-4", children: [
          p.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover, alt: "", className: "h-12 w-12 shrink-0 rounded-xl object-cover ring-1 ring-border/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: p.title }),
              p.trending && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30", children: "Trending" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-1 inline h-3 w-3" }),
              p.author,
              " · ",
              p.readTime,
              " · ",
              p.tags.slice(0, 3).join(", ")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => openEdit(p), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": "Edit post", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: deleting ? "destructive" : "outline", size: "sm", onClick: () => confirmDelete(p.id), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": deleting ? "Confirm delete" : "Delete", children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold", children: "Sure?" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }, p.id);
      })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-2rem)] max-w-none overflow-y-auto sm:max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit post" : "New post" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PostForm, { initial: editing, onClose: () => setOpen(false), onSave: savePost })
    ] }) })
  ] });
}
function PostForm({
  initial,
  onClose,
  onSave
}) {
  const [f, setF] = reactExports.useState(initial ?? {
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
    trending: false
  });
  const [tagsInput, setTagsInput] = reactExports.useState(f.tags.join(", "));
  const [errors, setErrors] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [coverLoading, setCoverLoading] = reactExports.useState(false);
  const [coverError, setCoverError] = reactExports.useState(null);
  const [saveError, setSaveError] = reactExports.useState(null);
  const set = (key, value) => setF((prev) => ({
    ...prev,
    [key]: value
  }));
  const onAuthor = (name) => {
    const next = {
      ...f,
      author: name,
      initials: initialsOf(name) || "OA"
    };
    setF(next);
  };
  const onCoverUpload = async (file) => {
    if (!file) return;
    setCoverLoading(true);
    setCoverError(null);
    try {
      const reader = new FileReader();
      const dataUrl = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const res = await uploadMedia({
        data: {
          name: file.name,
          kind: "image",
          dataBase64: dataUrl.split(",")[1] ?? dataUrl
        }
      });
      if (res.ok) {
        setF((prev) => ({
          ...prev,
          cover: res.url
        }));
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
    const next = {};
    if (!f.title.trim()) next.title = "Title is required.";
    if (!f.hook.trim()) next.hook = "A one-line hook is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSaving(true);
    setSaveError(null);
    const ok = await onSave({
      ...f,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    });
    setSaving(false);
    if (ok) {
      onClose();
    } else {
      setSaveError("Could not save the post.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Title *" }),
      errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[11px] text-destructive", children: errors.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.title, onChange: (e) => set("title", e.target.value), placeholder: "e.g. Why we stopped selling dashboards", className: "mt-1.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "One-line hook *" }),
      errors.hook && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-[11px] text-destructive", children: errors.hook }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: f.hook, onChange: (e) => set("hook", e.target.value), rows: 2, placeholder: "The line under the title on the card…", className: "mt-1.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Author" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.author, onChange: (e) => onAuthor(e.target.value), className: "mt-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Read time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.readTime, onChange: (e) => set("readTime", e.target.value), placeholder: "3 min read", className: "mt-1.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Tags" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tagsInput, onChange: (e) => setTagsInput(e.target.value), placeholder: "agents, learning, build-log (comma separated)", className: "mt-1.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "post-trending", checked: f.trending, onCheckedChange: (v) => set("trending", v) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-trending", className: "text-sm", children: "Mark as trending" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Cover image" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-xl ring-1 ring-border", children: [
          f.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: f.cover, alt: "Cover", className: "h-40 w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-40 w-full items-center justify-center bg-gradient-to-br ${f.gradient}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl text-white/40", children: f.initials }) }),
          coverLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center bg-black/40 text-xs text-muted-foreground", children: "Uploading…" })
        ] }),
        coverError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[11px] text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
          " ",
          coverError
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
            " ",
            f.cover ? "Replace" : "Upload",
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => onCoverUpload(e.target.files?.[0]) })
          ] }),
          f.cover && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("cover", void 0), className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
            " Remove"
          ] })
        ] }),
        !f.cover && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
          " No cover — the gradient tile will be used on the public page."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Gradient (shown without a cover)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-2", children: GRADIENT_PRESETS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => set("gradient", g), className: `h-10 w-16 rounded-lg bg-gradient-to-br ${g} ring-2 transition ${f.gradient === g ? "ring-primary" : "ring-transparent hover:ring-border"}`, "aria-label": "Choose gradient" }, g)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Body (markdown)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: f.body ?? "", onChange: (e) => set("body", e.target.value), rows: 8, placeholder: "## Notes\n\nWrite the full post in markdown…", className: "mt-1.5 font-mono text-xs" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: !valid || saving, className: "rounded-full", children: saving ? "Saving…" : "Save post" })
    ] }),
    saveError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-[11px] text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
      " ",
      saveError
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: "Posts are saved to the database and publish to the public blogs page immediately." })
  ] });
}
export {
  BlogPage as component
};
