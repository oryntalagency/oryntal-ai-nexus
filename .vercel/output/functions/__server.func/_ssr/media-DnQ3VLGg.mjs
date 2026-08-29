import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAdminStore, a as adminActions } from "./adminStore-DL5y1WiF.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { P as PageHeader } from "./admin-ui-vkuwaPr_.mjs";
import { a1 as Image, a2 as Video, n as Check, a3 as Copy, a0 as Trash2 } from "../_libs/lucide-react.mjs";
import "./mockData-CPS7xFcy.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
function MediaPage() {
  const {
    media
  } = useAdminStore();
  const [copiedId, setCopiedId] = reactExports.useState(null);
  const copyUrl = async (asset) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + asset.url);
      setCopiedId(asset.id);
      setTimeout(() => setCopiedId(null), 2e3);
    } catch {
      setCopiedId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { kicker: "Media", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "The" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "library" })
    ] }), description: "Every asset used across products and posts. Copy a URL into a form, or remove what's no longer needed." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4", children: [
      media.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full py-10 text-center text-sm text-muted-foreground", children: "Nothing in the library yet." }),
      media.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition hover:ring-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-black/30", children: [
          m.kind === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.url, alt: m.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: m.url, className: "h-full w-full object-cover", muted: true, playsInline: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute left-2 top-2 inline-flex items-center gap-1 rounded-full glass px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border", children: [
            m.kind === "image" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-3 w-3" }),
            m.kind
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs font-medium", children: m.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-[10px] text-muted-foreground", children: m.size > 0 ? `${Math.round(m.size / 1024)} KB` : "generated asset" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => copyUrl(m), className: "flex-1 h-10 px-2 rounded-full text-[11px] sm:h-8", children: copiedId === m.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-primary" }),
              " Copied"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
              " Copy URL"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => adminActions.deleteMedia(m.id), className: "h-10 w-10 px-0 rounded-full hover:text-destructive sm:h-8 sm:w-8", "aria-label": "Delete asset", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
          ] })
        ] })
      ] }, m.id))
    ] })
  ] });
}
export {
  MediaPage as component
};
