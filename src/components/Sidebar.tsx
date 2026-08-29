import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Package,
  BookOpen,
  Info,
  MessageCircle,
  LayoutDashboard,
  AppWindow,
  Images,
  Settings,
  Globe,
} from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/packages", label: "Packages", icon: Package },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/about", label: "About", icon: Info },
] as const;

const adminItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: AppWindow },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/media", label: "Media", icon: Images },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden md:flex w-20 flex-col items-center justify-between border-r border-border bg-surface/60 backdrop-blur-xl py-5">
        <Link
          to={isAdmin ? "/admin" : "/"}
          className="group relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-border"
        >
          <img
            src="/assets/ol_text.jpeg"
            alt="Oryntal AI Labs"
            className="h-full w-full object-cover"
          />
        </Link>

        <nav className="flex flex-col items-center gap-2">
          {(isAdmin ? adminItems : items).map(({ to, label, icon: Icon }) => {
            const active = isAdmin
              ? pathname === to || pathname.startsWith(`${to}/`)
              : pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {active && (
                  <span className="absolute -left-[14px] top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50">
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>

        {isAdmin ? (
          <Link
            to="/"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full glass ring-1 ring-border text-muted-foreground transition hover:text-primary hover:ring-primary/40"
            aria-label="Back to site"
          >
            <Globe className="h-5 w-5" strokeWidth={2} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50">
              Back to site
            </span>
          </Link>
        ) : (
          <Link
            to="/contact"
            className="group relative flex h-12 w-12 items-center justify-center rounded-full glass ring-1 ring-border text-muted-foreground transition hover:text-primary hover:ring-primary/40"
            aria-label="Contact / Hire us"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50">
              Contact / Hire us
            </span>
          </Link>
        )}
      </aside>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <div className="flex items-stretch">
          {(isAdmin ? adminItems : items).map(({ to, label, icon: Icon }) => {
            const active = isAdmin
              ? pathname === to || pathname.startsWith(`${to}/`)
              : pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex min-h-[58px] flex-1 flex-col items-center justify-center gap-1.5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground active:text-primary"
                }`}
              >
                {active && (
                  <span className="absolute inset-x-3 top-0 h-0.5 rounded-b-full bg-primary" />
                )}
                <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} aria-hidden />
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
