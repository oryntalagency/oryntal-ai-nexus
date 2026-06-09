import { useEffect, useState } from "react";
import { Search, Cpu, Wand2, Image as ImageIcon, MessageSquare, Mic } from "lucide-react";
import logoAsset from "@/assets/oryntal-logo.asset.json";

const ROTATING = [
  { kicker: "Generative Intelligence", word: "Imagine." },
  { kicker: "Reasoning Engines", word: "Think." },
  { kicker: "Vision Models", word: "See." },
  { kicker: "Voice & Audio", word: "Speak." },
  { kicker: "Diffusion Art", word: "Create." },
];

const STREAM_LINES = [
  "→ loading oryntal-reason-13b…",
  "✓ context window: 128k tokens",
  "→ generating multimodal response…",
  "✓ latency 42ms · 1.4M tok/sec",
  "★ deployed · 14 edge regions",
];

type HeroAIProps = {
  query: string;
  setQuery: (v: string) => void;
};

// Outer nodes around the core
const NODES: Array<[number, number]> = [
  [80, 90],
  [320, 110],
  [70, 290],
  [330, 300],
  [200, 50],
  [200, 360],
  [50, 200],
  [350, 200],
];

export function HeroAI({ query, setQuery }: HeroAIProps) {
  const [idx, setIdx] = useState(0);
  const [streamIdx, setStreamIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStreamIdx((i) => (i + 1) % (STREAM_LINES.length + 1)), 1400);
    return () => clearInterval(t);
  }, []);

  const current = ROTATING[idx];

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-border/60 glass px-4 py-10 sm:px-6 sm:py-12 md:px-12 md:py-16">
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_82/0.25),transparent_60%)] blur-2xl animate-[breathe_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,oklch(0.55_0.12_60/0.22),transparent_60%)] blur-2xl animate-[breathe_10s_ease-in-out_infinite_1s]" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,oklch(0.78_0.13_82/0.4)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.78_0.13_82/0.4)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT — copy */}
        <div className="min-w-0">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Live · 2,400+ models · Curated daily
          </p>

          <div className="mb-3 h-5 overflow-hidden text-[10px] sm:text-xs font-medium uppercase tracking-[0.18em] text-primary">
            <div key={current.kicker} className="animate-[heroSlide_0.6s_ease-out]">
              {current.kicker}
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="text-platinum-gradient">Where AI Models</span>
            <br />
            <span className="text-gold-gradient inline-block min-w-[5ch]" key={current.word}>
              <span className="inline-block animate-[heroSlide_0.6s_ease-out]">{current.word}</span>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground">
            A handcrafted marketplace where the sharpest builders deploy production-ready intelligence —
            from 120M edge nano-models to 70B reasoning engines.
          </p>

          {/* Responsive search */}
          <div className="mt-7 flex w-full max-w-xl items-center gap-2 rounded-full glass px-3 py-2 sm:px-5 sm:py-3 ring-1 ring-border focus-within:ring-primary/50 transition">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models, creators…"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-gold-glow transition hover:brightness-110 sm:px-4">
              Search
            </button>
          </div>

          {/* Modality chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { icon: MessageSquare, label: "LLMs" },
              { icon: ImageIcon, label: "Vision" },
              { icon: Mic, label: "Voice" },
              { icon: Wand2, label: "Diffusion" },
              { icon: Cpu, label: "Edge" },
            ].map((c) => (
              <button
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground ring-1 ring-border transition hover:text-foreground hover:ring-primary/40"
              >
                <c.icon className="h-3 w-3" />
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT — animated AI visualization */}
        <div className="relative mx-auto aspect-square w-full max-w-[420px] sm:max-w-[520px]">
          {/* Orbits */}
          <div aria-hidden className="absolute inset-0 grid place-items-center">
            <div className="absolute h-[92%] w-[92%] rounded-full border border-primary/15 animate-[spinSlow_28s_linear_infinite]">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-gold-glow" />
              <span className="absolute top-1/2 -right-1 h-1 w-1 -translate-y-1/2 rounded-full bg-primary/60" />
            </div>
            <div className="absolute h-[70%] w-[70%] rounded-full border border-primary/25 animate-[spinSlow_18s_linear_infinite_reverse]">
              <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[oklch(0.88_0.09_86)]" />
              <span className="absolute -top-1 left-1/4 h-1 w-1 rounded-full bg-primary/70" />
            </div>
            <div className="absolute h-[48%] w-[48%] rounded-full border border-primary/30 animate-[spinSlow_12s_linear_infinite]">
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
            </div>
          </div>

          {/* Neural SVG */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="line" x1="0" x2="1">
                <stop offset="0%" stopColor="oklch(0.78 0.13 82)" stopOpacity="0" />
                <stop offset="50%" stopColor="oklch(0.92 0.1 86)" stopOpacity="1" />
                <stop offset="100%" stopColor="oklch(0.78 0.13 82)" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="core">
                <stop offset="0%" stopColor="oklch(0.95 0.08 86)" />
                <stop offset="60%" stopColor="oklch(0.78 0.13 82)" />
                <stop offset="100%" stopColor="oklch(0.4 0.08 60)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="node">
                <stop offset="0%" stopColor="oklch(0.95 0.08 86)" />
                <stop offset="100%" stopColor="oklch(0.5 0.1 70)" />
              </radialGradient>
            </defs>

            {/* connection lines + traveling particles */}
            {NODES.map(([x, y], i) => {
              const path = `M${x} ${y} L 200 200`;
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={y}
                    x2={200}
                    y2={200}
                    stroke="url(#line)"
                    strokeWidth="1.2"
                    className="animate-[pulseLine_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                  <circle r="2.4" fill="oklch(0.95 0.08 86)">
                    <animateMotion dur={`${2.2 + (i % 3) * 0.6}s`} repeatCount="indefinite" path={path} begin={`${i * 0.25}s`} />
                    <animate attributeName="opacity" values="0;1;1;0" dur={`${2.2 + (i % 3) * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.25}s`} />
                  </circle>
                </g>
              );
            })}

            {/* outgoing particles (core → node) */}
            {NODES.map(([x, y], i) => {
              const path = `M200 200 L ${x} ${y}`;
              return (
                <circle key={`o-${i}`} r="1.8" fill="oklch(0.88 0.09 86)" opacity="0.8">
                  <animateMotion dur={`${2.6 + (i % 4) * 0.4}s`} repeatCount="indefinite" path={path} begin={`${i * 0.4 + 1}s`} />
                  <animate attributeName="opacity" values="0;0.9;0" dur={`${2.6 + (i % 4) * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.4 + 1}s`} />
                </circle>
              );
            })}

            {/* nodes */}
            {NODES.map(([cx, cy], i) => (
              <g key={`n-${i}`}>
                <circle cx={cx} cy={cy} r="15" fill="oklch(0.2 0.01 60)" stroke="oklch(0.78 0.13 82 / 0.6)" />
                <circle cx={cx} cy={cy} r="4.5" fill="url(#node)">
                  <animate attributeName="r" values="3;6;3" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="2.4s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* expanding rings from core */}
            {[0, 1, 2].map((i) => (
              <circle
                key={`r-${i}`}
                cx="200"
                cy="200"
                r="40"
                fill="none"
                stroke="oklch(0.88 0.09 86)"
                strokeWidth="1"
                opacity="0"
              >
                <animate attributeName="r" from="40" to="160" dur="3s" begin={`${i * 1}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.6;0" dur="3s" begin={`${i * 1}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* core */}
            <circle cx="200" cy="200" r="90" fill="url(#core)" opacity="0.55" className="animate-[breathe_4s_ease-in-out_infinite]" />
            <circle cx="200" cy="200" r="38" fill="oklch(0.16 0.01 60)" stroke="oklch(0.88 0.09 86)" strokeWidth="1" />
          </svg>

          {/* Center logo */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-[oklch(0.14_0.01_60)] ring-1 ring-primary/50 shadow-gold-glow animate-[breathe_4s_ease-in-out_infinite] overflow-hidden">
              <img
                src={logoAsset.url}
                alt="Oryntal AI Labs"
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_50%,oklch(0.14_0.01_60/0.6))]" />
            </div>
          </div>

          {/* Floating prompt card */}
          <div className="absolute -left-1 top-4 hidden md:block w-[200px] rounded-xl glass p-3 ring-1 ring-border animate-[float_6s_ease-in-out_infinite]">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1">Prompt</p>
            <p className="text-xs text-foreground/90 leading-snug">"Generate a moody cinematic portrait, golden rim light."</p>
          </div>

          {/* Floating stream card */}
          <div className="absolute -right-1 bottom-4 hidden md:block w-[230px] rounded-xl glass p-3 ring-1 ring-border animate-[float_7s_ease-in-out_infinite_1s]">
            <p className="text-[10px] uppercase tracking-wider text-primary mb-1.5">Inference stream</p>
            <div className="space-y-1 font-mono text-[10.5px] text-muted-foreground min-h-[78px]">
              {STREAM_LINES.slice(0, streamIdx).map((l, i) => (
                <div key={i} className="animate-[heroSlide_0.4s_ease-out]">{l}</div>
              ))}
              {streamIdx < STREAM_LINES.length && (
                <span className="inline-block h-3 w-1.5 bg-primary animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border/60 pt-6 md:grid-cols-4">
        {[
          ["2,400+", "Curated models"],
          ["180+", "Verified labs"],
          ["<40ms", "Median latency"],
          ["14M", "Monthly deploys"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="font-display text-2xl md:text-3xl font-semibold text-gold-gradient">{v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
