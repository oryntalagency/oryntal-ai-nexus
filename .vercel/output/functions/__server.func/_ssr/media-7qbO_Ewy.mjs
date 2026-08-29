import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
const uploadMedia = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  kind: enumType(["image", "video"]),
  dataBase64: stringType().min(1)
})).handler(createSsrRpc("4b16bf50c41c177dc6b01f4f6070e4c11c9d088cf876207a74711f3500a11379"));
export {
  uploadMedia as u
};
