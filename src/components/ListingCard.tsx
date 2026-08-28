import { Eye, Play, Check, ArrowUpRight } from "lucide-react";
import type { Listing } from "@/lib/mockData";
import { OfferingBadge } from "./OfferingBadge";

type Props = {
  listing: Listing;
  onShow: (listing: Listing) => void;
  onPlay: (listing: Listing) => void;
};

export function ListingCard({ listing, onShow, onPlay }: Props) {
  const primaryCta = listing.liveUrl ? (
    <a
      href={listing.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110"
    >
      Try it <ArrowUpRight className="h-3 w-3" />
    </a>
  ) : (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onShow(listing);
      }}
      className="pointer-events-auto inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110"
    >
      View <Eye className="h-3 w-3" />
    </button>
  );

  return (
    <article
      onClick={() => onShow(listing)}
      className="group relative mb-5 cursor-pointer break-inside-avoid overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:scale-[1.015] supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.985]"
    >
      {/* Visual anchor — image (required) or gradient fallback */}
      <div
        className={`relative w-full overflow-hidden ${listing.image ? "" : "bg-gradient-to-br " + listing.gradient}`}
        style={{ height: listing.height }}
      >
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 supports-[pointer:fine]:group-hover:scale-[1.04]"
          />
        ) : (
          <>
            <div className="absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-platinum-gradient font-display text-[120px] leading-none opacity-40 select-none">
                {listing.glyph}
              </span>
            </div>
          </>
        )}

        {/* Offering type badge — vector icon on the image */}
        <OfferingBadge
          type={listing.offeringType}
          className="absolute left-3 top-3 z-10 opacity-100 transition group-hover:opacity-100"
        />

        {/* Video / Loom play badge */}
        {listing.video && (
          <button
            type="button"
            aria-label="Play preview"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(listing);
            }}
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full glass text-foreground ring-1 ring-border transition hover:scale-105 hover:text-primary hover:ring-primary/50 sm:h-9 sm:w-9 active:scale-95"
          >
            <Play className="h-4 w-4 fill-current" />
          </button>
        )}

        {/* Hover overlay (fine pointer only — touch taps the card) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 transition-opacity duration-300 supports-[pointer:fine]:group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShow(listing);
            }}
            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition hover:text-primary sm:h-9 sm:w-9"
            aria-label="Quick preview"
          >
            <Eye className="h-4 w-4" />
          </button>
          {primaryCta}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
          {listing.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{listing.tagline}</p>

        <ul className="mt-3 space-y-1.5">
          {listing.advantagePoints.slice(0, 3).map((a) => (
            <li key={a} className="flex items-start gap-1.5 text-xs text-foreground/85">
              <Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
              <span className="line-clamp-1">{a}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
