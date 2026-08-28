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
  linkedinUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
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
    linkedinUrl: data.linkedinUrl,
    instagramUrl: data.instagramUrl,
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
  .inputValidator(postInput)
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
  .inputValidator(postInput.extend({ id: z.string().min(1) }))
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
  .inputValidator(z.object({ id: z.string().min(1) }))
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

const linkRefine = (platform: string) => (v: string | undefined) =>
  !v || new RegExp(`${platform}\\.com`, "i").test(v);

const thoughtInput = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(60, "Please keep your name under 60 characters."),
    thought: z
      .string()
      .trim()
      .min(10, "Your thought is a bit short — add a sentence or two.")
      .max(1000, "Please keep your thought under 1000 characters."),
    linkedin: z
      .string()
      .trim()
      .transform((v) => v || undefined)
      .refine(
        linkRefine("linkedin"),
        "This doesn't look like a LinkedIn profile URL (should contain linkedin.com).",
      )
      .optional(),
    instagram: z
      .string()
      .trim()
      .transform((v) => v || undefined)
      .refine(
        linkRefine("instagram"),
        "This doesn't look like an Instagram profile URL (should contain instagram.com).",
      )
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.linkedin && !val.instagram) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please add your LinkedIn or Instagram profile link.",
      });
    }
  });

const THOUGHT_GRADIENTS = [
  "from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]",
  "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]",
  "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]",
  "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]",
  "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]",
];

function initialsOf(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "T"
  );
}

function titleOf(thought: string): string {
  const firstLine =
    thought
      .split("\n")
      .map((l) => l.trim())
      .find(Boolean) ?? thought;
  return firstLine.length > 60 ? `${firstLine.slice(0, 57).trimEnd()}…` : firstLine;
}

function buildThoughtPost(data: z.infer<typeof thoughtInput>): Blog {
  const thought = data.thought;
  const words = thought.split(/\s+/).filter(Boolean).length;
  return {
    id: newPostId(data.name),
    title: titleOf(thought),
    hook: thought,
    author: data.name,
    initials: initialsOf(data.name),
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    tags: ["#Community"],
    likes: 0,
    comments: 0,
    gradient: THOUGHT_GRADIENTS[data.name.length % THOUGHT_GRADIENTS.length],
    height: 160,
    trending: false,
    body: thought,
    linkedinUrl: data.linkedin,
    instagramUrl: data.instagram,
  };
}

export const submitThought = createServerFn({ method: "POST" })
  .inputValidator(thoughtInput)
  .handler(async ({ data }) => {
    try {
      const item = await createPostRecord(buildThoughtPost(data));
      return { ok: true as const, item };
    } catch (error) {
      console.error("[blog][submitThought]", error);
      return {
        ok: false as const,
        error: "We couldn't save your thought right now. Please try again.",
      };
    }
  });

export type ListBlogPostsResult = Awaited<ReturnType<typeof listBlogPosts>>;
export type BlogWriteResult = Awaited<ReturnType<typeof createBlogPost>>;
export type SubmitThoughtResult = Awaited<ReturnType<typeof submitThought>>;
