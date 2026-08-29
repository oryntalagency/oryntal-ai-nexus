import { b as bcrypt } from "../_libs/bcryptjs.mjs";
import { g as getDb, e as ensureEnvForServer } from "./mongodb-7utz71PX.mjs";
import { timingSafeEqual, createHmac } from "node:crypto";
import { g as getCookie, s as setCookie, d as deleteCookie } from "./server-B_dwi7jl.mjs";
ensureEnvForServer();
const SESSION_COOKIE = "oryntal_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
function sessionSecret() {
  ensureEnvForServer();
  return process.env.ADMIN_SESSION_SECRET ?? "dev-only-oryntal-admin-session-secret";
}
function sign(input) {
  return createHmac("sha256", sessionSecret()).update(input).digest("base64url");
}
function safeEqual(a, b) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
function createSessionToken(data) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const nowSeconds = Math.floor(Date.now() / 1e3);
  const body = Buffer.from(
    JSON.stringify({
      email: data.email,
      role: data.role,
      iat: nowSeconds,
      exp: nowSeconds + SESSION_TTL_SECONDS
    })
  ).toString("base64url");
  const unsigned = `${header}.${body}`;
  return `${unsigned}.${sign(unsigned)}`;
}
function parseSessionToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const unsigned = `${header}.${body}`;
  if (!safeEqual(signature, sign(unsigned))) return null;
  try {
    const decoded = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (typeof decoded.exp !== "number" || decoded.exp < Math.floor(Date.now() / 1e3)) {
      return null;
    }
    if (typeof decoded.email !== "string" || typeof decoded.role !== "string") return null;
    return { email: decoded.email, role: decoded.role };
  } catch {
    return null;
  }
}
function readSessionCookie() {
  return parseSessionToken(getCookie(SESSION_COOKIE));
}
function writeSessionCookie(token) {
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: SESSION_TTL_SECONDS
  });
}
function clearSessionCookie() {
  deleteCookie(SESSION_COOKIE, { path: "/" });
}
async function findAdminByEmail(email) {
  const db = await getDb();
  const doc = await db.collection("admins").findOne({ email });
  if (!doc) return null;
  return {
    email: doc.email,
    passwordHash: doc.passwordHash,
    role: doc.role,
    createdAt: doc.createdAt
  };
}
async function loginAdmin(input) {
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
async function currentAdmin() {
  const session = readSessionCookie();
  if (!session) return null;
  const admin = await findAdminByEmail(session.email);
  if (!admin) return null;
  return { email: admin.email, role: admin.role };
}
async function logoutAdmin() {
  clearSessionCookie();
}
export {
  logoutAdmin as a,
  currentAdmin as c,
  loginAdmin as l
};
