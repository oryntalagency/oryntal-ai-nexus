import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { packages } from "@/lib/mockData";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Productized AI packages from Oryntal AI Labs — launch kits, fine-tuning, edge deployment, and full builds.",
      },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Services · handcrafted engagements
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Oryntal</span>{" "}
            <span className="text-gold-gradient">Packages</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Productized AI engagements — from a single edge deploy to a full product build. Fixed
            scope, fixed nerves.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow hover:scale-[1.02] transition"
        >
          Talk to us <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Package grid */}
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {packages.map((p) => (
          <article
            key={p.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            {p.badge && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-gold-glow">
                {p.badge}
              </span>
            )}

            {/* Art */}
            <div className={`relative h-32 w-full bg-gradient-to-br ${p.gradient} overflow-hidden`}>
              <div className="absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-platinum-gradient font-display text-[64px] leading-none opacity-40 select-none">
                  {p.glyph}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-xl font-semibold">{p.name}</h2>
              <p className="mt-1 text-sm text-primary">{p.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <ul className="mt-5 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                <div>
                  <p className="font-display text-2xl font-semibold text-gold-gradient">
                    {p.price}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{p.priceNote}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold transition hover:bg-primary hover:text-primary-foreground"
                >
                  Request <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

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
