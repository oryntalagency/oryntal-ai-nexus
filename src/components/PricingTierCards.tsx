import { Link } from "@tanstack/react-router";
import { Check, Share2, Sparkles } from "lucide-react";

import type { AIPackage, PackageTier } from "@/lib/mockData";
import { shareTier } from "@/lib/share";

// A tier is only worth rendering once it has a name and both prices. Packages
// whose pricing hasn't been written yet ship blank tiers (see emptyTiers()).
function isPublishable(tier: PackageTier): boolean {
  return Boolean(tier.tier_name && tier.setup_price && tier.monthly_price);
}

function TierShareButton({
  pkg,
  tier,
  index,
}: {
  pkg: AIPackage;
  tier: PackageTier;
  index: number;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void shareTier(pkg, tier, index);
      }}
      aria-label={`Share the ${tier.tier_name} tier`}
      title={`Share ${tier.tier_name}`}
      className="inline-flex min-h-11 shrink-0 touch-manipulation items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-foreground ring-1 ring-border transition hover:bg-primary/10 hover:text-primary hover:ring-primary/40 active:scale-[0.98] sm:min-h-0"
    >
      <Share2 className="h-4 w-4" />
      <span className="sm:hidden">Share</span>
    </button>
  );
}

function TierCard({ pkg, tier, index }: { pkg: AIPackage; tier: PackageTier; index: number }) {
  const highlighted = tier.highlighted;

  return (
    <article
      id={`tier-${index + 1}`}
      // Tier cards must be able to scroll-margin past the sticky-free header,
      // and are the deep-link target for ?tier=<n>.
      className={`flex scroll-mt-24 flex-col rounded-2xl bg-surface p-6 ring-1 transition sm:p-7 ${
        highlighted
          ? "ring-primary/50 shadow-[0_20px_60px_-24px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
          : "ring-border"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
          {tier.tier_name}
        </h3>
        {highlighted && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/30">
            <Sparkles className="h-3 w-3" />
            Popular
          </span>
        )}
      </div>

      {/* Setup and monthly are two separate figures, never concatenated: the
          one-time cost is the headline number and the recurring cost sits
          beneath it as secondary text. */}
      <div className="mt-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {tier.setup_price}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            one-time setup
          </span>
        </div>
        <p className="mt-1.5 text-base font-semibold text-primary">+ {tier.monthly_price}</p>
      </div>

      <ul className="mt-6 space-y-3">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm leading-[1.6] text-foreground/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Footer: CTA and Share share one flex row and both are size:auto, so
          neither can be pushed out of, or painted over, the other at any
          width. min-w-0 on the CTA lets its label truncate instead of forcing
          the row wider than the card. */}
      <div className="mt-auto flex flex-col gap-2 pt-7 sm:flex-row sm:items-center">
        <Link
          to="/contact"
          className={`inline-flex min-h-11 min-w-0 flex-1 touch-manipulation items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] sm:min-h-0 ${
            highlighted
              ? "bg-primary text-primary-foreground shadow-gold-glow hover:scale-[1.02]"
              : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
          }`}
        >
          <span className="truncate">{tier.cta_label}</span>
        </Link>
        <TierShareButton pkg={pkg} tier={tier} index={index} />
      </div>
    </article>
  );
}

export function PricingTierCards({ pkg }: { pkg: AIPackage }) {
  // Original indices are preserved through the filter so a tier's share link
  // keeps pointing at the same card it was generated from.
  const published = (pkg.tiers ?? [])
    .map((tier, index) => ({ tier, index }))
    .filter(({ tier }) => isPublishable(tier));

  if (published.length === 0) return null;

  return (
    <section aria-labelledby="pricing-tiers-heading" className="mt-10">
      <h2
        id="pricing-tiers-heading"
        className="font-display text-xl font-semibold tracking-tight sm:text-2xl"
      >
        Pricing tiers
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        One-time setup gets the system live. The monthly fee keeps it monitored, tuned, and
        improving.
      </p>

      <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-3">
        {published.map(({ tier, index }) => (
          <TierCard key={`${index}-${tier.tier_name}`} pkg={pkg} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}
