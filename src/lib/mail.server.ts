import process from "node:process";
import nodemailer from "nodemailer";

// Server-only mail helper. The .server.ts suffix keeps this off the client.
//
// SMTP credentials are read from env at request time (see config.server.ts)
// and are NEVER hardcoded or shipped to the browser. If MAIL_* vars are not
// configured, sending is skipped and a friendly result is returned so the
// rest of the site still works (e.g. in dev and previews).
//
// Note on Cloudflare Workers: nodemailer relies on Node's net/tls sockets,
// which the Workers runtime does not provide natively. If you deploy to
// Workers, prefer running this on Node or via a mail API instead.

type SendMailInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMail({ name, email, subject, message }: SendMailInput) {
  const host = process.env.MAIL_HOST;
  const port = process.env.MAIL_PORT;
  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const from = process.env.MAIL_FROM || user;
  const to = process.env.MAIL_TO;

  if (!host || !port || !user || !pass || !from || !to) {
    return {
      ok: false as const,
      error: "Mail is not configured on the server (set MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, MAIL_FROM, MAIL_TO).",
    };
  }

  try {
    const transport = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
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
        message,
      ].join("\n"),
      html:
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` +
        `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` +
        `<p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>` +
        `<hr />` +
        `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    });

    transport.close();
    return { ok: true as const };
  } catch (error) {
    console.error("[mail][send]", error);
    return { ok: false as const, error: "We couldn't send your message right now. Please try again or email us directly." };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
