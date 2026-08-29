import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import { l as loginAdmin, a as logoutAdmin, c as currentAdmin } from "./admins.server-1QQJDc-F.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "../_libs/bcryptjs.mjs";
import "mongodb";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "./mongodb-7utz71PX.mjs";
import "node:fs";
import "node:path";
import "node:crypto";
const adminLogin_createServerFn_handler = createServerRpc({
  id: "def553391d103ab7116e46092712ab02fee005b9091b8c5875162aeee4ab7be6",
  name: "adminLogin",
  filename: "src/lib/api/admin.ts"
}, (opts) => adminLogin.__executeServer(opts));
const adminLogin = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().min(1),
  password: stringType().min(1)
})).handler(adminLogin_createServerFn_handler, async ({
  data
}) => {
  try {
    return await loginAdmin({
      email: data.email,
      password: data.password
    });
  } catch (error) {
    console.error("[admin][login]", error);
    return {
      ok: false,
      error: "Login failed. Try again."
    };
  }
});
const adminLogout_createServerFn_handler = createServerRpc({
  id: "8839b6579fea2382624c13f25a4f6a04ce4a14e06bd29a5b067d7d1c4f3787bd",
  name: "adminLogout",
  filename: "src/lib/api/admin.ts"
}, (opts) => adminLogout.__executeServer(opts));
const adminLogout = createServerFn({
  method: "POST"
}).handler(adminLogout_createServerFn_handler, async () => {
  await logoutAdmin();
  return {
    ok: true
  };
});
const getAdminSession_createServerFn_handler = createServerRpc({
  id: "ca6a66f5993f478d418e1fd06079a4f3ed41b30a0881e47e397b6a7e9dfb6736",
  name: "getAdminSession",
  filename: "src/lib/api/admin.ts"
}, (opts) => getAdminSession.__executeServer(opts));
const getAdminSession = createServerFn({
  method: "GET"
}).handler(getAdminSession_createServerFn_handler, async () => {
  try {
    const admin = await currentAdmin();
    return admin ? {
      ok: true,
      admin
    } : {
      ok: false
    };
  } catch (error) {
    console.error("[admin][session]", error);
    return {
      ok: false
    };
  }
});
export {
  adminLogin_createServerFn_handler,
  adminLogout_createServerFn_handler,
  getAdminSession_createServerFn_handler
};
