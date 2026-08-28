import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { currentAdmin, loginAdmin as loginAdminRecord, logoutAdmin } from "../db/admins.server";

// Admin auth — the only session endpoints. There is no public registration
// route; admins are created via scripts/create-admin.mjs only.

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(z.object({ email: z.string().min(1), password: z.string().min(1) }))
  .handler(async ({ data }) => {
    try {
      return await loginAdminRecord({ email: data.email, password: data.password });
    } catch (error) {
      console.error("[admin][login]", error);
      return { ok: false as const, error: "Login failed. Try again." };
    }
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  await logoutAdmin();
  return { ok: true as const };
});

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const admin = await currentAdmin();
    return admin ? ({ ok: true as const, admin } as const) : ({ ok: false as const } as const);
  } catch (error) {
    console.error("[admin][session]", error);
    return { ok: false as const };
  }
});

export type AdminLoginResult = Awaited<ReturnType<typeof adminLogin>>;
export type AdminSessionResult = Awaited<ReturnType<typeof getAdminSession>>;
