// One-time migration: backfills the required `tiers` array on every existing
// `packages` document.
//
// `tiers` is now in the packages validator's `required` list, which means any
// admin save against a pre-existing document would fail validation until the
// field is present. This pads every package out to exactly three tiers,
// preserving any tier that already exists and filling the gaps with blank
// placeholders that the admin form then requires before it will save again.
//
//   node scripts/migrate-package-tiers.mjs
//
// Reads MONGODB_URI from the environment (falling back to .env.local).
// Idempotent: packages whose `tiers` are already complete are left untouched.
//
// To give a package real pricing afterwards, either run
// `node scripts/seed-content.mjs` (Real Estate ships with tiers) or fill the
// Pricing Tiers section in the admin UI.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { MongoClient } from "mongodb";

// Keep in sync with TIER_COUNT in src/lib/mockData.ts and scripts/init-db.mjs.
const TIER_COUNT = 3;
const DEFAULT_CTA_LABEL = "Get Started";

function loadEnvFile() {
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed
        .slice(eq + 1)
        .trim()
        .replace(/^["']|["']$/g, "");
      if (process.env[key] === undefined) process.env[key] = value;
    }
    break;
  }
}

loadEnvFile();

function blankTier() {
  return {
    tier_name: "",
    setup_price: "",
    monthly_price: "",
    features: [""],
    highlighted: false,
    cta_label: DEFAULT_CTA_LABEL,
  };
}

const str = (v) => (typeof v === "string" ? v.trim() : "");

function normalizeTier(entry) {
  const t = entry && typeof entry === "object" ? entry : {};
  const features = Array.isArray(t.features)
    ? t.features.filter((f) => typeof f === "string").map((f) => f.trim())
    : [];
  return {
    tier_name: str(t.tier_name),
    setup_price: str(t.setup_price),
    monthly_price: str(t.monthly_price),
    features: features.length > 0 ? features : [""],
    highlighted: t.highlighted === true,
    cta_label: str(t.cta_label) || DEFAULT_CTA_LABEL,
  };
}

// Mirrors normalizeTiers() in src/lib/mockData.ts: keep what exists, pad to
// TIER_COUNT with blanks.
function buildTiers(existing) {
  const list = Array.isArray(existing) ? existing : [];
  const tiers = [];
  for (let i = 0; i < TIER_COUNT; i++) {
    tiers.push(list[i] === undefined ? blankTier() : normalizeTier(list[i]));
  }
  return tiers;
}

function isComplete(tiers) {
  return (
    Array.isArray(tiers) &&
    tiers.length === TIER_COUNT &&
    tiers.every(
      (t) =>
        str(t.tier_name) !== "" &&
        str(t.setup_price) !== "" &&
        str(t.monthly_price) !== "" &&
        Array.isArray(t.features) &&
        t.features.some((f) => str(f) !== ""),
    )
  );
}

// Restores the same strict validator the runtime applies in
// src/lib/db/packages.server.ts, so the collection is left exactly as
// ensurePackageSchema() would have left it.
const PACKAGES_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "slug", "tagline", "icon", "vision_points", "delivery_points", "tiers"],
    additionalProperties: true,
    properties: {
      _id: { bsonType: "objectId" },
      name: { bsonType: "string", description: "'name' must be the niche/industry name." },
      slug: { bsonType: "string", description: "'slug' must be a unique string." },
      tagline: { bsonType: "string", description: "'tagline' must be the vision-style hook." },
      icon: {
        bsonType: "string",
        description: "'icon' must be a Lucide icon token (e.g. 'shopping-cart', 'sun').",
      },
      vision_points: {
        bsonType: "array",
        minItems: 4,
        items: { bsonType: "string" },
        description: "'vision_points' must be an array of at least 4 outcome-framed strings.",
      },
      delivery_points: {
        bsonType: "array",
        minItems: 1,
        items: {
          bsonType: "object",
          required: ["label", "explanation"],
          additionalProperties: false,
          properties: {
            label: { bsonType: "string", description: "'label' must be a short deliverable name." },
            explanation: {
              bsonType: "string",
              description: "'explanation' must be the fuller deliverable description.",
            },
          },
        },
        description:
          "'delivery_points' must be an array of at least 1 {label, explanation} object.",
      },
      tiers: {
        bsonType: "array",
        minItems: TIER_COUNT,
        maxItems: TIER_COUNT,
        items: {
          bsonType: "object",
          required: [
            "tier_name",
            "setup_price",
            "monthly_price",
            "features",
            "highlighted",
            "cta_label",
          ],
          additionalProperties: false,
          properties: {
            tier_name: { bsonType: "string", description: "'tier_name' must be a string." },
            setup_price: {
              bsonType: "string",
              description:
                "'setup_price' is the one-time setup cost, shown verbatim (e.g. '₹30,000').",
            },
            monthly_price: {
              bsonType: "string",
              description:
                "'monthly_price' is the recurring cost shown verbatim (e.g. '₹7,000/month').",
            },
            features: {
              bsonType: "array",
              minItems: 1,
              items: { bsonType: "string" },
              description: "'features' must be an array of at least 1 string.",
            },
            highlighted: {
              bsonType: "bool",
              description: "'highlighted' marks the featured tier.",
            },
            cta_label: { bsonType: "string", description: "'cta_label' must be a string." },
          },
        },
        description: `'tiers' must be an array of exactly ${TIER_COUNT} tier objects.`,
      },
      createdAt: { bsonType: "date", description: "'createdAt' must be a date." },
      updatedAt: { bsonType: "date", description: "'updatedAt' must be a date." },
    },
  },
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Set it in the environment or in .env.local.");
    process.exit(1);
  }

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  try {
    await client.connect();
    const db = client.db();
    const col = db.collection("packages");

    const exists = (await db.listCollections({ name: "packages" }).toArray()).length > 0;
    if (!exists) {
      console.log("No `packages` collection yet — nothing to migrate. Run scripts/init-db.mjs.");
      return;
    }

    // Relax validation for the duration of the migration: documents that predate
    // `tiers` would otherwise fail the now-stricter required list mid-update.
    await db.command({
      collMod: "packages",
      validator: {},
      validationLevel: "off",
    });
    console.log("Validation relaxed for migration.");

    const all = await col.find({}).toArray();
    let migrated = 0;
    let skipped = 0;
    const padded = [];

    for (const doc of all) {
      if (isComplete(doc.tiers)) {
        skipped++;
        continue;
      }
      const before = Array.isArray(doc.tiers) ? doc.tiers.length : 0;
      const tiers = buildTiers(doc.tiers);
      await col.updateOne({ _id: doc._id }, { $set: { tiers, updatedAt: new Date() } });
      migrated++;
      if (before > 0) padded.push(`${doc.name} (${before} -> ${TIER_COUNT} tiers)`);
    }

    await db.command({
      collMod: "packages",
      validator: PACKAGES_VALIDATOR,
      validationLevel: "strict",
    });
    console.log("Validator restored to strict.");

    console.log(`\nDone. Backfilled ${migrated}, left untouched ${skipped} package(s).`);
    if (padded.length > 0) {
      console.log("Shortened to the required tier count:");
      for (const line of padded) console.log(`  - ${line}`);
    }
    const blanked = all.length - skipped - padded.length;
    if (blanked > 0) {
      console.log(
        `\n${blanked} package(s) now have blank tiers and won't show pricing cards until filled in.`,
      );
      console.log("Add pricing in the admin UI, or run: node scripts/seed-content.mjs");
    }
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
