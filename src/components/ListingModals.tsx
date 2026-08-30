import { Link } from "@tanstack/react-router";
import {
  CircleAlert,
  Check,
  ArrowUpRight,
  CalendarCheck,
  GraduationCap,
  MessageCircle,
  Play,
} from "lucide-react";
import type { Listing } from "@/lib/mockData";
import { OFFERING_META } from "@/lib/mockData";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function embedUrl(url: string): string {
  if (url.includes("loom.com")) {
    return url
      .replace("loom.com/share/", "loom.com/embed/")
      .replace("loom.com/video/", "loom.com/embed/");
  }
  return url;
}

export function VideoLightbox({ url, onClose }: { url: string | null; onClose: () => void }) {
  return (
    <Dialog open={!!url} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[min(1100px,94vw)] border-0 bg-black/95 p-2 sm:p-3">
        <iframe
          src={url ? embedUrl(url) : ""}
          title="Preview"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full rounded-lg bg-black"
        />
      </DialogContent>
    </Dialog>
  );
}

export function ListingDetail({
  listing,
  onClose,
  onPlay,
}: {
  listing: Listing | null;
  onClose: () => void;
  onPlay: (listing: Listing) => void;
}) {
  return (
    <Dialog open={!!listing} onOpenChange={(open) => !open && onClose()}>
      {listing && <DetailContent listing={listing} onPlay={onPlay} />}
    </Dialog>
  );
}

function DetailContent({ listing, onPlay }: { listing: Listing; onPlay: (l: Listing) => void }) {
  const l = listing;
  const { icon: OfferingIcon, label: offeringLabel } = OFFERING_META[l.offeringType];
  return (
    <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-y-auto p-0 sm:max-w-3xl">
      {/* Full image header */}
      <div
        className={`relative h-56 w-full sm:h-72 ${l.image ? "" : "bg-gradient-to-br " + l.gradient}`}
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
        {l.video && (
          <button
            type="button"
            onClick={() => onPlay(l)}
            className="absolute bottom-3 right-3 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110"
          >
            <Play className="h-3 w-3 fill-current" /> Watch preview
          </button>
        )}
        {l.loomUrl?.trim() && (
          <a
            href={l.loomUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${l.video ? "absolute right-3 bottom-16" : "absolute bottom-3 right-3"} inline-flex min-h-10 items-center gap-1.5 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-foreground ring-1 ring-border transition hover:text-primary hover:ring-primary/50`}
          >
            <ArrowUpRight className="h-3 w-3" /> Demo Loom Video
          </a>
        )}
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">{l.title}</h2>
        <p className="mt-0.5 text-sm text-primary">{l.creator}</p>
        <p className="mt-3 text-muted-foreground">{l.tagline}</p>

        {l.video && (
          <div className="mt-6 aspect-video overflow-hidden rounded-xl ring-1 ring-border">
            <iframe
              src={embedUrl(l.video)}
              title={`${l.title} preview`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
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
          <CtaFor listing={l} />
        </div>
      </div>
    </DialogContent>
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

function CtaFor({ listing }: { listing: Listing }) {
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
          See packages <ArrowUpRight className="h-4 w-4" />
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
