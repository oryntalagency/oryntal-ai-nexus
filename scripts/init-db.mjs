// One-time / idempotent setup script.
//
// Creates the `products`, `packages`, `blogPosts`, `tags`, and `admins`
// collections, attaches JSON Schema validation so bad data can't be inserted,
// builds the required indexes, and seeds the `tags` taxonomy with upserts.
//
// Usage:
//   node scripts/init-db.mjs
//
// Reads MONGODB_URI from the environment. If it isn't set, it will try to
// load it from a `.env.local` file next to the script's working directory
// (dotenv-style), so `MONGODB_URI=... node scripts/init-db.mjs` and a plain
// `node scripts/init-db.mjs` both work.

import { MongoClient } from "mongodb";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

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

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error(
    "MONGODB_URI is not set. Set it in the environment or in .env.local, e.g.:\n" +
      '  $env:MONGODB_URI="mongodb+srv://..."\n' +
      "or run with:\n  node scripts/init-db.mjs",
  );
  process.exit(1);
}

function url(field) {
  return {
    bsonType: "string",
    description: `'${field}' must be a URL string.`,
  };
}

function dateField(field) {
  return {
    bsonType: "date",
    description: `'${field}' must be a date.`,
  };
}

// ---- blogPosts ------------------------------------------------------------
// Fields mirror the `Blog` type already used by the app UI.
const blogPostsValidator = {
  $jsonSchema: {
    bsonType: "object",
    additionalProperties: true,
    required: ["id", "title", "hook", "author", "initials", "readTime", "tags", "trending"],
    properties: {
      _id: { bsonType: "objectId" },
      id: { bsonType: "string", description: "'id' must be a string." },
      title: { bsonType: "string", description: "'title' must be a string." },
      hook: { bsonType: "string", description: "'hook' must be a string." },
      author: { bsonType: "string", description: "'author' must be a string." },
      initials: { bsonType: "string", description: "'initials' must be a string." },
      readTime: { bsonType: "string", description: "'readTime' must be a string." },
      tags: {
        bsonType: "array",
        items: { bsonType: "string" },
        description: "'tags' must be an array of strings.",
      },
      likes: { bsonType: "int", description: "'likes' must be an integer." },
      comments: { bsonType: "int", description: "'comments' must be an integer." },
      gradient: { bsonType: "string", description: "'gradient' must be a string." },
      trending: { bsonType: "bool", description: "'trending' must be a boolean." },
      cover: { bsonType: "string", description: "'cover' must be a string (URL or data URI)." },
      body: { bsonType: "string", description: "'body' must be a markdown string." },
    },
  },
};

// ---- tags -----------------------------------------------------------------
const tagsValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["label", "facet", "slug"],
    properties: {
      _id: { bsonType: "objectId" },
      label: { bsonType: "string", description: "'label' must be a string." },
      facet: {
        enum: ["problem", "industry", "tech"],
        description: "'facet' must be one of: problem, industry, tech.",
      },
      slug: { bsonType: "string", description: "'slug' must be a string." },
    },
  },
};

// ---- products -------------------------------------------------------------
const productsValidator = {
  $jsonSchema: {
    bsonType: "object",
    // The app persists several UI-only fields next to the core ones
    // (tagline, creator, price, gradient, glyph, height, featured), so the
    // validator must tolerate extra fields. They are also declared below for
    // type safety.
    additionalProperties: true,
    required: [
      "title",
      "slug",
      "offering_type",
      "problem_tags",
      "image",
      "problem_points",
      "advantage_points",
      "status",
    ],
    properties: {
      _id: { bsonType: "objectId" },
      title: { bsonType: "string", description: "'title' must be a string." },
      slug: { bsonType: "string", description: "'slug' must be a string." },
      offering_type: {
        enum: ["SaaS Product", "AI Automation", "AI Model/Agent"],
        description: "'offering_type' must be one of: SaaS Product, AI Automation, AI Model/Agent.",
      },
      problem_tags: {
        bsonType: "array",
        minItems: 1,
        items: { bsonType: "string" },
        description: "'problem_tags' must be an array of strings with at least one item.",
      },
      industry_tags: {
        bsonType: "array",
        items: { bsonType: "string" },
        description: "'industry_tags' must be an array of strings.",
      },
      tech_tags: {
        bsonType: "array",
        items: { bsonType: "string" },
        description: "'tech_tags' must be an array of strings.",
      },
      image: { ...url("image"), description: "'image' must be a URL string." },
      video: { ...url("video"), description: "'video' must be a URL string." },
      loom_url: { ...url("loom_url"), description: "'loom_url' must be a URL string." },
      problem_points: {
        bsonType: "array",
        minItems: 1,
        items: { bsonType: "string" },
        description: "'problem_points' must be an array of strings with at least one item.",
      },
      advantage_points: {
        bsonType: "array",
        minItems: 1,
        items: { bsonType: "string" },
        description: "'advantage_points' must be an array of strings with at least one item.",
      },
      status: {
        enum: ["Live", "Beta", "Coming soon"],
        description: "'status' must be one of: Live, Beta, Coming soon.",
      },
      cta_url: { ...url("cta_url"), description: "'cta_url' must be a URL string." },
      tagline: { bsonType: "string", description: "'tagline' must be a string." },
      creator: { bsonType: "string", description: "'creator' must be a string." },
      price: {
        enum: ["Free", "Premium"],
        description: "'price' must be Free or Premium.",
      },
      gradient: { bsonType: "string", description: "'gradient' must be a string." },
      glyph: { bsonType: "string", description: "'glyph' must be a string." },
      height: { bsonType: "int", description: "'height' must be an integer (in px)." },
      featured: { bsonType: "bool", description: "'featured' must be a boolean." },
      createdAt: dateField("createdAt"),
      updatedAt: dateField("updatedAt"),
    },
  },
};

