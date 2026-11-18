"use client";

import * as React from "react";
import Link from "next/link";
import { KeyRound, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-warm px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-ivory-soft p-8 shadow-card sm:p-10">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pastel-sage text-sage-forest">
          <KeyRound className="h-6 w-6" />
        </div>

        <div className="text-center mt-5 mb-6">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
            Reset Your Password
          </h2>
          <p className="mt-1 text-xs text-ink-secondary">
            Enter your business email and we&apos;ll send a password recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-border bg-ivory-warm p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-sage-forest" />
            <p className="mt-3 text-xs font-semibold text-ink-primary">
              Recovery Link Dispatched
            </p>
            <p className="mt-1 text-xs text-ink-secondary">
              If an account exists for {email}, a password reset link has been delivered.
            </p>
            <Button asChild className="mt-5 w-full bg-sage-accent text-ivory-soft hover:bg-sage-hover">
              <Link href="/login">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-primary">
                Registered Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@business.com"
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
            >
              <span>{isLoading ? "Sending..." : "Send Reset Link"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-ink-secondary">
          Remembered password?{" "}
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
