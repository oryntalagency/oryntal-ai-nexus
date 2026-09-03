import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { DeliveryPoint } from "@/lib/mockData";

// One-at-a-time accordion for the back-of-card "What We Build" list. Keeping a
// single open index means the collapsed footprint stays fixed (so the flip
// doesn't jump in size), while expansion is the only thing that grows the card —
// and only while one row is open, so even long explanations never balloon it.

export function DeliveryAccordion({ items }: { items: DeliveryPoint[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="text-[13px] text-muted-foreground">
        Deliverables for this package are being prepared.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`overflow-hidden rounded-lg ring-1 transition-colors duration-300 ${
              isOpen ? "bg-surface-elevated ring-primary/30" : "bg-surface/60 ring-border"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full touch-manipulation items-center justify-between gap-2 px-3 py-2.5 text-left transition hover:bg-primary/5"
            >
              <span className="flex items-center gap-2.5 text-[14px] font-medium leading-snug text-foreground/90">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                {item.label || "Untitled deliverable"}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "[grid-template-rows:1fr]" : "[grid-template-rows:0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-3 pb-3 pl-[26px] text-[13px] leading-relaxed text-foreground/70">
                  {item.explanation}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
