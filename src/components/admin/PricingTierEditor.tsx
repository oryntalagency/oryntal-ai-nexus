import { AlertCircle, Plus, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { PackageTier } from "@/lib/mockData";
import { TIER_COUNT } from "@/lib/mockData";

// Editor for the `tiers` array on the Packages admin form. The count is fixed at
// TIER_COUNT and there is no add/remove control — the public grid is designed
// around exactly three cards, so letting the count drift would break that
// layout. Only the features list grows and shrinks.
//
// Setup and monthly are two separate text inputs, not a number pair: whatever
// the admin types (₹ symbol, "1,20,000" grouping, "/month" suffix) is what the
// card renders, so the display is never re-formatted behind their back.

export function PricingTierEditor({
  tiers,
  onChange,
  error,
}: {
  tiers: PackageTier[];
  onChange: (tiers: PackageTier[]) => void;
  error?: string;
}) {
  const setTier = (i: number, patch: Partial<PackageTier>) => {
    const next = [...tiers];
    next[i] = { ...tiers[i], ...patch };
    onChange(next);
  };

  const setFeature = (i: number, j: number, value: string) => {
    const features = [...tiers[i].features];
    features[j] = value;
    setTier(i, { features });
  };

  return (
    <div className={`rounded-xl glass p-4 ring-1 ${error ? "ring-destructive/60" : "ring-border"}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Pricing tiers (all {TIER_COUNT} required)
      </p>
      <p className="mb-4 text-xs text-muted-foreground">
        Setup is the one-time cost to get live; the monthly fee is what keeps it running. Both
        display exactly as typed.
      </p>

      <div className="space-y-4">
        {tiers.map((tier, i) => (
          <div key={i} className="rounded-lg bg-surface/60 p-3 ring-1 ring-border">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">
              Tier {i + 1}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label
                  htmlFor={`tier-${i}-name`}
                  className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Tier name *
                </Label>
                <Input
                  id={`tier-${i}-name`}
                  value={tier.tier_name}
                  onChange={(e) => setTier(i, { tier_name: e.target.value })}
                  placeholder="e.g. Lead Response Starter"
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label
                  htmlFor={`tier-${i}-setup`}
                  className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Setup price *
                </Label>
                <Input
                  id={`tier-${i}-setup`}
                  value={tier.setup_price}
                  onChange={(e) => setTier(i, { setup_price: e.target.value })}
                  placeholder="e.g. ₹30,000"
                  className="mt-1 text-xs"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">One-time</p>
              </div>

              <div>
                <Label
                  htmlFor={`tier-${i}-monthly`}
                  className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  Monthly price *
                </Label>
                <Input
                  id={`tier-${i}-monthly`}
                  value={tier.monthly_price}
                  onChange={(e) => setTier(i, { monthly_price: e.target.value })}
                  placeholder="e.g. ₹7,000/month"
                  className="mt-1 text-xs"
                />
                <p className="mt-1 text-[11px] text-muted-foreground">Recurring</p>
              </div>

              <div>
                <Label
                  htmlFor={`tier-${i}-cta`}
                  className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
                >
                  CTA label
                </Label>
                <Input
                  id={`tier-${i}-cta`}
                  value={tier.cta_label}
                  onChange={(e) => setTier(i, { cta_label: e.target.value })}
                  placeholder="Get Started"
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex items-end pb-1">
                <label
                  htmlFor={`tier-${i}-highlight`}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-medium"
                >
                  <Switch
                    id={`tier-${i}-highlight`}
                    checked={tier.highlighted}
                    onCheckedChange={(checked) => setTier(i, { highlighted: checked })}
                  />
                  Highlight this tier
                </label>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Features * (at least one)
              </p>
              <div className="space-y-2">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <span className="shrink-0 text-primary">•</span>
                    <Input
                      value={feature}
                      onChange={(e) => setFeature(i, j, e.target.value)}
                      placeholder="e.g. Central CRM for all property enquiries"
                      aria-label={`Tier ${i + 1} feature ${j + 1}`}
                      className="min-w-0 flex-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setTier(i, { features: tier.features.filter((_, k) => k !== j) })
                      }
                      // Keep at least one row so the tier is never left in a
                      // state the schema would reject.
                      disabled={tier.features.length <= 1}
                      className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-muted-foreground"
                      aria-label={`Remove feature ${j + 1} from tier ${i + 1}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setTier(i, { features: [...tier.features, ""] })}
                className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition hover:text-foreground"
              >
                <Plus className="h-3 w-3" /> Add feature
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      )}
    </div>
  );
}
