import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PenLine, Linkedin, Instagram } from "lucide-react";
import { listBlogPosts } from "@/lib/api/blog";
import { ThoughtComposer } from "@/components/ThoughtComposer";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Community Thoughts — Oryntal AI Labs" },
      {
        name: "description",
        content: "Essays, field notes, and ideas from the Oryntal community of AI builders.",
      },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  const [tab, setTab] = useState<"trending" | "latest">("trending");
  const [composerOpen, setComposerOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["blog", "posts"],
    queryFn: () => listBlogPosts(),
  });
  const posts = useMemo(() => (data?.ok ? data.items : []), [data]);

  const onThoughtPublished = () => {
    void queryClient.invalidateQueries({ queryKey: ["blog", "posts"] });
  };

  const list = useMemo(
    () =>
      tab === "trending"
        ? posts.filter((b) => b.trending).concat(posts.filter((b) => !b.trending))
        : [...posts].reverse(),
    [tab, posts],
  );

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Community</span>{" "}
            <span className="text-gold-gradient">Thoughts</span>
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Field notes from builders shipping real models. Raw, opinionated, and useful.
          </p>
        </div>
        <button
          onClick={() => setComposerOpen(true)}
          className="inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold-glow hover:scale-[1.02] transition"
        >
          <PenLine className="h-4 w-4" /> Share Your Thoughts
        </button>
      </div>

      {/* Segmented control */}
      <div className="mt-8 inline-flex rounded-full glass p-1 ring-1 ring-border">
        {(["trending", "latest"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`inline-flex min-h-10 items-center rounded-full px-5 py-2.5 text-sm font-medium transition sm:min-h-0 sm:py-2 ${
              tab === t
                ? "bg-primary text-primary-foreground shadow-gold-glow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "trending" ? "Trending Thoughts" : "Latest Updates"}
          </button>
        ))}
      </div>

      {/* Masonry feed */}
      <section className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5">
        {list.map((b) => (
          <article
            key={b.id}
            className="group mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition supports-[pointer:fine]:hover:ring-primary/40 supports-[pointer:fine]:hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_40%,transparent)] active:scale-[0.99]"
          >
            {/* Cover */}
            <div
              className={`relative bg-gradient-to-br ${b.gradient}`}
              style={{ height: b.height }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_40%,oklch(0.1_0_0/0.6))]" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                {b.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full glass px-2 py-0.5 text-[10px] font-medium text-foreground/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5">
              {/* Author */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.6_0.14_70)] text-xs font-bold text-primary-foreground">
                    {b.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-sm font-medium leading-tight">{b.author}</p>
                      {b.linkedinUrl && (
                        <a
                          href={b.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${b.author} on LinkedIn`}
                          className="shrink-0 text-muted-foreground transition hover:text-primary"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {b.instagramUrl && (
                        <a
                          href={b.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${b.author} on Instagram`}
                          className="shrink-0 text-muted-foreground transition hover:text-primary"
                        >
                          <Instagram className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{b.readTime}</p>
                  </div>
                </div>
                <button className="inline-flex min-h-9 items-center rounded-full bg-secondary px-3 py-1.5 text-[11px] font-medium hover:bg-primary hover:text-primary-foreground transition sm:py-1">
                  Follow
                </button>
              </div>

              {/* Hook */}
              <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-foreground">
                {b.heading ?? b.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.hook}</p>
            </div>
          </article>
        ))}
      </section>

      <footer className="mt-20 border-t border-border pt-8 pb-4 text-center text-xs text-muted-foreground">
        © 2026 Oryntal AI Labs · Crafted with intent.
      </footer>

      <ThoughtComposer
        open={composerOpen}
        onOpenChange={setComposerOpen}
        onPublished={onThoughtPublished}
      />
    </div>
  );
}
