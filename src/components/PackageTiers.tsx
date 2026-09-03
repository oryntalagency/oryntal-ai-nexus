import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCw, Share2, Sparkles, Wrench } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { listPackages } from "@/lib/api/packages";
import { NICHE_ICONS } from "@/lib/mockData";
import type { AIPackage } from "@/lib/mockData";
import { DeliveryAccordion } from "@/components/DeliveryAccordion";

function buildShareUrl(pkg: AIPackage): string {
  return `https://oryntal-ai-labs.vercel.app/packages/${pkg.slug}`;
}

async function sharePackage(pkg: AIPackage): Promise<void> {
  const url = buildShareUrl(pkg);
  const title = `Oryntal AI Labs — ${pkg.name}`;
  const text = pkg.tagline;

  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch {
      // user cancelled or the native sheet isn't available — fall through to copy
    }
  }

  try {
    await navigator.clipboard.writeText(url);
    toast("Link copied", {
      description: "This package's link is now on your clipboard.",
    });
  } catch {
    toast("Couldn't copy", {
      description: "Copy this link manually: " + url,
    });
  }
}

function ShareButton({ pkg }: { pkg: AIPackage }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void sharePackage(pkg);
      }}
      aria-label={`Share ${pkg.name} package`}
      title="Share this package"
      className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95 sm:h-9 sm:w-9"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}

// Subtle brand watermark on the back face, so a screenshot of the flipped card
// still carries the Oryntal mark.
function BackWatermark({ name }: { name: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden opacity-[0.05]"
    >
      <span className="rotate-[-28deg] whitespace-nowrap font-display text-4xl font-bold uppercase leading-none tracking-tight text-primary">
        Oryntal AI Labs · {name}
      </span>
    </div>
  );
}

function FlipPackageCard({ pkg }: { pkg: AIPackage }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = NICHE_ICONS[pkg.icon] ?? Sparkles;
  const points = pkg.vision_points ?? [];
  const delivery = pkg.delivery_points ?? [];

  return (
    <article className="group relative rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:-translate-y-1 supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.99]">
      <div
        className={`grid transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ---------- FRONT ---------- */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl [backface-visibility:hidden] [grid-area:1/1]">
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFlipped((f) => !f)}
                  aria-label={`See what Oryntal builds for ${pkg.name}`}
                  aria-pressed={flipped}
                  title="What do we actually build?"
                  className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95 sm:h-9 sm:w-9"
                >
                  <RotateCw className="h-4 w-4" />
                </button>
                <ShareButton pkg={pkg} />
              </div>
            </div>

            <h3 className="mt-5 font-display text-xl font-semibold">{pkg.name}</h3>
            <p className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-primary">
              {pkg.tagline}
            </p>

            <ul className="mt-5 space-y-3.5">
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

          <div className="mt-auto border-t border-border p-6 pt-5 sm:px-7">
            <Link
              to="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-gold-glow sm:min-h-0"
            >
              See This for Your Business <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ---------- BACK ---------- */}
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]">
          <BackWatermark name={pkg.name} />
          <div className="relative flex-1 p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                <Wrench className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                aria-label="Flip back to the vision"
                title="Back to the vision"
                className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95 sm:h-9 sm:w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Behind the vision
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold">What We Build</h3>

            <p className="mt-1 text-xs text-muted-foreground">
              The real deliverables that make the {pkg.name} vision happen.
            </p>

            <div className="mt-4">
              <DeliveryAccordion items={delivery} />
            </div>
          </div>

          <div className="relative border-t border-border px-6 py-4 sm:px-7">
            <p className="text-[11px] text-muted-foreground">
              Packaged &amp; delivered by{" "}
              <span className="font-semibold text-primary">Oryntal AI Labs</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function PackageTierCards() {
  const { data, isPending } = useQuery({
    queryKey: ["packages"],
    queryFn: () => listPackages(),
  });
  const packages = data?.ok ? data.items : [];
  if (isPending || packages.length === 0) return null;
  return (
    // Responsive grid — no hard limit on columns, so the section keeps
    // working (and scrolling) as more niches are added.
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {packages.map((p) => (
        <FlipPackageCard key={p.slug} pkg={p} />
      ))}
    </div>
  );
}
