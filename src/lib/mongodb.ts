import { MongoClient, type Db } from "mongodb";

declare global {
  var __mongoClient: MongoClient | undefined;
}

const MONGODB_URI = () => process.env.MONGODB_URI;

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
      serverSelectionTimeoutMS: 5000,
    });
  }
  return globalThis.__mongoClient;
}

let dbPromise: Promise<Db> | null = null;

export function getDb(): Promise<Db> {
  // Cache the connection promise so concurrent requests share one connect.
  if (!dbPromise) {
    dbPromise = getClient()
      .connect()
      .then((client) => client.db());
  }
  return dbPromise;
}

export async function getClientAndDb(): Promise<{ client: MongoClient; db: Db }> {
  const client = getClient();
  await client.connect();
  return { client, db: client.db() };
}
