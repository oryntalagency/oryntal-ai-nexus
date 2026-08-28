// Creates a single admin user. Run manually from the terminal — this is not
// exposed as an API endpoint or UI route.
//
// Usage:
//   node scripts/create-admin.mjs <email> <password>
//
// Example:
//   node scripts/create-admin.mjs you@example.com "a-strong-password"
//
// Reads MONGODB_URI from the environment (falling back to .env.local).
// The password is hashed with bcrypt at cost factor 12 before being stored.

import { MongoClient } from "mongodb";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 12;

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

const [emailArg, passwordArg] = process.argv.slice(2);

if (!emailArg || !passwordArg) {
  console.error(
    "Usage: node scripts/create-admin.mjs <email> <password>\n" +
      "Example: node scripts/create-admin.mjs you@example.com 'a-strong-password'",
  );
  process.exit(1);
}

const email = emailArg.trim().toLowerCase();
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("Invalid email address:", emailArg);
  process.exit(1);
}
if (passwordArg.length < 8) {
  console.error("Password must be at least 8 characters long.");
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Set it in the environment or in .env.local.");
  process.exit(1);
}

async function main() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  try {
    await client.connect();
    const db = client.db();
    const admins = db.collection("admins");

    const existing = await admins.findOne({ email });
    if (existing) {
      console.error(`An admin with email '${email}' already exists. Not creating a duplicate.`);
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(passwordArg, BCRYPT_ROUNDS);
    await admins.insertOne({
      email,
      passwordHash,
      role: "owner",
      createdAt: new Date(),
    });
    console.log(`Admin created: ${email} (role: owner)`);
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("Failed to create admin:");
  console.error(err);
  process.exit(1);
});
