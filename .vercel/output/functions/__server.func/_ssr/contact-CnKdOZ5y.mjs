import { c as createServerRpc } from "./createServerRpc-Vkr6uHm1.mjs";
import { a as createServerFn } from "./server-B_dwi7jl.mjs";
import process from "node:process";
import { n as nodemailer } from "../_libs/nodemailer.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
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
import "events";
import "url";
import "fs";
import "http";
import "https";
import "zlib";
import "net";
import "dns";
import "os";
import "path";
import "tls";
import "child_process";
async function sendContactMail({ name, email, subject, message }) {
  const host = process.env.MAIL_HOST;
  const port = process.env.MAIL_PORT;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const from = process.env.MAIL_FROM || user;
  const to = process.env.MAIL_TO;
  if (!host || !port || !user || !pass || !from || !to) {
    return {
      ok: false,
      error: "Mail is not configured on the server (set MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM, MAIL_TO)."
    };
  }
  try {
    const transport = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass }
    });
    await transport.sendMail({
      from: `"${name}" <${from}>`,
      to,
      replyTo: email || from,
      subject: subject ? `[Oryntal contact] ${subject}` : "New contact message from the Oryntal site",
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject || "(none)"}`,
        "",
        message
      ].join("\n"),
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p><hr /><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`
    });
    transport.close();
    return { ok: true };
  } catch (error) {
    console.error("[mail][send]", error);
    return { ok: false, error: "We couldn't send your message right now. Please try again or email us directly." };
  }
}
function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const sendContact_createServerFn_handler = createServerRpc({
  id: "639d3178a4937bc6a9aec740300a040b784280e56d955e4c86209c703e70b374",
  name: "sendContact",
  filename: "src/lib/api/contact.ts"
}, (opts) => sendContact.__executeServer(opts));
const sendContact = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  name: stringType().min(1),
  email: stringType().email(),
  subject: stringType().optional(),
  message: stringType().min(1)
})).handler(sendContact_createServerFn_handler, async ({
  data
}) => {
  try {
    const result = await sendContactMail({
      name: data.name,
      email: data.email,
      subject: data.subject ?? "",
      message: data.message
    });
    return result;
  } catch (error) {
    console.error("[contact][send]", error);
    return {
      ok: false,
      error: "We couldn't send your message right now."
    };
  }
});
export {
  sendContact_createServerFn_handler
};
