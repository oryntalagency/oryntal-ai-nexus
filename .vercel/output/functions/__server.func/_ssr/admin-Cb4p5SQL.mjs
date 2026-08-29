import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const adminLogin = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().min(1),
  password: stringType().min(1)
})).handler(createSsrRpc("def553391d103ab7116e46092712ab02fee005b9091b8c5875162aeee4ab7be6"));
const adminLogout = createServerFn({
  method: "POST"
}).handler(createSsrRpc("8839b6579fea2382624c13f25a4f6a04ce4a14e06bd29a5b067d7d1c4f3787bd"));
const getAdminSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("ca6a66f5993f478d418e1fd06079a4f3ed41b30a0881e47e397b6a7e9dfb6736"));
export {
  adminLogin as a,
  adminLogout as b,
  getAdminSession as g
};
