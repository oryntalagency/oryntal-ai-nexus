with open('src/data/packages.ts', encoding='utf-8') as f:
    lines = f.readlines()

# Replace e-commerce tiers (index 199 is the tiers line)
new_tiers = '''    tiers: [
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
],\n'''
new_lines = lines[:198] + [new_tiers] + lines[200:]
with open('src/data/packages.ts', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print('done')
