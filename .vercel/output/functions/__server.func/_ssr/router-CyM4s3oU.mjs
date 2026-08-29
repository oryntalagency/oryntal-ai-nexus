import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as LayoutDashboard, A as AppWindow, P as Package, B as BookOpen, I as Images, S as Settings, H as House, a as Info, G as Globe, M as MessageCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-Cix3o7ZJ.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const items = [
  { to: "/", label: "Home", icon: House },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/about", label: "About", icon: Info }
];
const adminItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: AppWindow },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/media", label: "Media", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];
function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed inset-y-0 left-0 z-40 hidden md:flex w-20 flex-col items-center justify-between border-r border-border bg-surface/60 backdrop-blur-xl py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: isAdmin ? "/admin" : "/",
          className: "group relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-border",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/ol_text.jpeg",
              alt: "Oryntal AI Labs",
              className: "h-full w-full object-cover"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-col items-center gap-2", children: (isAdmin ? adminItems : items).map(({ to, label, icon: Icon }) => {
        const active = isAdmin ? pathname === to || pathname.startsWith(`${to}/`) : pathname === to;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to,
            className: `group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }),
              active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[14px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50", children: label })
            ]
          },
          to
        );
      }) }),
      isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "group relative flex h-12 w-12 items-center justify-center rounded-full glass ring-1 ring-border text-muted-foreground transition hover:text-primary hover:ring-primary/40",
          "aria-label": "Back to site",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5", strokeWidth: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50", children: "Back to site" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/contact",
          className: "group relative flex h-12 w-12 items-center justify-center rounded-full glass ring-1 ring-border text-muted-foreground transition hover:text-primary hover:ring-primary/40",
          "aria-label": "Contact / Hire us",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5", strokeWidth: 2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50", children: "Contact / Hire us" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        "aria-label": "Primary",
        className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch", children: (isAdmin ? adminItems : items).map(({ to, label, icon: Icon }) => {
          const active = isAdmin ? pathname === to || pathname.startsWith(`${to}/`) : pathname === to;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: `relative flex min-h-[58px] flex-1 flex-col items-center justify-center gap-1.5 transition-colors ${active ? "text-primary" : "text-muted-foreground active:text-primary"}`,
              children: [
                active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-3 top-0 h-0.5 rounded-b-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5", strokeWidth: active ? 2.4 : 2, "aria-hidden": true }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-none", children: label })
              ]
            },
            to
          );
        }) })
      }
    )
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-gold-gradient", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong. Try refreshing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-border px-4 py-2 text-sm font-medium", children: "Go home" })
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oryntal AI Labs — Deploy the Future" },
      {
        name: "description",
        content: "A curated catalog of SaaS products, AI automations, and fine-tuned models, built by Oryntal AI Labs to close real gaps."
      },
      { property: "og:title", content: "Oryntal AI Labs" },
      {
        property: "og:description",
        content: "Products, automations, and AI models — built to close real gaps."
      },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@300;400;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-clip bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen pb-24 md:pb-0 md:pl-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] }) });
}
const $$splitComponentImporter$b = () => import("./index-Bq-vgO_E.mjs");
const Route$b = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Oryntal AI Labs — Build What's Next"
    }, {
      name: "description",
      content: "A curated catalog of SaaS products, AI automations, and fine-tuned models, built by Oryntal AI Labs to close real gaps."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./about-D4yKpv_H.mjs");
const Route$a = createFileRoute()({
  head: () => ({
    meta: [{
      title: "About — Oryntal AI Labs"
    }, {
      name: "description",
      content: "Oryntal is a technology studio building SaaS products, AI automations, and AI models — and helping businesses find the ones built for them."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin-C__zhkmv.mjs");
const Route$9 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Admin — Oryntal AI Labs"
    }, {
      name: "description",
      content: "Oryntal AI Labs publisher panel."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./blogs-CIAaKG-B.mjs");
const Route$8 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Community Thoughts — Oryntal AI Labs"
    }, {
      name: "description",
      content: "Essays, field notes, and ideas from the Oryntal community of AI builders."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./contact-B8K7kdXu.mjs");
const Route$7 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Contact / Hire us — Oryntal AI Labs"
    }, {
      name: "description",
      content: "Get in touch with Oryntal AI Labs for engagements, packages, and custom AI builds."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./packages-C-DUfcUX.mjs");
const Route$6 = createFileRoute()({
  head: () => ({
    meta: [{
      title: "Packages — Oryntal AI Labs"
    }, {
      name: "description",
      content: "Engagement tiers from Oryntal AI Labs — automation, SaaS builds, fine-tuning, and ongoing iteration under one roof."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-5IOLPeGu.mjs");
const Route$5 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./blog-DcuY5hG1.mjs");
const Route$4 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./media-DnQ3VLGg.mjs");
const Route$3 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./packages-VkZ3V-FO.mjs");
const Route$2 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./products-DPPAp6aI.mjs");
const Route$1 = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./settings-C3gGCU4k.mjs");
const Route = createFileRoute()({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const AboutRoute = Route$a.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$c
});
const AdminRoute = Route$9.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$c
});
const BlogsRoute = Route$8.update({
  id: "/blogs",
  path: "/blogs",
  getParentRoute: () => Route$c
});
const ContactRoute = Route$7.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$c
});
const PackagesRoute = Route$6.update({
  id: "/packages",
  path: "/packages",
  getParentRoute: () => Route$c
});
const AdminIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const AdminBlogRoute = Route$4.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => AdminRoute
});
const AdminMediaRoute = Route$3.update({
  id: "/media",
  path: "/media",
  getParentRoute: () => AdminRoute
});
const AdminPackagesRoute = Route$2.update({
  id: "/packages",
  path: "/packages",
  getParentRoute: () => AdminRoute
});
const AdminProductsRoute = Route$1.update({
  id: "/products",
  path: "/products",
  getParentRoute: () => AdminRoute
});
const AdminSettingsRoute = Route.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminBlogRoute,
  AdminMediaRoute,
  AdminPackagesRoute,
  AdminProductsRoute,
  AdminSettingsRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute: AdminRouteWithChildren,
  BlogsRoute,
  ContactRoute,
  PackagesRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
