import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, Trash2, ImageIcon, Video } from "lucide-react";
import { adminActions, useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/admin-ui";
import { WatermarkedVideoPlayer } from "@/components/WatermarkedVideoPlayer";

export const Route = createFileRoute("/admin/media")({
  component: MediaPage,
});

function MediaPage() {
  const { media } = useAdminStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyUrl = async (asset: (typeof media)[number]) => {
    try {
      await navigator.clipboard.writeText(window.location.origin + asset.url);
      setCopiedId(asset.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1400px] mx-auto">
      <PageHeader
        kicker="Media"
        title={
          <>
            <span className="text-platinum-gradient">The</span>{" "}
            <span className="text-gold-gradient">library</span>
          </>
        }
        description="Every asset used across products and posts. Copy a URL into a form, or remove what's no longer needed."
      />

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {media.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            Nothing in the library yet.
          </p>
        )}
        {media.map((m) => (
          <div
            key={m.id}
            className="group overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition hover:ring-primary/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
              {m.kind === "image" ? (
                <img src={m.url} alt={m.name} className="h-full w-full object-cover" />
              ) : (
                <WatermarkedVideoPlayer
                  src={m.url}
                  fit="cover"
                  muted
                  playsInline
                  className="h-full w-full"
                />
              )}
              <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full glass px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border">
                {m.kind === "image" ? (
                  <ImageIcon className="h-3 w-3" />
                ) : (
                  <Video className="h-3 w-3" />
                )}
                {m.kind}
              </span>
            </div>

            <div className="p-3">
              <p className="truncate text-xs font-medium">{m.name}</p>
              <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                {m.size > 0 ? `${Math.round(m.size / 1024)} KB` : "generated asset"}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyUrl(m)}
                  className="flex-1 h-10 px-2 rounded-full text-[11px] sm:h-8"
                >
                  {copiedId === m.id ? (
                    <>
                      <Check className="h-3 w-3 text-primary" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy URL
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => adminActions.deleteMedia(m.id)}
                  className="h-10 w-10 px-0 rounded-full hover:text-destructive sm:h-8 sm:w-8"
                  aria-label="Delete asset"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
