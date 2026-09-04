import { useMemo, useState } from "react";
import { AlertCircle, Instagram, Linkedin } from "lucide-react";

import { submitThought } from "@/lib/api/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const LINKEDIN_PATTERN = /linkedin\.com/i;
const INSTAGRAM_PATTERN = /instagram\.com/i;

export function ThoughtComposer({
  open,
  onOpenChange,
  onPublished,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublished: () => void;
}) {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [thought, setThought] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const li = linkedin.trim();
  const ig = instagram.trim();
  const linkedinValid = li === "" || LINKEDIN_PATTERN.test(li);
  const instagramValid = ig === "" || INSTAGRAM_PATTERN.test(ig);
  const hasLink = li !== "" || ig !== "";
  const nameOk = name.trim().length >= 2;
  const headingOk = heading.trim().length > 0;
  const thoughtOk = thought.trim().length >= 10;

  const canSubmit =
    nameOk && headingOk && thoughtOk && hasLink && linkedinValid && instagramValid && !submitting;

  const wordCount = useMemo(() => thought.split(/\s+/).filter(Boolean).length, [thought]);

  const reset = () => {
    setName("");
    setHeading("");
    setThought("");
    setLinkedin("");
    setInstagram("");
    setSubmitting(false);
    setError(null);
  };

  const submit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    const res = await submitThought({
      data: {
        name: name.trim(),
        heading: heading.trim(),
        thought: thought.trim(),
        linkedin: li,
        instagram: ig,
      },
    });
    if (res.ok) {
      reset();
      onPublished();
      onOpenChange(false);
    } else {
      setError(res.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? undefined : onOpenChange(false))}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-none gap-0 overflow-y-auto p-5 sm:max-w-lg sm:p-6">
        <DialogHeader className="pr-10 text-left">
          <DialogTitle>Share your thoughts</DialogTitle>
          <DialogDescription>
            Publish a short field note to the community feed. Add at least one social profile so
            people can find you.
          </DialogDescription>
        </DialogHeader>

        <form
          className="mt-5 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
        >
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide">Your name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Singh"
              maxLength={60}
              className="mt-1.5"
            />
            {!nameOk && (
              <p className="mt-1 text-[11px] text-destructive">Please enter your name.</p>
            )}
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide">Heading *</Label>
            <Input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              maxLength={100}
              placeholder="e.g. Why Every Business Needs Automation"
              className="mt-1.5"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Short title for your post.</span>
              {heading.trim().length > 0 && <span>{heading.trim().length}/100</span>}
            </div>
            {!headingOk && (
              <p className="mt-1 text-[11px] text-destructive">Please add a short heading.</p>
            )}
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide">Your thought *</Label>
            <Textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              rows={5}
              maxLength={1000}
              placeholder="What are you building, shipping, or learning right now?"
              className="mt-1.5"
            />
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>
                {wordCount} word{wordCount === 1 ? "" : "s"} ·{" "}
                {Math.max(1, Math.round(wordCount / 200))} min read
              </span>
              {!thoughtOk && (
                <span className="text-destructive">Add a sentence or two (min 10 chars).</span>
              )}
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide">
              Your profile link
            </Label>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              LinkedIn or Instagram — at least one is required.
            </p>
            <div className="mt-1.5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn URL
                </label>
                <Input
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="https://linkedin.com/in/…"
                  className="mt-1"
                />
                {!linkedinValid && (
                  <p className="mt-1 text-[11px] text-destructive">
                    This doesn't look like a LinkedIn URL (should contain linkedin.com).
                  </p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <Instagram className="h-3.5 w-3.5" /> Instagram URL
                </label>
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="https://instagram.com/…"
                  className="mt-1"
                />
                {!instagramValid && (
                  <p className="mt-1 text-[11px] text-destructive">
                    This doesn't look like an Instagram URL (should contain instagram.com).
                  </p>
                )}
              </div>
            </div>
            {!hasLink && (
              <p className="mt-2 flex items-center gap-1 text-[11px] font-medium text-primary">
                <AlertCircle className="h-3.5 w-3.5" /> Please add your LinkedIn or Instagram
                profile link.
              </p>
            )}
          </div>

          {error && (
            <p className="flex items-center gap-1.5 text-[11px] text-destructive">
              <AlertCircle className="h-3.5 w-3.5" /> {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="min-h-11 rounded-full sm:min-h-0"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!canSubmit}
              className="min-h-11 rounded-full sm:min-h-0"
            >
              {submitting ? "Publishing…" : "Publish thought"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
