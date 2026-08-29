import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { l as listPackages } from "./packages-CB2TG17V.mjs";
import { R as Rocket, r as Briefcase, s as Layers, U as Users, D as Database, t as LifeBuoy, c as Sparkles, j as CodeXml, g as Bot, d as ArrowRight } from "../_libs/lucide-react.mjs";
const TIER_ICONS = {
  layers: Layers,
  briefcase: Briefcase,
  rocket: Rocket
};
const ITEM_ICONS = {
  workflow: Bot,
  dev: CodeXml,
  fine: Sparkles,
  support: LifeBuoy,
  data: Database,
  squad: Users
};
function PackageTierCards() {
  const { data, isPending } = useQuery({
    queryKey: ["packages"],
    queryFn: () => listPackages()
  });
  const packages = data?.ok ? data.items : [];
  if (isPending || packages.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 md:grid-cols-3", children: packages.map((p) => {
    const TierIcon = TIER_ICONS[p.tierIcon];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "article",
      {
        className: "group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:-translate-y-1 supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.99]",
        children: [
          p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-gold-glow", children: "Most asked for" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-7", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-12 w-12 shrink-0 place-items-center rounded-xl glass ring-1 ring-border text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TierIcon, { className: "h-5 w-5", strokeWidth: 1.8 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold", children: p.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-primary", children: p.tagline })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: p.positioning }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-2.5", children: p.items.map((item) => {
              const Icon = ITEM_ICONS[item.icon] ?? Sparkles;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-center gap-2.5 text-sm text-foreground/90",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 shrink-0 text-primary", strokeWidth: 1.9 }),
                    item.label
                  ]
                },
                item.label
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto border-t border-border p-6 pt-5 sm:px-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/contact",
              className: "inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-gold-glow sm:min-h-0",
              children: [
                p.cta,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
              ]
            }
          ) })
        ]
      },
      p.id
    );
  }) });
}
export {
  PackageTierCards as P
};
