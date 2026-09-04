// One-time migration: converts a legacy `packages` collection where
// `delivery_points` was an array of plain strings into the newer shape of
// `{ label, explanation }` objects. Each string becomes a short `label` plus
// an `explanation` equal to the original sentence (the full explanation is
// preserved verbatim in `explanation`).
//
//   node scripts/migrate-delivery-points.mjs
//
// Reads MONGODB_URI from the environment (falling back to .env.local).
// Idempotent: packages whose `delivery_points` are already objects are skipped.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { MongoClient } from "mongodb";

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

// Strips leading filler and trailing punctuation, then titles a short phrase
// that reads as a deliverable name (e.g. "Automated cart-recovery email and SMS
// sequence" -> "Cart Recovery Email + SMS").
function heuristicLabel(text) {
  const cleaned = text
    .replace(/^(automated |ai |an? |the )+/i, "")
    .replace(/[.,:;]+$/, "")
    .trim();
  const words = cleaned.split(/\s+/);
  const kept = words.slice(0, 4);
  let label = kept.join(" ").replace(/\s+and\s+.*$/, "");
  label = label.replace(/[^\w&+/-]/g, "");
  // Capitalize each word except common short connectors.
  const stop = new Set(["of", "to", "for", "the", "in", "with", "and"]);
  label = label
    .split(/\s+/)
    .map((w) => (stop.has(w.toLowerCase()) ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
  return label || "Deliverable";
}

// Prefer a curated label for every string that the old seed shipped, so those
// packages come out with clean, human-written labels rather than heuristic ones.
const LABEL_OVERRIDES = {
  // E-Commerce
  "Automated cart-recovery email and SMS sequence, triggered in real time.":
    "Cart Recovery Automation",
  "AI product-description generator that drafts and updates every listing.":
    "AI Product Descriptions",
  "Personalized on-site recommendation engine based on browsing behaviour.":
    "Personalized Recommendations",
  "Automated order, shipping, and delivery confirmation flows with review requests.":
    "Order Confirmation Flows",
  "A unified dashboard so you can watch every workflow fire and where it lands.":
    "Unified Ops Dashboard",
};

function toObjectPoint(str) {
  return {
    label: LABEL_OVERRIDES[str] ?? heuristicLabel(str),
    explanation: str,
  };
}

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

    // Temporarily relax validation so legacy documents (which may be missing
    // newly-required fields like icon/createdAt/updatedAt) can be updated.
    let previousValidator = null;
    try {
      const info = await db.command({ collStats: "packages" });
      previousValidator = info.options?.validator ?? null;
    } catch {
      // collection may not exist yet — that's fine
    }
    await db.command({
      collMod: "packages",
      validator: {},
      validationLevel: "off",
    });
    console.log("Validation relaxed for migration.");

    const all = await col.find({}).toArray();
    let migrated = 0;
    let skipped = 0;

    for (const doc of all) {
      const points = doc.delivery_points;
      const isLegacy = Array.isArray(points) && points.some((p) => typeof p === "string");
      if (!isLegacy) {
        skipped++;
        continue;
      }

      const next = points.map((p) => {
        if (typeof p === "string") return toObjectPoint(p);
        // Mixed/object entries are already in the new shape — keep them.
        return { label: p.label ?? "", explanation: p.explanation ?? "" };
      });

      await col.updateOne({ _id: doc._id }, { $set: { delivery_points: next } });
      migrated++;
      console.log(`Migrated: ${doc.name} (${points.length} -> ${next.length} points)`);
    }

    // Restore original validator (or the current one from packages.server.ts).
    const PACKAGES_VALIDATOR = {
      $jsonSchema: {
        bsonType: "object",
        required: ["name", "slug", "tagline", "icon", "vision_points", "delivery_points"],
        additionalProperties: true,
        properties: {
          _id: { bsonType: "objectId" },
          name: { bsonType: "string" },
          slug: { bsonType: "string" },
          tagline: { bsonType: "string" },
          icon: { bsonType: "string" },
          vision_points: { bsonType: "array", minItems: 4, items: { bsonType: "string" } },
          delivery_points: {
            bsonType: "array",
            minItems: 1,
            items: {
              bsonType: "object",
              required: ["label", "explanation"],
              additionalProperties: false,
              properties: {
                label: { bsonType: "string" },
                explanation: { bsonType: "string" },
              },
            },
          },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" },
        },
      },
    };
    await db.command({
      collMod: "packages",
      validator: PACKAGES_VALIDATOR,
      validationLevel: "strict",
    });
    console.log("Validator restored to strict.");

    console.log(`\nDone. Migrated ${migrated}, skipped ${skipped} package(s).`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
