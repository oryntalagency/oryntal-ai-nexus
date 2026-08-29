import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as OFFERING_META } from "./mockData-CPS7xFcy.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { D as Dialog, a as DialogContent } from "./dialog-tCTvTz3m.mjs";
import { b as ArrowUpRight, E as Eye, m as Play, n as Check, o as CircleAlert, M as MessageCircle, p as CalendarCheck, q as GraduationCap } from "../_libs/lucide-react.mjs";
import { o as objectType, e as enumType } from "../_libs/zod.mjs";
const listTags = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  facet: enumType(["problem", "industry", "tech"]).optional()
})).handler(createSsrRpc("917d7db902f6c80f5a6dc5299f3a7bb1ddb02d1963bb2bb0b02fff73781402a8"));
function OfferingIcon({ type, className }) {
  const { icon: Icon } = OFFERING_META[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3.5 w-3.5 text-primary", className), strokeWidth: 1.9 });
}
function OfferingBadge({ type, className }) {
  const { icon: Icon, label } = OFFERING_META[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border",
        className
      ),
      title: label,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary", strokeWidth: 1.9 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: label })
      ]
    }
  );
}
function ListingCard({ listing, onShow, onPlay }) {
  const primaryCta = listing.liveUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: listing.liveUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      onClick: (e) => e.stopPropagation(),
      className: "pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110",
      children: [
        "Try it ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
      ]
    }
  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: (e) => {
        e.stopPropagation();
        onShow(listing);
      },
      className: "pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110",
      children: [
        "View ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      onClick: () => onShow(listing),
      className: "group relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:scale-[1.015] supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.985]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `relative w-full overflow-hidden ${listing.image ? "" : "bg-gradient-to-br " + listing.gradient}`,
            style: { height: listing.height },
            children: [
              listing.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: listing.image,
                  alt: listing.title,
                  loading: "lazy",
                  className: "h-full w-full object-cover transition-transform duration-500 supports-[pointer:fine]:group-hover:scale-[1.04]"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient font-display text-[120px] leading-none opacity-40 select-none", children: listing.glyph }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                OfferingBadge,
                {
                  type: listing.offeringType,
                  className: "absolute left-3 top-3 z-10 opacity-100 transition group-hover:opacity-100"
                }
              ),
              listing.video && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Play preview",
                  onClick: (e) => {
                    e.stopPropagation();
                    onPlay(listing);
                  },
                  className: "absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:scale-105 hover:text-primary hover:ring-primary/50 sm:h-9 sm:w-9 active:scale-95",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4 fill-current" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 supports-[pointer:fine]:group-hover:opacity-100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onShow(listing);
                    },
                    className: "pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition hover:text-primary sm:h-9 sm:w-9",
                    "aria-label": "Quick preview",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" })
                  }
                ),
                primaryCta
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold leading-tight text-foreground", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground line-clamp-1", children: listing.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5", children: listing.advantagePoints.slice(0, 3).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-1.5 text-xs text-foreground/85", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-3 w-3 shrink-0 text-primary", strokeWidth: 3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: a })
          ] }, a)) })
        ] })
      ]
    }
  );
}
function embedUrl(url) {
  if (url.includes("loom.com")) {
    return url.replace("loom.com/share/", "loom.com/embed/").replace("loom.com/video/", "loom.com/embed/");
  }
  return url;
}
function VideoLightbox({ url, onClose }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!url, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "w-[min(1100px,94vw)] border-0 bg-black/95 p-2 sm:p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "iframe",
    {
      src: url ? embedUrl(url) : "",
      title: "Preview",
      allow: "autoplay; fullscreen; picture-in-picture",
      allowFullScreen: true,
      className: "aspect-video w-full rounded-lg bg-black"
    }
  ) }) });
}
function ListingDetail({
  listing,
  onClose,
  onPlay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!listing, onOpenChange: (open) => !open && onClose(), children: listing && /* @__PURE__ */ jsxRuntimeExports.jsx(DetailContent, { listing, onPlay }) });
}
function DetailContent({ listing, onPlay }) {
  const l = listing;
  const { icon: OfferingIcon2, label: offeringLabel } = OFFERING_META[l.offeringType];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-y-auto p-0 sm:max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `relative h-56 w-full sm:h-72 ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`,
        children: [
          l.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: l.image, alt: l.title, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OfferingIcon2, { className: "h-3.5 w-3.5" }),
            offeringLabel
          ] }),
          l.video && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => onPlay(l),
              className: "absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3 fill-current" }),
                " Watch preview"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-semibold leading-tight", children: l.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-primary", children: l.creator }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: l.tagline }),
      l.video && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 aspect-video overflow-hidden rounded-xl ring-1 ring-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          src: embedUrl(l.video),
          title: `${l.title} preview`,
          allow: "autoplay; fullscreen; picture-in-picture",
          allowFullScreen: true,
          className: "h-full w-full"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailSection,
        {
          title: "What it solves",
          items: l.problemPoints,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DetailSection,
        {
          title: "Why it's better",
          items: l.advantagePoints,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5 shrink-0 text-primary", strokeWidth: 3 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-1.5", children: [...l.problems, ...l.industries, ...l.techs].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "rounded-full glass px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border",
          children: t
        },
        t
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CtaFor, { listing: l }) })
    ] })
  ] });
}
function DetailSection({
  title,
  items,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5 text-sm text-foreground/90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary", children: icon }),
      item
    ] }, item)) })
  ] });
}
function CtaFor({ listing }) {
  const primary = "inline-flex min-h-12 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110 sm:min-h-0";
  const secondary = "inline-flex min-h-12 items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm font-medium ring-1 ring-border transition hover:text-foreground hover:ring-primary/40 sm:min-h-0";
  if (listing.offeringType === "saas" && listing.liveUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: listing.liveUrl, target: "_blank", rel: "noopener noreferrer", className: primary, children: [
        "Try it ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: secondary, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
        " Questions? Talk to us"
      ] })
    ] });
  }
  if (listing.offeringType === "automation") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: primary, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "h-4 w-4" }),
        " Book a call"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/packages", className: secondary, children: [
        "See packages ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: primary, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }),
      " Learn more"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contact", className: secondary, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " Ask about this model"
    ] })
  ] });
}
export {
  ListingCard as L,
  OfferingIcon as O,
  VideoLightbox as V,
  ListingDetail as a,
  listTags as l
};
