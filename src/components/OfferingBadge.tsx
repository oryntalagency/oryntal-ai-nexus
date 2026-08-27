import type { OfferingType } from "@/lib/mockData";
import { OFFERING_META } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function OfferingIcon({ type, className }: { type: OfferingType; className?: string }) {
  const { icon: Icon } = OFFERING_META[type];
  return <Icon className={cn("h-3.5 w-3.5 text-primary", className)} strokeWidth={1.9} />;
}

export function OfferingBadge({ type, className }: { type: OfferingType; className?: string }) {
  const { icon: Icon, label } = OFFERING_META[type];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full glass px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground ring-1 ring-border",
        className,
      )}
      title={label}
    >
      <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.9} />
      <span className="sr-only">{label}</span>
    </span>
  );
}
