import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listProducts } from "./products-DszPI45d.mjs";
import { l as listBlogPosts } from "./blog-v7oFkFpO.mjs";
import { O as OFFERING_META } from "./mockData-CPS7xFcy.mjs";
import { P as PageHeader, S as StatCard, a as StatusBadge } from "./admin-ui-vkuwaPr_.mjs";
import "../_libs/seroval.mjs";
import { f as Boxes, W as Workflow, C as Cpu, B as BookOpen } from "../_libs/lucide-react.mjs";
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
function Dashboard() {
  const {
    data: productData
  } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => listProducts({
      data: {}
    })
  });
  const listings = productData?.ok ? productData.items : [];
  const {
    data: blogData
  } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts()
  });
  const posts = blogData?.ok ? blogData.items : [];
  const counts = {
    saas: listings.filter((l) => l.offeringType === "saas").length,
    automation: listings.filter((l) => l.offeringType === "automation").length,
    model: listings.filter((l) => l.offeringType === "model").length,
    total: listings.length
  };
  const recent = listings.slice(0, 5);
  const recentPosts = posts.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { kicker: "Dashboard", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Pulse" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "of the catalog" })
    ] }), description: "A quiet look at what's live — no clutter, no quick actions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4", children: [
      [["saas", "SaaS Products", Boxes], ["automation", "AI Automations", Workflow], ["model", "AI Models & Agents", Cpu]].map(([key, label, Icon]) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }), label, value: counts[key] }, key)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-4 w-4" }), label: "Total listings", value: counts.total })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl ring-1 ring-border bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Recent listings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Last ",
            recent.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recent.map((l) => {
          const Meta = OFFERING_META[l.offeringType];
          const status = l.status ?? "live";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-5 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/50 ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`, children: l.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: "", className: "h-full w-full object-cover" }) : null }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: l.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: l.creator })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium ring-1 ring-border text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Meta.icon, { className: "h-3 w-3 text-primary" }),
              " ",
              Meta.label
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status })
          ] }, l.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl ring-1 ring-border bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Recent blog posts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Last ",
            recentPosts.length
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentPosts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-5 py-4", children: [
          p.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover, alt: "", className: "h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-border/50" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "mr-1 inline h-3 w-3" }),
              p.author,
              " · ",
              p.readTime
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${p.trending ? "bg-primary/10 text-primary ring-primary/30" : "bg-secondary text-muted-foreground ring-border"}`, children: p.trending ? "Trending" : "Post" })
        ] }, p.id)) })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
