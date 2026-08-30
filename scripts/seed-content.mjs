// Seeds the catalog from the app's built-in mock data (src/lib/mockData.ts)
// into MongoDB: products, packages, and blog posts. Idempotent — existing
// rows are updated in place via upserts on their unique keys.
//
//   node scripts/init-db.mjs          # collections + validation + tags (run first)
//   node scripts/seed-content.mjs
//
// Reads MONGODB_URI from the environment (falling back to .env.local).

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { MongoClient } from "mongodb";

const OFFERING_TO_DB = {
  saas: "SaaS Product",
  automation: "AI Automation",
  model: "AI Model/Agent",
};
const STATUS_TO_DB = { live: "Live", beta: "Beta", coming: "Coming soon" };

function loadEnvFile() {
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed
        .slice(eq + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (process.env[key] === undefined) process.env[key] = value;
    }
    break;
  }
}

loadEnvFile();

function kebab(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Source of truth: src/lib/mockData.ts — keep these in sync when the catalog
// changes. (Duplicated here because the script is dependency-free.)
const LISTINGS = [
  {
    title: "LeadPilot",
    tagline: "Qualify, enrich, and route inbound leads while you sleep.",
    creator: "Oryntal AI Labs",
    offeringType: "saas",
    problems: ["Lead Generation", "Sales & CRM Automation", "Internal Workflow Automation"],
    industries: ["SaaS", "Agencies & Consulting"],
    techs: ["Agents", "RAG & Search"],
    problemPoints: [
      "Leads sit untouched in shared inboxes and get cold in hours.",
      "SDRs waste mornings on forms, enrichment, and manual CRMs.",
      "No one owns routing — hot leads bounce between teammates.",
    ],
    advantagePoints: [
      "Custom-fit scoring per pipeline (ICP-aware, not default)",
      "Auto-writes every enrichment straight to your CRM",
      "Hot-lead alerts get replies in minutes, not days",
    ],
    image: "/assets/covers/cover-01.svg",
    liveUrl: "https://app.leadpilot.example.com",
    price: "Free",
    gradient: "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
    glyph: "▲",
    height: 300,
    featured: true,
    status: "live",
  },
  {
    title: "Vela Voice",
    tagline: "Phone support that talks like your best rep — 24/7.",
    creator: "Oryntal AI Labs",
    offeringType: "saas",
    problems: ["Customer Support Automation", "Sales & CRM Automation"],
    industries: ["Local Services", "E-commerce"],
    techs: ["Voice", "Chat & Assistant"],
    problemPoints: [
      "Missed calls mean lost revenue for local businesses.",
      "Overnight and weekend support requires headcount.",
      "Scripted IVR trees frustrate callers and leak intent.",
    ],
    advantagePoints: [
      "Natural voice — toll-quality latency, no robot cadence",
      "Books, answers, and routes using your actual playbooks",
      "Transcriptions + summaries land in your inbox after every call",
    ],
    image: "/assets/covers/cover-02.svg",
    video: "https://www.loom.com/share/7f2b3c9d4e5f6a71829384a5b6c7d8e9",
    price: "Premium",
    gradient: "from-[oklch(0.25_0.05_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.88_0.08_86)]",
    glyph: "≋",
    height: 380,
    featured: true,
    status: "live",
  },
  {
    title: "Aria Reply",
    tagline: "Automated replies for WhatsApp, email, and reviews — one inbox.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["Customer Support Automation", "Content Creation"],
    industries: ["Local Services", "E-commerce"],
    techs: ["Chat & Assistant", "Workflow Automation"],
    problemPoints: [
      "The same five questions answered a hundred times a day.",
      "Reviews and DMs slip through on weekends.",
      "Brand voice drifts when every human writes differently.",
    ],
    advantagePoints: [
      "Writes in your tone — trained on your past replies",
      "Human approval queue so nothing sensitive goes out blind",
      "Repository of saved answers your whole team reuses",
    ],
    image: "/assets/covers/cover-03.svg",
    video: "https://www.loom.com/share/1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    price: "Free",
    gradient: "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
    glyph: "◐",
    height: 260,
    status: "live",
  },
  {
    title: "Pixel Draft",
    tagline: "On-brand social and product copy, generated and scheduled.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["Content Creation", "Lead Generation"],
    industries: ["Agencies & Consulting", "SaaS"],
    techs: ["Agents", "Fine-Tuning"],
    problemPoints: [
      "Content calendars die because writing is a full-time job.",
      "Generic AI copy reads like everyone else's feed.",
      "Ideas never make it from docs to published posts.",
    ],
    advantagePoints: [
      "Fine-tuned on your brand — tone, voice, and taboo words",
      "Posts, follow-ups, and lead magnets from one brief",
      "Schedules straight into your calendar on autopilot",
    ],
    image: "/assets/covers/cover-04.svg",
    price: "Premium",
    gradient: "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
    glyph: "✺",
    height: 340,
    featured: true,
    status: "live",
  },
  {
    title: "Pipeline Sync",
    tagline: "Two-way CRM sync across your stack — no manual data entry.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["Sales & CRM Automation", "Internal Workflow Automation"],
    industries: ["SaaS", "Agencies & Consulting"],
    techs: ["Workflow Automation", "Analytics & BI"],
    problemPoints: [
      "Sales data lives in five tools and matches in none.",
      "Every deal update is re-typed by hand three times.",
      "Forecasts are fiction because the pipeline is stale.",
    ],
    advantagePoints: [
      "Bidirectional sync — CRM, inbox, and forms stay in lockstep",
      "Field mapping learned from your real records, not templates",
      "Live dealboard your team can actually trust",
    ],
    image: "/assets/covers/cover-05.svg",
    price: "Premium",
    gradient: "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
    glyph: "◈",
    height: 300,
    status: "live",
  },
  {
    title: "BookSmart",
    tagline: "Instant bookkeeping close — receipts to ledger, zero spreadsheets.",
    creator: "Oryntal AI Labs",
    offeringType: "saas",
    problems: ["Finance & Bookkeeping Automation"],
    industries: ["Local Services", "E-commerce"],
    techs: ["Vision", "Analytics & BI"],
    problemPoints: [
      "Receipts pile up and the month-end close takes days.",
      "Categorization is done differently by everyone.",
      "Tax time means reconstructing the whole year from scratch.",
    ],
    advantagePoints: [
      "Snap a receipt — line items coded automatically",
      "Bank feeds reconciled against your books nightly",
      "Close done by the 2nd, with backup docs for everything",
    ],
    image: "/assets/covers/cover-06.svg",
    price: "Premium",
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]",
    glyph: "◉",
    height: 360,
    status: "live",
  },
  {
    title: "HireLoop",
    tagline: "Screen, shortlist, and reject politely — recruiting on autopilot.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["HR & Recruiting", "Internal Workflow Automation"],
    industries: ["SaaS", "Healthcare"],
    techs: ["Agents", "RAG & Search"],
    problemPoints: [
      "Screening eats a third of every hiring manager's week.",
      "Late applicants get ghosted — and post about it.",
      "Scoring is inconsistent between interviewers.",
    ],
    advantagePoints: [
      "JD-aware screening scored against your rubric",
      "Polite, on-brand rejections for every candidate",
      "Pipeline synced to your ATS without any glue scripts",
    ],
    image: "/assets/covers/cover-07.svg",
    price: "Premium",
    gradient: "from-[oklch(0.22_0.04_240)] via-[oklch(0.4_0.1_60)] to-[oklch(0.9_0.08_86)]",
    glyph: "◇",
    height: 260,
    status: "live",
  },
  {
    title: "Oryntal-Reason-13B",
    tagline: "13B reasoning engine served at 70ms on commodity hardware.",
    creator: "Oryntal AI Labs",
    offeringType: "model",
    problems: ["Internal Workflow Automation", "Data & Reporting"],
    industries: ["SaaS", "Finance"],
    techs: ["Agents", "RAG & Search"],
    problemPoints: [
      "Frontier models are overkill and over-budget for doc work.",
      "Cloud LLM APIs leak sensitive internal data.",
      "Canned answers don't reason over your own documents.",
    ],
    advantagePoints: [
      "Self-hosted — training data and queries stay on your infra",
      "128k context, streaming, with eval suite included",
      "14 edge regions worldwide for consistent latency",
    ],
    image: "/assets/covers/cover-08.svg",
    video: "https://www.loom.com/share/9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d",
    price: "Premium",
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.32_0.08_60)] to-[oklch(0.78_0.13_82)]",
    glyph: "◉",
    height: 340,
    featured: true,
    status: "live",
  },
  {
    title: "EdgeNano-Vision",
    tagline: "120M vision model for cameras and on-device checks, sub-15ms.",
    creator: "Oryntal AI Labs",
    offeringType: "model",
    problems: ["Data & Reporting", "Internal Workflow Automation"],
    industries: ["Logistics", "Healthcare"],
    techs: ["Vision", "Fine-Tuning"],
    problemPoints: [
      "Cloud vision round-trips are too slow for production lines.",
      "Cameras can't stay online — factories lose signal often.",
      "Off-the-shelf models don't know your product, SKU, or defect.",
    ],
    advantagePoints: [
      "Runs fully offline on edge boxes, no GPU required",
      "Fine-tuned to your captured defects and SKUs",
      "Quantized build with benchmark report per device class",
    ],
    image: "/assets/covers/cover-09.svg",
    price: "Free",
    gradient: "from-[oklch(0.16_0.02_140)] via-[oklch(0.3_0.06_80)] to-[oklch(0.82_0.1_86)]",
    glyph: "◈",
    height: 240,
    status: "live",
  },
  {
    title: "ReportGen",
    tagline: "Scheduled, source-linked reports for ops and finance.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["Data & Reporting", "Finance & Bookkeeping Automation"],
    industries: ["Finance", "E-commerce"],
    techs: ["Analytics & BI", "RAG & Search"],
    problemPoints: [
      "Monday mornings vanish into copy-pasting dashboards.",
      "Reports without sources get challenged, then ignored.",
      "Numbers change and nobody rebuilds the deck.",
    ],
    advantagePoints: [
      "Every figure links back to its live source row",
      "Delivered to Slack and email on a schedule you set",
      "Narrative written around the numbers, not just charts",
    ],
    image: "/assets/covers/cover-10.svg",
    price: "Premium",
    gradient: "from-[oklch(0.14_0.02_60)] via-[oklch(0.28_0.06_40)] to-[oklch(0.65_0.12_82)]",
    glyph: "▦",
    height: 320,
    status: "live",
  },
  {
    title: "Stockwise",
    tagline: "E-commerce ops — inventory, POs, and supplier follow-ups.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["E-commerce Ops", "Data & Reporting"],
    industries: ["E-commerce", "Logistics"],
    techs: ["Workflow Automation", "Vision"],
    problemPoints: [
      "Stockouts cause every late delivery and angry review.",
      "Supplier chats get lost; order status is guesswork.",
      "Forecasting is a spreadsheet nobody updates.",
    ],
    advantagePoints: [
      "POs created and sent when reorder points hit",
      "Supplier follow-ups drafted and chased automatically",
      "Forecast trained on your real sales velocity",
    ],
    image: "/assets/covers/cover-11.svg",
    price: "Free",
    gradient: "from-[oklch(0.25_0.05_60)] via-[oklch(0.4_0.1_60)] to-[oklch(0.9_0.09_86)]",
    glyph: "⌘",
    height: 280,
    status: "live",
  },
  {
    title: "Onboard Flow",
    tagline: "Client onboarding that runs itself — every project, every time.",
    creator: "Oryntal AI Labs",
    offeringType: "automation",
    problems: ["Internal Workflow Automation", "Customer Support Automation"],
    industries: ["Agencies & Consulting", "SaaS"],
    techs: ["Chat & Assistant", "Workflow Automation"],
    problemPoints: [
      "New clients stall on agreed deliverables for weeks.",
      "The same kickoff email is rewritten every single time.",
      "Who's responsible for what is a group chat argument.",
    ],
    advantagePoints: [
      "Auto-generates kickoff docs from the signed contract",
      "Nudges both sides with the next expected action",
      "A living project map neither side can claim to have missed",
    ],
    image: "/assets/covers/cover-12.svg",
    video: "https://www.loom.com/share/2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b",
    price: "Free",
    gradient: "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.8_0.11_84)]",
    glyph: "→",
    height: 300,
    status: "live",
  },
];

