import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { c as currentAdmin } from "./admins.server-1QQJDc-F.mjs";
import { ObjectId } from "mongodb";
import { g as getDb } from "./mongodb-7utz71PX.mjs";
import { k as kebab, o as omitUndefined } from "./shared.server-Ba483pzE.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/bcryptjs.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType, a as arrayType, Z as ZodIssueCode } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "node:stream/promises";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "node:crypto";
import "node:fs";
import "node:path";
function newPostId(title) {
  const base = kebab(title) || "post";
  return `${base}-${Date.now().toString(36)}`;
}
function toBlogDoc(post, timestamps) {
  return omitUndefined({
    id: post.id,
    title: post.title,
    hook: post.hook,
    author: post.author,
    initials: post.initials,
    readTime: post.readTime,
    tags: post.tags,
    likes: post.likes,
    comments: post.comments,
    gradient: post.gradient,
    height: post.height,
    trending: post.trending,
    cover: post.cover,
    body: post.body,
    linkedinUrl: post.linkedinUrl,
    instagramUrl: post.instagramUrl,
    createdAt: timestamps.createdAt,
    updatedAt: timestamps.updatedAt
  });
}
function fromBlogDoc(doc) {
  return {
    id: doc.id,
    title: doc.title,
    hook: doc.hook,
    author: doc.author,
    initials: doc.initials,
    readTime: doc.readTime,
    tags: doc.tags,
    likes: doc.likes,
    comments: doc.comments,
    gradient: doc.gradient,
    height: doc.height,
    trending: doc.trending,
    cover: doc.cover,
    body: doc.body,
    linkedinUrl: doc.linkedinUrl,
    instagramUrl: doc.instagramUrl
  };
}
async function listBlogPosts$1() {
  const db = await getDb();
  const docs = await db.collection("blogPosts").find({}).sort({ createdAt: -1 }).toArray();
  return docs.map((doc) => fromBlogDoc(doc));
}
async function createBlogPost$1(post) {
  const db = await getDb();
  const now = /* @__PURE__ */ new Date();
  const doc = toBlogDoc(post, { createdAt: now, updatedAt: now });
  const result = await db.collection("blogPosts").insertOne(doc);
  return fromBlogDoc({ ...doc, _id: result.insertedId });
}
async function updateBlogPost$1(id, post) {
  const db = await getDb();
  const posts = db.collection("blogPosts");
  const existing = await posts.findOne({ id });
  if (!existing) return null;
  const original = existing;
  const next = toBlogDoc(
    { ...post, id: original.id },
    {
      createdAt: original.createdAt,
      updatedAt: /* @__PURE__ */ new Date()
    }
  );
  await posts.replaceOne({ id: original.id }, next);
  return fromBlogDoc({ ...next, _id: new ObjectId(String(existing._id)) });
}
async function deleteBlogPost$1(id) {
  const db = await getDb();
  const result = await db.collection("blogPosts").deleteOne({ id });
  return result.deletedCount === 1;
}
const postInput = objectType({
  title: stringType().min(1),
  hook: stringType().min(1),
  author: stringType(),
  initials: stringType(),
  readTime: stringType(),
  tags: arrayType(stringType()),
  likes: numberType().optional(),
  comments: numberType().optional(),
  gradient: stringType(),
  height: numberType().optional(),
  trending: booleanType().optional(),
  cover: stringType().optional(),
  body: stringType().optional(),
  linkedinUrl: stringType().optional(),
  instagramUrl: stringType().optional()
});
function toBlog(data, id) {
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
    instagramUrl: data.instagramUrl
  };
}
const listBlogPosts_createServerFn_handler = createServerRpc({
  id: "6a12fc89b15863ec6f1317fa3e62e4d2290bef5a61b105ca7c5fac151daf8165",
  name: "listBlogPosts",
  filename: "src/lib/api/blog.ts"
}, (opts) => listBlogPosts.__executeServer(opts));
const listBlogPosts = createServerFn({
  method: "GET"
}).handler(listBlogPosts_createServerFn_handler, async () => {
  try {
    const items = await listBlogPosts$1();
    return {
      ok: true,
      items
    };
  } catch (error) {
    console.error("[blog][list]", error);
    return {
      ok: false,
      error: "Failed to load posts."
    };
  }
});
const createBlogPost_createServerFn_handler = createServerRpc({
  id: "ad8a26a11564ff86f4299d5236d4f1f8fb271512df6fb5f99e918cadeea0cb2d",
  name: "createBlogPost",
  filename: "src/lib/api/blog.ts"
}, (opts) => createBlogPost.__executeServer(opts));
const createBlogPost = createServerFn({
  method: "POST"
}).inputValidator(postInput).handler(createBlogPost_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  try {
    const item = await createBlogPost$1(toBlog(data, newPostId(data.title)));
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[blog][create]", error);
    return {
      ok: false,
      error: "Could not save the post."
    };
  }
});
const updateBlogPost_createServerFn_handler = createServerRpc({
  id: "11ffe802f5af92bfed3d445ee0a98cb14219057789c6f32cdc9d8b4c6eaae244",
  name: "updateBlogPost",
  filename: "src/lib/api/blog.ts"
}, (opts) => updateBlogPost.__executeServer(opts));
const updateBlogPost = createServerFn({
  method: "POST"
}).inputValidator(postInput.extend({
  id: stringType().min(1)
})).handler(updateBlogPost_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  const {
    id,
    ...rest
  } = data;
  try {
    const item = await updateBlogPost$1(id, toBlog(rest, id));
    if (!item) return {
      ok: false,
      error: "Post not found."
    };
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[blog][update]", error);
    return {
      ok: false,
      error: "Could not save the post."
    };
  }
});
const deleteBlogPost_createServerFn_handler = createServerRpc({
  id: "b6c3943f205d8f5cb5155be038e8f306adc8d93e7022f9abd3cf100628b790fd",
  name: "deleteBlogPost",
  filename: "src/lib/api/blog.ts"
}, (opts) => deleteBlogPost.__executeServer(opts));
const deleteBlogPost = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(deleteBlogPost_createServerFn_handler, async ({
  data
}) => {
  const admin = await currentAdmin();
  if (!admin) return {
    ok: false,
    error: "You must be signed in as an admin."
  };
  try {
    const deleted = await deleteBlogPost$1(data.id);
    return deleted ? {
      ok: true,
      item: {
        id: data.id
      }
    } : {
      ok: false,
      error: "Post not found."
    };
  } catch (error) {
    console.error("[blog][delete]", error);
    return {
      ok: false,
      error: "Could not delete the post."
    };
  }
});
const linkRefine = (platform) => (v) => !v || new RegExp(`${platform}\\.com`, "i").test(v);
const thoughtInput = objectType({
  name: stringType().trim().min(2, "Please enter your name.").max(60, "Please keep your name under 60 characters."),
  thought: stringType().trim().min(10, "Your thought is a bit short — add a sentence or two.").max(1e3, "Please keep your thought under 1000 characters."),
  linkedin: stringType().trim().transform((v) => v || void 0).refine(linkRefine("linkedin"), "This doesn't look like a LinkedIn profile URL (should contain linkedin.com).").optional(),
  instagram: stringType().trim().transform((v) => v || void 0).refine(linkRefine("instagram"), "This doesn't look like an Instagram profile URL (should contain instagram.com).").optional()
}).superRefine((val, ctx) => {
  if (!val.linkedin && !val.instagram) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: "Please add your LinkedIn or Instagram profile link."
    });
  }
});
const THOUGHT_GRADIENTS = ["from-[oklch(0.45_0.12_60)] via-[oklch(0.3_0.08_50)] to-[oklch(0.78_0.13_82)]", "from-[oklch(0.2_0.04_60)] via-[oklch(0.55_0.14_82)] to-[oklch(0.3_0.05_30)]", "from-[oklch(0.18_0.02_60)] via-[oklch(0.35_0.08_40)] to-[oklch(0.82_0.12_82)]", "from-[oklch(0.22_0.03_140)] via-[oklch(0.4_0.06_80)] to-[oklch(0.85_0.1_86)]", "from-[oklch(0.15_0.02_60)] via-[oklch(0.5_0.12_70)] to-[oklch(0.88_0.09_86)]"];
function initialsOf(name) {
  return name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "T";
}
function titleOf(thought) {
  const firstLine = thought.split("\n").map((l) => l.trim()).find(Boolean) ?? thought;
  return firstLine.length > 60 ? `${firstLine.slice(0, 57).trimEnd()}…` : firstLine;
}
function buildThoughtPost(data) {
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
    instagramUrl: data.instagram
  };
}
const submitThought_createServerFn_handler = createServerRpc({
  id: "455206e1791f6139b8136440be00febf739d24ed6527be903a0af6c5c12f21fa",
  name: "submitThought",
  filename: "src/lib/api/blog.ts"
}, (opts) => submitThought.__executeServer(opts));
const submitThought = createServerFn({
  method: "POST"
}).inputValidator(thoughtInput).handler(submitThought_createServerFn_handler, async ({
  data
}) => {
  try {
    const item = await createBlogPost$1(buildThoughtPost(data));
    return {
      ok: true,
      item
    };
  } catch (error) {
    console.error("[blog][submitThought]", error);
    return {
      ok: false,
      error: "We couldn't save your thought right now. Please try again."
    };
  }
});
export {
  createBlogPost_createServerFn_handler,
  deleteBlogPost_createServerFn_handler,
  listBlogPosts_createServerFn_handler,
  submitThought_createServerFn_handler,
  updateBlogPost_createServerFn_handler
};
