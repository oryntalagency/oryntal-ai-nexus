import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  CircleAlert,
  GraduationCap,
  Home,
  MessageCircle,
  Share2,
} from "lucide-react";
import { getProductBySlug } from "@/lib/api/products";
import { OFFERING_META } from "@/lib/mockData";
import type { Listing } from "@/lib/mockData";
import { productShareUrl, shareProduct } from "@/lib/share";
import { WatermarkedVideoPlayer } from "@/components/WatermarkedVideoPlayer";

type ProductLoaderData = {
  listing: Listing | null;
  notFound: boolean;
};

const SITE_BASE = "https://oryntal-ai-labs.vercel.app";

function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)([?#]|$)/i.test(url);
}

function embedUrl(url: string): string {
  if (url.includes("loom.com")) {
    return url
      .replace("loom.com/share/", "loom.com/embed/")
      .replace("loom.com/video/", "loom.com/embed/");
  }
  return url;
}

export const Route = createFileRoute("/products/$slug")({
  head: (ctx) => {
    const data = ctx.loaderData as ProductLoaderData | undefined;
    const listing = data?.listing;
    const title = listing ? `Oryntal AI Labs — ${listing.title}` : "Project — Oryntal AI Labs";
    const description = listing?.tagline ?? "A build from Oryntal AI Labs.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content: listing?.image
            ? listing.image.startsWith("http")
              ? listing.image
              : `${SITE_BASE}${listing.image}`
            : "/assets/ol.png",
        },
        {
          property: "og:url",
          content: listing ? productShareUrl(listing) : undefined,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
          name: "twitter:image",
          content: listing?.image
            ? listing.image.startsWith("http")
              ? listing.image
              : `${SITE_BASE}${listing.image}`
            : "/assets/ol.png",
        },
      ],
    };
  },
  loader: async ({ params }) => {
    const result = await getProductBySlug({ data: params.slug });
    return {
      listing: result.ok ? result.item : null,
      notFound: !result.ok,
    } satisfies ProductLoaderData;
  },
  component: ProductDetail,
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

function ProductDetail() {
  const { listing, notFound } = Route.useLoaderData() as ProductLoaderData;

  if (notFound || !listing) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-3xl font-semibold">Project not found</h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The build you're looking for doesn't exist or has been unpublished.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:scale-[1.02]"
        >
          <Home className="h-4 w-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  const l = listing;
  const { icon: OfferingIcon, label: offeringLabel } = OFFERING_META[l.offeringType];

  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10 md:px-12 md:py-14">
      <WatermarkPattern />
      <WatermarkWordmark />

      <div className="relative mx-auto max-w-3xl">
        {/* Brand header — whoever receives the shared link sees whose build this is */}
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

        {/* Project card */}
        <article className="mt-8 overflow-hidden rounded-2xl bg-surface ring-1 ring-border shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)]">
          {/* Image header */}
          <div
            className={`relative h-56 w-full sm:h-72 ${
              l.image ? "" : "bg-gradient-to-br " + l.gradient
            }`}
          >
            {l.image ? (
              <img src={l.image} alt={l.title} className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
            )}
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border">
              <OfferingIcon className="h-3.5 w-3.5" />
              {offeringLabel}
            </span>
            <button
              type="button"
              onClick={() => void shareProduct(l)}
              aria-label="Share this project"
              title="Share this project"
              className="absolute right-3 top-3 inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95 sm:h-9 sm:w-9"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                {l.title}
              </h1>
              <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-semibold text-muted-foreground ring-1 ring-border">
                <OfferingIcon className="h-3.5 w-3.5" />
                {offeringLabel}
              </div>
            </div>
            <p className="mt-0.5 text-sm text-primary">{l.creator}</p>
            <p className="mt-3 text-muted-foreground">{l.tagline}</p>

            {l.video && (
              <div className="mt-6 aspect-video overflow-hidden rounded-xl ring-1 ring-border">
                {isDirectVideoFile(l.video) ? (
                  <WatermarkedVideoPlayer
                    src={l.video}
                    controls
                    playsInline
                    className="h-full w-full"
                  />
                ) : (
                  <iframe
                    src={embedUrl(l.video)}
                    title={`${l.title} preview`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                )}
              </div>
            )}

            <DetailSection
              title="What it solves"
              items={l.problemPoints}
              icon={<CircleAlert className="h-3.5 w-3.5 shrink-0 text-primary" />}
            />
            <DetailSection
              title="Why it's better"
              items={l.advantagePoints}
              icon={<Check className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={3} />}
            />

            {/* Tag chips */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {[...l.problems, ...l.industries, ...l.techs].map((t) => (
                <span
                  key={t}
                  className="rounded-full glass px-2.5 py-1 text-[11px] font-medium text-muted-foreground ring-1 ring-border"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <ProductCta listing={l} />
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Built &amp; delivered by{" "}
              <span className="font-semibold text-primary">Oryntal AI Labs</span>
            </p>
          </div>
        </article>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="text-sm text-muted-foreground underline-offset-4 transition hover:text-primary hover:underline"
          >
            Explore all projects →
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailSection({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              {icon}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductCta({ listing }: { listing: Listing }) {
  const primary =
    "inline-flex min-h-12 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110 sm:min-h-0";
  const secondary =
    "inline-flex min-h-12 items-center gap-1.5 rounded-full glass px-5 py-2.5 text-sm font-medium ring-1 ring-border transition hover:text-foreground hover:ring-primary/40 sm:min-h-0";

  if (listing.offeringType === "saas" && listing.liveUrl) {
    return (
      <>
        <a href={listing.liveUrl} target="_blank" rel="noopener noreferrer" className={primary}>
          Try it <ArrowUpRight className="h-4 w-4" />
        </a>
        <Link to="/contact" className={secondary}>
          <MessageCircle className="h-4 w-4" /> Questions? Talk to us
        </Link>
      </>
    );
  }
  if (listing.offeringType === "automation") {
    return (
      <>
        <Link to="/contact" className={primary}>
          <CalendarCheck className="h-4 w-4" /> Book a call
        </Link>
        <Link to="/packages" className={secondary}>
          See packages <ArrowRight className="h-4 w-4" />
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to="/contact" className={primary}>
        <GraduationCap className="h-4 w-4" /> Learn more
      </Link>
      <Link to="/contact" className={secondary}>
        <MessageCircle className="h-4 w-4" /> Ask about this model
      </Link>
    </>
  );
}