const PACKAGES = [
  {
    name: "E-Commerce",
    slug: "e-commerce",
    tagline: "Where Browsers Become Buyers, Automatically",
    icon: "shopping-cart",
    vision_points: [
      "[Paste exact copy — E-Commerce vision point 1]",
      "[Paste exact copy — E-Commerce vision point 2]",
      "[Paste exact copy — E-Commerce vision point 3]",
      "[Paste exact copy — E-Commerce vision point 4]",
    ],
  },
  {
    name: "Solar Energy",
    slug: "solar-energy",
    tagline: "[Paste exact copy — Solar Energy tagline]",
    icon: "sun",
    vision_points: [
      "[Paste exact copy — Solar Energy vision point 1]",
      "[Paste exact copy — Solar Energy vision point 2]",
      "[Paste exact copy — Solar Energy vision point 3]",
      "[Paste exact copy — Solar Energy vision point 4]",
    ],
  },
  {
    name: "EdTech",
    slug: "edtech",
    tagline: "[Paste exact copy — EdTech tagline]",
    icon: "graduation-cap",
    vision_points: [
      "[Paste exact copy — EdTech vision point 1]",
      "[Paste exact copy — EdTech vision point 2]",
      "[Paste exact copy — EdTech vision point 3]",
      "[Paste exact copy — EdTech vision point 4]",
    ],
  },
];

