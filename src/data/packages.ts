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
    tiers: [
  {
    title: "E-Commerce Launch Starter",
    bestFor: "Instagram-first clothing brands, home décor brands, beauty brands, small D2C businesses, and local businesses that want to start selling through their own website.",
    whoItsFor: "Instagram-first clothing brands, home décor brands, beauty brands, small D2C businesses, and local businesses that want to start selling through their own website.",
    problemItSolves: "The brand depends only on Instagram DMs and WhatsApp orders. Customers ask for prices, sizes, delivery details, and payment information manually. The business loses orders because there is no proper online store, checkout flow, or order system.",
    included: {
      buildPhase: {
        heading: "What's included",
        items: [
          "One e-commerce website on Shopify or WooCommerce",
          "Mobile-responsive store design",
          "Home page, collection page, product page, cart, and checkout setup",
          "Up to 25 product uploads",
          "Up to 5 product categories/collections",
          "Payment gateway setup",
          "COD setup",
          "Shipping settings setup",
          "WhatsApp click-to-chat button",
          "Instagram and Facebook link integration",
          "Basic order-confirmation email setup",
          "Google Analytics setup",
          "One training session for product upload and order management",
          "Seven days launch support"
        ],
        groups: [
          { label: "Product variants setup", items: [
            "Size",
            "Colour",
            "Weight",
            "Basic product options"
          ]},
          { label: "Basic SEO setup", items: [
            "Page titles",
            "Meta descriptions",
            "Image alt text"
          ]},
          { label: "Basic policy pages", items: [
            "Shipping policy",
            "Return/refund policy",
            "Privacy policy",
            "Terms and conditions"
          ]}
        ]
      },
      monthly: {
        heading: "Optional Store Care Plan",
        items: [
          "Ongoing monitoring and support",
          "Minor fixes and adjustments as needed"
        ]
      }
    },
    outcome: [
      "A professional store customers can trust",
      "Customers can browse, order, and pay without manual WhatsApp coordination",
      "The brand owns its customer and order data",
      "Less dependency on Instagram DMs for every sale"
    ],
    pricing: {
      setup: "₹29,999 one-time",
      monthly: "₹5,999/month"
    }
  },
  {
    title: "E-Commerce Sales Growth Partner",
    bestFor: "Growing D2C brands with an existing Instagram audience, regular online orders, or paid ad traffic that want to improve conversion and recover more lost sales.",
    whoItsFor: "Growing D2C brands with an existing Instagram audience, regular online orders, or paid ad traffic that want to improve conversion and recover more lost sales.",
    problemItSolves: "The brand gets website visitors and product interest, but customers abandon carts, do not complete checkout, have product questions, need order updates, or never return after their first purchase.",
    included: {
      buildPhase: {
        heading: "Build phase",
        items: [
          "Everything in E-Commerce Launch Starter",
          "Up to 100 product uploads",
          "Up to 10 collections/categories",
          "Conversion-focused website structure",
          "Landing page for one campaign, collection, or bestseller",
          "Meta Pixel setup",
          "Basic conversion tracking setup",
          "WhatsApp Business API or WhatsApp automation integration",
          "Team training and recorded walkthrough"
        ],
        groups: [
          { label: "Product-page optimisation", items: [
            "Trust signals",
            "Clear offers",
            "Size guide or product information blocks",
            "COD and delivery information",
            "Return/exchange information",
            "Reviews/testimonial section setup"
          ]},
          { label: "Customer automation flows", items: [
            "Welcome message for new enquiries",
            "Abandoned-cart recovery sequence",
            "Checkout abandonment follow-up",
            "COD order confirmation",
            "Order confirmation",
            "Order-shipped update",
            "Delivery update",
            "Post-purchase review request"
          ]},
          { label: "Customer-support workflow", items: [
            "Order-status answers",
            "Delivery questions",
            "Return/exchange FAQs",
            "Human handoff for complex questions"
          ]},
          { label: "Basic AI shopping assistant", items: [
            "Answers product questions",
            "Shares product links",
            "Helps with size/product selection",
            "Handles common delivery, payment, and return queries"
          ]},
          { label: "Sales dashboard", items: [
            "Website sessions",
            "Orders",
            "Revenue",
            "Conversion rate",
            "Top-selling products",
            "Cart/checkout abandonment",
            "Recovered orders"
          ]}
        ]
      },
      monthly: {
        heading: "Monthly Growth Partner",
        items: [
          "Website, checkout, automation, and integration monitoring",
          "Two minor website, message, or workflow changes per month",
          "Monthly abandoned-cart and checkout recovery optimisation",
          "Monthly product/offer/collection updates",
          "AI assistant knowledge-base updates",
          "Monthly sales and conversion report",
          "One monthly strategy/review call",
          "One customer reactivation or campaign workflow per month"
        ]
      }
    },
    outcome: [
      "More completed orders from existing traffic",
      "Recovered revenue from abandoned carts and checkouts",
      "Fewer repetitive customer-support questions",
      "Better visibility into products, campaigns, and customer behaviour",
      "Improved repeat-purchase opportunity"
    ],
    pricing: {
      setup: "₹59,999 one-time",
      monthly: "₹14,999/month",
      minimumCommitment: "3 months after go-live"
    }
  },
  {
    title: "E-Commerce Automation & Retention Pro",
    bestFor: "Established D2C brands, multi-product stores, brands with regular Meta/Google ad spend, or businesses handling a high volume of orders and customer conversations.",
    whoItsFor: "Established D2C brands, multi-product stores, brands with regular Meta/Google ad spend, or businesses handling a high volume of orders and customer conversations.",
    problemItSolves: "The brand may have traffic and orders, but it loses revenue through abandoned carts, COD returns, weak repeat purchases, slow customer support, unclear campaign profitability, and manual order operations.",
    included: {
      buildPhase: {
        heading: "Everything in E-Commerce Sales Growth Partner, plus:",
        items: [
          "Up to 500 product uploads",
          "Up to 25 collections/categories",
          "Up to 3 campaign or collection landing pages",
          "Monthly conversion audit",
          "Monthly retention and lead-leakage audit",
          "Store SOPs and team training",
          "Priority support",
          "Four minor website, automation, or message optimisations per month",
          "One monthly founder strategy call"
        ],
        groups: [
          { label: "Advanced store conversion improvements", items: [
            "Bundle/cross-sell/upsell setup",
            "Frequently bought together section",
            "Product recommendation blocks",
            "Exit-intent offer setup where supported",
            "Advanced product-page trust and conversion sections"
          ]},
          { label: "Advanced WhatsApp automation", items: [
            "Multi-step abandoned-cart recovery",
            "Checkout recovery",
            "COD confirmation and verification",
            "COD order cancellation prevention workflow",
            "Order tracking messages",
            "Delivery follow-up",
            "Return/exchange workflow",
            "Back-in-stock alerts",
            "Review and UGC request workflow"
          ]},
          { label: "Advanced AI shopping assistant", items: [
            "Product knowledge base",
            "Product recommendation based on customer need",
            "Size/variant assistance where applicable",
            "Order-status and FAQ support",
            "Lead/customer tagging",
            "Human handoff with chat summary"
          ]},
          { label: "Customer segmentation", items: [
            "First-time customers",
            "Repeat customers",
            "High-value customers",
            "Inactive customers",
            "COD customers",
            "Abandoned-cart customers"
          ]},
          { label: "Retention automations", items: [
            "Post-purchase cross-sell flow",
            "Repeat purchase reminder",
            "Win-back campaign for inactive customers",
            "VIP customer campaign",
            "Birthday/occasion message flow where data is available"
          ]},
          { label: "Meta Ads-to-store reporting", items: [
            "Ad spend",
            "Campaign-wise website sessions",
            "Orders",
            "Revenue",
            "Conversion rate",
            "Cost per purchase",
            "Return on ad spend"
          ]},
          { label: "Founder dashboard", items: [
            "Revenue",
            "Orders",
            "Average order value",
            "Conversion rate",
            "Cart recovery revenue",
            "Repeat-customer revenue",
            "Best products",
            "Campaign performance"
          ]}
        ]
      }
    },
    outcome: [
      "More revenue from the same ad spend and website traffic",
      "Higher cart and checkout recovery",
      "Lower COD cancellation risk",
      "Better customer experience and faster support",
      "More repeat purchases and higher customer lifetime value",
      "Clear campaign-to-revenue visibility"
    ],
    pricing: {
      setup: "₹1,24,999 one-time",
      monthly: "₹34,999/month",
      minimumCommitment: "3 months after go-live"
    }
  }
],
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
    tiers: [
  {
    title: "Admission Response Starter",
    bestFor: "Small coaching institutes, tuition centres, individual educators, online course creators, and teams with up to 3 counsellors.",
    whoItsFor: "Small coaching institutes, tuition centres, individual educators, online course creators, and teams with up to 3 counsellors.",
    problemItSolves: "Student and parent enquiries come from Instagram, Meta ads, WhatsApp, website forms, phone calls, and walk-ins. Because leads are handled manually, replies are delayed, counsellors forget follow-ups, and potential admissions are lost.",
    included: {
      buildPhase: {
        heading: "What's included",
        items: [
          "Admission CRM setup",
          "One admission pipeline: New Enquiry → Contacted → Interested → Counselling Booked → Demo Class / Trial → Admitted → Lost",
          "Up to 3 counsellor/user accounts",
          "Instant WhatsApp acknowledgement message",
          "Basic course brochure, fee details, and eligibility message flow",
          "Lead assignment to counsellors",
          "Counsellor follow-up reminders",
          "One team training session",
          "Seven days of launch support"
        ],
        groups: [
          { label: "Lead capture from", items: [
            "One website enquiry form",
            "WhatsApp click-to-chat",
            "Manual entry for call and walk-in enquiries"
          ]},
          { label: "Four-step follow-up sequence", items: [
            "Instant reply",
            "Day 1 follow-up",
            "Day 3 follow-up",
            "Day 7 final reminder"
          ]},
          { label: "Basic dashboard", items: [
            "New enquiries",
            "Pending follow-ups",
            "Counselling booked",
            "Admissions completed"
          ]}
        ]
      },
      monthly: {
        heading: "Optional Automation Care Plan",
        items: [
          "Ongoing monitoring and support for the CRM and automations",
          "Minor fixes and adjustments as needed"
        ]
      }
    },
    outcome: [
      "Every enquiry is captured in one place",
      "Students and parents get an instant response",
      "Counsellors know exactly whom to follow up with",
      "Fewer enquiries are lost in WhatsApp chats, calls, or notebooks"
    ],
    pricing: {
      setup: "₹29,999 one-time",
      monthly: "₹5,999/month (optional)"
    }
  },
  {
    title: "Admission Conversion Growth Partner",
    bestFor: "Growing coaching institutes, test-prep centres, online learning businesses, edtech companies, and overseas education consultants with up to 10 counsellors.",
    whoItsFor: "Growing coaching institutes, test-prep centres, online learning businesses, edtech companies, and overseas education consultants with up to 10 counsellors.",
    problemItSolves: "The business receives enquiries but does not know which counsellor, course, campaign, or follow-up process is actually generating admissions. Leads become cold because of delayed replies, inconsistent counselling, missed demo-class reminders, and pending documents.",
    included: {
      buildPhase: {
        heading: "Build phase",
        items: [
          "Everything in Admission Response Starter",
          "Up to 10 counsellor/user accounts",
          "Up to 3 course or program pipelines",
          "Advanced admission stages: New Enquiry → Contacted → Qualified → Counselling Scheduled → Counselling Completed → Demo/Trial Attended → Application Started → Documents Pending → Fee Discussion → Admission Confirmed → Lost/Not Eligible",
          "Automatic lead assignment to counsellors",
          "Escalation if a counsellor does not respond within the defined time",
          "Basic AI admission assistant for WhatsApp or website",
          "AI handoff to counsellor for serious enquiries",
          "One team training session and recorded walkthrough"
        ],
        groups: [
          { label: "Lead capture from", items: [
            "Website and landing-page forms",
            "Facebook and Instagram lead forms",
            "WhatsApp Business API",
            "Manual call and walk-in entry"
          ]},
          { label: "WhatsApp automation for", items: [
            "Instant enquiry acknowledgement",
            "Course brochure and information sharing",
            "Fee structure and eligibility details",
            "Counselling booking",
            "Demo class or trial reminders",
            "Parent follow-ups",
            "Application and document reminders",
            "Batch-start and seat-availability reminders"
          ]},
          { label: "Lead qualification questions", items: [
            "Student name",
            "Course interest",
            "Class or academic level",
            "City",
            "Budget",
            "Preferred batch or timeline"
          ]},
          { label: "Admission dashboard by", items: [
            "Counsellor",
            "Course",
            "Lead source",
            "Admission stage"
          ]}
        ]
      },
      monthly: {
        heading: "Monthly Growth Partner",
        items: [
          "Weekly CRM and automation monitoring",
          "Fixing workflow, lead-capture, and integration issues",
          "Two minor message or workflow optimisations per month",
          "Monthly follow-up sequence improvement",
          "Old-lead reactivation workflow for new batches",
          "Course, batch, fee, and offer updates inside the AI assistant",
          "Monthly admission performance report",
          "One monthly strategy/review call"
        ]
      }
    },
    outcome: [
      "More counselling calls and demo-class attendance",
      "Better follow-up discipline from counsellors",
      "More student enquiries converted into admissions",
      "Clear visibility into counsellor, course, and lead-source performance"
    ],
    pricing: {
      setup: "₹59,999 one-time",
      monthly: "₹14,999/month",
      minimumCommitment: "3 months after go-live"
    }
  },
  {
    title: "EdTech Admission Automation Pro",
    bestFor: "Large coaching institutes, multi-branch education businesses, colleges, universities, established edtech platforms, and organisations with up to 25 counsellors.",
    whoItsFor: "Large coaching institutes, multi-branch education businesses, colleges, universities, established edtech platforms, and organisations with up to 25 counsellors.",
    problemItSolves: "When there are multiple courses, branches, campaigns, and counsellors, admission leads leak, teams lack accountability, reporting becomes unreliable, and management cannot see which marketing investment is creating actual admissions.",
    included: {
      buildPhase: {
        heading: "Everything in Admission Conversion Growth Partner, plus:",
        items: [
          "Up to 25 counsellor/user accounts",
          "Up to 10 course/program pipelines",
          "Up to 3 branch/campus setups",
          "Separate admission pipelines by course, city, branch, or program",
          "Central management dashboard for all branches",
          "Advanced AI admission assistant with course knowledge base",
          "AI conversation summaries for counsellors",
          "Past-lead reactivation before every new batch",
          "Application-status messages",
          "Document-collection reminders",
          "Fee-payment and pending-payment reminders",
          "Parent onboarding messages after admission",
          "One voice-agent workflow: missed-call follow-up, or counselling reminder calls",
          "Lead-leakage audit",
          "Custom founder/management dashboard",
          "CRM SOPs and team training",
          "Priority support",
          "Four minor workflow or message optimisations per month",
          "One monthly founder strategy call"
        ],
        groups: [
          { label: "Role-based dashboard access for", items: [
            "Founder",
            "Admission manager",
            "Branch head",
            "Counsellor"
          ]},
          { label: "Lead scoring", items: [
            "Hot: counselling requested, fee-ready, high intent",
            "Warm: interested but comparing options",
            "Cold: future batch or low intent"
          ]},
          { label: "Advanced lead routing based on", items: [
            "City",
            "Course preference",
            "Student class/level",
            "Branch",
            "Counsellor availability"
          ]},
          { label: "Meta Ads-to-CRM campaign reporting", items: [
            "Ad spend",
            "Leads",
            "Cost per lead",
            "Qualified leads",
            "Counselling calls",
            "Applications",
            "Admissions",
            "Cost per admission"
          ]},
          { label: "Counsellor performance reporting", items: [
            "First response time",
            "Follow-up completion",
            "Counselling conversion",
            "Admission conversion"
          ]}
        ]
      }
    },
    outcome: [
      "Central control over leads across courses and branches",
      "Better admission forecasting and campaign decisions",
      "Lower lead leakage",
      "More admissions from the same marketing spend",
      "Stronger communication with students and parents from enquiry to enrollment"
    ],
    pricing: {
      setup: "₹1,24,999 one-time",
      monthly: "₹34,999/month",
      minimumCommitment: "3 months after go-live"
    }
  }
],


  // Note: Costs like WhatsApp Business API messaging, CRM software subscriptions, AI model/API usage, voice-agent telephony, and ad spend are separate from the package price — add a short "What's not included" line or expandable note listing: WhatsApp Business API setup/messaging charges, CRM software subscriptions and licences, AI model/API usage charges, voice-agent telephony charges, Meta/Google ad spend and campaign management, hosting/domain/LMS/ERP/payment gateway costs, and major new features beyond the included monthly optimisations.
  {
    slug: "real-estate",
    nicheName: "Real Estate",
    tagline: "Deals Closed Faster Than the Competition Can Prospect",
    icon: "building-2",
    tiers: [
      {
        title: "Lead Response Starter",
        bestFor:
          "Small brokers, individual agents, and teams of 1–5 agents who manage leads through WhatsApp, Excel, or basic tools.",
        whoItsFor:
          "Small brokers, individual agents, and teams of 1–5 agents who manage leads through WhatsApp, Excel, or basic tools.",
        problemItSolves:
          "Leads come from different sources but get missed, replied late, or never followed up properly.",
        included: {
          buildPhase: {
            heading: "What's included",
            items: [
              "Central CRM for all property enquiries",
              "Instant auto-reply on WhatsApp/SMS/email",
              "Basic follow-up sequence: Day 0, Day 1, Day 3, Day 7",
              "Lead assignment to agents",
              "Simple dashboard: new leads, contacted, follow-up pending, site visits booked",
              "Team onboarding and training",
            ],
            groups: [
              {
                label: "Lead capture from",
                items: [
                  "Website enquiry form",
                  "WhatsApp click-to-chat",
                  "Facebook/Instagram lead forms",
                  "Manual entry for property-portal leads",
                ],
              },
            ],
          },
          monthly: {
            heading: "Optional Care Plan",
            items: [
              "Ongoing monitoring and support for the CRM and automations",
              "Minor fixes and adjustments as needed",
            ],
          },
        },
        outcome: [
          "Faster first response time",
          "No enquiry left untracked",
          "Clear visibility of agent follow-up",
        ],
        pricing: {
          setup: "₹32,500 one-time",
          monthly: "₹6,500/month (optional)",
        },
      },
      {
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
          setup: "₹62,500 one-time",
          monthly: "₹18,500/month",
        },
      },
      {
        title: "Premium Builder Automation",
        bestFor:
          "Builders with multiple projects, large brokerages with 10+ agents, and companies running multiple campaigns.",
        whoItsFor:
          "Builders with multiple projects, large brokerages with 10+ agents, and companies running multiple campaigns.",
        problemItSolves:
          "Multiple projects and teams create confusion, lead leakage, poor campaign visibility, and inconsistent sales processes.",
        included: {
          buildPhase: {
            heading: "Build phase (one-time)",
            items: [
              "Multi-project CRM setup",
              "Separate pipelines for each project/location",
              "Central dashboard across all projects",
              "Call tracking and ads-manager integration for campaign reporting",
              "Voice agent for missed calls and outbound reminders",
              "Lead leakage audit",
              "Sales-process documentation and SOPs",
              "Dedicated account manager and priority support",
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
                  "Agent performance and campaign-level reports",
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
          "Central control over all projects and teams",
          "Better campaign and lead-source performance visibility",
          "Stronger sales process and agent accountability",
        ],
        pricing: {
          setup: "₹2,49,999 one-time",
          setup: "₹2,49,999 one-time",
          monthly: "₹49,999/month",
        },
        outcome: [
          "Central control over all projects and teams",
          "Better campaign and lead-source performance visibility",
          "Stronger sales process and agent accountability",
        ],
      },
    ],
  },
  {
    slug: "healthcare-wellness",
    nicheName: "Healthcare & Wellness",
    tagline: "Care That Feels Personal, Admin That Feels Invisible",
    icon: "heart-pulse",
    tiers: [placeholderTier(), placeholderTier(), placeholderTier()],
  },
  },
  {
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
}
