import type { ListingStatus, OfferingType } from "../mockData";

// Field-mapping between the DB schema (snake_case, established by
// scripts/init-db.mjs) and the UI types used across the app.

export const OFFERING_TYPE_TO_DB: Record<OfferingType, string> = {
  saas: "SaaS Product",
  automation: "AI Automation",
  model: "AI Model/Agent",
};

export const DB_TO_OFFERING_TYPE: Record<string, OfferingType> = {
  "SaaS Product": "saas",
  "AI Automation": "automation",
  "AI Model/Agent": "model",
};

export const STATUS_TO_DB: Record<ListingStatus, string> = {
  live: "Live",
  beta: "Beta",
  coming: "Coming soon",
};

export const DB_TO_STATUS: Record<string, ListingStatus> = {
  Live: "live",
  Beta: "beta",
  "Coming soon": "coming",
};

export function kebab(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Strips `undefined` values before the object reaches the Mongo driver, which
// would otherwise serialise them as invalid `null` (or throw) and trip the
// JSON Schema validators.
export function omitUndefined<T extends Record<string, unknown>>(value: T): T {
  const out = { ...value } as Record<string, unknown>;
  for (const key of Object.keys(out)) {
    if (out[key] === undefined) delete out[key];
  }
  return out as T;
}
