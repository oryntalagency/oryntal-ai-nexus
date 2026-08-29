import { MongoClient } from "mongodb";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
let loaded = false;
function ensureEnvForServer(env = process.env) {
  if (loaded) return;
  loaded = true;
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, "utf8").split(/\r?\n/);
    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq === -1) continue;
      const key = line.slice(0, eq).trim();
      if (!key) continue;
      let value = line.slice(eq + 1).trim();
      value = value.replace(/^["']|["']$/g, "");
      if (env[key] === void 0) env[key] = value;
    }
    break;
  }
}
ensureEnvForServer();
const MONGODB_URI = () => process.env.MONGODB_URI;
let clientPromise = null;
function getClient() {
  const uri = MONGODB_URI();
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set in the environment. Add it to .env.local or your hosting environment."
    );
  }
  if (!globalThis.__mongoClient) {
    globalThis.__mongoClient = new MongoClient(uri, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 3e4,
      serverSelectionTimeoutMS: 1e4
    });
  }
  return globalThis.__mongoClient;
}
function getClientPromise() {
  if (!clientPromise) {
    clientPromise = getClient().connect().catch((err) => {
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}
let dbPromise = null;
function getDb() {
  if (!dbPromise) {
    dbPromise = getClientPromise().then((client) => client.db());
    dbPromise.catch(() => {
      dbPromise = null;
    });
  }
  return dbPromise;
}
export {
  ensureEnvForServer as e,
  getDb as g
};
