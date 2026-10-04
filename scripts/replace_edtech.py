with open('src/data/packages.ts', encoding='utf-8') as f:
    lines = f.readlines()

# 0-based: index 212 is tiers line, 213 is closing brace of edtech object before real-estate
new_tiers = '''    tiers: [
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

'''
new_lines = lines[:212] + [new_tiers] + lines[214:]
with open('src/data/packages.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('done')
