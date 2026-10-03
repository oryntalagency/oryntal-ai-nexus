import { Link } from "@tanstack/react-router";
import { AlertTriangle, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { isPlaceholderTier, type PackageTier } from "@/data/packages";

function BulletList({ items, tone = "check" }: { items: string[]; tone?: "check" | "diamond" }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-[1.65] text-foreground/85">
          {tone === "check" ? (
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
          ) : (
            <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45 bg-primary/80" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      {children}
    </div>
  );
}

// One tier as an expandable card. Title and bestFor (plus the full pricing block,
// which must never be hidden) sit in the always-visible trigger; everything else
// lives in the collapsible breakdown.
function TierCard({
  tier,
  index,
  nicheName,
}: {
  tier: PackageTier;
  index: number;
  nicheName: string;
}) {
  const placeholder = isPlaceholderTier(tier);
  const buildPhase = tier.included.buildPhase;
  const groups = buildPhase.groups ?? [];

  return (
    <AccordionItem
      value={`tier-${index}`}
      className="scroll-mt-24 overflow-hidden rounded-2xl bg-surface ring-1 ring-border transition-colors data-[state=open]:ring-primary/40"
    >
      <AccordionTrigger className="group/tigger items-start gap-4 rounded-2xl px-6 py-5 text-left hover:no-underline sm:items-center sm:px-7 sm:py-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.12em] text-primary ring-1 ring-primary/30">
              Tier {String(index + 1).padStart(2, "0")}
            </span>
            {placeholder && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground ring-1 ring-border">
                <AlertTriangle className="h-3 w-3" />
                Content pending
              </span>
            )}
          </div>

          <h3
            className={`mt-3 font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl ${
              placeholder ? "text-muted-foreground" : ""
            }`}
          >
            {tier.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{tier.bestFor}</p>
        </div>

        {/* Pricing stays visible whether or not the card is expanded. Setup and
            monthly are separate strings so the currency symbol, digit grouping
            and "/month" suffix render exactly as written in the data file. */}
        <div className="shrink-0 text-right">
          <p className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {tier.pricing.setup}
          </p>
          <p className="mt-0.5 text-sm font-semibold text-primary">+ {tier.pricing.monthly}</p>
          {tier.pricing.minimumCommitment && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              {tier.pricing.minimumCommitment}
            </p>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-6 pb-6 sm:px-7 sm:pb-7">
        <div className="space-y-6 border-t border-border pt-6">
          {placeholder ? (
            <div className="rounded-xl bg-muted/20 p-5 ring-1 ring-border">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
                <AlertTriangle className="h-4 w-4 text-primary" />
                This tier hasn&apos;t been written yet
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Scope, deliverables, and pricing for this tier are still being finalised. Get in
                touch and we&apos;ll scope it for {nicheName}.
              </p>
            </div>
          ) : (
            <>
              <Section label="Who it's for">
                <p className="mt-2 text-sm leading-[1.7] text-foreground/85">{tier.whoItsFor}</p>
              </Section>

              <Section label="Problem it solves">
                <p className="mt-2 text-sm leading-[1.7] text-foreground/85">
                  {tier.problemItSolves}
                </p>
              </Section>

              <Section label={buildPhase.heading}>
                <BulletList items={buildPhase.items} />
                {groups.length > 0 && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {groups.map((group) => (
                      <div
                        key={group.label}
                        className="rounded-xl bg-surface-elevated/60 p-4 ring-1 ring-border"
                      >
                        <p className="text-[13px] font-semibold tracking-tight text-foreground/90">
                          {group.label}
                        </p>
                        <BulletList items={group.items} tone="diamond" />
                      </div>
                    ))}
                  </div>
                )}
              </Section>

              {tier.included.monthly && (
                <Section label={tier.included.monthly.heading}>
                  <BulletList items={tier.included.monthly.items} />
                </Section>
              )}

              <Section label="Outcome">
                <BulletList items={tier.outcome} tone="diamond" />
              </Section>
            </>
          )}

          <Link
            to="/contact"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground active:scale-[0.99] sm:min-h-0 sm:w-auto sm:px-6"
          >
            Discuss this tier
          </Link>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// All three tiers for one niche, each independently expandable.
export function PackageTiers({
  tiers,
  nicheName,
}: {
  tiers: PackageTier[];
  nicheName: string;
}) {
  if (tiers.length === 0) return null;

  return (
    <Accordion type="multiple" className="space-y-4">
      {tiers.map((tier, index) => (
        <TierCard key={`${index}-${tier.title}`} tier={tier} index={index} nicheName={nicheName} />
      ))}
    </Accordion>
  );
}