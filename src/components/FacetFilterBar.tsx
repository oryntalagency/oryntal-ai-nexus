import { useState } from "react";
import { Check, ChevronDown, SlidersHorizontal, X, Boxes, Workflow, Cpu } from "lucide-react";
import type { OfferingType } from "@/lib/mockData";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

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

type MoreFiltersDraft = {
  offering: OfferingFilter;
  industries: string[];
  techs: string[];
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
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState<MoreFiltersDraft>({
    offering: "all",
    industries: [],
    techs: [],
  });
  const isMobile = useIsMobile();

  const activeCount =
    selectedProblems.length +
    selectedIndustries.length +
    selectedTechs.length +
    (offering !== "all" ? 1 : 0);
  // Count for the mobile "Filters" badge: problems are shown inline as pills,
  // so only offering / industry / tech count as "hidden" active filters.
  const hiddenCount =
    selectedIndustries.length + selectedTechs.length + (offering !== "all" ? 1 : 0);
  const hasFilters = activeCount > 0;
  const allActive = selectedProblems.length === 0;

  const offeringOptions: Array<{ value: OfferingFilter; label: string; icon: typeof Boxes }> = [
    { value: "all", label: "All", icon: SlidersHorizontal },
    { value: "saas", label: "SaaS Product", icon: Boxes },
    { value: "automation", label: "AI Automation", icon: Workflow },
    { value: "model", label: "AI Model or Agent", icon: Cpu },
  ];

  const openSheet = () => {
    setDraft({ offering, industries: [...selectedIndustries], techs: [...selectedTechs] });
    setSheetOpen(true);
  };

  const commitDraft = (next: MoreFiltersDraft) => {
    if (next.offering !== offering) onOffering(next.offering);
    for (const ind of new Set([...selectedIndustries, ...next.industries])) {
      if (selectedIndustries.includes(ind) !== next.industries.includes(ind)) {
        onToggleIndustry(ind);
      }
    }
    for (const t of new Set([...selectedTechs, ...next.techs])) {
      if (selectedTechs.includes(t) !== next.techs.includes(t)) {
        onToggleTech(t);
      }
    }
  };

  const applyDraft = () => {
    commitDraft(draft);
    setSheetOpen(false);
  };

  const clearMore = () => {
    const cleared: MoreFiltersDraft = { offering: "all", industries: [], techs: [] };
    commitDraft(cleared);
    setSheetOpen(false);
  };

  const toggleDraft = (key: "industries" | "techs", item: string) =>
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(item) ? d[key].filter((x) => x !== item) : [...d[key], item],
    }));

  return (
    <section aria-label="Filters" className="mt-12 rounded-2xl glass p-3 sm:p-5 ring-1 ring-border">
      {/* Mobile — single compact row: problem pills + Filters button */}
      <div className="flex items-center gap-2 md:hidden">
        <div className="relative min-w-0 flex-1">
          <div className="overflow-x-auto scrollbar-hide -mr-2 pr-6">
            <div className="flex w-max items-center gap-1.5 pb-0.5">
              {problems.map((p) => {
                const on = p === "All" ? allActive : selectedProblems.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onToggleProblem(p)}
                    className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium ring-1 transition ${
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
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-surface/90 to-transparent" />
        </div>

        <button
          type="button"
          onClick={openSheet}
          aria-label="More filters"
          className="relative inline-flex h-10 w-11 shrink-0 items-center justify-center rounded-full glass ring-1 ring-border text-muted-foreground transition hover:text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {hiddenCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground ring-2 ring-surface">
              {hiddenCount}
            </span>
          )}
        </button>
      </div>

      {/* Desktop — unchanged layout */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-4">
          {/* Problem facet — primary */}
          <div className="flex flex-col gap-2.5">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <SlidersHorizontal className="h-3 w-3" /> Problem solved
            </span>
            <div className="relative -mx-1 pb-1 md:-mx-0">
              <div className="overflow-x-auto scrollbar-hide px-1 md:px-0">
                <div className="flex w-max gap-2">
                  {problems.map((p) => {
                    const on = p === "All" ? allActive : selectedProblems.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => onToggleProblem(p)}
                        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium ring-1 transition sm:min-h-0 sm:py-1.5 ${
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
              <div className="pointer-events-none absolute inset-y-1 right-0 w-6 bg-gradient-to-l from-surface/90 to-transparent md:hidden" />
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
                    className={`inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition sm:min-h-0 sm:py-1.5 ${
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

            {moreOpen && !isMobile && (
              <div className="mt-3 hidden md:grid gap-4 md:grid-cols-2">
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
                          className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-medium ring-1 transition ${
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
                          className={`inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-[11px] font-medium ring-1 transition ${
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
      </div>

      {/* Mobile bottom sheet — offering type, industry, tech */}
      <Drawer
        open={isMobile && sheetOpen}
        onOpenChange={(o) => setSheetOpen(o)}
        shouldScaleBackground={false}
      >
        <DrawerContent className="border-border bg-background">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-display text-lg">Filter results</DrawerTitle>
            <DrawerDescription>Offering type, industry, and tech stack.</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[55vh] space-y-6 overflow-y-auto px-4 pb-4">
            {/* Offering type */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Offering type
              </span>
              <div className="inline-flex max-w-full flex-wrap rounded-full glass p-1 ring-1 ring-border">
                {offeringOptions.map(({ value, label, icon: Icon }) => {
                  const on = draft.offering === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, offering: value }))}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition ${
                        on
                          ? "bg-primary text-primary-foreground shadow-gold-glow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Industry */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Industry
              </span>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => {
                  const on = draft.industries.includes(ind);
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => toggleDraft("industries", ind)}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${
                        on
                          ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                          : "glass text-muted-foreground ring-border active:text-foreground"
                      }`}
                    >
                      {on && <Check className="mr-1 h-3.5 w-3.5" />}
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tech */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Tech stack
              </span>
              <div className="flex flex-wrap gap-2">
                {techs.map((t) => {
                  const on = draft.techs.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleDraft("techs", t)}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 py-2 text-xs font-medium ring-1 transition ${
                        on
                          ? "bg-primary text-primary-foreground ring-primary shadow-gold-glow"
                          : "glass text-muted-foreground ring-border active:text-foreground"
                      }`}
                    >
                      {on && <Check className="mr-1 h-3.5 w-3.5" />}
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-border bg-background p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
            <button
              type="button"
              onClick={clearMore}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> Clear all
            </button>
            <button
              type="button"
              onClick={applyDraft}
              className="inline-flex min-h-12 flex-[1.4] items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-gold-glow transition active:opacity-80"
            >
              Apply
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
