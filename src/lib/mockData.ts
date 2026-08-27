export type ModelCard = {
  id: string;
  title: string;
  creator: string;
  category: string;
  latency: string;
  size: string;
  price: "Free" | "Premium";
  height: number; // for masonry variation
  gradient: string; // tailwind gradient for abstract art
  glyph: string;
};

export const models: ModelCard[] = [
  {
    id: "1",
    title: "Oryntal-Llama-3-FineTune",
    creator: "@AlexAI",
    category: "LLMs",
    latency: "<40ms",
    size: "7B",
    price: "Free",
    height: 280,
    gradient: "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
    glyph: "◐",
  },
  {
    id: "2",
    title: "VisionForge-XL",
    creator: "@nora.cv",
    category: "Computer Vision",
    latency: "<28ms",
    size: "1.2B",
    price: "Premium",
    height: 360,
    gradient: "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]",
    glyph: "◇",
  },
  {
    id: "3",
    title: "EchoVoice-Studio",
    creator: "@aud.io",
    category: "Voice & Audio",
    latency: "<60ms",
    size: "3B",
    price: "Free",
    height: 240,
    gradient: "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
    glyph: "≋",
  },
  {
    id: "4",
    title: "Diffusion-Noir-v2",
    creator: "@maya.art",
    category: "Diffusion",
    latency: "<120ms",
    size: "5.4B",
    price: "Premium",
    height: 420,
    gradient: "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
    glyph: "✺",
  },
  {
    id: "5",
    title: "EdgeNano-Vision",
    creator: "@kenji",
    category: "Edge AI",
    latency: "<12ms",
    size: "120M",
    price: "Free",
    height: 220,
    gradient: "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
    glyph: "◈",
  },
  {
    id: "6",
    title: "Oryntal-Reason-13B",
    creator: "@oryntal",
    category: "LLMs",
    latency: "<70ms",
    size: "13B",
    price: "Premium",
    height: 320,
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]",
    glyph: "◉",
  },
];

export const categories = ["All", "LLMs", "Computer Vision", "Voice & Audio", "Diffusion", "Edge AI"];

export type AIPackage = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  gradient: string;
  glyph: string;
  price: string;
  priceNote: string;
  features: string[];
  badge?: string;
};

export const packages: AIPackage[] = [
  {
    id: "p1",
    name: "Model Launch Kit",
    tagline: "Ship a model, not a prototype.",
    description:
      "A production-ready inference endpoint for your custom model — deployed to the edge with monitoring, versioning, and docs.",
    gradient: "from-[oklch(0.3_0.08_70)] via-[oklch(0.45_0.12_60)] to-[oklch(0.88_0.09_86)]",
    glyph: "◉",
    price: "From $1,900",
    priceNote: "per model · one-time",
    features: [
      "Global edge inference deployment",
      "Uptime monitoring + Slack alerts",
      "Versioned API with documentation",
      "30-day concierge support",
    ],
    badge: "Most Popular",
  },
  {
    id: "p2",
    name: "Fine-Tune Studio",
    tagline: "Your weights, your IP, our pipeline.",
    description:
      "End-to-end fine-tuning on curated datasets — from LoRA experiments to a full fine-tune with evals against your base.",
    gradient: "from-[oklch(0.2_0.03_140)] via-[oklch(0.35_0.08_80)] to-[oklch(0.85_0.1_86)]",
    glyph: "◐",
    price: "Custom quote",
    priceNote: "scoped by model scale",
    features: [
      "Curated dataset pipeline + cleaning",
      "LoRA experiments → full fine-tune",
      "Evaluation suite vs. baseline",
      "Weights delivered on request",
    ],
  },
  {
    id: "p3",
    name: "Edge Deployment",
    tagline: "Runs where your data lives.",
    description:
      "Quantized, distilled, and benchmarked builds for cameras, sensors, and on-prem boxes — no GPU required.",
    gradient: "from-[oklch(0.22_0.04_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.9_0.08_86)]",
    glyph: "◈",
    price: "From $2,400",
    priceNote: "per device class",
    features: [
      "Quantized ONNX / TFLite builds",
      "Fully offline inference kit",
      "On-device benchmark report",
      "Over-the-air update pipeline",
    ],
  },
  {
    id: "p4",
    name: "Voice & Audio Suite",
    tagline: "Consent-first voice, tuned to brand.",
    description:
      "A production voice stack — TTS cloning, streaming playback, and responsible watermarking in one pipeline.",
    gradient: "from-[oklch(0.18_0.02_60)] via-[oklch(0.5_0.14_82)] to-[oklch(0.3_0.05_30)]",
    glyph: "≋",
    price: "$3,200+",
    priceNote: "per voice model",
    features: [
      "Consent-first voice cloning pipeline",
      "Low-latency streaming TTS API",
      "Forensic watermarking included",
      "Per-voice scoring & tuning sessions",
    ],
  },
  {
    id: "p5",
    name: "Sovereign Self-Host",
    tagline: "Your infra. Your weights. Zero leakage.",
    description:
      "An air-gapped deployment kit for regulated environments — private containers, on-site tuning, and a dedicated ops room.",
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.32_0.08_60)] to-[oklch(0.78_0.13_82)]",
    glyph: "✺",
    price: "Custom quote",
    priceNote: "enterprise engagement",
    features: [
      "Air-gapped install kit",
      "Private weights containers",
      "On-site tuning & rollout",
      "SLA-backed 24/7 ops room",
    ],
    badge: "Enterprise",
  },
  {
    id: "p6",
    name: "Full-Stack AI Build",
    tagline: "From prompt to production, together.",
    description:
      "We design, build, and launch your AI product — frontend, API, data, and model operations under one roof.",
    gradient: "from-[oklch(0.25_0.05_60)] via-[oklch(0.4_0.1_60)] to-[oklch(0.9_0.09_86)]",
    glyph: "▲",
    price: "From $12K",
    priceNote: "typical 6–10 week build",
    features: [
      "End-to-end product build",
      "Frontend + API + data layer",
      "Model ops, evals, and guardrails",
      "Launch week + team handoff",
    ],
    badge: "Flagship",
  },
];

