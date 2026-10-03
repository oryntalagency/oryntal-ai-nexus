import {
  BadgeDollarSign,
  Bot,
  Briefcase,
  Building2,
  Car,
  ChefHat,
  Clapperboard,
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
  Sparkles,
  Stethoscope,
  Store,
  Sun,
  Truck,
  Utensils,
  Wrench,
  type LucideIcon,
} from "lucide-react";

// Packages are code-managed content: this file is the single source of truth and
// there is no admin UI, API, or database collection behind it. Edit a niche here
// and the public pages follow.

export interface PackageTier {
  title: string;
  bestFor: string;
  whoItsFor: string;
  problemItSolves: string;
  included: {
    buildPhase: {
      heading: string;
      items: string[];
      groups?: { label: string; items: string[] }[];
    };
    monthly?: {
      heading: string;
      items: string[];
    };
  };
  outcome: string[];
  pricing: {
    setup: string;
    monthly: string;
    minimumCommitment?: string;
  };
}

export interface NichePackage {
  slug: string;
  nicheName: string;
  tagline: string;
  icon: string;
  tiers: PackageTier[];
}

// Marker for copy that hasn't been written yet. Tiers built from it render fine
// so the page never breaks, but they're flagged in the UI and never presented as
// real pricing or deliverables.
export const PLACEHOLDER = "PLACEHOLDER — fill in";

export function isPlaceholderTier(tier: PackageTier): boolean {
  return tier.title.includes("PLACEHOLDER");
}

// A structurally valid tier with every field marked as needing content. Used for
// any tier that hasn't been written so the page always has three cards to lay
// out — and so nothing is accidentally invented in its place.
function placeholderTier(): PackageTier {
  return {
    title: PLACEHOLDER,
    bestFor: PLACEHOLDER,
    whoItsFor: PLACEHOLDER,
    problemItSolves: PLACEHOLDER,
    included: {
      buildPhase: {
        heading: PLACEHOLDER,
        items: [PLACEHOLDER],
      },
      monthly: {
        heading: PLACEHOLDER,
        items: [PLACEHOLDER],
      },
    },
    outcome: [PLACEHOLDER],
    pricing: {
      setup: PLACEHOLDER,
      monthly: PLACEHOLDER,
      minimumCommitment: PLACEHOLDER,
    },
  };
}

// Real estate tier 2 — the only tier with written content so far.
const REAL_ESTATE_TIER_2: PackageTier = {
  title: "Lead Conversion Growth Partner",
  bestFor:
    "Medium brokers, channel partners, and builders with 5–15 agents and consistent lead flow.",
  whoItsFor:
    "Medium brokers, channel partners, and builders with 5–15 agents and consistent lead flow.",
  problemItSolves:
    "Leads are coming, but conversion to site visits is low because follow-up is inconsistent, lead quality is unclear, and the founder has no pipeline visibility.",
  included: {
    buildPhase: {
      heading: "Build phase (one-time)",
      items: [
        "Full real-estate CRM setup",
        "Lead pipeline: New → Contacted → Qualified → Site Visit → Booking → Lost",
        "Custom fields: budget, location, BHK, timeline, source, agent, notes",
      ],
      groups: [
        {
          label: "Integrations",
          items: [
            "Website enquiry form",
            "WhatsApp Business API / number",
            "Facebook/Instagram lead ads",
            "Optional: MagicBricks/99acres lead import",
          ],
        },
        {
          label: "Automation",
          items: [
            "Instant acknowledgement message",
            "Multi-day follow-up sequence",
            "Missed-call WhatsApp trigger",
            "Site-visit reminders and no-show follow-up",
            "Lead assignment and escalation rules",
          ],
        },
        {
          label: "AI assistant",
          items: [
            "WhatsApp/website chatbot",
            "Lead qualification questions",
            "Project details and brochure sharing",
            "Site-visit booking or calendar link",
            "Human handoff when required",
          ],
        },
        {
          label: "Dashboard and reporting",
          items: [
            "Leads by source",
            "Response time",
            "Follow-up completion",
            "Site visits booked",
            "Conversion by agent and source",
          ],
        },
      ],
    },
    monthly: {
      heading: "Monthly Growth Partner",
      items: [
        "Weekly system monitoring",
        "Fixing automation, CRM, and lead-capture issues",
        "Monthly optimisation of follow-up messages and workflows",
        "Old-lead reactivation sequences",
        "AI response and qualification improvements",
        "Lead assignment and escalation improvements",
        "Monthly performance report",
        "Monthly strategy call",
      ],
    },
  },
  outcome: [
    "More site visits from the same lead volume",
    "Faster and consistent follow-up",
    "Better visibility into lead quality and sales performance",
  ],
  pricing: {
    setup: "₹60,000 one-time",
    monthly: "₹15,000/month",
    minimumCommitment: "3 months after go-live",
  },
};

export const nichePackages: NichePackage[] = [
  {
    slug: "e-commerce",
    nicheName: "E-Commerce",
    tagline: "Where Browsers Become Buyers, Automatically",
    icon: "shopping-cart",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "solar-energy",
    nicheName: "Solar Energy",
    tagline: "From First Click to Installed Panels, On Autopilot",
    icon: "sun",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "edtech",
    nicheName: "EdTech",
    tagline: "Learning That Adapts to Every Student, Not the Other Way Around",
    icon: "graduation-cap",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "real-estate",
    nicheName: "Real Estate",
    tagline: "Deals Closed Faster Than the Competition Can Prospect",
    icon: "building-2",
    tiers: [placeholderTier(), REAL_ESTATE_TIER_2, placeholderTier()],
  },
  {
    slug: "healthcare-wellness",
    nicheName: "Healthcare & Wellness",
    tagline: "Care That Feels Personal, Admin That Feels Invisible",
    icon: "heart-pulse",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "hotel-travel",
    nicheName: "Hotel & Travel",
    tagline: "Every Booking, Check-In, and Review, Effortlessly On Time",
    icon: "hotel",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "salon-beauty",
    nicheName: "Salon & Beauty",
    tagline: "A Full Appointment Book, Without a Full-Time Receptionist",
    icon: "scissors",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  {
    slug: "travel-agency",
    nicheName: "Travel Agency",
    tagline: "Dream Trips Planned, Booked, and Followed Up — All On Their Own",
    icon: "plane",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
];

export function getNicheBySlug(slug: string): NichePackage | undefined {
  return nichePackages.find((p) => p.slug === slug);
}

// Icon tokens map to Lucide icons. Unknown tokens fall back to Sparkles so a new
// niche can be added here without also having to register an icon.
const NICHE_ICONS: Record<string, LucideIcon> = {
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

export function nicheIcon(token: string): LucideIcon {
  return NICHE_ICONS[token] ?? Sparkles;
}