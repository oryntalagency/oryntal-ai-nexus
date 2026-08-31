import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Home, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { getPackageBySlug } from "@/lib/api/packages";
import { NICHE_ICONS, type AIPackage } from "@/lib/mockData";

type PackageLoaderData = {
  pkg: AIPackage | null;
  notFound: boolean;
};

export const Route = createFileRoute("/packages/$slug")({
  head: (ctx) => {
    const data = ctx.loaderData as PackageLoaderData | undefined;
    const pkg = data?.pkg;
    const title = pkg ? `Oryntal AI Labs — ${pkg.name}` : "Package — Oryntal AI Labs";
    const description = pkg?.tagline ?? "A niche edition from Oryntal AI Labs.";
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
          content: pkg ? `https://oryntal-ai-labs.vercel.app/packages/${pkg.slug}` : undefined,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: "/assets/ol.png" },
      ],
    };
  },
  loader: async ({ params }) => {
    const result = await getPackageBySlug({ data: params.slug });
    return {
      pkg: result.ok ? result.item : null,
      notFound: !result.ok,
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
  const { pkg, notFound } = Route.useLoaderData() as PackageLoaderData;

  const shareLink = pkg ? `https://oryntal-ai-labs.vercel.app/packages/${pkg.slug}` : "";

  const handleShare = async () => {
    if (!pkg) return;
    const title = `Oryntal AI Labs — ${pkg.name}`;
    const text = pkg.tagline;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url: shareLink });
        return;
      } catch {
        // fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(shareLink);
      toast("Link copied", {
        description: "This package's link is now on your clipboard.",
      });
    } catch {
      toast("Couldn't copy", {
        description: "Copy this link manually: " + shareLink,
      });
    }
  };

  if (notFound || !pkg) {
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

  const Icon = NICHE_ICONS[pkg.icon] ?? Sparkles;
  const points = pkg.vision_points ?? [];

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 md:px-12 md:py-14">
      <WatermarkPattern />
      <WatermarkWordmark />

      <div className="relative mx-auto max-w-3xl">
        {/* Brand header — whoever receives the shared link sees whose pitch this is */}
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

        {/* Package card */}
        <article className="mt-8 rounded-2xl bg-surface ring-1 ring-border shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)]">
          <div className="p-8 sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share this package"
                title="Share this package"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {pkg.name}
            </h1>
            <p className="mt-2 font-display text-lg font-semibold leading-snug text-primary md:text-xl">
              {pkg.tagline}
            </p>

            <ul className="mt-7 space-y-4">
              {points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] font-medium leading-[1.7] text-foreground/90"
                >
                  <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/80" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border p-8 pt-6 sm:px-10">
            <Link
              to="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:scale-[1.02] active:scale-[0.99]"
            >
              See This for Your Business <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              One edition per industry — brought to you by Oryntal AI Labs.
            </p>
          </div>
        </article>

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