export type Lab = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  downloads: string;
  initials: string;
};

export const labs: Lab[] = [
  { id: "l1", name: "Alex Chen", handle: "@AlexAI", bio: "Fine-tuning open LLMs for production.", downloads: "1.2M", initials: "AC" },
  { id: "l2", name: "Nora Vance", handle: "@nora.cv", bio: "Vision research, multi-modal systems.", downloads: "840K", initials: "NV" },
  { id: "l3", name: "Maya Iris", handle: "@maya.art", bio: "Diffusion artist & researcher.", downloads: "612K", initials: "MI" },
  { id: "l4", name: "Kenji Sato", handle: "@kenji", bio: "Edge & on-device inference.", downloads: "498K", initials: "KS" },
  { id: "l5", name: "Audrey Lin", handle: "@aud.io", bio: "Voice cloning, TTS, audio synthesis.", downloads: "377K", initials: "AL" },
];

export type Blog = {
  id: string;
  title: string;
  hook: string;
  author: string;
  initials: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: number;
  gradient: string;
  height: number;
  trending: boolean;
};

export const blogs: Blog[] = [
  {
    id: "b1",
    title: "The Quiet Revolution of 7B Models",
    hook: "Small models are eating production. Here's why your next deploy shouldn't be a 70B behemoth — and what the post-scale era looks like up close.",
    author: "Alex Chen",
    initials: "AC",
    readTime: "5 min read",
    tags: ["#FineTuning", "#LLMs"],
    likes: 248,
    comments: 32,
    gradient: "from-[oklch(0.18_0.02_60)] via-[oklch(0.32_0.08_60)] to-[oklch(0.78_0.13_82)]",
    height: 320,
    trending: true,
  },
  {
    id: "b2",
    title: "Diffusion in the Dark: Crafting Moody Aesthetics",
    hook: "A practical guide to taming latent space for cinematic, low-key imagery. Lighting, palette, and the prompt scaffolds that actually hold.",
    author: "Maya Iris",
    initials: "MI",
    readTime: "8 min read",
    tags: ["#Diffusion", "#Prompting"],
    likes: 512,
    comments: 88,
    gradient: "from-[oklch(0.14_0.02_60)] via-[oklch(0.28_0.06_40)] to-[oklch(0.65_0.12_82)]",
    height: 420,
    trending: true,
  },
  {
    id: "b3",
    title: "Sub-15ms Inference on Commodity Edge",
    hook: "We shipped a 120M vision model to factory cameras with no GPU. What we cut, what we kept, and the quantization tradeoffs nobody talks about.",
    author: "Kenji Sato",
    initials: "KS",
    readTime: "6 min read",
    tags: ["#EdgeAI", "#Quantization"],
    likes: 184,
    comments: 21,
    gradient: "from-[oklch(0.16_0.02_140)] via-[oklch(0.3_0.06_80)] to-[oklch(0.82_0.1_86)]",
    height: 260,
    trending: false,
  },
  {
    id: "b4",
    title: "Voice Cloning Without Selling Your Soul",
    hook: "Consent-first pipelines, watermarking, and the open-source voice stack we use in production. A field guide for builders who want to ship responsibly.",
    author: "Audrey Lin",
    initials: "AL",
    readTime: "7 min read",
    tags: ["#Voice", "#Ethics"],
    likes: 396,
    comments: 54,
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.4_0.1_60)] to-[oklch(0.86_0.09_86)]",
    height: 360,
    trending: false,
  },
];
