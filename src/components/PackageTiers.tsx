import { Link } from "@tanstack/react-router";
import {
  Layers,
  Briefcase,
  Rocket,
  Bot,
  Code2,
  Sparkles,
  LifeBuoy,
  Database,
  Users,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listPackages } from "@/lib/api/packages";
import type { AIPackage } from "@/lib/mockData";

const TIER_ICONS: Record<AIPackage["tierIcon"], LucideIcon> = {
  layers: Layers,
  briefcase: Briefcase,
  rocket: Rocket,
};

const ITEM_ICONS: Record<string, LucideIcon> = {
  workflow: Bot,
  dev: Code2,
  fine: Sparkles,
  support: LifeBuoy,
  data: Database,
  squad: Users,
};

export function PackageTierCards() {
  const { data, isPending } = useQuery({
    queryKey: ["packages"],
    queryFn: () => listPackages(),
  });
  const packages = data?.ok ? data.items : [];
  if (isPending || packages.length === 0) return null;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {packages.map((p) => {
        const TierIcon = TIER_ICONS[p.tierIcon];
        return (
          <article
            key={p.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:ring-primary/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)]"
          >
            {p.featured && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow-gold-glow">
                Most asked for
              </span>
            )}

            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                  <TierIcon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="truncate text-sm text-primary">{p.tagline}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.positioning}</p>

              <ul className="mt-5 space-y-2.5">
                {p.items.map((item) => {
                  const Icon = ITEM_ICONS[item.icon] ?? Sparkles;
                  return (
                    <li
                      key={item.label}
                      className="flex items-center gap-2.5 text-sm text-foreground/90"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.9} />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-auto border-t border-border p-6 pt-5 sm:px-7">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-gold-glow"
              >
                {p.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
