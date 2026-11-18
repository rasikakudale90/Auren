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
    }, 600);
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#FAF9F5]">
      {/* 1. LEFT PANEL */}
      <div className="relative w-full lg:w-[54%] lg:min-h-screen bg-[#38412E] overflow-hidden">
        <div className="relative h-[480px] sm:h-[600px] lg:h-full w-full">
          <Image
            src="/images/auren-login-left.png"
            alt="AUREN — Command Your Business With Confidence"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 54vw"
            className="object-cover object-top sm:object-center"
          />
        </div>
      </div>

      {/* 2. RIGHT PANEL */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 sm:px-12 lg:w-[46%] lg:px-16 bg-[#FAF9F5]">
        <div className="w-full max-w-[420px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <AurenLogoMark size={56} color="#4E5841" />
            <span className="font-display font-bold text-lg tracking-[0.28em] text-[#242522] mt-3">
              AUREN
            </span>
            <h1 className="font-display text-2xl sm:text-[28px] font-bold text-[#242522] mt-5 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs text-[#6E706A] mt-1.5">
              Start managing inquiries, follow-ups, and orders in one place
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#242522] mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 h-4 w-4 text-[#92938D]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rasika Kudale"
                  className="h-11 w-full rounded-xl border border-[#E7E5DE] bg-[#FFFDF9] pl-10 pr-4 text-xs text-[#242522] placeholder:text-[#92938D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4E5841] focus:outline-none focus:ring-1 focus:ring-[#4E5841]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242522] mb-1.5">
                Business Name
              </label>
              <div className="relative flex items-center">
                <Store className="absolute left-3.5 h-4 w-4 text-[#92938D]" />
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Aura Studio & Crafts"
                  className="h-11 w-full rounded-xl border border-[#E7E5DE] bg-[#FFFDF9] pl-10 pr-4 text-xs text-[#242522] placeholder:text-[#92938D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4E5841] focus:outline-none focus:ring-1 focus:ring-[#4E5841]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242522] mb-1.5">
                Business Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#E7E5DE] bg-[#FFFDF9] px-3.5 text-xs text-[#242522] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4E5841] focus:outline-none focus:ring-1 focus:ring-[#4E5841]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242522] mb-1.5">
                Work Email
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-[#92938D]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.com"
                  className="h-11 w-full rounded-xl border border-[#E7E5DE] bg-[#FFFDF9] pl-10 pr-4 text-xs text-[#242522] placeholder:text-[#92938D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4E5841] focus:outline-none focus:ring-1 focus:ring-[#4E5841]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#242522] mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-[#92938D]" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="h-11 w-full rounded-xl border border-[#E7E5DE] bg-[#FFFDF9] pl-10 pr-4 text-xs text-[#242522] placeholder:text-[#92938D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4E5841] focus:outline-none focus:ring-1 focus:ring-[#4E5841]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4E5841] text-sm font-semibold text-white shadow-subtle transition-all hover:bg-[#434D37] active:bg-[#38412E]"
            >
              <span>{isLoading ? "Setting up..." : "Create Business Workspace"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-[#6E706A]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#242522] hover:underline hover:text-[#4E5841]"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
