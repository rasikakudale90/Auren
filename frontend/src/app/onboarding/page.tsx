"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CATEGORIES = [
  "Handmade & Customised Gifts",
  "Clothing & Fashion",
  "Jewellery & Accessories",
  "Home Bakers & Food",
  "Beauty & Cosmetics",
  "Home Décor & Art",
  "Other Product Business",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  // Form states
  const [businessName, setBusinessName] = React.useState("Aura Studio & Crafts");
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [currency, setCurrency] = React.useState("INR (₹)");
  const [timezone, setTimezone] = React.useState("Asia/Kolkata (IST)");
  const [dateFormat, setDateFormat] = React.useState("DD/MM/YYYY");
  const [phone, setPhone] = React.useState("+91 98201 54321");
  const [location, setLocation] = React.useState("Bandra West, Mumbai");

  const handleFinish = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-warm px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-ivory-soft p-8 shadow-card sm:p-12">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-secondary">
            <span>Step {step} of 3</span>
            <span className="text-sage-accent">
              {step === 1 && "Business Identity"}
              {step === 2 && "Regional Settings"}
              {step === 3 && "Ready to Launch"}
            </span>
          </div>
          <div className="mt-2.5 grid grid-cols-3 gap-2">
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 1 ? "bg-sage-accent" : "bg-border"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 2 ? "bg-sage-accent" : "bg-border"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all ${
                step >= 3 ? "bg-sage-accent" : "bg-border"
              }`}
            />
          </div>
        </div>

        {/* Step 1: Business Profile */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
                Let&apos;s name your workspace
              </h2>
              <p className="mt-1 text-xs text-ink-secondary">
                This will be your primary business account for managing customer inquiries.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-primary">
                  Business Name *
                </label>
                <Input
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Aura Studio & Crafts"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary">
                  Primary Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sage-accent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-primary">
                    Support / WhatsApp Phone
                  </label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200 00000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-primary">
                    City / Studio Location
                  </label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mumbai, Pune, Delhi"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setStep(2)}
                disabled={!businessName.trim()}
                className="gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
              >
                <span>Continue to Regional Settings</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Regional Defaults */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
                Regional & Currency Preferences
              </h2>
              <p className="mt-1 text-xs text-ink-secondary">
                Configure default currency formatting and timezone for due follow-up notifications.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-ink-primary">
                  Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sage-accent"
                >
                  <option value="INR (₹)">Indian Rupee — INR (₹)</option>
                  <option value="USD ($)">US Dollar — USD ($)</option>
                  <option value="EUR (€)">Euro — EUR (€)</option>
                  <option value="GBP (£)">British Pound — GBP (£)</option>
                  <option value="AED (د.إ)">UAE Dirham — AED (د.إ)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sage-accent"
                >
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST — +05:30)</option>
                  <option value="Asia/Dubai (GST)">Asia/Dubai (GST — +04:00)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT/BST)</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink-primary">
                  Date Format
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none focus-visible:ring-1.5 focus-visible:ring-sage-accent"
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY (e.g. 18/11/2026)</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY (e.g. 11/18/2026)</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD (e.g. 2026-11-18)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Ready to Launch */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-sage text-sage-forest">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
                Your Workspace Is Ready!
              </h2>
              <p className="mt-1 text-xs text-ink-secondary">
                {businessName} ({category}) is configured with {currency} and {timezone}.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-ivory-warm p-4 text-left space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-ink-primary">
                <CheckCircle2 className="h-4 w-4 text-sage-accent shrink-0" />
                <span>Multi-channel enquiry capture ready</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-primary">
                <CheckCircle2 className="h-4 w-4 text-sage-accent shrink-0" />
                <span>Gemini AI extraction quota initialized (100 free/month)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-primary">
                <CheckCircle2 className="h-4 w-4 text-sage-accent shrink-0" />
                <span>Catalogue & quick-reply templates loaded</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                onClick={handleFinish}
                size="lg"
                className="w-full gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
              >
                <span>Launch Business Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