// ---- packages -------------------------------------------------------------
// One package per industry niche. Fields are outcome-framed vision copy on the
// front (name, tagline, vision_points) and the concrete deliverables behind it
// on the back (delivery_points). Deliberately no price field.
const packagesValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["name", "slug", "tagline", "icon", "vision_points", "delivery_points"],
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
        items: { bsonType: "string" },
        description: "'delivery_points' must be an array of at least 1 deliverable string.",
      },
      createdAt: dateField("createdAt"),
      updatedAt: dateField("updatedAt"),
    },
  },
};

// ---- admins ---------------------------------------------------------------
const adminsValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "passwordHash", "role"],
    properties: {
      _id: { bsonType: "objectId" },
      email: { bsonType: "string", description: "'email' must be a string." },
      passwordHash: {
        bsonType: "string",
        description: "'passwordHash' must be a bcrypt-hashed string.",
      },
      role: {
        enum: ["owner", "editor", "viewer"],
        description: "'role' must be a valid admin role.",
      },
      createdAt: dateField("createdAt"),
    },
  },
};

const collections = [
  {
    name: "products",
    validator: productsValidator,
    validationLevel: "strict",
    indexes: [
      { key: { slug: 1 }, unique: true, name: "products_slug_unique" },
      { key: { problem_tags: 1 }, unique: false, name: "products_problem_tags" },
      { key: { offering_type: 1 }, unique: false, name: "products_offering_type" },
      { key: { status: 1 }, unique: false, name: "products_status" },
    ],
  },
  {
    name: "packages",
    validator: packagesValidator,
    validationLevel: "strict",
    indexes: [{ key: { slug: 1 }, unique: true, name: "packages_slug_unique" }],
  },
  {
    name: "blogPosts",
    validator: blogPostsValidator,
    validationLevel: "strict",
    indexes: [{ key: { id: 1 }, unique: true, name: "blogPosts_id_unique" }],
  },
  {
    name: "tags",
    validator: tagsValidator,
    validationLevel: "strict",
    indexes: [
      {
        key: { facet: 1, slug: 1 },
        unique: true,
        name: "tags_facet_slug_unique",
      },
      { key: { slug: 1 }, unique: false, name: "tags_slug" },
    ],
  },
  {
    name: "admins",
    validator: adminsValidator,
    validationLevel: "strict",
    indexes: [{ key: { email: 1 }, unique: true, name: "admins_email_unique" }],
  },
];

function kebab(label) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const seedTags = [
  ...[
    "Lead Generation",
    "Customer Support Automation",
    "Content Creation",
    "Sales & CRM Automation",
    "Data & Reporting",
    "HR & Recruiting",
    "Finance & Bookkeeping Automation",
    "E-commerce Ops",
    "Internal Workflow Automation",
  ].map((label) => ({ label, facet: "problem", slug: kebab(label) })),
  ...[
    "Real Estate",
    "E-commerce",
    "Agencies & Consulting",
    "SaaS",
    "Healthcare",
    "Logistics",
    "Local Services",
    "Finance",
  ].map((label) => ({ label, facet: "industry", slug: kebab(label) })),
  ...[
    "Agents",
    "Chat & Assistant",
    "Voice",
    "Vision",
    "Workflow Automation",
    "RAG & Search",
    "Analytics & BI",
    "Fine-Tuning",
  ].map((label) => ({ label, facet: "tech", slug: kebab(label) })),
];

async function main() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  try {
    await client.connect();
    console.log("Connected to MongoDB.");

    const db = client.db();
    const names = (await db.listCollections().toArray()).map((c) => c.name);

    for (const { name, validator, validationLevel, indexes } of collections) {
      if (!names.includes(name)) {
        await db.createCollection(name, {
          validator,
          validationLevel,
        });
        console.log(`Created collection '${name}' with schema validation.`);
      } else {
        await db.command({
          collMod: name,
          validator,
          validationLevel,
        });
        console.log(`Collection '${name}' exists — updated schema validation.`);
      }

      for (const idx of indexes) {
        try {
          await db.collection(name).createIndex(idx.key, {
            unique: idx.unique,
            name: idx.name,
          });
        } catch (err) {
          // Index may already exist with the same name/spec.
          console.warn(`  index '${idx.name}' on '${name}': ${err.message}`);
        }
      }
    }

    // Seed tags with upserts so the script is safe to re-run.
    const tagsCol = db.collection("tags");
    let seeded = 0;
    for (const tag of seedTags) {
      const res = await tagsCol.updateOne(
        { facet: tag.facet, slug: tag.slug },
        { $set: tag },
        { upsert: true },
      );
      if (res.upsertedCount > 0) seeded += 1;
    }
    console.log(`Tags seeded: ${seedTags.length} total, ${seeded} new.`);

    console.log("\nDone. Collections, validation, indexes, and seed data are in place.");
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

main().catch((err) => {
  console.error("Setup failed:");
  console.error(err);
  process.exit(1);
});
