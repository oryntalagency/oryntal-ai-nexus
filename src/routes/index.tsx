import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, ArrowUpRight, ArrowRight, Sparkles } from "lucide-react";
import { FEATURED_CAP } from "@/lib/mockData";
import type { Listing } from "@/lib/mockData";
import { listProducts } from "@/lib/api/products";
import { listTags } from "@/lib/api/tags";
import { ListingCard } from "@/components/ListingCard";
import { ListingDetail, VideoLightbox } from "@/components/ListingModals";
import { PackageTierCards } from "@/components/PackageTiers";
import { HeroAI } from "@/components/HeroAI";
import { FacetFilterBar, type OfferingFilter } from "@/components/FacetFilterBar";
import { OfferingIcon } from "@/components/OfferingBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oryntal AI Labs — Build What's Next" },
      {
        name: "description",
        content:
          "A curated catalog of SaaS products, AI automations, and fine-tuned models, built by Oryntal AI Labs to close real gaps.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [offering, setOffering] = useState<OfferingFilter>("all");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [activeListing, setActiveListing] = useState<Listing | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedProblems([]);
    setOffering("all");
    setSelectedIndustries([]);
    setSelectedTechs([]);
  };

  const { data, isFetching } = useQuery({
    queryKey: ["listings", selectedProblems, offering, selectedIndustries, selectedTechs, query],
    queryFn: () =>
      listProducts({
        data: {
          problems: selectedProblems,
          offering,
          industries: selectedIndustries,
          techs: selectedTechs,
          query: query.trim() || undefined,
        },
      }),
  });
  const listings = data?.ok ? data.items : [];

  const { data: featuredData } = useQuery({
    queryKey: ["listings", "featured"],
    queryFn: () => listProducts({ data: { featured: true } }),
  });
  const featured = useMemo(
    () => (featuredData?.ok ? featuredData.items.slice(0, FEATURED_CAP) : []),
    [featuredData],
  );

  const { data: tagData } = useQuery({
    queryKey: ["tags"],
    queryFn: () => listTags({ data: {} }),
  });
  const tagItems = useMemo(() => (tagData && tagData.ok ? tagData.items : []), [tagData]);

  const problemsOptions = useMemo(
    () => [
      "All",
      ...tagItems.filter((t) => t.facet === "problem" && t.label !== "All").map((t) => t.label),
    ],
    [tagItems],
  );
  const industriesOptions = useMemo(
    () => tagItems.filter((t) => t.facet === "industry").map((t) => t.label),
    [tagItems],
  );
  const techsOptions = useMemo(
    () => tagItems.filter((t) => t.facet === "tech").map((t) => t.label),
    [tagItems],
  );

  const openVideo = (l: Listing) => setVideoUrl(l.video ?? null);

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      <HeroAI query={query} setQuery={setQuery} />

      {/* Facet Filter Bar */}
      <FacetFilterBar
        problems={problemsOptions}
        selectedProblems={selectedProblems}
        onToggleProblem={(p) => {
          if (p === "All") {
            setSelectedProblems([]);
            return;
          }
          setSelectedProblems((prev) =>
            prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
          );
        }}
        offering={offering}
        onOffering={setOffering}
        industries={industriesOptions}
        selectedIndustries={selectedIndustries}
        onToggleIndustry={(ind) =>
          setSelectedIndustries((prev) =>
            prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind],
          )
        }
        techs={techsOptions}
        selectedTechs={selectedTechs}
        onToggleTech={(t) =>
          setSelectedTechs((prev) =>
            prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
          )
        }
        count={listings.length}
        total={featuredData?.ok ? featuredData.items.length : listings.length}
        onClear={resetFilters}
      />

      {/* Masonry grid */}
      {isFetching && listings.length === 0 ? (
        <div className="mt-10 rounded-2xl glass p-12 text-center ring-1 ring-border">
          <p className="font-display text-lg font-semibold">Loading the catalog…</p>
        </div>
      ) : listings.length > 0 ? (
        <section className="mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} onShow={setActiveListing} onPlay={openVideo} />
          ))}
        </section>
      ) : (
        <div className="mt-10 rounded-2xl glass p-12 text-center ring-1 ring-border">
          <p className="font-display text-lg font-semibold">No listings match those filters.</p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 inline-flex min-h-11 items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="mt-16">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
                <TrendingUp className="h-5 w-5 text-primary" /> Featured
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                A taste of the catalog — products, automations, and models, hand-picked by the lab.
              </p>
            </div>
            <span className="hidden md:block text-xs text-muted-foreground">
              {featured.length} picks
            </span>
          </div>

          <div className="relative -mx-2">
            <div className="overflow-x-auto scrollbar-hide px-2 pb-2">
              <div className="flex gap-4 min-w-max">
                {featured.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setActiveListing(l)}
                    className="group w-[300px] shrink-0 rounded-2xl glass p-3 text-left ring-1 ring-border transition hover:ring-primary/40"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/60">
                        {l.image ? (
                          <img
                            src={l.image}
                            alt={l.title}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className={`h-full w-full bg-gradient-to-br ${l.gradient}`} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <OfferingIcon type={l.offeringType} className="h-3 w-3" />
                          <h3 className="truncate font-display text-sm font-semibold">{l.title}</h3>
                        </div>
                        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                          {l.tagline}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background/90 to-transparent md:hidden" />
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="mt-16">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
              <Sparkles className="h-3 w-3 text-primary" /> Packages
            </p>
            <h2 className="font-display text-2xl font-semibold">Future states, per industry.</h2>
            <p className="text-sm text-muted-foreground mt-1">
              One edition per niche — a vision of your business after working with the lab, not a
              menu of deliverables.
            </p>
          </div>
          <Link
            to="/packages"
            className="hidden md:inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Explore all packages <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <PackageTierCards />
      </section>

      <footer className="mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
        © 2026 Oryntal AI Labs · Crafted with intent.{" "}
        <Link to="/admin" className="text-primary hover:underline">
          Admin
        </Link>
      </footer>

      {/* Detail + video overlays */}
      <ListingDetail
        listing={activeListing}
        onClose={() => setActiveListing(null)}
        onPlay={openVideo}
      />
      <VideoLightbox url={videoUrl} onClose={() => setVideoUrl(null)} />
    </div>
  );
}
