import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { o as objectType, e as enumType, b as booleanType, n as numberType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
const offeringFilter = enumType(["saas", "automation", "model", "all"]);
const statusFilter = enumType(["live", "beta", "coming", "all"]);
const listProducts = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  problems: arrayType(stringType()).optional(),
  offering: offeringFilter.optional(),
  industries: arrayType(stringType()).optional(),
  techs: arrayType(stringType()).optional(),
  status: statusFilter.optional(),
  query: stringType().optional()
})).handler(createSsrRpc("8c043fe5e33ca88dc069e5f365006f24e7f14e8a80a334f08652dec76c740e7b"));
const createProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  title: stringType().min(1),
  slug: stringType().optional(),
  tagline: stringType().optional(),
  creator: stringType().optional(),
  offeringType: enumType(["saas", "automation", "model"]),
  problems: arrayType(stringType()),
  industries: arrayType(stringType()),
  techs: arrayType(stringType()),
  problemPoints: arrayType(stringType()),
  advantagePoints: arrayType(stringType()),
  image: stringType(),
  video: stringType().optional(),
  liveUrl: stringType().optional(),
  price: enumType(["Free", "Premium"]),
  gradient: stringType().optional(),
  glyph: stringType().optional(),
  height: numberType().optional(),
  featured: booleanType().optional(),
  status: enumType(["live", "beta", "coming"])
})).handler(createSsrRpc("071d3e76962d8aedf14b7eb3f9f693aab823595f9fa1e3d6ee4d3851fdc03db7"));
const updateProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1),
  title: stringType().min(1),
  slug: stringType().optional(),
  tagline: stringType().optional(),
  creator: stringType().optional(),
  offeringType: enumType(["saas", "automation", "model"]),
  problems: arrayType(stringType()),
  industries: arrayType(stringType()),
  techs: arrayType(stringType()),
  problemPoints: arrayType(stringType()),
  advantagePoints: arrayType(stringType()),
  image: stringType(),
  video: stringType().optional(),
  liveUrl: stringType().optional(),
  price: enumType(["Free", "Premium"]),
  gradient: stringType().optional(),
  glyph: stringType().optional(),
  height: numberType().optional(),
  featured: booleanType().optional(),
  status: enumType(["live", "beta", "coming"])
})).handler(createSsrRpc("e3b5eb71359407d6d88ad1269ba5879332bc9ed446121bbf220a296f86f30b5f"));
const deleteProduct = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("42b7eecb730fa01dbdb05dc58e38f4adf995ebed3b73a53cd065b0569701cc40"));
export {
  createProduct as c,
  deleteProduct as d,
  listProducts as l,
  updateProduct as u
};
