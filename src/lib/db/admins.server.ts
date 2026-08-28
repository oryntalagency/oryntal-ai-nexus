import bcrypt from "bcryptjs";

import { getDb } from "../mongodb";
import {
  clearSessionCookie,
  createSessionToken,
  readSessionCookie,
  writeSessionCookie,
} from "./session.server";

// Repository for the `admins` collection + the httpOnly-session guard used by
// every admin-only server function. There is no public registration route —
// admins are created only via scripts/create-admin.mjs.

export type AdminDoc = {
  email: string;
  passwordHash: string;
  role: "owner" | "editor" | "viewer";
  createdAt: Date;
};

export type AdminSummary = { email: string; role: string };

async function findAdminByEmail(email: string): Promise<AdminDoc | null> {
  const db = await getDb();
  const doc = await db.collection("admins").findOne({ email });
  if (!doc) return null;
  return {
    email: doc.email as string,
    passwordHash: doc.passwordHash as string,
    role: doc.role as AdminDoc["role"],
    createdAt: doc.createdAt as Date,
  };
}

export async function loginAdmin(input: { email: string; password: string }): Promise<{
  ok: boolean;
  error?: string;
  admin?: AdminSummary;
}> {
  const email = input.email.trim().toLowerCase();
  if (!email || !input.password) {
    return { ok: false, error: "Email and password are required." };
  }

  const admin = await findAdminByEmail(email);
  if (!admin) {
    return { ok: false, error: "These credentials do not match an admin account." };
  }

  const valid = await bcrypt.compare(input.password, admin.passwordHash);
  if (!valid) {
    return { ok: false, error: "These credentials do not match an admin account." };
  }

  writeSessionCookie(createSessionToken({ email: admin.email, role: admin.role }));
  return { ok: true, admin: { email: admin.email, role: admin.role } };
}

/** Verify the request's session cookie and return the signed-in admin. */
export async function currentAdmin(): Promise<AdminSummary | null> {
  const session = readSessionCookie();
  if (!session) return null;

  const admin = await findAdminByEmail(session.email);
  if (!admin) return null;
  return { email: admin.email, role: admin.role };
}

export async function logoutAdmin(): Promise<void> {
  clearSessionCookie();
}
