import { useEffect, useState } from "react";
import { Search, Cpu, Wand2, Image as ImageIcon, MessageSquare, Mic, Bot, Workflow, Database, Eye, Code2, Network } from "lucide-react";
import logoAsset from "@/assets/oryntal-logo.png";

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

// Outer nodes around the core — each represents a category of AI work
const NODES: Array<{ x: number; y: number; icon: typeof Bot; label: string }> = [
  { x: 80, y: 90, icon: Bot, label: "LLM Agents" },
  { x: 320, y: 110, icon: Workflow, label: "Automation" },
  { x: 70, y: 290, icon: Database, label: "RAG" },
  { x: 330, y: 300, icon: Eye, label: "Vision" },
  { x: 200, y: 50, icon: Wand2, label: "Diffusion" },
  { x: 200, y: 360, icon: Mic, label: "Voice" },
  { x: 50, y: 200, icon: Code2, label: "Code" },
  { x: 350, y: 200, icon: Network, label: "Edge" },
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
            Live · 73 models · Curated daily
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

            {/* inter-node connections — neural network mesh */}
            {(() => {
              const edges: Array<[number, number]> = [
                [0, 4], [4, 1], [1, 7], [7, 3], [3, 5], [5, 2], [2, 6], [6, 0],
                [0, 1], [2, 3], [4, 5], [6, 7],
                [0, 5], [1, 3], [4, 7], [6, 2],
              ];
              return edges.map(([a, b], i) => (
                <line
                  key={`e-${i}`}
                  x1={NODES[a].x}
                  y1={NODES[a].y}
                  x2={NODES[b].x}
                  y2={NODES[b].y}
                  stroke="oklch(0.78 0.13 82)"
                  strokeOpacity="0.18"
                  strokeWidth="0.8"
                  className="animate-[pulseLine_4s_ease-in-out_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ));
            })()}

            {/* node → core connections + traveling particles */}
            {NODES.map(({ x, y }, i) => {
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

            {/* synapse pulses across inter-node edges */}
            {(() => {
              const edges: Array<[number, number]> = [
                [0, 4], [4, 1], [1, 7], [7, 3], [3, 5], [5, 2], [2, 6], [6, 0],
              ];
              return edges.map(([a, b], i) => {
                const path = `M${NODES[a].x} ${NODES[a].y} L ${NODES[b].x} ${NODES[b].y}`;
                return (
                  <circle key={`sp-${i}`} r="1.6" fill="oklch(0.92 0.1 86)" opacity="0.9">
                    <animateMotion dur={`${3 + (i % 3) * 0.5}s`} repeatCount="indefinite" path={path} begin={`${i * 0.5}s`} />
                    <animate attributeName="opacity" values="0;0.9;0" dur={`${3 + (i % 3) * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} />
                  </circle>
                );
              });
            })()}



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

          {/* Vector icon nodes — each represents a category of AI work */}
          {NODES.map(({ x, y, icon: Icon, label }, i) => (
            <div
              key={`icon-${i}`}
              className="group absolute -translate-x-1/2 -translate-y-1/2 animate-[float_6s_ease-in-out_infinite]"
              style={{
                left: `${(x / 400) * 100}%`,
                top: `${(y / 400) * 100}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div className="relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl glass ring-1 ring-primary/40 shadow-gold-glow transition hover:scale-110 hover:ring-primary">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={1.8} />
                <span className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_center,oklch(0.78_0.13_82/0.25),transparent_70%)] animate-[breathe_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s` }} />
              </div>
              <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary opacity-0 ring-1 ring-border backdrop-blur transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </div>
          ))}


          {/* Center logo */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-[oklch(0.14_0.01_60)] ring-1 ring-primary/50 shadow-gold-glow animate-[breathe_4s_ease-in-out_infinite] overflow-hidden">
              <img
                src={logoAsset}
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
          ["73", "Curated models"],
          ["28", "Verified labs"],
          ["<120ms", "Median latency"],
          ["41K", "Monthly deploys"],
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
