import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { PackageTierCards } from "@/components/PackageTiers";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Engagement tiers from Oryntal AI Labs — automation, SaaS builds, fine-tuning, and ongoing iteration under one roof.",
      },
    ],
  }),
  component: Packages,
});

const ENGAGEMENT_STEPS = [
  {
    step: "01",
    title: "Scope call",
    text: "We map the gap you're closing, the workflows involved, and what a shipped outcome looks like in week one.",
  },
  {
    step: "02",
    title: "Build & wire",
    text: "Automations, SaaS features, and models are built against your real tools — no screenshots of a demo app.",
  },
  {
    step: "03",
    title: "Launch & iterate",
    text: "We ship, watch it run, and keep tuning. Support and iteration are part of the package, not an upsell.",
  },
];

function Packages() {
  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Packages · engagement tiers
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Oryntal</span>{" "}
            <span className="text-gold-gradient">Packages</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Three ways to work with the lab — from one tight automation to a full product squad.
            Fixed scope, no pricing games.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow hover:scale-[1.02] transition"
        >
          Talk to us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Tier cards */}
      <div className="mt-12">
        <PackageTierCards />
      </div>

      {/* How it works */}
      <section className="mt-16">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">How it works</h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Every engagement follows the same three beats — no surprises, no scope creep.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ENGAGEMENT_STEPS.map((s) => (
            <div key={s.step} className="rounded-2xl glass p-6 ring-1 ring-border">
              <span className="font-display text-3xl font-semibold text-gold-gradient">
                {s.step}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="mt-14 rounded-3xl glass p-8 md:p-12 ring-1 ring-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Not sure which package fits?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Tell us what you're shipping and we'll scope the right engagement — no obligations, no
              fluff.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 self-start md:self-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow hover:scale-[1.02] transition"
          >
            Contact / Hire us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
        © 2026 Oryntal AI Labs · Crafted with intent.
      </footer>
    </div>
  );
}
