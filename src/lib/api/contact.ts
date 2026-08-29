import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { sendContactMail } from "../mail.server";

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1),
      email: z.string().email(),
      subject: z.string().optional(),
      message: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const result = await sendContactMail({
        name: data.name,
        email: data.email,
        subject: data.subject ?? "",
        message: data.message,
      });
      return result;
    } catch (error) {
      console.error("[contact][send]", error);
      return { ok: false as const, error: "We couldn't send your message right now." };
    }
  });

export type SendContactResult = Awaited<ReturnType<typeof sendContact>>;
