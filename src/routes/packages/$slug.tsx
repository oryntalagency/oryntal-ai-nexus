import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "lucide-react";
import { PackageTiers } from "@/components/packages/PackageTiers";
import { getNicheBySlug, nicheIcon } from "@/data/packages";

type PackageLoaderData = {
  slug: string;
  notFound: boolean;
};

export const Route = createFileRoute("/packages/$slug")({
  head: (ctx) => {
    const data = ctx.loaderData as PackageLoaderData | undefined;
    const niche = data?.slug ? getNicheBySlug(data.slug) : undefined;
    const title = niche ? `Oryntal AI Labs — ${niche.nicheName}` : "Package — Oryntal AI Labs";
    const description = niche?.tagline ?? "A niche edition from Oryntal AI Labs.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/assets/ol.png" },
        {
          property: "og:url",
          content: niche ? `https://oryntal-ai-labs.vercel.app/packages/${niche.slug}` : undefined,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/assets/ol.png" },
      ],
    };
  },
  loader: async ({ params }) => {
    const niche = getNicheBySlug(params.slug);
    return {
      slug: params.slug,
      notFound: !niche,
    } satisfies PackageLoaderData;
  },
  component: PackageDetail,
});

function WatermarkPattern() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 14%, transparent) 1.5px, transparent 1.6px)",
        backgroundSize: "56px 56px",
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85))",
        WebkitMaskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85))",
      }}
    />
  );
}

function WatermarkWordmark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center overflow-hidden opacity-[0.06]"
    >
      <div className="grid rotate-[-28deg] grid-cols-3 gap-6 whitespace-nowrap px-8 text-[11vw] font-display font-bold uppercase leading-none tracking-tight text-primary md:text-[7vw]">
        <span>Oryntal</span>
        <span>AI Labs</span>
        <span>Oryntal</span>
        <span>AI Labs</span>
        <span>Oryntal</span>
        <span>AI Labs</span>
      </div>
    </div>
  );
}

function PackageDetail() {
  const { slug, notFound } = Route.useLoaderData() as PackageLoaderData;
  const niche = notFound ? undefined : getNicheBySlug(slug);

  if (notFound || !niche) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-semibold">Package not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The niche edition you're looking for doesn't exist or has been unpublished.
        </p>
        <Link
          to="/packages"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:scale-[1.02]"
        >
          <Home className="h-4 w-4" /> Back to Packages
        </Link>
      </div>
    );
  }

  const Icon = nicheIcon(niche.icon);

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 md:px-12 md:py-14">
      <WatermarkPattern />
      <WatermarkWordmark />

      <div className="relative mx-auto max-w-4xl">
        {/* Brand header */}
        <Link to="/" className="inline-flex items-center gap-3 transition hover:opacity-90">
          <img
            src="/assets/3D Oryntal logo.webp"
            alt="Oryntal AI Labs"
            className="h-11 w-11 rounded-full object-cover shadow-gold-glow"
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            <span className="text-platinum-gradient">Oryntal</span>{" "}
            <span className="text-gold-gradient">AI Labs</span>
          </span>
        </Link>

        {/* Header */}
        <header className="mt-8 rounded-2xl bg-surface p-8 ring-1 ring-border shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] sm:p-10">
          <div className="flex items-start gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-xl glass ring-1 ring-border text-primary">
              <Icon className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {niche.nicheName}
              </h1>
              <p className="mt-2 font-display text-lg font-semibold leading-snug text-primary md:text-xl">
                {niche.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Read-only tiers below — expandable breakdowns showing build phase, monthly
                engagement, outcomes, and pricing as written.
              </p>
            </div>
          </div>
        </header>

        {/* Tiers */}
        <div className="mt-8">
          <PackageTiers tiers={niche.tiers} nicheName={niche.nicheName} />
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/packages"
            className="text-sm text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
          >
            Explore all packages →
          </Link>
        </div>
      </div>
    </div>
  );
}