import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin } from "../db/admins.server";
import {
  createBlogPost as createPostRecord,
  deleteBlogPost as deletePostRecord,
  listBlogPosts as listPostRecords,
  newPostId,
  updateBlogPost as updatePostRecord,
} from "../db/blog.server";
import type { Blog } from "../mockData";

const postInput = z.object({
  title: z.string().min(1),
  hook: z.string().min(1),
  author: z.string(),
  initials: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()),
  likes: z.number().optional(),
  comments: z.number().optional(),
  gradient: z.string(),
  height: z.number().optional(),
  trending: z.boolean().optional(),
  cover: z.string().optional(),
  body: z.string().optional(),
});

function toBlog(data: z.infer<typeof postInput>, id: string): Blog {
  return {
    id,
    title: data.title,
    hook: data.hook,
    author: data.author,
    initials: data.initials,
    readTime: data.readTime,
    tags: data.tags,
    likes: data.likes ?? 0,
    comments: data.comments ?? 0,
    gradient: data.gradient,
    height: data.height ?? 260,
    trending: data.trending ?? false,
    cover: data.cover,
    body: data.body,
  };
}

export const listBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const items = await listPostRecords();
    return { ok: true as const, items };
  } catch (error) {
    console.error("[blog][list]", error);
    return { ok: false as const, error: "Failed to load posts." };
  }
});

export const createBlogPost = createServerFn({ method: "POST" })
  .validator(postInput)
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    try {
      const item = await createPostRecord(toBlog(data, newPostId(data.title)));
      return { ok: true as const, item };
    } catch (error) {
      console.error("[blog][create]", error);
      return { ok: false as const, error: "Could not save the post." };
    }
  });

export const updateBlogPost = createServerFn({ method: "POST" })
  .validator(postInput.extend({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    const { id, ...rest } = data;
    try {
      const item = await updatePostRecord(id, toBlog(rest, id));
      if (!item) return { ok: false as const, error: "Post not found." };
      return { ok: true as const, item };
    } catch (error) {
      console.error("[blog][update]", error);
      return { ok: false as const, error: "Could not save the post." };
    }
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const admin = await currentAdmin();
    if (!admin) return { ok: false as const, error: "You must be signed in as an admin." };
    try {
      const deleted = await deletePostRecord(data.id);
      return deleted
        ? ({ ok: true as const, item: { id: data.id } } as const)
        : ({ ok: false as const, error: "Post not found." } as const);
    } catch (error) {
      console.error("[blog][delete]", error);
      return { ok: false as const, error: "Could not delete the post." };
    }
  });

export type ListBlogPostsResult = Awaited<ReturnType<typeof listBlogPosts>>;
export type BlogWriteResult = Awaited<ReturnType<typeof createBlogPost>>;
