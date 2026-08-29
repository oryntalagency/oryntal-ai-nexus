import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as deletePackage, u as updatePackage, c as createPackage, l as listPackages } from "./packages-CB2TG17V.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-tCTvTz3m.mjs";
import { P as PageHeader } from "./admin-ui-vkuwaPr_.mjs";
import "../_libs/seroval.mjs";
import { _ as Plus, s as Layers, r as Briefcase, R as Rocket, $ as Pencil, a0 as Trash2, g as Bot, j as CodeXml, c as Sparkles, t as LifeBuoy, D as Database, U as Users } from "../_libs/lucide-react.mjs";
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
const TIER_OPTIONS = [{
  value: "layers",
  label: "Layers",
  icon: Layers
}, {
  value: "briefcase",
  label: "Briefcase",
  icon: Briefcase
}, {
  value: "rocket",
  label: "Rocket",
  icon: Rocket
}];
const ITEM_ICON_OPTIONS = [{
  value: "workflow",
  label: "Workflow",
  icon: Bot
}, {
  value: "dev",
  label: "Development",
  icon: CodeXml
}, {
  value: "fine",
  label: "Fine-tuning",
  icon: Sparkles
}, {
  value: "support",
  label: "Support",
  icon: LifeBuoy
}, {
  value: "data",
  label: "Data",
  icon: Database
}, {
  value: "squad",
  label: "Squad",
  icon: Users
}];
function emptyPkg() {
  return {
    id: "pkg-" + String(Date.now()),
    name: "",
    tierIcon: "briefcase",
    tagline: "",
    positioning: "",
    items: [],
    cta: "Talk to us",
    featured: false
  };
}
function PackagesPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [deletingId, setDeletingId] = reactExports.useState(null);
  const {
    data
  } = useQuery({
    queryKey: ["packages", "all"],
    queryFn: () => listPackages()
  });
  const packages = data?.ok ? data.items : [];
  const invalidate = () => queryClient.invalidateQueries({
    queryKey: ["packages"]
  });
  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p) => {
    setEditing(structuredClone(p));
    setOpen(true);
  };
  const savePackage = async (p) => {
    if (editing) {
      const res2 = await updatePackage({
        data: {
          id: p.id,
          name: p.name,
          tierIcon: p.tierIcon,
          tagline: p.tagline,
          positioning: p.positioning,
          items: p.items,
          cta: p.cta,
          featured: p.featured ?? false
        }
      });
      if (res2.ok) await invalidate();
      return res2.ok;
    }
    const res = await createPackage({
      data: {
        name: p.name,
        tierIcon: p.tierIcon,
        tagline: p.tagline,
        positioning: p.positioning,
        items: p.items,
        cta: p.cta,
        featured: p.featured ?? false
      }
    });
    if (res.ok) await invalidate();
    return res.ok;
  };
  const confirmDelete = async (id) => {
    if (deletingId !== id) {
      setDeletingId(id);
      return;
    }
    const res = await deletePackage({
      data: {
        id
      }
    });
    if (res.ok) await invalidate();
    setDeletingId(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { kicker: "Packages", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Engagement" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "tiers" })
    ] }), description: "Managed delivery tiers for buying AI work. No pricing in the form — good doesn't need a price tag.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "rounded-full shadow-gold-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Add tier"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-hidden rounded-2xl ring-1 ring-border bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border", children: [
      packages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-5 py-10 text-center text-sm text-muted-foreground", children: "No tiers yet." }),
      packages.map((p) => {
        const deleting = deletingId === p.id;
        const TierIcon = TIER_OPTIONS.find((t) => t.value === p.tierIcon)?.icon ?? Briefcase;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierIcon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: p.name }),
              p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary ring-1 ring-primary/30", children: "Most asked for" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: [
              p.tagline,
              " — ",
              p.items.length,
              " items"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => openEdit(p), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": "Edit tier", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: deleting ? "destructive" : "outline", size: "sm", onClick: () => confirmDelete(p.id), className: "h-10 w-10 rounded-full px-0 sm:h-8 sm:w-auto sm:px-2.5", "aria-label": deleting ? "Confirm delete" : "Delete", children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold", children: "Sure?" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }, p.id);
      })
    ] }) }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: true, onOpenChange: (o) => !o && setOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-2rem)] max-w-none overflow-y-auto sm:max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit tier" : "New tier" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PkgForm, { initial: editing ?? emptyPkg(), onClose: () => setOpen(false), onSave: savePackage, isEdit: !!editing })
    ] }) })
  ] });
}
function PkgForm({
  initial,
  onClose,
  onSave,
  isEdit
}) {
  const [f, setF] = reactExports.useState(initial);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const set = (key, value) => setF((prev) => ({
    ...prev,
    [key]: value
  }));
  const setItem = (i, patch) => {
    setF((prev) => {
      const items = prev.items.map((it, j) => j === i ? {
        ...it,
        ...patch
      } : it);
      return {
        ...prev,
        items
      };
    });
  };
  const valid = f.name.trim().length > 0 && f.items.some((it) => it.label.trim());
  const submit = async () => {
    if (!valid) return;
    const cleaned = {
      ...f,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      positioning: f.positioning.trim(),
      items: f.items.filter((it) => it.label.trim()).map((it) => ({
        icon: it.icon,
        label: it.label.trim()
      }))
    };
    setSaving(true);
    setError(null);
    const ok = await onSave(cleaned);
    setSaving(false);
    if (ok) {
      onClose();
    } else {
      setError("Could not save the tier. Check the name is unique.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Tier name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.name, onChange: (e) => set("name", e.target.value), placeholder: "e.g. Foundation", className: "mt-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "One-line positioning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.tagline, onChange: (e) => set("tagline", e.target.value), placeholder: "Best for: getting started", className: "mt-1.5" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Positioning detail" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: f.positioning, onChange: (e) => set("positioning", e.target.value), placeholder: "For teams that want a working system fast", className: "mt-1.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Tier icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 grid grid-cols-3 gap-2", children: TIER_OPTIONS.map(({
        value,
        label,
        icon: Icon
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => set("tierIcon", value), className: `flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold ring-1 transition ${f.tierIcon === value ? "bg-primary/15 text-primary ring-primary/40" : "glass text-muted-foreground ring-border hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        " ",
        label
      ] }, value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Managed items" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
          f.items.filter((i) => i.label.trim()).length,
          " items"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-2", children: [
        f.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: item.icon, onChange: (e) => setItem(i, {
            icon: e.target.value
          }), className: "h-10 min-w-0 flex-1 rounded-lg glass px-3 text-xs ring-1 ring-border outline-none transition focus:ring-primary/50", children: ITEM_ICON_OPTIONS.map(({
            value,
            label
          }) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: label }, value)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: item.label, onChange: (e) => setItem(i, {
            label: e.target.value
          }), placeholder: "e.g. AI Workflow Automation", className: "h-10 min-w-0 flex-[2] text-xs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setF((p) => ({
            ...p,
            items: p.items.filter((_, j) => j !== i)
          })), className: "shrink-0 rounded-md p-2.5 text-muted-foreground transition hover:text-destructive", "aria-label": "Remove item", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
        ] }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setF((p) => ({
          ...p,
          items: [...p.items, {
            icon: "workflow",
            label: ""
          }]
        })), className: "inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
          " Add item"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { id: "pkg-featured", checked: f.featured ?? false, onCheckedChange: (v) => set("featured", v) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "pkg-featured", className: "text-sm", children: "Mark as “Most asked for”" })
    ] }),
    !valid && f.name.trim() === "" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "A tier name is required." }),
    f.name.trim() !== "" && !f.items.some((it) => it.label.trim()) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Add at least one managed item." }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: onClose, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: !valid || saving, className: "rounded-full", children: saving ? "Saving…" : "Save tier" })
    ] })
  ] });
}
export {
  PackagesPage as component
};
