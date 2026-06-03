import { Eye, Zap, Cpu, Tag } from "lucide-react";
import type { ModelCard as Model } from "@/lib/mockData";

export function ModelCard({ model }: { model: Model }) {
  return (
    <article className="group relative mb-5 break-inside-avoid overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-all duration-300 hover:scale-[1.015] hover:ring-primary/40 hover:shadow-[0_20px_60px_-20px_color-mix(in_oklab,var(--gold)_45%,transparent)]">
      {/* Abstract generative art */}
      <div
        className={`relative w-full bg-gradient-to-br ${model.gradient} overflow-hidden`}
        style={{ height: model.height }}
      >
        <div className="absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-platinum-gradient font-display text-[120px] leading-none opacity-40 select-none">
            {model.glyph}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end justify-between gap-2 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button className="flex h-9 w-9 items-center justify-center rounded-full glass text-foreground hover:text-primary">
            <Eye className="h-4 w-4" />
          </button>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-gold-glow">
            Deploy
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
          {model.title}
        </h3>
        <a className="mt-1 inline-block text-xs text-primary hover:underline">{model.creator}</a>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Badge icon={<Zap className="h-3 w-3" />} label={model.latency} />
          <Badge icon={<Cpu className="h-3 w-3" />} label={model.size} />
          <Badge
            icon={<Tag className="h-3 w-3" />}
            label={model.price}
            highlight={model.price === "Premium"}
          />
        </div>
      </div>
    </article>
  );
}

function Badge({ icon, label, highlight }: { icon: React.ReactNode; label: string; highlight?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${
        highlight
          ? "bg-primary/10 text-primary ring-primary/30"
          : "bg-secondary text-muted-foreground ring-border"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}
