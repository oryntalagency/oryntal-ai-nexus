import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import "../_libs/seroval.mjs";
import { M as MessageCircle, y as Mail, Y as CircleCheck, Z as LoaderCircle, d as ArrowRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
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
import "../_libs/isbot.mjs";
const sendContact = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  email: stringType().email(),
  subject: stringType().optional(),
  message: stringType().min(1)
})).handler(createSsrRpc("639d3178a4937bc6a9aec740300a040b784280e56d955e4c86209c703e70b374"));
function Contact() {
  const [sent, setSent] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [sendError, setSendError] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const canSend = reactExports.useMemo(() => form.name.trim().length > 0 && form.email.includes("@") && form.message.trim().length > 0, [form]);
  const update = (key) => (e) => setForm((f) => ({
    ...f,
    [key]: e.target.value
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 lg:grid-cols-[1fr_1.2fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-3.5 w-3.5 text-primary" }),
        " Not a listing submission — just us, talking to you."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-6xl font-semibold tracking-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-platinum-gradient", children: "Let's build" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold-gradient", children: "something sharp." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-md text-muted-foreground", children: "Hiring us for a package, scoping a custom engagement, or poking holes in an idea — this is the fastest way to reach the Oryntal team." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:support.oryntal@agency.org.in", className: "inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm ring-1 ring-border transition hover:text-primary hover:ring-primary/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
        " support.oryntal@agency.org.in"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl glass p-6 ring-1 ring-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary", children: "1" }),
            "Send us a few lines about the problem."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary", children: "2" }),
            "We reply within one business day with a scoped proposal."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary", children: "3" }),
            "Fixed scope, fixed price, then we ship."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl glass p-6 sm:p-8 ring-1 ring-border", children: sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[420px] flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-display text-2xl font-semibold", children: "Message sent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-sm text-sm text-muted-foreground", children: [
        "Thanks",
        form.name ? `, ${form.name.split(" ")[0]}` : "",
        "! We'll get back to you within one business day."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
        setSent(false);
        setForm({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, className: "mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow", children: "Send another message" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: async (e) => {
      e.preventDefault();
      setSendError(null);
      setSending(true);
      try {
        const result = await sendContact({
          data: {
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message
          }
        });
        if (!result.ok) {
          setSendError(result.error);
          return;
        }
        setSent(true);
      } catch {
        setSendError("We couldn't send your message right now. Please try again or email us directly.");
      } finally {
        setSending(false);
      }
    }, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: form.name, onChange: update("name"), placeholder: "Ada Lovelace" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: form.email, onChange: update("email"), placeholder: "ada@company.com" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "subject", children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "subject", value: form.subject, onChange: update("subject"), placeholder: "Hiring you for an edge deployment" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "message", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "message", rows: 7, value: form.message, onChange: update("message"), placeholder: "What are we building?" })
      ] }),
      sendError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl bg-destructive/10 px-3 py-2 text-center text-[12px] text-destructive-foreground ring-1 ring-destructive/30", children: sendError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: !canSend || sending, className: "w-full h-11 rounded-full text-sm font-semibold shadow-gold-glow", children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Sending… ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        "Send message ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-[11px] text-muted-foreground", children: [
        "Prefer email? Write to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "support.oryntal@agency.org.in" })
      ] })
    ] }) })
  ] }) });
}
export {
  Contact as component
};
