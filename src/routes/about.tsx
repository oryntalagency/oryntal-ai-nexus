import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Building2, Wrench } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Oryntal is a technology studio building SaaS products, AI automations, and AI models — and helping businesses find the ones built for them.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 glass px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_82/0.25),transparent_60%)] blur-2xl animate-[breathe_8s_ease-in-out_infinite]" />
          <div className="absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.12_60/0.22),transparent_60%)] blur-2xl animate-[breathe_10s_ease-in-out_infinite_1s]" />
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative grid h-28 w-28 sm:h-36 sm:w-36 place-items-center overflow-hidden rounded-full bg-[oklch(0.14_0.01_60)] ring-1 ring-primary/50 shadow-gold-glow">
            <img
              src="/assets/3D Oryntal logo.webp"
              alt="Oryntal brand logo"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="mt-8 font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.04] tracking-tight">
            <span className="text-platinum-gradient">Building AI That</span>{" "}
            <span className="text-gold-gradient">Closes Real Gaps</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground">
            Oryntal is a technology studio building SaaS products, AI automations, and AI models —
            and helping businesses find the ones built for them.
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="mt-14">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">Who we are</h2>
        <p className="mt-4 max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground">
          Oryntal is a product studio and AI engineering team that builds and ships its own SaaS
          products and AI tools, rather than just building for clients. Every product starts from a
          real market gap we&rsquo;ve identified, not a trend. Alongside our own products, we work
          directly with businesses as their tech team — building, deploying, and maintaining AI
          systems that actually run in production.
        </p>
      </section>

      {/* What we've built */}
      <section className="mt-14">
        <h2 className="font-display text-2xl md:text-3xl font-semibold">What we've built</h2>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Three pillars — one catalog, one CRM, one team for hire.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {/* Oryntal AI Labs */}
          <Link
            to="/"
            className="group flex flex-col rounded-2xl glass p-6 ring-1 ring-border transition hover:ring-primary/40"
          >
            <div className="flex h-16 w-full items-center justify-center overflow-hidden rounded-xl bg-[oklch(0.14_0.01_60)] ring-1 ring-border/60 px-3">
              <img
                src="/assets/ol_text.jpeg"
                alt="Oryntal AI Labs"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <Boxes className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-semibold">Oryntal AI Labs</h3>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              Our catalog and marketplace — browse SaaS products, AI agents, and models, and find
              the one built for your specific use case.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
              Browse the catalog <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Oryntal Estate */}
          <Link
            to="/"
            className="group flex flex-col rounded-2xl glass p-6 ring-1 ring-border transition hover:ring-primary/40"
          >
            <div className="flex h-16 w-full items-center justify-center overflow-hidden rounded-xl bg-[oklch(0.14_0.01_60)] ring-1 ring-border/60 px-3">
              <img
                src="/assets/Oryntal Estate.png"
                alt="Oryntal Estate"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-semibold">Oryntal Estate</h3>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              A dedicated CRM for real estate businesses, born out of Oryntal AI Labs — solving the
              operational and lead-management gaps generic CRMs don&rsquo;t address.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
              See it in the catalog <ArrowRight className="h-3 w-3" />
            </span>
          </Link>

          {/* Tech Team for Hire */}
          <Link
            to="/packages"
            className="group flex flex-col rounded-2xl glass p-6 ring-1 ring-border transition hover:ring-primary/40"
          >
            <div className="flex h-16 w-full items-center justify-center overflow-hidden rounded-xl bg-[oklch(0.14_0.01_60)] ring-1 ring-border/60">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-primary">
                <Wrench className="h-6 w-6" />
              </span>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              <h3 className="font-display text-lg font-semibold">Tech Team for Hire</h3>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              For B2B, B2C, and D2C brands that need AI and automation without building an internal
              team — Oryntal plugs in as your tech team, scoped through our Packages.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:underline">
              See what we manage <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mt-14 relative overflow-hidden rounded-3xl glass p-8 md:p-12 ring-1 ring-border">
        <div className="absolute inset-0 opacity-20 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
        <div className="relative flex flex-col items-center text-center">
          <h2 className="max-w-xl font-display text-2xl md:text-4xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Have a gap in your business</span>{" "}
            <span className="text-gold-gradient">AI can close?</span>
          </h2>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:scale-[1.02]"
          >
            Talk to us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
