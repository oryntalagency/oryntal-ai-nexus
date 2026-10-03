import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { nicheIcon, nichePackages, type NichePackage } from "@/data/packages";

function NicheCard({ niche }: { niche: NichePackage }) {
  const Icon = nicheIcon(niche.icon);

  return (
    <Link
      to="/packages/$slug"
      params={{ slug: niche.slug }}
      className="group flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:-translate-y-1 supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.99] sm:p-7"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-xl glass ring-1 ring-border text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{niche.nicheName}</h3>
      <p className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-primary">
        {niche.tagline}
      </p>

      <p className="mt-auto pt-6 text-xs text-muted-foreground">
        {niche.tiers.length} engagement tiers
      </p>
    </Link>
  );
}

// Read-only niche overview. Data comes straight from src/data/packages.ts — there
// is no admin editor behind this grid.
export function NicheGrid({ niches = nichePackages }: { niches?: NichePackage[] }) {
  if (niches.length === 0) return null;

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {niches.map((niche) => (
        <NicheCard key={niche.slug} niche={niche} />
      ))}
    </div>
  );
}