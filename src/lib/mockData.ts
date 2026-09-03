import {
  BadgeDollarSign,
  Bot,
  Boxes,
  Briefcase,
  Building2,
  Car,
  ChefHat,
  Clapperboard,
  Cpu,
  Dog,
  Dumbbell,
  Factory,
  GraduationCap,
  HardHat,
  HeartPulse,
  Home,
  Hotel,
  Landmark,
  Palette,
  PawPrint,
  Plane,
  Rocket,
  Scale,
  Scissors,
  ShoppingCart,
  Stethoscope,
  Store,
  Sun,
  Truck,
  Utensils,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type OfferingType = "saas" | "automation" | "model";

export type ListingStatus = "live" | "beta" | "coming";

export type Listing = {
  id: string;
  title: string;
  tagline: string;
  creator: string;
  offeringType: OfferingType;
  problems: string[];
  industries: string[];
  techs: string[];
  problemPoints: string[];
  advantagePoints: string[];
  image: string;
  video?: string;
  loomUrl?: string;
  liveUrl?: string;
  price: "Free" | "Premium";
  gradient: string;
  glyph: string;
  height: number;
  featured?: boolean;
  slug?: string;
  status?: ListingStatus;
};

export const OFFERING_LABEL: Record<OfferingType, string> = {
  saas: "SaaS Product",
  automation: "AI Automation",
  model: "AI Model or Agent",
};

export const FEATURED_CAP = 6;

export const OFFERING_META: Record<OfferingType, { icon: LucideIcon; label: string }> = {
  saas: { icon: Boxes, label: OFFERING_LABEL.saas },
  automation: { icon: Workflow, label: OFFERING_LABEL.automation },
  model: { icon: Cpu, label: OFFERING_LABEL.model },
};

export const PROBLEMS = [
  "All",
  "Lead Generation",
  "Customer Support Automation",
  "Content Creation",
  "Sales & CRM Automation",
  "Data & Reporting",
  "HR & Recruiting",
  "Finance & Bookkeeping Automation",
  "E-commerce Ops",
  "Internal Workflow Automation",
] as const;

export const INDUSTRIES = [
  "Real Estate",
  "E-commerce",
  "Agencies & Consulting",
  "SaaS",
  "Healthcare",
  "Logistics",
  "Local Services",
  "Finance",
] as const;

export const TECHS = [
  "Agents",
  "Chat & Assistant",
  "Voice",
  "Vision",
  "Workflow Automation",
  "RAG & Search",
  "Analytics & BI",
  "Fine-Tuning",
] as const;

export const listings: Listing[] = [
  {
    id: "1",
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
  },
  {
    id: "2",
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
  },
  {
    id: "3",
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
  },
  {
    id: "4",
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
  },
  {
    id: "5",
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
  },
  {
    id: "6",
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
  },
  {
    id: "7",
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
  },
  {
    id: "8",
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
  },
  {
    id: "9",
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
  },
  {
    id: "10",
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
  },
  {
    id: "11",
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
  },
  {
    id: "12",
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
  },
];

// A "what we actually build" item: a short label plus the fuller explanation
// that the back-of-card accordion expands to reveal.
export type DeliveryPoint = {
  label: string;
  explanation: string;
};

export type AIPackage = {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  vision_points: string[];
  delivery_points: DeliveryPoint[];
  slug: string;
};

// Icon tokens map to Lucide icons. The token string is what's persisted on the
// `packages` collection; keep every picker option here so the admin form and the
// public cards always agree.
export const NICHE_ICONS: Record<string, LucideIcon> = {
  "shopping-cart": ShoppingCart,
  store: Store,
  sun: Sun,
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
  home: Home,
  "building-2": Building2,
  truck: Truck,
  scale: Scale,
  utensils: Utensils,
  "chef-hat": ChefHat,
  hotel: Hotel,
  dumbbell: Dumbbell,
  "heart-pulse": HeartPulse,
  dog: Dog,
  "paw-print": PawPrint,
  briefcase: Briefcase,
  factory: Factory,
  landmark: Landmark,
  "badge-dollar-sign": BadgeDollarSign,
  clapperboard: Clapperboard,
  palette: Palette,
  scissors: Scissors,
  plane: Plane,
  car: Car,
  wrench: Wrench,
  "hard-hat": HardHat,
  rocket: Rocket,
  bot: Bot,
};

export const NICHE_ICON_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "shopping-cart", label: "E-Commerce / Retail", icon: ShoppingCart },
  { value: "store", label: "Storefront / Retail", icon: Store },
  { value: "sun", label: "Solar / Renewable", icon: Sun },
  { value: "graduation-cap", label: "EdTech / Learning", icon: GraduationCap },
  { value: "stethoscope", label: "Healthcare", icon: Stethoscope },
  { value: "home", label: "Real Estate", icon: Home },
  { value: "building-2", label: "Commercial Property", icon: Building2 },
  { value: "truck", label: "Logistics / Transport", icon: Truck },
  { value: "scale", label: "Legal", icon: Scale },
  { value: "utensils", label: "Restaurants", icon: Utensils },
  { value: "chef-hat", label: "Hospitality / F&B", icon: ChefHat },
  { value: "hotel", label: "Hotels / Travel", icon: Hotel },
  { value: "dumbbell", label: "Fitness", icon: Dumbbell },
  { value: "heart-pulse", label: "Wellness / Health", icon: HeartPulse },
  { value: "dog", label: "Pet Care", icon: Dog },
  { value: "paw-print", label: "Pets / Veterinary", icon: PawPrint },
  { value: "briefcase", label: "Agencies / Consulting", icon: Briefcase },
  { value: "factory", label: "Manufacturing", icon: Factory },
  { value: "landmark", label: "Finance / Banking", icon: Landmark },
  { value: "badge-dollar-sign", label: "Financial Services", icon: BadgeDollarSign },
  { value: "clapperboard", label: "Media / Creators", icon: Clapperboard },
  { value: "palette", label: "Design / Creative", icon: Palette },
  { value: "scissors", label: "Salon / Beauty", icon: Scissors },
  { value: "plane", label: "Travel / Aviation", icon: Plane },
  { value: "car", label: "Automotive", icon: Car },
  { value: "wrench", label: "Trades / Repair", icon: Wrench },
  { value: "hard-hat", label: "Construction", icon: HardHat },
  { value: "rocket", label: "SaaS / Tech", icon: Rocket },
  { value: "bot", label: "General AI", icon: Bot },
];

