"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  const [resendSent, setResendSent] = React.useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-warm px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-ivory-soft p-8 text-center shadow-card sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pastel-sage text-sage-forest">
          <Mail className="h-7 w-7" />
        </div>

        <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink-primary">
          Verify Your Email
        </h2>
        <p className="mt-2 text-xs text-ink-secondary leading-relaxed">
          We&apos;ve sent a verification link to your email address. Please click the link to activate your AUREN business workspace.
        </p>

        <div className="my-6 rounded-lg border border-border bg-ivory-warm p-4 text-xs text-ink-secondary">
          <p className="font-semibold text-ink-primary">Can&apos;t find the email?</p>
          <p className="mt-0.5 text-[11px] text-ink-muted">
            Be sure to check your spam/updates folder or click below to resend.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setResendSent(true)}
            disabled={resendSent}
            className="w-full text-xs"
          >
            {resendSent ? "Verification Link Resent!" : "Resend Verification Email"}
          </Button>

          <Button asChild className="w-full gap-2 bg-sage-accent text-ivory-soft hover:bg-sage-hover">
            <Link href="/onboarding">
              <span>Continue to Workspace Setup</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-ink-muted">
          Back to{" "}
          <Link href="/login" className="font-medium text-sage-accent hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
