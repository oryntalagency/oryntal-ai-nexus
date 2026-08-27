import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X, Boxes, Workflow, Cpu } from "lucide-react";
import type { OfferingType } from "@/lib/mockData";

export type OfferingFilter = "all" | OfferingType;

type FacetFilterBarProps = {
  problems: string[];
  selectedProblems: string[];
  onToggleProblem: (problem: string) => void;
  offering: OfferingFilter;
  onOffering: (offering: OfferingFilter) => void;
  industries: string[];
  selectedIndustries: string[];
  onToggleIndustry: (industry: string) => void;
  techs: string[];
  selectedTechs: string[];
  onToggleTech: (tech: string) => void;
  count: number;
  total: number;
  onClear: () => void;
};

export function FacetFilterBar({
  problems,
  selectedProblems,
  onToggleProblem,
  offering,
  onOffering,
  industries,
  selectedIndustries,
  onToggleIndustry,
  techs,
  selectedTechs,
  onToggleTech,
  count,
  total,
  onClear,
}: FacetFilterBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  const activeCount =
    selectedProblems.length +
    selectedIndustries.length +
    selectedTechs.length +
    (offering !== "all" ? 1 : 0);
  const hasFilters = activeCount > 0;
  const allActive = selectedProblems.length === 0;

  const offeringOptions: Array<{ value: OfferingFilter; label: string; icon: typeof Boxes }> = [
    { value: "all", label: "All", icon: SlidersHorizontal },
    { value: "saas", label: "SaaS Product", icon: Boxes },
    { value: "automation", label: "AI Automation", icon: Workflow },
    { value: "model", label: "AI Model or Agent", icon: Cpu },
  ];

  return (
    <section aria-label="Filters" className="mt-12 rounded-2xl glass p-4 sm:p-5 ring-1 ring-border">
      <div className="flex flex-col gap-4">
        {/* Problem facet — primary */}
        <div className="flex flex-col gap-2.5">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <SlidersHorizontal className="h-3 w-3" /> Problem solved
          </span>
          <div className="-mx-1 overflow-x-auto scrollbar-hide px-1 pb-1">
            <div className="flex w-max gap-2">
              {problems.map((p) => {
                const on = p === "All" ? allActive : selectedProblems.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onToggleProblem(p)}
                    className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 transition ${
                      on
                        ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                        : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          {/* Offering type facet — segmented toggle */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Offering type
            </span>
            <div className="inline-flex max-w-full flex-wrap rounded-full glass p-1 ring-1 ring-border">
              {offeringOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onOffering(value)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                    offering === value
                      ? "bg-primary text-primary-foreground shadow-gold-glow"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Result count + clear */}
          <div className="ml-auto flex items-center gap-3 pb-1">
            <span className="text-xs text-muted-foreground">
              {count} of {total} listing{total === 1 ? "" : "s"}
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

        {/* More filters — industry & tech function */}
        <div className="border-t border-border/60 pt-3.5">
          <button
            type="button"
            onClick={() => setMoreOpen((o) => !o)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`}
            />
            More filters
            {activeCount > 0 && (
              <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                {activeCount}
              </span>
            )}
          </button>

          {moreOpen && (
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Industry
                </span>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => {
                    const on = selectedIndustries.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        onClick={() => onToggleIndustry(ind)}
                        className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition ${
                          on
                            ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                            : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"
                        }`}
                      >
                        {ind}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Tech function
                </span>
                <div className="flex flex-wrap gap-2">
                  {techs.map((t) => {
                    const on = selectedTechs.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => onToggleTech(t)}
                        className={`rounded-full px-3 py-1 text-[11px] font-medium ring-1 transition ${
                          on
                            ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                            : "glass text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
