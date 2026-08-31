import { Link } from "@tanstack/react-router";
import { ArrowRight, Share2, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { listPackages } from "@/lib/api/packages";
import { NICHE_ICONS } from "@/lib/mockData";
import type { AIPackage } from "@/lib/mockData";

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
      className="inline-flex h-9 w-9 items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/40 active:scale-95"
    >
      <Share2 className="h-4 w-4" />
    </button>
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
      {packages.map((p) => {
        const Icon = NICHE_ICONS[p.icon] ?? Sparkles;
        const points = p.vision_points ?? [];
        return (
          <article
            key={p.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:-translate-y-1 supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.99]"
          >
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <ShareButton pkg={p} />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-primary">
                {p.tagline}
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
          </article>
        );
      })}
    </div>
  );
}
