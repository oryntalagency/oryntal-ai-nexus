import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// Bullet-list editor shared by the Products and Packages admin forms.
// Same "add another point" pattern used everywhere in the panel.

export function BulletEditor({
  title,
  items,
  onChange,
  placeholder,
  error,
}: {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  error?: string;
}) {
  const setItem = (i: number, v: string) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className={`rounded-xl glass p-4 ring-1 ${error ? "ring-destructive/60" : "ring-border"}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-primary">•</span>
            <Input
              value={item}
              onChange={(e) => setItem(i, e.target.value)}
              placeholder={placeholder}
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
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
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
