import { c as createSsrRpc } from "./createSsrRpc-jYxGnsDr.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { o as objectType, s as stringType, b as booleanType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
const packageInput = objectType({
  name: stringType().min(1),
  tierIcon: enumType(["layers", "briefcase", "rocket"]),
  tagline: stringType().optional(),
  positioning: stringType().optional(),
  items: arrayType(objectType({
    icon: stringType(),
    label: stringType()
  })).min(1),
  cta: stringType().optional(),
  featured: booleanType().optional()
});
const listPackages = createServerFn({
  method: "GET"
}).handler(createSsrRpc("748bd546fd025e0fc09ef9595f3919e919fae6ad268e6fd048d71de69914bd90"));
const createPackage = createServerFn({
  method: "POST"
}).inputValidator(packageInput).handler(createSsrRpc("a967cf0b9fd1d1c3b67a41ef7e9441d684ddc7a64ffd27d95ab762a10be7e19b"));
const updatePackage = createServerFn({
  method: "POST"
}).inputValidator(packageInput.extend({
  id: stringType().min(1)
})).handler(createSsrRpc("21872e4dddb99457312fbaece1519ad9f57221a1a4a98bed2dd03c0863b5158f"));
const deletePackage = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  id: stringType().min(1)
})).handler(createSsrRpc("e22697e5f465077d541e7fa0749c003deaa7fa44785500b79727465c2f768c76"));
export {
  createPackage as c,
  deletePackage as d,
  listPackages as l,
  updatePackage as u
};