export const packages: AIPackage[] = [
  {
    id: "pkg-ecommerce",
    name: "E-Commerce",
    tagline: "Where Browsers Become Buyers, Automatically",
    icon: "shopping-cart",
    slug: "e-commerce",
    vision_points: [
      "Every abandoned cart wins itself back while your team sleeps.",
      "Product pages that quietly answer the objection before it's asked.",
      "Post-purchase follow-ups that turn one sale into a repeat customer.",
      "Low-stock, restock, and review requests handled the moment they happen.",
    ],
    delivery_points: [
      {
        label: "Cart Recovery Automation",
        explanation:
          "Automated email, SMS, and WhatsApp sequences that trigger the moment a cart sits idle, with a timed follow-up flow that gently wins the sale back.",
      },
      {
        label: "AI Product Descriptions",
        explanation:
          "A generator that drafts and keeps every product listing fresh, turning raw specs into persuasive copy across the whole catalogue in minutes.",
      },
      {
        label: "Personalized Recommendations",
        explanation:
          "An on-site engine that surfaces the right next product for each shopper based on browsing and purchase behaviour, lifting average order value.",
      },
      {
        label: "Order Confirmation Flows",
        explanation:
          "Automated order, shipping, and delivery updates paired with smart review requests, so every customer knows where their order is without asking.",
      },
      {
        label: "Unified Ops Dashboard",
        explanation:
          "A single view of every live workflow — what fired, what converted, and where revenue came from — so you steer the store rather than chase it.",
      },
      {
        label: "Customer Win-Back Campaigns",
        explanation:
          "Automated win-back offers and re-engagement emails for customers who went quiet, bringing dormant buyers back into the funnel.",
      },
    ],
  },
  {
    id: "pkg-solar",
    name: "Solar Energy",
    tagline: "From First Click to Installed Panels, On Autopilot",
    icon: "sun",
    slug: "solar-energy",
    vision_points: [
      "Every lead is qualified, scheduled, and warmed before your team calls.",
      "Quotes go out in hours, not days — before the competition wins the deal.",
      "Install teams never juggle the same project across five spreadsheets.",
      "Referrals keep flowing with a follow-up system that never forgets a customer.",
    ],
    delivery_points: [
      {
        label: "Instant Lead Response",
        explanation:
          "An AI qualification assistant that replies to every inquiry instantly, capturing the essentials and booking a slot for your team while the lead is still warm.",
      },
      {
        label: "Automated Quotation Builder",
        explanation:
          "Pulls roof dimensions, system sizing, and package options into a professional proposal in hours, so quotes go out before a competitor can undercut you.",
      },
      {
        label: "End-to-End Project Tracker",
        explanation:
          "Links quote, deposit, permit, install, and inspection stages in one place, so no project gets lost between five spreadsheets or group chats.",
      },
      {
        label: "Post-Install Follow-Up",
        explanation:
          "Automated thank-you, referral, and review-request sequences run after every install, turning happy customers into a steady stream of new leads.",
      },
      {
        label: "Sales & Install Dashboard",
        explanation:
          "A reporting view of leads, close rates, and active installations so you always know exactly where the business stands.",
      },
    ],
  },
  {
    id: "pkg-edtech",
    name: "EdTech",
    tagline: "Learning That Adapts to Every Student, Not the Other Way Around",
    icon: "graduation-cap",
    slug: "edtech",
    vision_points: [
      "Every learner gets a path that adjusts to how they actually learn.",
      "Course creators stop rewriting the same answer to the same question.",
      "Enrolment and onboarding happen automatically, even at 2am.",
      "Students stay engaged because follow-ups arrive right when they stall.",
    ],
    delivery_points: [
      {
        label: "Adaptive Learning Engine",
        explanation:
          "Paces course content to each student's progress and mastery, so fast learners move ahead and everyone else gets the right next step.",
      },
      {
        label: "AI Course Assistant",
        explanation:
          "Answers student questions around the clock, so nobody stalls waiting for office hours and course creators stop retyping the same reply.",
      },
      {
        label: "Auto-Enrolment Workflow",
        explanation:
          "Handles sign-up, onboarding, and course-access provisioning automatically — even a 2am enrollee is in and learning by morning.",
      },
      {
        label: "Engagement Nudges",
        explanation:
          "Automated reminders that catch a learner right when they stall or a module falls due, keeping completion rates up without manual chasing.",
      },
      {
        label: "Course Analytics Dashboard",
        explanation:
          "Tracks completion, drop-off, and per-module mastery so you can see what works and fix what quietly loses students.",
      },
    ],
  },
  {
    id: "pkg-realestate",
    name: "Real Estate",
    tagline: "Deals Closed Faster Than the Competition Can Prospect",
    icon: "building-2",
    slug: "real-estate",
    vision_points: [
      "Every hot lead is called back before the ink dries on the inquiry.",
      "Listings reach the right buyers without a dozen manual ad campaigns.",
      "Floors, photos, and paperwork stop eating your agents' evenings.",
      "Past clients feel remembered, so they refer again without being asked.",
    ],
    delivery_points: [
      {
        label: "Instant Listing Assistant",
        explanation:
          "Captures and replies to every listing inquiry immediately, then queues the lead for a call while they're still engaged.",
      },
      {
        label: "Buyer Outreach & Scheduling",
        explanation:
          "Automatically segments new leads, sends the right listings, and books viewings — no follow-up email forgotten between showings.",
      },
      {
        label: "AI Listing Copy & Syndication",
        explanation:
          "Generates sharp, compliant listing descriptions and pushes them across portals in one go instead of a dozen manual uploads.",
      },
      {
        label: "Transaction Tracker",
        explanation:
          "Keeps offers, deposits, documents, and closing dates in one place so nothing slips past and every deal stays on schedule.",
      },
      {
        label: "Evergreen Client Follow-Up",
        explanation:
          "Quiet anniversary, referral, and past-client touchpoints that run forever, keeping you top of mind without nagging.",
      },
    ],
  },
  {
    id: "pkg-healthcare",
    name: "Healthcare & Wellness",
    tagline: "Care That Feels Personal, Admin That Feels Invisible",
    icon: "heart-pulse",
    slug: "healthcare-wellness",
    vision_points: [
      "Every patient is greeted, booked, and reminded without a single missed slot.",
      "Intake paperwork is already filled in before the patient walks in.",
      "Providers stop pulling charts out of three different inboxes.",
      "Follow-ups land at the right moment, so no one slips through the cracks.",
    ],
    delivery_points: [
      {
        label: "Smart Appointment Booking",
        explanation:
          "Handles booking, rescheduling, and reminders by email or SMS so no slot is missed and no patient is forgotten.",
      },
      {
        label: "Digital Intake & Pre-Fill",
        explanation:
          "Collects paperwork online with AI pre-filling from a patient's answers and history, so intake is done before they walk in.",
      },
      {
        label: "Unified Patient Inbox",
        explanation:
          "Keeps intake, labs, and follow-ups in one ordered thread instead of providers juggling three different inboxes.",
      },
      {
        label: "Automated Aftercare",
        explanation:
          "Post-visit check-ins, prescription refills, and review requests fire at the right moment, so nobody slips through the cracks.",
      },
      {
        label: "Practice Health Dashboard",
        explanation:
          "A clear view of no-shows, capacity, and patient satisfaction so you can spot problems early and keep care on track.",
      },
    ],
  },
  {
    id: "pkg-hotel-travel",
    name: "Hotel & Travel",
    tagline: "Every Booking, Check-In, and Review, Effortlessly On Time",
    icon: "hotel",
    slug: "hotel-travel",
    vision_points: [
      "Every reservation inquiry is answered the moment it lands.",
      "Guests get check-in details and directions before they even pack.",
      "No-shows and last-minute changes are backfilled before they empty a room.",
      "Happy stays turn into five-star reviews without a begging email.",
    ],
    delivery_points: [
      {
        label: "Instant Booking Assistant",
        explanation:
          "Answers rates, availability, and policy questions the moment they land, so no inquiry cools off waiting for a reply.",
      },
      {
        label: "Pre-Arrival Guest Emails",
        explanation:
          "Sends check-in details, directions, and amenity info automatically before guests even pack, cutting front-desk questions.",
      },
      {
        label: "Waitlist & No-Show Backfill",
        explanation:
          "Automatically rebooks cancelled rooms from a waitlist fast, so a last-minute no-show never costs you a full night.",
      },
      {
        label: "Post-Stay Reviews & Returns",
        explanation:
          "Requests reviews and sends return-guest offers at the right moment, turning happy stays into repeat bookings.",
      },
      {
        label: "Occupancy & Revenue Dashboard",
        explanation:
          "Tracks bookings, revenue, and reviews in one place so you can price and market with confidence.",
      },
    ],
  },
  {
    id: "pkg-salon-beauty",
    name: "Salon & Beauty",
    tagline: "A Full Appointment Book, Without a Full-Time Receptionist",
    icon: "scissors",
    slug: "salon-beauty",
    vision_points: [
      "Every booking slot fills itself, including the ones clients cancel.",
      "Clients are reminded and rebooked before they even think about it.",
      "Waitlists quietly turn ghost clients into confirmed chairs.",
      "Aftercare and product tips arrive right when they matter most.",
    ],
    delivery_points: [
      {
        label: "Online Booking & Reminders",
        explanation:
          "Lets clients book any service online with automated email and SMS reminders, filling chairs without a booking manager.",
      },
      {
        label: "Rebooking & Waitlist",
        explanation:
          "Automatically queues clients for their next visit and fills cancelled slots from the waitlist, so no chair sits empty.",
      },
      {
        label: "Client Profile & Smart Suggestions",
        explanation:
          "Keeps a full service history and suggests the right next visit per client, so every appointment feels personal.",
      },
      {
        label: "Aftercare & Product Upsell",
        explanation:
          "Sends aftercare tips, product recommendations, and review requests at the perfect moment after each service.",
      },
      {
        label: "Bookings Dashboard",
        explanation:
          "Shows upcoming chairs, no-shows, and top services at a glance so staffing and promotions are no longer guesswork.",
      },
    ],
  },
  {
    id: "pkg-travel-agency",
    name: "Travel Agency",
    tagline: "Dream Trips Planned, Booked, and Followed Up — All On Their Own",
    icon: "plane",
    slug: "travel-agency",
    vision_points: [
      "Every trip inquiry is answered with a tailored itinerary in minutes.",
      "Quotes, payments, and documents arrive before the client thinks to ask.",
      "Trips in progress get the hand-holding they need, automatically.",
      "Past travelers become your best marketers with effortless reviews and referrals.",
    ],
    delivery_points: [
      {
        label: "AI Trip-Quote Assistant",
        explanation:
          "Builds personalised itineraries from one conversation, turning an inquiry into a tailored proposal in minutes.",
      },
      {
        label: "Booking & Payment Flow",
        explanation:
          "Automates proposals, deposits, payments, and confirmation so every trip is locked in before the client thinks to ask.",
      },
      {
        label: "Trip Document Hub",
        explanation:
          "Keeps itineraries, tickets, insurance, and reminders in one tidy place travellers can always access.",
      },
      {
        label: "Pre & Post-Trip Follow-Up",
        explanation:
          "Checks in automatically before departure and requests reviews and referrals after return, so happy travelers market for you.",
      },
      {
        label: "Commission Dashboard",
        explanation:
          "Tracks trips sold, revenue, and client base so you always know which destinations and offers pay off.",
      },
    ],
  },
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
  cover?: string;
  body?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
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
