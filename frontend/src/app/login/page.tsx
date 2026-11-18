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
      {/* 1. LEFT PANEL (~54%): Exact reference matching AurenLogin .png            */}
      {/* Uses docs/images/AurenLogin1.png which has the photo & built-in typography*/}
      {/* ========================================================================= */}
      <div className="relative w-full lg:w-[54%] h-[460px] sm:h-[600px] lg:h-screen lg:sticky lg:top-0 bg-[#38412E] overflow-hidden shrink-0">
        <Image
          src="/images/auren-login-left.png"
          alt="AUREN — Command Your Business With Confidence. Every conversation. Every customer. Every order. One workspace."
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="object-cover object-center"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT PANEL (~46%): Exact recreation of AurenLogin .png                */}
      {/* ========================================================================= */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 sm:px-12 lg:w-[46%] lg:px-16 bg-[#FAF8F5]">
        <div className="w-full max-w-[420px] mx-auto">
          {/* Centered Brand Mark & Wordmark */}
          <div className="flex flex-col items-center text-center">
            <AurenLogoMark size={64} color="#4C563F" />
            <span className="font-display font-bold text-lg tracking-[0.28em] text-[#1F201D] mt-3">
              AUREN
            </span>
            <h1 className="font-display text-[26px] sm:text-[28px] font-bold text-[#1F201D] mt-4 tracking-tight leading-tight">
              Log in or Sign up
            </h1>
            <p className="text-[13px] text-[#73756E] mt-1 font-normal">
              Welcome back
            </p>
          </div>

          {/* Social Sign-in Row */}
          <div className="mt-7 grid grid-cols-2 gap-3.5">
            {/* Apple */}
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#E5E3DC] bg-white px-3 text-[13px] font-medium text-[#1F201D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:bg-[#F6F5F0]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.99 1.71-.86 2.74 1 .08 1.94-.49 2.56-1.24" />
              </svg>
              <span>Continue with Apple</span>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={handleSocialLogin}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#E5E3DC] bg-white px-3 text-[13px] font-medium text-[#1F201D] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all hover:bg-[#F6F5F0]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
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
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E3DC]" />
            </div>
            <span className="relative bg-[#FAF8F5] px-3.5 text-xs text-[#8E908A]">
              or
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
            <div className="flex items-center justify-between pt-1">
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
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#4C563F] text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#414B35] active:bg-[#38412E]"
            >
              <span>{isLoading ? "Signing in..." : "Log In"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Bottom Prompt */}
          <p className="mt-8 text-center text-[13px] text-[#73756E]">
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