// Legacy slugs from the old service-tier packages; removed when re-seeding.
const LEGACY_PACKAGE_SLUGS = ["foundation", "growth", "full-stack-ai-team"];

const BLOGS = [
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
    title: "Automation That Survives Contact With Clients",
    hook: "Most automations die on first real-world contact. The four design rules we use to keep client-facing workflows from rotting.",
    author: "Nora Vance",
    initials: "NV",
    readTime: "6 min read",
    tags: ["#Automation", "#Ops"],
    likes: 402,
    comments: 47,
    gradient: "from-[oklch(0.14_0.02_60)] via-[oklch(0.28_0.06_40)] to-[oklch(0.65_0.12_82)]",
    height: 300,
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
    title: "Voice Clients Actually Like Using",
    hook: "Consent-first pipelines, watermarking, and the open-source voice stack we ship in production. A field guide for builders who want happy callers.",
    author: "Audrey Lin",
    initials: "AL",
    readTime: "7 min read",
    tags: ["#Voice", "#Support"],
    likes: 331,
    comments: 40,
    gradient: "from-[oklch(0.15_0.02_60)] via-[oklch(0.4_0.1_60)] to-[oklch(0.86_0.09_86)]",
    height: 360,
    trending: false,
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Set it in the environment or in .env.local.");
    process.exit(1);
  }

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  try {
    await client.connect();
    const db = client.db();
    const now = new Date();

    for (const l of LISTINGS) {
      const doc = {
        title: l.title,
        slug: l.slug ?? kebab(l.title),
        offering_type: OFFERING_TO_DB[l.offeringType],
        problem_tags: l.problems,
        industry_tags: l.industries,
        tech_tags: l.techs,
        problem_points: l.problemPoints,
        advantage_points: l.advantagePoints,
        image: l.image,
        video: l.video,
        loom_url: l.video?.includes("loom.com") ? l.video : undefined,
        cta_url: l.liveUrl,
        status: STATUS_TO_DB[l.status ?? "live"],
        tagline: l.tagline,
        creator: l.creator,
        price: l.price,
        gradient: l.gradient,
        glyph: l.glyph,
        height: l.height,
        featured: l.featured ?? false,
        createdAt: now,
        updatedAt: now,
      };
      for (const key of Object.keys(doc)) {
        if (doc[key] === undefined) delete doc[key];
      }
      await db
        .collection("products")
        .updateOne({ slug: doc.slug }, { $set: doc }, { upsert: true });
    }
    console.log(`Products seeded: ${LISTINGS.length}`);

    for (const p of PACKAGES) {
      const doc = {
        name: p.name,
        slug: p.slug ?? kebab(p.name),
        tagline: p.tagline,
        icon: p.icon,
        vision_points: p.vision_points,
        createdAt: now,
        updatedAt: now,
      };
      for (const key of Object.keys(doc)) {
        if (doc[key] === undefined) delete doc[key];
      }
      // The `packages` schema changed from service tiers to niche editions, so
      // drop every legacy field that no longer exists and purge the old tiers.
      await db.collection("packages").updateOne(
        { slug: doc.slug },
        {
          $set: doc,
          $unset: {
            managed_items: "",
            positioning: "",
            cta: "",
            featured: "",
            tierIcon: "",
            items: "",
          },
        },
        { upsert: true },
      );
    }
    if (LEGACY_PACKAGE_SLUGS.length > 0) {
      await db.collection("packages").deleteMany({ slug: { $in: LEGACY_PACKAGE_SLUGS } });
    }
    console.log(`Packages seeded: ${PACKAGES.length}`);

    for (const b of BLOGS) {
      const doc = {
        id: b.id,
        title: b.title,
        hook: b.hook,
        author: b.author,
        initials: b.initials,
        readTime: b.readTime,
        tags: b.tags,
        likes: b.likes,
        comments: b.comments,
        gradient: b.gradient,
        height: b.height,
        trending: b.trending,
        cover: b.cover,
        body: b.body,
        createdAt: now,
        updatedAt: now,
      };
      for (const key of Object.keys(doc)) {
        if (doc[key] === undefined) delete doc[key];
      }
      await db.collection("blogPosts").updateOne({ id: doc.id }, { $set: doc }, { upsert: true });
    }
    console.log(`Blog posts seeded: ${BLOGS.length}`);

    console.log("\nDone. Catalog content is in place.");
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

main().catch((err) => {
  console.error("Seed failed:");
  console.error(err);
  process.exit(1);
});
