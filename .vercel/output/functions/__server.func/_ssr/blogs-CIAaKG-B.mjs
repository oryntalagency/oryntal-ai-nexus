import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as submitThought, l as listBlogPosts } from "./blog-v7oFkFpO.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription } from "./dialog-tCTvTz3m.mjs";
import "../_libs/seroval.mjs";
import { F as PenLine, J as Linkedin, O as Instagram, Q as Heart, M as MessageCircle, V as Bookmark, o as CircleAlert } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
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
const LINKEDIN_PATTERN = /linkedin\.com/i;
const INSTAGRAM_PATTERN = /instagram\.com/i;
function ThoughtComposer({
  open,
  onOpenChange,
  onPublished
}) {
  const [name, setName] = reactExports.useState("");
  const [thought, setThought] = reactExports.useState("");
  const [linkedin, setLinkedin] = reactExports.useState("");
  const [instagram, setInstagram] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const li = linkedin.trim();
  const ig = instagram.trim();
  const linkedinValid = li === "" || LINKEDIN_PATTERN.test(li);
  const instagramValid = ig === "" || INSTAGRAM_PATTERN.test(ig);
  const hasLink = li !== "" || ig !== "";
  const nameOk = name.trim().length >= 2;
  const thoughtOk = thought.trim().length >= 10;
  const canSubmit = nameOk && thoughtOk && hasLink && linkedinValid && instagramValid && !submitting;
  const wordCount = reactExports.useMemo(() => thought.split(/\s+/).filter(Boolean).length, [thought]);
  const reset = () => {
    setName("");
    setThought("");
    setLinkedin("");
    setInstagram("");
    setSubmitting(false);
    setError(null);
  };
  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const res = await submitThought({
      data: { name: name.trim(), thought: thought.trim(), linkedin: li, instagram: ig }
    });
    if (res.ok) {
      reset();
      onPublished();
      onOpenChange(false);
    } else {
      setError(res.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (o) => o ? void 0 : onOpenChange(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-y-auto p-5 sm:max-w-lg sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "pr-10 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Share your thoughts" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Publish a short field note to the community feed. Add at least one social profile so people can find you." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        className: "mt-5 space-y-5",
        onSubmit: (e) => {
          e.preventDefault();
          void submit();
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Your name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "e.g. Maya Singh",
                maxLength: 60,
                className: "mt-1.5"
              }
            ),
            !nameOk && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-destructive", children: "Please enter your name." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Your thought *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                value: thought,
                onChange: (e) => setThought(e.target.value),
                rows: 5,
                maxLength: 1e3,
                placeholder: "What are you building, shipping, or learning right now?",
                className: "mt-1.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between text-[11px] text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                wordCount,
                " word",
                wordCount === 1 ? "" : "s",
                " ·",
                " ",
                Math.max(1, Math.round(wordCount / 200)),
                " min read"
              ] }),
              !thoughtOk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "Add a sentence or two (min 10 chars)." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-semibold uppercase tracking-wide", children: "Your profile link" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: "LinkedIn or Instagram — at least one is required." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-3.5 w-3.5" }),
                  " LinkedIn URL"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: linkedin,
                    onChange: (e) => setLinkedin(e.target.value),
                    inputMode: "url",
                    autoCapitalize: "none",
                    autoCorrect: "off",
                    placeholder: "https://linkedin.com/in/…",
                    className: "mt-1"
                  }
                ),
                !linkedinValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-destructive", children: "This doesn't look like a LinkedIn URL (should contain linkedin.com)." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5" }),
                  " Instagram URL"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    value: instagram,
                    onChange: (e) => setInstagram(e.target.value),
                    inputMode: "url",
                    autoCapitalize: "none",
                    autoCorrect: "off",
                    placeholder: "https://instagram.com/…",
                    className: "mt-1"
                  }
                ),
                !instagramValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-destructive", children: "This doesn't look like an Instagram URL (should contain instagram.com)." })
              ] })
            ] }),
            !hasLink && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1 text-[11px] font-medium text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
              " Please add your LinkedIn or Instagram profile link."
            ] })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1.5 text-[11px] text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
            " ",
            error
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                onClick: () => onOpenChange(false),
                className: "min-h-11 rounded-full sm:min-h-0",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: !canSubmit,
                className: "min-h-11 rounded-full sm:min-h-0",
                children: submitting ? "Publishing…" : "Publish thought"
              }
            )
          ] })
        ]
      }
    )
  ] }) });
}
function Blogs() {
  const [tab, setTab] = reactExports.useState("trending");
  const [composerOpen, setComposerOpen] = reactExports.useState(false);
  const queryClient = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts()
  });
  const posts = reactExports.useMemo(() => data?.ok ? data.items : [], [data]);
  const onThoughtPublished = () => {
    void queryClient.invalidateQueries({
      queryKey: ["blog", "posts"]
    });
  };
  const list = reactExports.useMemo(() => tab === "trending" ? posts.filter((b) => b.trending).concat(posts.filter((b) => !b.trending)) : [...posts].reverse(), [tab, posts]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-semibold tracking-tight", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Community" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "Thoughts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-muted-foreground", children: "Field notes from builders shipping real models. Raw, opinionated, and useful." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setComposerOpen(true), className: "inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow hover:scale-[1.02] transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }),
        " Share Your Thoughts"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 inline-flex rounded-full glass p-1 ring-1 ring-border", children: ["trending", "latest"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t), className: `inline-flex min-h-10 items-center rounded-full px-5 py-2.5 text-sm font-medium transition sm:min-h-0 sm:py-2 ${tab === t ? "bg-primary text-primary-foreground shadow-gold-glow" : "text-muted-foreground hover:text-foreground"}`, children: t === "trending" ? "Trending Thoughts" : "Latest Updates" }, t)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5", children: list.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_40%,transparent)] active:scale-[0.99]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative bg-gradient-to-br ${b.gradient}`, style: {
        height: b.height
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_40%,oklch(0.1_0_0/0.6))]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5", children: b.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full glass px-2 py-0.5 text-[10px] font-medium text-foreground/90", children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.6_0.14_70)] text-xs font-bold text-primary-foreground", children: b.initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium leading-tight", children: b.author }),
                b.linkedinUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: b.linkedinUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": `${b.author} on LinkedIn`, className: "shrink-0 text-muted-foreground transition hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-3.5 w-3.5" }) }),
                b.instagramUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: b.instagramUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": `${b.author} on Instagram`, className: "shrink-0 text-muted-foreground transition hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-3.5 w-3.5" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: b.readTime })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex min-h-9 items-center rounded-full bg-secondary px-3 py-1.5 text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition sm:py-1", children: "Follow" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-xl font-semibold leading-snug text-foreground", children: b.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: b.hook }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 hover:text-primary transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-4 w-4" }),
              " ",
              b.likes
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 hover:text-primary transition", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
              " ",
              b.comments
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid min-h-10 min-w-10 place-items-center hover:text-primary transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "h-4 w-4" }) })
        ] })
      ] })
    ] }, b.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground", children: "© 2026 Oryntal AI Labs · Crafted with intent." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThoughtComposer, { open: composerOpen, onOpenChange: setComposerOpen, onPublished: onThoughtPublished })
  ] });
}
export {
  Blogs as component
};
