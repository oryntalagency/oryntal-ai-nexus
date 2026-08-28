import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Boxes, Workflow, Cpu, BookOpen } from "lucide-react";
import { listProducts } from "@/lib/api/products";
import { listBlogPosts } from "@/lib/api/blog";
import { OFFERING_META } from "@/lib/mockData";
import { PageHeader, StatCard, StatusBadge } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: productData } = useQuery({
    queryKey: ["products", "all"],
    queryFn: () => listProducts({ data: {} }),
  });
  const listings = productData?.ok ? productData.items : [];

  const { data: blogData } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts(),
  });
  const posts = blogData?.ok ? blogData.items : [];

  const counts = {
    saas: listings.filter((l) => l.offeringType === "saas").length,
    automation: listings.filter((l) => l.offeringType === "automation").length,
    model: listings.filter((l) => l.offeringType === "model").length,
    total: listings.length,
  };

  const recent = listings.slice(0, 5);
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Dashboard"
        title={
          <>
            <span className="text-platinum-gradient">Pulse</span>{" "}
            <span className="text-gold-gradient">of the catalog</span>
          </>
        }
        description="A quiet look at what's live — no clutter, no quick actions."
      />

      {/* Offering-type counters */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {(
          [
            ["saas", "SaaS Products", Boxes],
            ["automation", "AI Automations", Workflow],
            ["model", "AI Models & Agents", Cpu],
          ] as const
        ).map(([key, label, Icon]) => (
          <StatCard
            key={key}
            icon={<Icon className="h-4 w-4" />}
            label={label}
            value={counts[key]}
          />
        ))}
        <StatCard
          icon={<Boxes className="h-4 w-4" />}
          label="Total listings"
          value={counts.total}
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
        {/* Recent listings */}
        <div className="overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-lg font-semibold">Recent listings</h2>
            <span className="text-xs text-muted-foreground">Last {recent.length}</span>
          </div>
          <div className="divide-y divide-border">
            {recent.map((l) => {
              const Meta = OFFERING_META[l.offeringType];
              const status = l.status ?? "live";
              return (
                <div key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <div
                    className={`h-10 w-10 shrink-0 overflow-hidden rounded-xl ring-1 ring-border/50 ${
                      l.image ? "" : "bg-gradient-to-br " + l.gradient
                    }`}
                  >
                    {l.image ? (
                      <img src={l.image} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{l.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{l.creator}</p>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium ring-1 ring-border text-muted-foreground">
                    <Meta.icon className="h-3 w-3 text-primary" /> {Meta.label}
                  </span>
                  <StatusBadge status={status} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent blog posts */}
        <div className="overflow-hidden rounded-2xl ring-1 ring-border bg-surface">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-display text-lg font-semibold">Recent blog posts</h2>
            <span className="text-xs text-muted-foreground">Last {recentPosts.length}</span>
          </div>
          <div className="divide-y divide-border">
            {recentPosts.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-4">
                {p.cover ? (
                  <img
                    src={p.cover}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-xl object-cover ring-1 ring-border/50"
                  />
                ) : (
                  <div
                    className={`h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    <BookOpen className="mr-1 inline h-3 w-3" />
                    {p.author} · {p.readTime}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${
                    p.trending
                      ? "bg-primary/10 text-primary ring-primary/30"
                      : "bg-secondary text-muted-foreground ring-border"
                  }`}
                >
                  {p.trending ? "Trending" : "Post"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
