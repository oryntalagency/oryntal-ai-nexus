import { SlidersHorizontal, X } from "lucide-react";

export type PriceFilter = "All" | "Free" | "Premium";
export type SortKey = "featured" | "fastest" | "smallest";

type FacetFilterBarProps = {
  categories: string[];
  selected: string[];
  onToggleCategory: (category: string) => void;
  price: PriceFilter;
  onPrice: (price: PriceFilter) => void;
  sort: SortKey;
  onSort: (sort: SortKey) => void;
  count: number;
  total: number;
  onClear: () => void;
};

export function FacetFilterBar({
  categories,
  selected,
  onToggleCategory,
  price,
  onPrice,
  sort,
  onSort,
  count,
  total,
  onClear,
}: FacetFilterBarProps) {
  const hasFilters = selected.length > 0 || price !== "All" || sort !== "featured";

  return (
    <section aria-label="Filters" className="mt-12 rounded-2xl glass p-4 sm:p-5 ring-1 ring-border">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-5">
        {/* Category facet */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <SlidersHorizontal className="h-3 w-3" /> Category
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const on = selected.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onToggleCategory(c)}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 transition ${
                    on
                      ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                      : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price facet */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Price
          </span>
          <div className="inline-flex rounded-full glass p-1 ring-1 ring-border">
            {(["All", "Free", "Premium"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => onPrice(p)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  price === p
                    ? "bg-primary text-primary-foreground shadow-gold-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Sort
          </span>
          <div className="inline-flex rounded-full glass p-1 ring-1 ring-border">
            {(
              [
                ["featured", "Featured"],
                ["fastest", "Fastest"],
                ["smallest", "Smallest"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => onSort(key)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  sort === key
                    ? "bg-primary text-primary-foreground shadow-gold-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count + clear */}
        <div className="ml-auto flex items-center gap-3 self-end pb-1">
          <span className="text-xs text-muted-foreground">
            {count} of {total} model{total === 1 ? "" : "s"}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/40 transition hover:bg-primary/10"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
