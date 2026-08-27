import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Mail, CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact / Hire us — Oryntal AI Labs" },
      {
        name: "description",
        content:
          "Get in touch with Oryntal AI Labs for engagements, packages, and custom AI builds.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const canSend = useMemo(
    () => form.name.trim().length > 0 && form.email.includes("@") && form.message.trim().length > 0,
    [form],
  );

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="px-6 py-10 md:px-12 md:py-14 max-w-[1600px] mx-auto">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Left — pitch */}
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] sm:text-xs text-muted-foreground ring-1 ring-border">
            <MessageCircle className="h-3.5 w-3.5 text-primary" /> Not a listing submission — just
            us, talking to you.
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            <span className="text-platinum-gradient">Let's build</span>{" "}
            <span className="text-gold-gradient">something sharp.</span>
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Hiring us for a package, scoping a custom engagement, or poking holes in an idea — this
            is the fastest way to reach the Oryntal team.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="mailto:hello@oryntal.ai"
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm ring-1 ring-border transition hover:text-primary hover:ring-primary/40"
            >
              <Mail className="h-4 w-4" /> hello@oryntal.ai
            </a>
          </div>

          <div className="mt-10 rounded-2xl glass p-6 ring-1 ring-border">
            <h2 className="font-display text-lg font-semibold">How it works</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                  1
                </span>
                Send us a few lines about the problem.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                  2
                </span>
                We reply within one business day with a scoped proposal.
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-bold text-primary">
                  3
                </span>
                Fixed scope, fixed price, then we ship.
              </li>
            </ul>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-3xl glass p-6 sm:p-8 ring-1 ring-border">
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-gold-glow">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold">Message sent</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}! We'll get back to you
                within one business day.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-gold-glow"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Ada Lovelace"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="ada@company.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="Hiring you for an edge deployment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  rows={7}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are we building?"
                />
              </div>
              <Button
                type="submit"
                disabled={!canSend}
                className="w-full h-11 rounded-full text-sm font-semibold shadow-gold-glow"
              >
                Send message <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Prefer email? Write to <span className="text-primary">hello@oryntal.ai</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
