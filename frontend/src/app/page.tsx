import Link from "next/link";
import { ArrowRight, Sparkles, MessageSquare, CheckCircle2, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-ivory-soft px-3.5 py-1 text-xs font-medium text-ink-secondary shadow-subtle">
        <span className="h-1.5 w-1.5 rounded-full bg-sage-accent" />
        <span>Phase F0 • Design System & Architecture Baseline</span>
      </div>

      {/* Main Headline */}
      <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-ink-primary sm:text-5xl md:text-6xl">
        Command Your Business <br />
        <span className="text-sage-accent">With Confidence</span>
      </h1>

      {/* Hero Tagline */}
      <p className="mt-6 max-w-xl text-base text-ink-secondary sm:text-lg">
        Every conversation. Every customer. Every order. One workspace. A lightweight business assistant for small product sellers.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-md bg-sage-accent px-5 py-2.5 text-sm font-medium text-ivory-soft transition-colors hover:bg-sage-hover"
        >
          <span>Open Workspace</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-ivory-soft px-5 py-2.5 text-sm font-medium text-ink-primary shadow-subtle transition-colors hover:bg-ivory-muted"
        >
          <span>View Dashboard</span>
        </Link>
      </div>

      {/* Token Palette Preview Grid */}
      <div className="mt-16 w-full max-w-2xl rounded-xl border border-border bg-ivory-soft p-6 shadow-card text-left">
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Design Token Verification (v1.1)
        </h3>
        <p className="mt-1 text-xs text-ink-secondary">
          Warm Ivory base, Muted Sage accents, and supporting pastels verified against specifications.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-border p-3">
            <div className="h-8 rounded bg-ivory-warm border border-border" />
            <p className="mt-2 text-xs font-medium text-ink-primary">Warm Ivory</p>
            <p className="text-[10px] text-ink-muted">#F7F6F2 (Base)</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="h-8 rounded bg-sage-accent" />
            <p className="mt-2 text-xs font-medium text-ink-primary">Muted Sage</p>
            <p className="text-[10px] text-ink-muted">#777C68 (Accent)</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="h-8 rounded bg-pastel-sage" />
            <p className="mt-2 text-xs font-medium text-ink-primary">Pastel Sage</p>
            <p className="text-[10px] text-ink-muted">#E3E8DC (Surface)</p>
          </div>
          <div className="rounded-lg border border-border p-3">
            <div className="h-8 rounded bg-pastel-blush" />
            <p className="mt-2 text-xs font-medium text-ink-primary">Dusty Blush</p>
            <p className="text-[10px] text-ink-muted">#F2DFDA (Pastel)</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-xs text-ink-secondary">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-3.5 w-3.5 text-sage-accent" />
            <span>Enquiries</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-sage-accent" />
            <span>Follow-ups</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-sage-accent" />
            <span>Orders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-sage-accent" />
            <span>Gemini Extraction</span>
          </div>
        </div>
      </div>
    </main>
  );
}
