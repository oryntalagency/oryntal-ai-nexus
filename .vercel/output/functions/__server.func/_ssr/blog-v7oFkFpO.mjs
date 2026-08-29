import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { o as objectType, s as stringType, b as booleanType, n as numberType, a as arrayType, Z as ZodIssueCode } from "../_libs/zod.mjs";
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
const listBlogPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("6a12fc89b15863ec6f1317fa3e62e4d2290bef5a61b105ca7c5fac151daf8165"));
const createBlogPost = createServerFn({
  method: "POST"
}).inputValidator(postInput).handler(createSsrRpc("ad8a26a11564ff86f4299d5236d4f1f8fb271512df6fb5f99e918cadeea0cb2d"));
const updateBlogPost = createServerFn({
  method: "POST"
}).inputValidator(postInput.extend({
  id: stringType().min(1)
})).handler(createSsrRpc("11ffe802f5af92bfed3d445ee0a98cb14219057789c6f32cdc9d8b4c6eaae244"));
const deleteBlogPost = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("b6c3943f205d8f5cb5155be038e8f306adc8d93e7022f9abd3cf100628b790fd"));
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
const submitThought = createServerFn({
  method: "POST"
}).inputValidator(thoughtInput).handler(createSsrRpc("455206e1791f6139b8136440be00febf739d24ed6527be903a0af6c5c12f21fa"));
export {
  createBlogPost as c,
  deleteBlogPost as d,
  listBlogPosts as l,
  submitThought as s,
  updateBlogPost as u
};
