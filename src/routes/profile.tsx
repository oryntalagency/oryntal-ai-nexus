import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings, Download, Sparkles, Layers } from "lucide-react";
import { listings } from "@/lib/mockData";
import type { Listing } from "@/lib/mockData";
import { ListingCard } from "@/components/ListingCard";
import { ListingDetail, VideoLightbox } from "@/components/ListingModals";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "About — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Oryntal AI Labs — the team behind the catalog: products, automations, and models.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const picks = listings.filter((l) => l.featured).slice(0, 4);

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-border bg-gradient-to-br from-[oklch(0.18_0.02_60)] via-[oklch(0.22_0.04_60)] to-[oklch(0.3_0.08_70)] p-8 md:p-12">
        <div className="absolute inset-0 opacity-20 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
        <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.55_0.14_70)] font-display text-2xl font-bold text-primary-foreground shadow-gold-glow overflow-hidden">
              <img
                src="/assets/ol.png"
                alt="Oryntal AI Labs"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold">Oryntal AI Labs</h1>
              <p className="text-primary text-sm">@oryntal</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                One lab, one roster: SaaS products, AI automations, and fine-tuned models — built to
                close real gaps.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow">
              Start a project
            </button>
            <button className="grid min-h-11 min-w-11 place-items-center rounded-full glass px-3 py-2">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-3 gap-4 max-w-md">
          <Stat icon={<Layers className="h-4 w-4" />} label="Products & tools" value="24" />
          <Stat icon={<Sparkles className="h-4 w-4" />} label="Automations" value="9" />
          <Stat icon={<Download className="h-4 w-4" />} label="Monthly deploys" value="41K" />
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Featured picks</h2>
      <section className="mt-6 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
        {picks.map((l) => (
          <ListingCard
            key={l.id}
            listing={l}
            onShow={setActiveListing}
            onPlay={(la) => setVideoUrl(la.video ?? null)}
          />
        ))}
      </section>

      <ListingDetail
        listing={activeListing}
        onClose={() => setActiveListing(null)}
        onPlay={(l) => setVideoUrl(l.video ?? null)}
      />
      <VideoLightbox url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}

function Stat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl glass px-4 py-3 ring-1 ring-border">
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1">
        {icon}
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-semibold">{value}</div>
    </div>
  );
}
