"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Store,
  ArrowRight,
} from "lucide-react";
import { AurenLogoMark } from "@/components/ui/auren-logo";

const CATEGORIES = [
  "Handmade & Customised Gifts",
  "Clothing & Fashion",
  "Jewellery & Accessories",
  "Home Bakers & Food",
  "Beauty & Cosmetics",
  "Home Décor & Art",
  "Other Product Business",
];

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [businessName, setBusinessName] = React.useState("");
  const [category, setCategory] = React.useState(CATEGORIES[0]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/onboarding");
    }, 400);
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#FAF8F5]">
      {/* 1. LEFT PANEL (50% Equal Split): Framed image without any cropping */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8 lg:p-10 bg-[#FAF8F5] shrink-0">
        <div className="relative w-full max-w-[520px] aspect-[891/941] rounded-2xl overflow-hidden shadow-card border border-[#E7E5DE] bg-white">
          <Image
            src="/images/auren-login-left.png"
            alt="AUREN — Command Your Business With Confidence"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* 2. RIGHT PANEL (50% Equal Split) */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-16 bg-[#FAF8F5]">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <AurenLogoMark size={58} color="#4C563F" />
            <span className="font-display font-bold text-lg tracking-[0.28em] text-[#1F201D] mt-2.5">
              AUREN
            </span>
            <h1 className="font-display text-[26px] sm:text-[28px] font-bold text-[#1F201D] mt-3.5 tracking-tight leading-tight">
              Create Your Account
            </h1>
            <p className="text-[13px] text-[#73756E] mt-1 font-normal">
              Start managing inquiries, follow-ups, and orders in one place
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-6 space-y-3.5">
            <div>
              <label className="block text-[13px] font-semibold text-[#1F201D] mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rasika Kudale"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-4 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1F201D] mb-1.5">
                Business Name
              </label>
              <div className="relative flex items-center">
                <Store className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Rasika Studio"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-4 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1F201D] mb-1.5">
                Primary Product Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white px-3.5 text-sm text-[#1F201D] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1F201D] mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-4 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-semibold text-[#1F201D] mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password (min. 8 characters)"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-4 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4C563F] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#414B35] active:bg-[#38412E]"
            >
              <span>{isLoading ? "Setting up workspace..." : "Continue to Onboarding"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] text-[#73756E]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1F201D] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
