"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  ShoppingBag,
  Clock,
  Sparkles,
  ShieldCheck,
  Download,
  Users,
  Menu,
  X,
  Store,
  CheckCircle2,
} from "lucide-react";
import { AurenLogoMark } from "@/components/ui/auren-logo";
import { EditorialBackground } from "@/components/ui/editorial-background";
import { FloatingObjects } from "@/components/animations/floating-objects";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-ink-primary selection:bg-pastel-sage selection:text-ink-primary overflow-x-hidden">
      {/* ========================================================================= */}
      {/* 0. ARTISANAL EDITORIAL BACKGROUND (Tactile Linen + Burgundy/Sage Auras)    */}
      {/* ========================================================================= */}
      <EditorialBackground />

      {/* ========================================================================= */}
      {/* 1. PUBLIC NAVIGATION HEADER                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-border bg-[#FAF8F5]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="transition-transform group-hover:scale-105">
              <AurenLogoMark size={32} color="#4E5841" />
            </div>
            <span className="font-display text-lg font-bold tracking-[0.2em] text-ink-primary">
              AUREN
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-ink-secondary">
            <a href="#features" className="transition-colors hover:text-burgundy-deep">
              Capabilities
            </a>
            <a href="#workflow" className="transition-colors hover:text-burgundy-deep">
              How It Works
            </a>
            <a href="#who-it-helps" className="transition-colors hover:text-burgundy-deep">
              Who It Helps
            </a>
            <a href="#faq" className="transition-colors hover:text-burgundy-deep">
              FAQ
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-xs font-semibold text-ink-primary transition-all hover:bg-beige-warm hover:text-burgundy-deep"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="shimmer-gleam inline-flex items-center gap-1.5 rounded-xl bg-sage-accent px-4 py-2.5 text-xs font-semibold text-white shadow-subtle transition-all hover:bg-sage-hover hover:shadow-glowSage active:scale-95"
            >
              <span>Get started</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-ink-secondary hover:bg-beige-warm md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-border bg-[#FAF8F5] px-4 py-4 md:hidden space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-ink-secondary">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-burgundy-deep"
              >
                Capabilities
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-burgundy-deep"
              >
                How It Works
              </a>
              <a
                href="#who-it-helps"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-burgundy-deep"
              >
                Who It Helps
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-burgundy-deep"
              >
                FAQ
              </a>
            </nav>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Link
                href="/login"
                className="w-full text-center py-2 text-xs font-semibold text-ink-primary border border-border rounded-xl bg-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="w-full text-center py-2.5 text-xs font-semibold text-white bg-sage-accent rounded-xl shadow-subtle"
              >
                Get started free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION WITH 3D GSAP FLOATING OBJECTS                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32">
        {/* GSAP 3D Floating Objects Canvas (Parallax on mouse movement) */}
        <FloatingObjects />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Tagline Badge blending Sage, Beige, and Burgundy */}
          <div className="inline-flex items-center gap-2 rounded-full border border-burgundy-border/60 bg-beige-warm/80 px-4 py-1.5 text-xs font-semibold text-burgundy-deep shadow-subtle backdrop-blur-sm transition-transform hover:scale-105">
            <Sparkles className="h-3.5 w-3.5 text-burgundy-accent" />
            <span>Social-Commerce Business Workspace</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink-primary sm:text-6xl lg:text-7xl">
            Command Your Business <br />
            <span className="text-sage-forest">With Confidence.</span>
          </h1>

          {/* Hero Tagline */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-ink-secondary sm:text-lg sm:leading-relaxed">
            Every conversation. Every customer. Every order. One workspace. A simple, reliable workspace for small product sellers to manage inquiries from Instagram, WhatsApp, and Telegram in one place.
          </p>

          {/* CTA Group with Microinteractions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="shimmer-gleam inline-flex items-center gap-2 rounded-xl bg-sage-accent px-6 py-3.5 text-sm font-semibold text-white shadow-floating transition-all hover:bg-sage-hover hover:shadow-glowSage active:scale-95"
            >
              <span>Get started for free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-beige-border bg-beige-warm px-6 py-3.5 text-sm font-semibold text-ink-primary shadow-subtle transition-all hover:bg-beige-surface hover:border-burgundy-accent/40 active:scale-95"
            >
              <span>Explore workspace demo</span>
            </Link>
          </div>

          <p className="mt-4 text-xs text-ink-muted">
            No credit card required • 100% Free during initial validation • No invasive platform scraping
          </p>

          {/* Workspace Preview Canvas (Storeflow-Inspired UI Mockup) */}
          <div className="relative mx-auto mt-14 max-w-5xl rounded-2xl border border-beige-border bg-ivory-soft p-3 shadow-floating card-hover-tilt">
            <div className="rounded-xl border border-border bg-[#FAF8F5] p-4 sm:p-6 text-left">
              {/* Fake top bar */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-burgundy-accent/80" />
                  <div className="h-3 w-3 rounded-full bg-pastel-butter" />
                  <div className="h-3 w-3 rounded-full bg-pastel-sage" />
                  <span className="ml-2 font-display text-xs font-bold text-ink-primary">
                    Aura Studio & Crafts — Live Operational Workspace
                  </span>
                </div>
                <span className="rounded-full bg-pastel-sage px-2.5 py-0.5 text-[10px] font-bold text-sage-forest">
                  Active Business
                </span>
              </div>

              {/* Sample Mini Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mt-4">
                <div className="rounded-xl border border-border bg-ivory-soft p-3 shadow-subtle transition-all hover:border-sage-accent/50">
                  <span className="text-[10px] font-medium text-ink-muted uppercase">Inquiries</span>
                  <p className="text-xl font-bold text-ink-primary font-display">26</p>
                  <p className="text-[10px] text-sage-forest font-semibold">+3 today</p>
                </div>
                <div className="rounded-xl border border-border bg-ivory-soft p-3 shadow-subtle transition-all hover:border-sage-accent/50">
                  <span className="text-[10px] font-medium text-ink-muted uppercase">Active Orders</span>
                  <p className="text-xl font-bold text-ink-primary font-display">2</p>
                  <p className="text-[10px] text-ink-secondary">1 processing</p>
                </div>
                <div className="rounded-xl border border-burgundy-border bg-burgundy-subtle p-3 shadow-subtle transition-all hover:border-burgundy-accent">
                  <span className="text-[10px] font-semibold text-burgundy-deep uppercase">Pending Follow-ups</span>
                  <p className="text-xl font-bold text-burgundy-deep font-display">1</p>
                  <p className="text-[10px] text-burgundy-accent font-bold">Action due today</p>
                </div>
                <div className="rounded-xl border border-border bg-ivory-soft p-3 shadow-subtle transition-all hover:border-sage-accent/50">
                  <span className="text-[10px] font-medium text-ink-muted uppercase">Verified Revenue</span>
                  <p className="text-xl font-bold text-ink-primary font-display">₹14,700</p>
                  <p className="text-[10px] text-sage-forest font-semibold">UPI verified</p>
                </div>
              </div>

              {/* Sample Inquiry Preview Row */}
              <div className="mt-4 rounded-xl border border-border bg-ivory-soft p-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-subtle">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pastel-sage text-sage-forest text-xs font-bold">
                    P
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-ink-primary">Pooja Sharma (@poojasharma_style)</span>
                    <p className="text-[11px] text-ink-secondary italic">
                      &ldquo;Need 2 Earthy Sage ceramic vases delivered to Andheri East by Friday...&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="rounded-full bg-pastel-sage px-2.5 py-0.5 text-[10px] font-semibold text-sage-forest">
                    Gemini AI Extracted
                  </span>
                  <span className="font-semibold text-xs text-ink-primary font-display">₹3,100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE PROBLEM & VALUE PROPOSITION                                        */}
      {/* ========================================================================= */}
      <section className="relative border-y border-border bg-beige-warm/60 py-16 sm:py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
              Running a product business on DMs shouldn&apos;t feel like chaos.
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-ink-secondary leading-relaxed">
              When inquiries arrive across Instagram, WhatsApp, and Telegram, it&apos;s easy to forget who asked for a custom size, who promised to confirm tomorrow, and which UPI payment was actually received.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="card-hover-tilt rounded-2xl border border-burgundy-border/60 bg-ivory-soft p-6 shadow-subtle hover:shadow-floating">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-burgundy-subtle text-burgundy-deep font-bold border border-burgundy-border/40">
                ✕
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Lost Inquiries in Chat History
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Messages slip down your inbox. Days pass before you remember a customer who said &ldquo;will confirm tomorrow&rdquo;.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-beige-border bg-ivory-soft p-6 shadow-subtle hover:shadow-floating">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-butter text-[#5C4A1A] font-bold">
                ✕
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Manual Notebooks & Spreadsheets
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Copying delivery addresses and quantities into separate spreadsheets takes hours and leads to duplicate customer errors.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-sage-light/60 bg-ivory-soft p-6 shadow-subtle hover:shadow-floating hover:border-sage-accent">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pastel-sage text-sage-forest font-bold">
                ✓
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                The AUREN Solution
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                One unified workspace. Paste a message or upload a screenshot, review the AI draft, set a follow-up, and convert to an order with 1 click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS (4-STEP SEQUENCE)                                         */}
      {/* ========================================================================= */}
      <section id="workflow" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-burgundy-accent uppercase tracking-wider">
              Simple 4-Step Workflow
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
              From Inquiry to Confirmed Order in Seconds
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="card-hover-tilt relative rounded-2xl border border-border bg-ivory-soft p-6 shadow-subtle hover:border-sage-accent/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pastel-sage text-sage-forest text-xs font-bold">
                1
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Capture Inquiry
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Enter details manually, paste the raw customer chat, or upload up to 3 screenshots.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card-hover-tilt relative rounded-2xl border border-border bg-ivory-soft p-6 shadow-subtle hover:border-sage-accent/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pastel-sage text-sage-forest text-xs font-bold">
                2
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Review AI Draft
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Gemini extracts customer name, variant, quantity, and budget. You review and confirm before saving.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card-hover-tilt relative rounded-2xl border border-burgundy-border/60 bg-ivory-soft p-6 shadow-subtle hover:border-burgundy-accent">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-burgundy-subtle text-burgundy-deep text-xs font-bold border border-burgundy-border/40">
                3
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Follow-up on Time
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Never lose an interested buyer. Scheduled follow-ups alert you on the dashboard when due.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card-hover-tilt relative rounded-2xl border border-border bg-ivory-soft p-6 shadow-subtle hover:border-sage-accent/60">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pastel-sage text-sage-forest text-xs font-bold">
                4
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-ink-primary">
                Convert to Order
              </h3>
              <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                Convert confirmed inquiries into orders without re-entering data. Track UPI payments and print receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CAPABILITIES GRID                                                      */}
      {/* ========================================================================= */}
      <section id="features" className="border-t border-border bg-beige-warm/50 py-16 sm:py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-bold text-sage-forest uppercase tracking-wider">
              Approved MVP Capabilities
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
              Everything Your Small Business Needs. Nothing It Doesn&apos;t.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <MessageSquare className="h-5 w-5 text-sage-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                Multi-Channel Inquiries
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Record source labels for Instagram, WhatsApp, Facebook, Telegram, and walk-ins in one central directory.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <Sparkles className="h-5 w-5 text-sage-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                AI-Assisted Draft Review
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Multilingual text & screenshot parsing (English, Hindi, Hinglish). Strict review-before-save guarantee.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <Users className="h-5 w-5 text-sage-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                Customer Records & History
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Keep customer handles, tags, duplicate warnings, and past purchase history linked in one place.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-burgundy-border/60 bg-ivory-soft p-5 shadow-subtle hover:border-burgundy-accent">
              <Clock className="h-5 w-5 text-burgundy-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                Follow-ups & In-App Alerts
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Schedule one-time reminders with due-today and overdue badges based on your local timezone.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <ShoppingBag className="h-5 w-5 text-sage-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                Orders & Manual Payments
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Fulfillment tracking, item snapshots, manual payment balance tracking (Cash/UPI/Bank), and PDF receipts.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <Download className="h-5 w-5 text-sage-accent" />
              <h3 className="mt-3 font-display text-sm font-bold text-ink-primary">
                Complete CSV Portability
              </h3>
              <p className="mt-1 text-xs text-ink-secondary">
                Your data belongs to you. Export complete CSV archives of customers, inquiries, and orders at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHO IT HELPS (BUSINESS CATEGORIES)                                     */}
      {/* ========================================================================= */}
      <section id="who-it-helps" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold text-burgundy-accent uppercase tracking-wider">
            Tailored For Modern Sellers
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
            Designed for Independent Product Businesses
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {[
              "Clothing & Apparel Boutiques",
              "Handmade & Custom Gifts",
              "Jewellery & Accessories",
              "Home Bakers & Food Artisans",
              "Beauty & Organic Cosmetics",
              "Home Décor & Pottery Studios",
              "Stationery & Leather Crafts",
            ].map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-beige-border bg-beige-warm px-4 py-2 text-xs font-semibold text-ink-primary shadow-subtle transition-all hover:bg-beige-surface hover:border-burgundy-accent/40 hover:-translate-y-0.5 cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FREQUENTLY ASKED QUESTIONS                                             */}
      {/* ========================================================================= */}
      <section id="faq" className="border-t border-border bg-beige-warm/50 py-16 sm:py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-xs text-ink-secondary">
              Honest answers about AUREN&apos;s capabilities and boundaries.
            </p>
          </div>

          <div className="space-y-4">
            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <h3 className="font-display text-sm font-bold text-ink-primary">
                Does AUREN ask for my Instagram or WhatsApp passwords?
              </h3>
              <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                No. AUREN never asks for social media credentials or performs unofficial scraping. You paste customer messages or upload screenshots, and AUREN organizes them in your private workspace.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <h3 className="font-display text-sm font-bold text-ink-primary">
                Does AI automatically reply to my customers or create orders?
              </h3>
              <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                Never. The AI extraction only prepares an editable draft. You review, correct, and confirm every single detail before saving. You always maintain full control.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <h3 className="font-display text-sm font-bold text-ink-primary">
                Is AUREN free to use?
              </h3>
              <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                Yes. AUREN is 100% free during the initial validation pilot. There are no mandatory paid tiers, no subscription locks, and no hidden credit card charges.
              </p>
            </div>

            <div className="card-hover-tilt rounded-2xl border border-border bg-ivory-soft p-5 shadow-subtle hover:border-sage-accent/60">
              <h3 className="font-display text-sm font-bold text-ink-primary">
                Can I export my customer and order data?
              </h3>
              <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                Yes. You can download a complete CSV archive of all customer records, inquiries, follow-ups, and orders from the Settings page at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CALL TO ACTION                                                   */}
      {/* ========================================================================= */}
      <section className="relative py-20 sm:py-28 text-center bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-block transition-transform hover:scale-110 mb-4">
            <AurenLogoMark size={48} color="#4E5841" />
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink-primary sm:text-4xl">
            Ready to bring order to your business?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary">
            Every conversation. Every customer. Every order. One workspace. Start managing your inquiries with confidence today.
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/signup"
              className="shimmer-gleam inline-flex items-center gap-2 rounded-xl bg-sage-accent px-6 py-3.5 text-sm font-semibold text-white shadow-floating transition-all hover:bg-sage-hover hover:shadow-glowSage active:scale-95"
            >
              <span>Get started for free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER                                                                 */}
      {/* ========================================================================= */}
      <footer className="border-t border-border bg-[#FAF8F5] py-12 text-xs text-ink-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AurenLogoMark size={24} color="#4E5841" />
            <span className="font-display font-bold tracking-[0.2em] text-ink-primary">
              AUREN
            </span>
            <span className="text-[11px] text-ink-muted">
              • Social Commerce Workspace
            </span>
          </div>

          <p className="text-[11px] text-ink-muted">
            &copy; {new Date().getFullYear()} AUREN. Built for independent small business owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
