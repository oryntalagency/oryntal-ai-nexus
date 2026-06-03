import { createFileRoute } from "@tanstack/react-router";
import { Settings, Download, Sparkles } from "lucide-react";
import { models } from "@/lib/mockData";
import { ModelCard } from "@/components/ModelCard";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Oryntal AI Labs" },
      { name: "description", content: "Your Oryntal AI Labs profile, models, and activity." },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-border bg-gradient-to-br from-[oklch(0.18_0.02_60)] via-[oklch(0.22_0.04_60)] to-[oklch(0.3_0.08_70)] p-8 md:p-12">
        <div className="absolute inset-0 opacity-20 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
        <div className="relative flex flex-col md:flex-row gap-6 items-start md:items-end justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.55_0.14_70)] font-display text-2xl font-bold text-primary-foreground shadow-gold-glow">
              AC
            </div>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold">Alex Chen</h1>
              <p className="text-primary text-sm">@AlexAI</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">Fine-tuning open LLMs for production. Currently shipping Oryntal-Llama derivatives.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow">Follow</button>
            <button className="rounded-full glass px-3 py-2"><Settings className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-3 gap-4 max-w-md">
          <Stat icon={<Sparkles className="h-4 w-4" />} label="Models" value="12" />
          <Stat icon={<Download className="h-4 w-4" />} label="Downloads" value="1.2M" />
          <Stat label="Followers" value="8.4K" />
        </div>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Published Models</h2>
      <section className="mt-6 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5">
        {models.slice(0, 4).map((m) => <ModelCard key={m.id} model={m} />)}
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl glass px-4 py-3 ring-1 ring-border">
      <div className="text-xs text-muted-foreground inline-flex items-center gap-1">{icon}{label}</div>
      <div className="mt-1 font-display text-xl font-semibold">{value}</div>
    </div>
  );
}
