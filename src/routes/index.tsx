import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TrendingUp, Download } from "lucide-react";
import { models, categories, labs } from "@/lib/mockData";
import { ModelCard } from "@/components/ModelCard";
import { HeroAI } from "@/components/HeroAI";
import { FacetFilterBar, type PriceFilter, type SortKey } from "@/components/FacetFilterBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oryntal AI Labs — Handcrafted AI Models" },
      { name: "description", content: "A curated marketplace for production-ready open-source and fine-tuned AI models." },
    ],
  }),
  component: Home,
});

const FACET_CATEGORIES = categories.filter((c) => c !== "All");

const parseLatency = (s: string) => Number(s.replace(/[^0-9.]/g, "") || 0);
const parseSize = (s: string) => {
  const n = Number(s.replace(/[^0-9.]/g, "") || 0);
  return s.includes("M") ? n / 1000 : n; // "120M" → 0.12B
};

function Home() {
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceFilter>("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [query, setQuery] = useState("");

  const resetFilters = () => {
    setSelectedCats([]);
    setPrice("All");
    setSort("featured");
  };

  const filtered = useMemo(() => {
    let list = models.filter(
      (m) =>
        (selectedCats.length === 0 || selectedCats.includes(m.category)) &&
        (price === "All" || m.price === price) &&
        (query === "" || m.title.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "fastest") list = [...list].sort((a, b) => parseLatency(a.latency) - parseLatency(b.latency));
    if (sort === "smallest") list = [...list].sort((a, b) => parseSize(a.size) - parseSize(b.size));
    return list;
  }, [selectedCats, price, sort, query]);

  const half = Math.ceil(filtered.length / 2);
  const first = filtered.slice(0, half);
  const second = filtered.slice(half);

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      <HeroAI query={query} setQuery={setQuery} />

      {/* Facet Filter Bar (Section 2) */}
      <FacetFilterBar
        categories={FACET_CATEGORIES}
        selected={selectedCats}
        onToggleCategory={(c) =>
          setSelectedCats((prev) =>
            prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
          )
        }
        price={price}
        onPrice={setPrice}
        sort={sort}
        onSort={setSort}
        count={filtered.length}
        total={models.length}
        onClear={resetFilters}
      />

      {/* Masonry — first half */}
      <section className="mt-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
        {first.map((m) => <ModelCard key={m.id} model={m} />)}
      </section>

      {/* Trending Labs Slider */}
      <section className="mt-14">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <TrendingUp className="h-5 w-5 text-primary" /> Trending Labs
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Featured creators shaping the open AI frontier.</p>
          </div>
          <button className="hidden md:block text-xs text-primary hover:underline">View all</button>
        </div>

        <div className="-mx-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-2 min-w-max pb-2">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="group w-[280px] shrink-0 rounded-2xl glass p-5 ring-1 ring-border transition hover:ring-primary/40"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.6_0.14_70)] font-display text-sm font-bold text-primary-foreground">
                    {lab.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold leading-tight truncate">{lab.name}</p>
                    <p className="text-xs text-primary truncate">{lab.handle}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{lab.bio}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3 w-3" /> {lab.downloads}
                  </span>
                  <button className="rounded-full bg-secondary px-3 py-1 text-xs font-medium hover:bg-primary hover:text-primary-foreground transition">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry — second half */}
      {second.length > 0 && (
        <section className="mt-14 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
          {second.map((m) => <ModelCard key={m.id} model={m} />)}
        </section>
      )}

      <footer className="mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
        © 2026 Oryntal AI Labs · Crafted with intent.{" "}
        <Link to="/admin" className="text-primary hover:underline">Admin</Link>
      </footer>
    </div>
  );
}
