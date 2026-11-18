"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
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

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agreed, setAgreed] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-email");
    }, 700);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-warm px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-ivory-soft p-8 shadow-card sm:p-10">
        {/* Brand Header */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-accent text-ivory-soft font-display font-bold text-sm shadow-subtle">
            A
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink-primary">
            AUREN
          </span>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
            Create Your Business Workspace
          </h2>
          <p className="mt-1 text-xs text-ink-secondary">
            Join independent sellers managing inquiries and orders with ease.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink-primary">
              Your Full Name
            </label>
            <Input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rasika Kudale"
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary">
              Business Name
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
              Business Category
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

          <div>
            <label className="block text-xs font-medium text-ink-primary">
              Work / Business Email
            </label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourbusiness.com"
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-ink-primary">
              Create Password
            </label>
            <Input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              className="mt-1"
            />
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded border-border text-sage-accent focus:ring-sage-accent"
            />
            <label htmlFor="terms" className="text-[11px] text-ink-secondary leading-normal">
              I agree to the Terms of Service and acknowledge the Privacy Policy. Personal customer data is private and never sold.
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading || !agreed}
            className="w-full gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
          >
            <span>{isLoading ? "Creating Workspace..." : "Create Business Account"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-sage-accent hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
