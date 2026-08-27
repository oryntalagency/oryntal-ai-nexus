import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Save, LogOut, ArrowLeft, KeyRound, Building2, Tag } from "lucide-react";
import { setAdminAuthed, getPasscode, setPasscode } from "@/lib/adminSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/admin/admin-ui";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

const IDENTITY_KEY = "oryntal_identity";

function loadIdentity() {
  if (typeof window === "undefined")
    return { name: "Oryntal AI Labs", tagline: "We build intelligent systems." };
  try {
    const raw = window.localStorage.getItem(IDENTITY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { name: "Oryntal AI Labs", tagline: "We build intelligent systems." };
}

function SettingsPage() {
  const identity = loadIdentity();
  const [name, setName] = useState(identity.name);
  const [tagline, setTagline] = useState(identity.tagline);
  const [passcode, setPass] = useState(getPasscode());
  const [saved, setSaved] = useState(false);

  const save = () => {
    window.localStorage.setItem(
      IDENTITY_KEY,
      JSON.stringify({ name: name.trim(), tagline: tagline.trim() }),
    );
    setPasscode(passcode.trim() && passcode.trim() !== getPasscode() ? passcode.trim() : passcode);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const signOut = () => {
    setAdminAuthed(false);
    window.location.href = "/admin";
  };

  return (
    <div className="px-6 py-10 md:px-10 md:py-12 max-w-[1000px] mx-auto">
      <PageHeader
        kicker="Settings"
        title={
          <>
            <span className="text-platinum-gradient">Lab</span>{" "}
            <span className="text-gold-gradient">preferences</span>
          </>
        }
        description="Identity copy, the admin passcode, and session control."
      />

      <div className="mt-8 space-y-6">
        {/* Identity */}
        <div className="rounded-2xl glass p-6 ring-1 ring-border">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <Building2 className="h-4 w-4 text-primary" /> Identity
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Shown on the public profile and contact pages.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide">Lab name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide">Tagline</Label>
              <Input
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Access */}
        <div className="rounded-2xl glass p-6 ring-1 ring-border">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <KeyRound className="h-4 w-4 text-primary" /> Access
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            The passcode that unlocks this panel. Stored in this browser session.
          </p>
          <div className="mt-5 max-w-xs">
            <Label className="text-xs font-semibold uppercase tracking-wide">Passcode</Label>
            <Input
              value={passcode}
              onChange={(e) => setPass(e.target.value)}
              className="mt-1.5 font-mono"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={save} className="rounded-full shadow-gold-glow">
            <Save className="h-4 w-4" /> {saved ? "Saved" : "Save changes"}
          </Button>
          <Button variant="outline" onClick={signOut} className="rounded-full">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to site
          </Link>
        </div>

        <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <Tag className="h-3 w-3" /> Auth is client-side for now — wire a real provider when the
          backend lands, then delete{" "}
          <code className="rounded bg-secondary px-1 font-mono">adminSession.ts</code>.
        </p>
      </div>
    </div>
  );
}
