import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PROBLEMS, I as INDUSTRIES, T as TECHS } from "./mockData-CPS7xFcy.mjs";
import { l as listProducts } from "./products-DszPI45d.mjs";
import { L as ListingCard, O as OfferingIcon, a as ListingDetail, V as VideoLightbox, l as listTags } from "./ListingModals-BvMELYlb.mjs";
import { P as PackageTierCards } from "./PackageTiers-D4Ok8fu1.mjs";
import { D as Drawer$1 } from "../_libs/vaul.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import "../_libs/seroval.mjs";
import { T as TrendingUp, b as ArrowUpRight, c as Sparkles, d as ArrowRight, e as Search, f as Boxes, W as Workflow, C as Cpu, g as Bot, D as Database, E as Eye, h as WandSparkles, i as Mic, j as CodeXml, N as Network, k as SlidersHorizontal, X, l as ChevronDown } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./createSsrRpc-jYxGnsDr.mjs";
import "./server-B_dwi7jl.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream/promises";
import "../_libs/zod.mjs";
import "./dialog-tCTvTz3m.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "./packages-CB2TG17V.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const ROTATING = [
  { kicker: "Curated Catalog", word: "Products." },
  { kicker: "Built to Close Gaps", word: "Automations." },
  { kicker: "Fine-Tuned Intelligence", word: "Models." },
  { kicker: "Everyday Ops", word: "Agents." },
  { kicker: "Production Proven", word: "Workflows." }
];
const STREAM_LINES = [
  "→ loading oryntal-reason-13b…",
  "✓ routing lead from form → CRM → rep",
  "→ drafting reply in brand voice…",
  "✓ invoice reconciled · ledger updated",
  "★ shipped · 14 edge regions · 0 tickets"
];
const NODES = [
  { x: 80, y: 90, icon: Bot, label: "LLM Agents" },
  { x: 320, y: 110, icon: Workflow, label: "Automation" },
  { x: 70, y: 290, icon: Database, label: "RAG" },
  { x: 330, y: 300, icon: Eye, label: "Vision" },
  { x: 200, y: 50, icon: WandSparkles, label: "Diffusion" },
  { x: 200, y: 360, icon: Mic, label: "Voice" },
  { x: 50, y: 200, icon: CodeXml, label: "Code" },
  { x: 350, y: 200, icon: Network, label: "Edge" }
];
function HeroAI({ query, setQuery }) {
  const [idx, setIdx] = reactExports.useState(0);
  const [streamIdx, setStreamIdx] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);
  reactExports.useEffect(() => {
    const t = setInterval(() => setStreamIdx((i) => (i + 1) % (STREAM_LINES.length + 1)), 1400);
    return () => clearInterval(t);
  }, []);
  const current = ROTATING[idx];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden rounded-3xl border border-border/60 glass px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_82/0.25),transparent_60%)] blur-2xl animate-[breathe_8s_ease-in-out_infinite]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.12_60/0.22),transparent_60%)] blur-2xl animate-[breathe_10s_ease-in-out_infinite_1s]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,oklch(0.78_0.13_82/0.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.78_0.13_82/0.4)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
          "Live · Curated catalog · Updated weekly"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 h-5 overflow-hidden text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-[heroSlide_0.6s_ease-out]", children: current.kicker }, current.kicker) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.04] tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Build What's Next." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "AI Products. Intelligent Automations. Real-World Impact." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground", children: "Turning complex business gaps into intelligent systems that move businesses forward." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex w-full max-w-xl items-center gap-2 rounded-full glass px-3 py-2 sm:px-5 sm:py-3 ring-1 ring-border focus-within:ring-primary/50 transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: "Search products, automations, models…",
              className: "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex min-h-10 shrink-0 items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110 sm:min-h-0 sm:px-4", children: "Search" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-2", children: [
          { icon: Boxes, label: "SaaS Products" },
          { icon: Workflow, label: "AI Automations" },
          { icon: Cpu, label: "AI Models & Agents" },
          { icon: Bot, label: "Custom Builds" }
        ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-3 w-3" }),
              c.label
            ]
          },
          c.label
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "absolute inset-0 grid place-items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute h-[92%] w-[92%] rounded-full border border-primary/15 animate-[spinSlow_28s_linear_infinite]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-gold-glow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1/2 -right-1 h-1 w-1 -translate-y-1/2 rounded-full bg-primary/60" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute h-[70%] w-[70%] rounded-full border border-primary/25 animate-[spinSlow_18s_linear_infinite_reverse]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[oklch(0.88_0.09_86)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 left-1/4 h-1 w-1 rounded-full bg-primary/70" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute h-[48%] w-[48%] rounded-full border border-primary/30 animate-[spinSlow_12s_linear_infinite]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 400 400", className: "absolute inset-0 h-full w-full", "aria-hidden": true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "line", x1: "0", x2: "1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.78 0.13 82)", stopOpacity: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "oklch(0.92 0.1 86)", stopOpacity: "1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.78 0.13 82)", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "core", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.95 0.08 86)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "oklch(0.78 0.13 82)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.4 0.08 60)", stopOpacity: "0" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "node", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.95 0.08 86)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.5 0.1 70)" })
            ] })
          ] }),
          (() => {
            const edges = [
              [0, 4],
              [4, 1],
              [1, 7],
              [7, 3],
              [3, 5],
              [5, 2],
              [2, 6],
              [6, 0],
              [0, 1],
              [2, 3],
              [4, 5],
              [6, 7],
              [0, 5],
              [1, 3],
              [4, 7],
              [6, 2]
            ];
            return edges.map(([a, b], i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "line",
              {
                x1: NODES[a].x,
                y1: NODES[a].y,
                x2: NODES[b].x,
                y2: NODES[b].y,
                stroke: "oklch(0.78 0.13 82)",
                strokeOpacity: "0.18",
                strokeWidth: "0.8",
                className: "animate-[pulseLine_4s_ease-in-out_infinite]",
                style: { animationDelay: `${i * 0.2}s` }
              },
              `e-${i}`
            ));
          })(),
          NODES.map(({ x, y }, i) => {
            const path = `M${x} ${y} L 200 200`;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "line",
                {
                  x1: x,
                  y1: y,
                  x2: 200,
                  y2: 200,
                  stroke: "url(#line)",
                  strokeWidth: "1.2",
                  className: "animate-[pulseLine_3s_ease-in-out_infinite]",
                  style: { animationDelay: `${i * 0.3}s` }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("circle", { r: "2.4", fill: "oklch(0.95 0.08 86)", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animateMotion",
                  {
                    dur: `${2.2 + i % 3 * 0.6}s`,
                    repeatCount: "indefinite",
                    path,
                    begin: `${i * 0.25}s`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animate",
                  {
                    attributeName: "opacity",
                    values: "0;1;1;0",
                    dur: `${2.2 + i % 3 * 0.6}s`,
                    repeatCount: "indefinite",
                    begin: `${i * 0.25}s`
                  }
                )
              ] })
            ] }, i);
          }),
          (() => {
            const edges = [
              [0, 4],
              [4, 1],
              [1, 7],
              [7, 3],
              [3, 5],
              [5, 2],
              [2, 6],
              [6, 0]
            ];
            return edges.map(([a, b], i) => {
              const path = `M${NODES[a].x} ${NODES[a].y} L ${NODES[b].x} ${NODES[b].y}`;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("circle", { r: "1.6", fill: "oklch(0.92 0.1 86)", opacity: "0.9", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animateMotion",
                  {
                    dur: `${3 + i % 3 * 0.5}s`,
                    repeatCount: "indefinite",
                    path,
                    begin: `${i * 0.5}s`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animate",
                  {
                    attributeName: "opacity",
                    values: "0;0.9;0",
                    dur: `${3 + i % 3 * 0.5}s`,
                    repeatCount: "indefinite",
                    begin: `${i * 0.5}s`
                  }
                )
              ] }, `sp-${i}`);
            });
          })(),
          [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "circle",
            {
              cx: "200",
              cy: "200",
              r: "40",
              fill: "none",
              stroke: "oklch(0.88 0.09 86)",
              strokeWidth: "1",
              opacity: "0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animate",
                  {
                    attributeName: "r",
                    from: "40",
                    to: "160",
                    dur: "3s",
                    begin: `${i * 1}s`,
                    repeatCount: "indefinite"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "animate",
                  {
                    attributeName: "opacity",
                    values: "0;0.6;0",
                    dur: "3s",
                    begin: `${i * 1}s`,
                    repeatCount: "indefinite"
                  }
                )
              ]
            },
            `r-${i}`
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "200",
              cy: "200",
              r: "90",
              fill: "url(#core)",
              opacity: "0.55",
              className: "animate-[breathe_4s_ease-in-out_infinite]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: "200",
              cy: "200",
              r: "38",
              fill: "oklch(0.16 0.01 60)",
              stroke: "oklch(0.88 0.09 86)",
              strokeWidth: "1"
            }
          )
        ] }),
        NODES.map(({ x, y, icon: Icon, label }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "group absolute -translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]",
            style: {
              left: `${x / 400 * 100}%`,
              top: `${y / 400 * 100}%`,
              animationDelay: `${i * 0.4}s`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl glass ring-1 ring-primary/40 shadow-gold-glow transition hover:scale-110 hover:ring-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 sm:h-5 sm:w-5 text-primary", strokeWidth: 1.8 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_82/0.25),transparent_70%)] animate-[breathe_3s_ease-in-out_infinite]",
                    style: { animationDelay: `${i * 0.3}s` }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary opacity-0 ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100", children: label })
            ]
          },
          `icon-${i}`
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-[oklch(0.14_0.01_60)] ring-1 ring-primary/50 shadow-gold-glow animate-[breathe_4s_ease-in-out_infinite] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/ol.png",
              alt: "Oryntal AI Labs",
              className: "h-full w-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_50%,oklch(0.14_0.01_60/0.6))]" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -left-1 top-4 hidden md:block w-[200px] rounded-xl glass p-3 ring-1 ring-border animate-[float_6s_ease-in-out_infinite]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-primary mb-1", children: "Prompt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/90 leading-snug", children: '"Generate a moody cinematic portrait, golden rim light."' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -right-1 bottom-4 hidden md:block w-[230px] rounded-xl glass p-3 ring-1 ring-border animate-[float_7s_ease-in-out_infinite_1s]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-primary mb-1.5", children: "Inference stream" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 font-mono text-[10.5px] text-muted-foreground min-h-[78px]", children: [
            STREAM_LINES.slice(0, streamIdx).map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-[heroSlide_0.4s_ease-out]", children: l }, i)),
            streamIdx < STREAM_LINES.length && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-3 w-1.5 bg-primary animate-pulse" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-2 gap-4 border-t border-border/60 pt-6 md:grid-cols-4", children: [
      ["24", "SaaS products"],
      ["9", "Automation systems"],
      ["14", "AI models & agents"],
      ["41K", "Monthly deploys"]
    ].map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl md:text-3xl font-semibold text-gold-gradient", children: v }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: l })
    ] }, l)) })
  ] });
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(Drawer$1.Root, { shouldScaleBackground, ...props });
Drawer.displayName = "Drawer";
const DrawerPortal = Drawer$1.Portal;
const DrawerClose = Drawer$1.Close;
const DrawerOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Overlay,
  {
    ref,
    className: cn("fixed inset-0 z-50 bg-black/80", className),
    ...props
  }
));
DrawerOverlay.displayName = Drawer$1.Overlay.displayName;
const DrawerContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Drawer$1.Content,
    {
      ref,
      className: cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" }),
        children
      ]
    }
  )
] }));
DrawerContent.displayName = "DrawerContent";
const DrawerHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid gap-1.5 p-4 text-center sm:text-left", className), ...props });
DrawerHeader.displayName = "DrawerHeader";
const DrawerTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DrawerTitle.displayName = Drawer$1.Title.displayName;
const DrawerDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Drawer$1.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DrawerDescription.displayName = Drawer$1.Description.displayName;
function FacetFilterBar({
  problems,
  selectedProblems,
  onToggleProblem,
  offering,
  onOffering,
  industries,
  selectedIndustries,
  onToggleIndustry,
  techs,
  selectedTechs,
  onToggleTech,
  count,
  total,
  onClear
}) {
  const [moreOpen, setMoreOpen] = reactExports.useState(false);
  const isMobile = useIsMobile();
  const activeCount = selectedProblems.length + selectedIndustries.length + selectedTechs.length + (offering !== "all" ? 1 : 0);
  const hasFilters = activeCount > 0;
  const allActive = selectedProblems.length === 0;
  const offeringOptions = [
    { value: "all", label: "All", icon: SlidersHorizontal },
    { value: "saas", label: "SaaS Product", icon: Boxes },
    { value: "automation", label: "AI Automation", icon: Workflow },
    { value: "model", label: "AI Model or Agent", icon: Cpu }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Filters", className: "mt-12 rounded-2xl glass p-4 sm:p-5 ring-1 ring-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3 w-3" }),
          " Problem solved"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mx-1 pb-1 md:-mx-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto scrollbar-hide px-1 md:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max gap-2", children: problems.map((p) => {
            const on = p === "All" ? allActive : selectedProblems.includes(p);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => onToggleProblem(p),
                className: `inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium ring-1 transition sm:min-h-0 sm:py-1.5 ${on ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow" : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"}`,
                children: p
              },
              p
            );
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-1 right-0 w-6 bg-gradient-to-l from-surface/90 to-transparent md:hidden" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Offering type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex max-w-full flex-wrap rounded-full glass p-1 ring-1 ring-border", children: offeringOptions.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onOffering(value),
              className: `inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition sm:min-h-0 sm:py-1.5 ${offering === value ? "bg-primary text-primary-foreground shadow-gold-glow" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
                label
              ]
            },
            value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-3 pb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            count,
            " of ",
            total,
            " listing",
            total === 1 ? "" : "s"
          ] }),
          hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onClear,
              className: "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/40 transition hover:bg-primary/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
                " Clear"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/60 pt-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setMoreOpen((o) => !o),
            className: "inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`
                }
              ),
              "More filters",
              activeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground", children: activeCount })
            ]
          }
        ),
        moreOpen && !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 hidden md:grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Industry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: industries.map((ind) => {
              const on = selectedIndustries.includes(ind);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onToggleIndustry(ind),
                  className: `inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-medium ring-1 transition ${on ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow" : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"}`,
                  children: ind
                },
                ind
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Tech function" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: techs.map((t) => {
              const on = selectedTechs.includes(t);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onToggleTech(t),
                  className: `inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-medium ring-1 transition ${on ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow" : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"}`,
                  children: t
                },
                t
              );
            }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Drawer,
      {
        open: isMobile && moreOpen,
        onOpenChange: (o) => setMoreOpen(o),
        shouldScaleBackground: false,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { className: "border-border bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { className: "font-display text-lg", children: "More filters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "Narrow listings by industry or tech function." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[60vh] space-y-5 overflow-y-auto px-4 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Industry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: industries.map((ind) => {
                const on = selectedIndustries.includes(ind);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onToggleIndustry(ind),
                    className: `inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${on ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow" : "glass text-muted-foreground ring-border active:text-foreground"}`,
                    children: ind
                  },
                  ind
                );
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: "Tech function" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: techs.map((t) => {
                const on = selectedTechs.includes(t);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => onToggleTech(t),
                    className: `inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${on ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow" : "glass text-muted-foreground ring-border active:text-foreground"}`,
                    children: t
                  },
                  t
                );
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background p-4 pb-[max(env(safe-area-inset-bottom),1rem)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { className: "flex min-h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-gold-glow transition active:opacity-80", children: "Done" }) })
        ] })
      }
    )
  ] });
}
function Home() {
  const [selectedProblems, setSelectedProblems] = reactExports.useState([]);
  const [offering, setOffering] = reactExports.useState("all");
  const [selectedIndustries, setSelectedIndustries] = reactExports.useState([]);
  const [selectedTechs, setSelectedTechs] = reactExports.useState([]);
  const [query, setQuery] = reactExports.useState("");
  const [activeListing, setActiveListing] = reactExports.useState(null);
  const [videoUrl, setVideoUrl] = reactExports.useState(null);
  const resetFilters = () => {
    setSelectedProblems([]);
    setOffering("all");
    setSelectedIndustries([]);
    setSelectedTechs([]);
  };
  const {
    data,
    isFetching
  } = useQuery({
    queryKey: ["listings", selectedProblems, offering, selectedIndustries, selectedTechs, query],
    queryFn: () => listProducts({
      data: {
        problems: selectedProblems,
        offering,
        industries: selectedIndustries,
        techs: selectedTechs,
        query: query.trim() || void 0
      }
    })
  });
  const listings = data?.ok ? data.items : [];
  const {
    data: featuredData
  } = useQuery({
    queryKey: ["listings", "featured"],
    queryFn: () => listProducts({
      data: {}
    })
  });
  const featured = reactExports.useMemo(() => featuredData?.ok ? featuredData.items.filter((l) => l.featured) : [], [featuredData]);
  const {
    data: tagData
  } = useQuery({
    queryKey: ["tags"],
    queryFn: () => listTags({
      data: {}
    })
  });
  const tagItems = reactExports.useMemo(() => {
    const all = tagData && tagData.ok ? tagData.items : [];
    return all.map((t) => t.facet).length > 0 ? all : [];
  }, [tagData]);
  const problemsOptions = reactExports.useMemo(() => tagItems.length > 0 ? tagItems.filter((t) => t.facet === "problem").map((t) => t.label) : [...PROBLEMS], [tagItems]);
  const industriesOptions = reactExports.useMemo(() => tagItems.length > 0 ? tagItems.filter((t) => t.facet === "industry").map((t) => t.label) : [...INDUSTRIES], [tagItems]);
  const techsOptions = reactExports.useMemo(() => tagItems.length > 0 ? tagItems.filter((t) => t.facet === "tech").map((t) => t.label) : [...TECHS], [tagItems]);
  const openVideo = (l) => setVideoUrl(l.video ?? null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroAI, { query, setQuery }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FacetFilterBar, { problems: problemsOptions, selectedProblems, onToggleProblem: (p) => {
      if (p === "All") {
        setSelectedProblems([]);
        return;
      }
      setSelectedProblems((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
    }, offering, onOffering: setOffering, industries: industriesOptions, selectedIndustries, onToggleIndustry: (ind) => setSelectedIndustries((prev) => prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind]), techs: techsOptions, selectedTechs, onToggleTech: (t) => setSelectedTechs((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]), count: listings.length, total: featuredData?.ok ? featuredData.items.length : listings.length, onClear: resetFilters }),
    isFetching && listings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 rounded-2xl glass p-12 text-center ring-1 ring-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "Loading the catalog…" }) }) : listings.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5", children: listings.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCard, { listing: l, onShow: setActiveListing, onPlay: openVideo }, l.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl glass p-12 text-center ring-1 ring-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: "No listings match those filters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetFilters, className: "mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow", children: "Clear all filters" })
    ] }),
    featured.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 font-display text-2xl font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-5 w-5 text-primary" }),
            " Featured"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "A taste of the catalog — products, automations, and models, hand-picked by the lab." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden md:block text-xs text-muted-foreground", children: [
          featured.length,
          " picks"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative -mx-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto scrollbar-hide px-2 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 min-w-max", children: featured.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveListing(l), className: "group w-[300px] shrink-0 rounded-2xl glass p-3 text-left ring-1 ring-border transition hover:ring-primary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-20 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/60", children: l.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: l.title, loading: "lazy", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full w-full bg-gradient-to-br ${l.gradient}` }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OfferingIcon, { type: l.offeringType, className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-sm font-semibold", children: l.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 line-clamp-2 text-xs text-muted-foreground", children: l.tagline })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" })
        ] }) }, l.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background/90 to-transparent md:hidden" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-primary" }),
            " Packages"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Engagements, not price tiers." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "We manage the build, the automation, and the iteration — you keep the outcomes." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packages", className: "hidden md:inline-flex items-center gap-1 text-xs text-primary hover:underline", children: [
          "Explore all packages ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PackageTierCards, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground", children: [
      "© 2026 Oryntal AI Labs · Crafted with intent.",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-primary hover:underline", children: "Admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ListingDetail, { listing: activeListing, onClose: () => setActiveListing(null), onPlay: openVideo }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(VideoLightbox, { url: videoUrl, onClose: () => setVideoUrl(null) })
  ] });
}
export {
  Home as component
};
