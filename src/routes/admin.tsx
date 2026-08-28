import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock, ArrowLeft, ShieldCheck, Mail, KeyRound } from "lucide-react";
import { adminLogin, getAdminSession } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Oryntal AI Labs" },
      { name: "description", content: "Oryntal AI Labs publisher panel." },
    ],
  }),
  component: AdminShell,
});

function AdminShell() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "session"],
    queryFn: () => getAdminSession(),
    staleTime: 5 * 60 * 1000,
  });
  const authed = mounted && !!data?.ok;

  if (!mounted || isLoading) return null;
  return <div className="min-h-screen">{authed ? <Outlet /> : <AdminLogin />}</div>;
}

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const queryClient = useQueryClient();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await adminLogin({ data: { email, password } });
    setBusy(false);
    if (res.ok) {
      queryClient.setQueryData(["admin", "session"], { ok: true as const, admin: res.admin });
      setEmail("");
      setPassword("");
    } else {
      setError(res.error ?? "Login failed.");
      setPassword("");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-sm">
        <div className="overflow-hidden rounded-3xl ring-1 ring-border">
          <div className="relative h-32 w-full bg-gradient-to-br from-[oklch(0.22_0.04_60)] via-[oklch(0.3_0.08_70)] to-[oklch(0.78_0.13_82)]">
            <div className="absolute inset-0 opacity-30 animate-shimmer bg-[linear-gradient(110deg,transparent_40%,oklch(0.95_0.05_86/0.4)_50%,transparent_60%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl glass ring-1 ring-primary/40 text-primary">
                <Lock className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="glass p-8">
            <p className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary ring-1 ring-primary/40">
              <ShieldCheck className="h-3.5 w-3.5" /> Private
            </p>
            <h1 className="mt-4 font-display text-2xl font-semibold">Admin access</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in with your publisher account to open the panel.
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoFocus
                  className="rounded-full pl-10"
                />
              </div>
              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="rounded-full pl-10"
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button
                type="submit"
                disabled={busy}
                className="w-full rounded-full shadow-gold-glow"
              >
                {busy ? "Signing in…" : "Unlock panel"}
              </Button>
            </form>

            <Link
              to="/"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to site
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">
          Server-authenticated session — cookies, not client storage.
        </p>
      </div>
    </div>
  );
}
