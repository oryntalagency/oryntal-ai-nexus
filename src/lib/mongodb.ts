import { MongoClient, type Db } from "mongodb";

import { ensureEnvForServer } from "./env.server";

ensureEnvForServer();

declare global {
  var __mongoClient: MongoClient | undefined;
}

const MONGODB_URI = () => process.env.MONGODB_URI;

// Cached at module scope so a serverless process reuses the same pool across
// function invocations instead of opening a fresh connection on every request,
// which floods the free-tier cluster and triggers connection throttling that
// surfaces as a broken TLS handshake ("SSL alert number 80").
let clientPromise: Promise<MongoClient> | null = null;

function getClient(): MongoClient {
  const uri = MONGODB_URI();
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set in the environment. Add it to .env.local or your hosting environment.",
    );
  }

  // Reuse the cached client so a serverless process doesn't open a fresh
  // connection pool on every request.
  if (!globalThis.__mongoClient) {
    globalThis.__mongoClient = new MongoClient(uri, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 30_000,
      serverSelectionTimeoutMS: 10_000,
    });
  }
  return globalThis.__mongoClient;
}

// Cache the connection promise at module scope so concurrent requests share
// one connect() instead of racing to open overlapping connections. On failure
// the cache is reset so a subsequent request can retry with a fresh connection.
export function getClientPromise(): Promise<MongoClient> {
  if (!clientPromise) {
    clientPromise = getClient()
      .connect()
      .catch((err) => {
        clientPromise = null;
        throw err;
      });
  }
  return clientPromise;
}

let dbPromise: Promise<Db> | null = null;

export function getDb(): Promise<Db> {
  if (!dbPromise) {
    dbPromise = getClientPromise().then((client) => client.db());
    dbPromise.catch(() => {
      dbPromise = null;
    });
  }
  return dbPromise;
}

export async function getClientAndDb(): Promise<{ client: MongoClient; db: Db }> {
  const client = await getClientPromise();
  return { client, db: client.db() };
}
