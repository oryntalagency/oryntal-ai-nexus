import { ObjectId, type WithId } from "mongodb";

import { getDb } from "../mongodb";
import type { Blog } from "../mockData";
import { kebab, omitUndefined } from "./shared.server";

// Repository for the `blogPosts` collection. Docs keep the snake_case-free
// field names from scripts/init-db.mjs and mirror the `Blog` type 1:1, with
// the Mongo `_id` exposed as `id`.

export type BlogDoc = {
  id: string;
  title: string;
  heading: string;
  hook: string;
  author: string;
  initials: string;
  readTime: string;
  tags: string[];
  gradient: string;
  height: number;
  trending: boolean;
  cover?: string;
  body?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export function newPostId(title: string): string {
  const base = kebab(title) || "post";
  return `${base}-${Date.now().toString(36)}`;
}

function toBlogDoc(post: Blog, timestamps: { createdAt: Date; updatedAt: Date }): BlogDoc {
  return omitUndefined({
    id: post.id,
    title: post.title,
    heading: post.heading,
    hook: post.hook,
    author: post.author,
    initials: post.initials,
    readTime: post.readTime,
    tags: post.tags,
    gradient: post.gradient,
    height: post.height,
    trending: post.trending,
    cover: post.cover,
    body: post.body,
    linkedinUrl: post.linkedinUrl,
    instagramUrl: post.instagramUrl,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt,
  });
}

function fromBlogDoc(doc: WithId<BlogDoc>): Blog {
  return {
    id: doc.id,
    title: doc.title,
    heading: doc.heading,
    hook: doc.hook,
    author: doc.author,
    initials: doc.initials,
    readTime: doc.readTime,
    tags: doc.tags,
    gradient: doc.gradient,
    height: doc.height,
    trending: doc.trending,
    cover: doc.cover,
    body: doc.body,
    linkedinUrl: doc.linkedinUrl,
    instagramUrl: doc.instagramUrl,
  };
}

export async function listBlogPosts(): Promise<Blog[]> {
  const db = await getDb();
  const docs = await db.collection<BlogDoc>("blogPosts").find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((doc) => fromBlogDoc(doc));
}

export async function createBlogPost(post: Blog): Promise<Blog> {
  const db = await getDb();
  const now = new Date();
  const doc = toBlogDoc(post, { createdAt: now, updatedAt: now });
  const result = await db.collection<BlogDoc>("blogPosts").insertOne(doc);
  return fromBlogDoc({ ...doc, _id: result.insertedId });
}

export async function updateBlogPost(id: string, post: Blog): Promise<Blog | null> {
  const db = await getDb();
  const posts = db.collection<BlogDoc>("blogPosts");
  const existing = await posts.findOne({ id });
  if (!existing) return null;

  const original = existing as unknown as BlogDoc;
  const next = toBlogDoc(
    { ...post, id: original.id },
    {
      createdAt: original.createdAt,
      updatedAt: new Date(),
    },
  );

  await posts.replaceOne({ id: original.id }, next);
  return fromBlogDoc({ ...next, _id: new ObjectId(String(existing._id)) });
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db.collection<BlogDoc>("blogPosts").deleteOne({ id });
  return result.deletedCount === 1;
}
