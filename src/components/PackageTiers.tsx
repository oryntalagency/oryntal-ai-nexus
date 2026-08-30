import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listPackages } from "@/lib/api/packages";
import { NICHE_ICONS } from "@/lib/mockData";

export function PackageTierCards() {
  const { data, isPending } = useQuery({
    queryKey: ["packages"],
    queryFn: () => listPackages(),
  });
  const packages = data?.ok ? data.items : [];
  if (isPending || packages.length === 0) return null;
  return (
    // Responsive grid — no hard limit on columns, so the section keeps
    // working (and scrolling) as more niches are added.
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {packages.map((p) => {
        const Icon = NICHE_ICONS[p.icon] ?? Sparkles;
        const points = p.vision_points ?? [];
        return (
          <article
            key={p.slug}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 supports-[pointer:fine]:hover:-translate-y-1 supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)] active:scale-[0.99]"
          >
            <div className="p-6 sm:p-7">
              <div className="grid h-12 w-12 place-items-center rounded-xl glass ring-1 ring-border text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold">{p.name}</h3>
              <p className="mt-1.5 font-display text-[17px] font-semibold leading-snug text-primary">
                {p.tagline}
              </p>

              <ul className="mt-5 space-y-3.5">
                {points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] font-medium leading-[1.7] text-foreground/90"
                  >
                    <span className="mt-[8px] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/80" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto border-t border-border p-6 pt-5 sm:px-7">
              <Link
                to="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold transition group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-gold-glow sm:min-h-0"
              >
                See This for Your Business <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
