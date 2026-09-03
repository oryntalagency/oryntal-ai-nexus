import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DeliveryPoint } from "@/lib/mockData";

// Editor for the delivery_points list on the Packages admin form. Each row is a
// short `label` plus a longer `explanation`, following the same add/remove-row
// pattern as BulletEditor so both lists behave consistently.

export function DeliveryPointEditor({
  title,
  items,
  onChange,
  labelPlaceholder,
  explanationPlaceholder,
  error,
}: {
  title: string;
  items: DeliveryPoint[];
  onChange: (items: DeliveryPoint[]) => void;
  labelPlaceholder: string;
  explanationPlaceholder: string;
  error?: string;
}) {
  const setRow = (i: number, patch: Partial<DeliveryPoint>) => {
    const next = [...items];
    next[i] = { ...items[i], ...patch };
    onChange(next);
  };
  return (
    <div className={`rounded-xl glass p-4 ring-1 ${error ? "ring-destructive/60" : "ring-border"}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg bg-surface/60 p-3 ring-1 ring-border">
            <div className="flex items-center gap-2">
              <span className="text-primary">•</span>
              <Input
                value={item.label}
                onChange={(e) => setRow(i, { label: e.target.value })}
                placeholder={labelPlaceholder}
                className="min-w-0 flex-1 text-xs"
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:text-destructive"
                aria-label="Remove point"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 pl-2">
              <Textarea
                value={item.explanation}
                onChange={(e) => setRow(i, { explanation: e.target.value })}
                placeholder={explanationPlaceholder}
                rows={2}
                className="min-h-0 resize-none bg-transparent text-xs"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, { label: "", explanation: "" }])}
          className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground"
        >
          <Plus className="h-3 w-3" /> Add point
        </button>
      </div>
      {error && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
