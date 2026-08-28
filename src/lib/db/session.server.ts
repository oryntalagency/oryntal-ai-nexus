import { createHmac, timingSafeEqual } from "node:crypto";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";

import { ensureEnvForServer } from "../env.server";

ensureEnvForServer();

// Signed-session helper for the admin panel.
//
// Fits this stack (TanStack Start, no NextAuth): after login we mint a compact
// HS256 JWT and drop it into an httpOnly `SameSite=Lax` cookie. Every
// admin-only server function re-verifies the token and checks the admin still
// exists in Mongo before mutating. There is intentionally no registration
// route anywhere in the codebase.

export const SESSION_COOKIE = "oryntal_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type SessionData = { email: string; role: string };

// Dev-only fallback keeps local sessions working without configuration.
// Production deployments MUST set ADMIN_SESSION_SECRET.
function sessionSecret(): string {
  ensureEnvForServer();
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-oryntal-admin-session-secret";
}

function sign(input: string): string {
  return createHmac("sha256", sessionSecret()).update(input).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken(data: SessionData): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const nowSeconds = Math.floor(Date.now() / 1000);
  const body = Buffer.from(
    JSON.stringify({
      email: data.email,
      role: data.role,
      iat: nowSeconds,
      exp: nowSeconds + SESSION_TTL_SECONDS,
    }),
  ).toString("base64url");
  const unsigned = `${header}.${body}`;
  return `${unsigned}.${sign(unsigned)}`;
}

export function parseSessionToken(token: string | undefined): SessionData | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const unsigned = `${header}.${body}`;
  if (!safeEqual(signature, sign(unsigned))) return null;

  try {
    const decoded = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
      email?: unknown;
      role?: unknown;
      exp?: unknown;
    };
    if (typeof decoded.exp !== "number" || decoded.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    if (typeof decoded.email !== "string" || typeof decoded.role !== "string") return null;
    return { email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}

/** Read and verify the session cookie for the current request (server-side only). */
export function readSessionCookie(): SessionData | null {
  return parseSessionToken(getCookie(SESSION_COOKIE));
}

export function writeSessionCookie(token: string): void {
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(): void {
  deleteCookie(SESSION_COOKIE, { path: "/" });
}
