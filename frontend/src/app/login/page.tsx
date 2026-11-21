"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { AurenLogoMark } from "@/components/ui/auren-logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("rasika@auren.app");
  const [password, setPassword] = React.useState("password123");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  const handleSocialLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 400);
  };

  return (
    <div className="flex min-h-screen w-full flex-col lg:flex-row bg-[#FAF8F5]">
      {/* ========================================================================= */}
      {/* 1. LEFT PANEL (50% Equal Split): Framed image without any cropping       */}
      {/* Preserves 100% of top Auren logo and bottom headline/tagline               */}
      {/* ========================================================================= */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-4 sm:p-8 lg:p-10 bg-[#FAF8F5] shrink-0">
        <div className="relative w-full max-w-[520px] aspect-[891/941] rounded-2xl overflow-hidden shadow-card border border-[#E7E5DE] bg-white">
          <Image
            src="/images/auren-login-left.png"
            alt="AUREN — Command Your Business With Confidence. Every conversation. Every customer. Every order. One workspace."
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT PANEL (50% Equal Split): Exact recreation of AurenLogin .png     */}
      {/* ========================================================================= */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-10 sm:px-12 lg:w-1/2 lg:px-16 bg-[#FAF8F5]">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Centered Brand Mark & Wordmark */}
          <div className="flex flex-col items-center text-center">
            <AurenLogoMark size={58} color="#4C563F" />
            <span className="font-display font-bold text-lg tracking-[0.28em] text-[#1F201D] mt-2.5">
              AUREN
            </span>
            <h1 className="font-display text-[26px] sm:text-[28px] font-bold text-[#1F201D] mt-3.5 tracking-tight leading-tight">
              Log in or Sign up
            </h1>
            <p className="text-[13px] text-[#73756E] mt-1 font-normal">
              Welcome back
            </p>
          </div>

          {/* Social Sign-in Row: Continue with Google only */}
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl border border-[#E5E3DC] bg-white px-4 text-[13px] font-semibold text-[#1F201D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:bg-[#F6F5F0] hover:border-[#6E2639]/40 active:scale-[0.99] group"
            >
              <svg className="h-4 w-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Centered 'or' Divider */}
          <div className="relative my-5 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E3DC]" />
            </div>
            <span className="relative bg-[#FAF8F5] px-3.5 text-xs text-[#8E908A]">
              or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-semibold text-[#1F201D] mb-1.5"
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-4 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-semibold text-[#1F201D] mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-[#8E908A]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-[#E5E3DC] bg-white pl-10 pr-11 text-sm text-[#1F201D] placeholder:text-[#9A9C94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] focus:border-[#4C563F] focus:outline-none focus:ring-1 focus:ring-[#4C563F]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#8E908A] hover:text-[#1F201D] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D3D1C8] text-[#4C563F] focus:ring-[#4C563F]"
                />
                <span className="text-[13px] text-[#73756E]">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-[13px] text-[#73756E] hover:text-[#1F201D] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Primary Log In Button matching the exact dark sage green from reference image */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4C563F] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#414B35] active:bg-[#38412E]"
            >
              <span>{isLoading ? "Signing in..." : "Log In"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Bottom Prompt */}
          <p className="mt-6 text-center text-[13px] text-[#73756E]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#1F201D] hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
