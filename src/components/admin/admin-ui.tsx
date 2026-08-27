import type { ReactNode } from "react";
import type { ListingStatus } from "@/lib/mockData";

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-2 inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground ring-1 ring-border">
          {kicker}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl glass p-5 ring-1 ring-border">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
        {icon}
      </div>
      <div className="mt-4 font-display text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatusBadge({ status }: { status: ListingStatus }) {
  const styles: Record<ListingStatus, string> = {
    live: "bg-primary/10 text-primary ring-primary/30",
    beta: "bg-secondary text-foreground ring-border",
    coming: "bg-muted text-muted-foreground ring-border",
  };
  const labels: Record<ListingStatus, string> = {
    live: "Live",
    beta: "Beta",
    coming: "Coming soon",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${styles[status]}`}
    >
      {status === "live" && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
      {labels[status]}
    </span>
  );
}
