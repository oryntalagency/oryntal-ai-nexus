import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BookOpen, User, Plus } from "lucide-react";
import logo from "@/assets/oryntal-logo.png";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/blogs", label: "Blogs", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden md:flex w-20 flex-col items-center justify-between border-r border-border bg-surface/60 backdrop-blur-xl py-5">
      <Link to="/" className="group relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-border">
        <img src={logo} alt="Oryntal AI Labs" className="h-full w-full object-cover" />
      </Link>

      <nav className="flex flex-col items-center gap-2">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
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

      <button
        type="button"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.86_0.09_86)] to-[oklch(0.7_0.14_78)] text-primary-foreground shadow-gold-glow transition hover:scale-105"
        aria-label="List Model"
      >
        <Plus className="h-5 w-5" strokeWidth={2.5} />
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg transition group-hover:opacity-100 ring-1 ring-border z-50">
          List Model
        </span>
      </button>
    </aside>
  );
}
