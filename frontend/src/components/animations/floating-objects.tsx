"use client";

import * as React from "react";
import {
  Sparkles,
  ShoppingBag,
  Check,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function FloatingObjects() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const sealRef = React.useRef<HTMLDivElement>(null);
  const orderRef = React.useRef<HTMLDivElement>(null);
  const inquiryRef = React.useRef<HTMLDivElement>(null);
  const alertRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let cleanupCtx: (() => void) | undefined;
    let removeMouseListener: (() => void) | undefined;

    import("gsap")
      .then(({ default: gsap }) => {
        const ctx = gsap.context(() => {
          // 1. Continuous Idle Floating Animations
          if (sealRef.current) {
            gsap.to(sealRef.current, {
              y: -14,
              rotation: 3,
              duration: 4.2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }

          if (orderRef.current) {
            gsap.to(orderRef.current, {
              y: 12,
              rotation: -2.5,
              duration: 3.8,
              delay: 0.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }

          if (inquiryRef.current) {
            gsap.to(inquiryRef.current, {
              y: -12,
              rotation: -3,
              duration: 4.6,
              delay: 1.0,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }

          if (alertRef.current) {
            gsap.to(alertRef.current, {
              y: 15,
              rotation: 2.5,
              duration: 4.0,
              delay: 1.4,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            });
          }
        }, containerRef);

        cleanupCtx = () => ctx.revert();

        // 2. Mouse Parallax Tilt on Viewport Movement
        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1);
          const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1);

          if (sealRef.current) {
            gsap.to(sealRef.current, {
              x: relX * 22,
              y: relY * 18,
              rotateX: -relY * 12,
              rotateY: relX * 14,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (orderRef.current) {
            gsap.to(orderRef.current, {
              x: -relX * 26,
              y: -relY * 20,
              rotateX: relY * 15,
              rotateY: -relX * 16,
              duration: 0.9,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (inquiryRef.current) {
            gsap.to(inquiryRef.current, {
              x: relX * 18,
              y: -relY * 24,
              rotateX: -relY * 14,
              rotateY: relX * 18,
              duration: 1.0,
              ease: "power2.out",
              overwrite: "auto",
            });
          }

          if (alertRef.current) {
            gsap.to(alertRef.current, {
              x: -relX * 20,
              y: relY * 22,
              rotateX: relY * 12,
              rotateY: -relX * 14,
              duration: 0.85,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        removeMouseListener = () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      })
      .catch((err) => {
        console.warn("GSAP floating animation fallback:", err);
      });

    return () => {
      if (cleanupCtx) cleanupCtx();
      if (removeMouseListener) removeMouseListener();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px]"
      aria-hidden="true"
    >
      {/* Object 1: Artisanal Burgundy Wax Seal (Top Right) */}
      <div
        ref={sealRef}
        className="pointer-events-auto absolute right-4 top-10 sm:right-12 sm:top-14 hidden md:flex items-center gap-2 rounded-2xl border border-burgundy-border bg-burgundy-deep/95 p-3 text-white shadow-glowBurgundy backdrop-blur-md [transform-style:preserve-3d] transition-transform hover:scale-105"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-burgundy-accent text-beige-warm font-bold shadow-inner">
          <ShieldCheck className="h-5 w-5 text-beige-warm" />
        </div>
        <div className="pr-2 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-burgundy-border">
            Verified Studio
          </p>
          <p className="font-display text-xs font-semibold text-white">
            100% Private Workspace
          </p>
        </div>
      </div>

      {/* Object 2: Muted Sage Handcrafted Order Tag (Top Left) */}
      <div
        ref={orderRef}
        className="pointer-events-auto absolute left-4 top-24 sm:left-10 sm:top-20 hidden md:flex items-center gap-3 rounded-2xl border border-border bg-beige-warm/95 p-3.5 shadow-panel backdrop-blur-md [transform-style:preserve-3d] transition-transform hover:scale-105"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pastel-sage text-sage-forest">
          <ShoppingBag className="h-4 w-4" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-display text-xs font-bold text-ink-primary">
              Order #ORD-7819
            </span>
            <span className="rounded-full bg-pastel-sage px-2 py-0.5 text-[9px] font-bold text-sage-forest">
              UPI Paid
            </span>
          </div>
          <p className="text-[11px] text-ink-secondary mt-0.5">
            ₹3,100 • 2 Earthy Sage Vases
          </p>
        </div>
      </div>

      {/* Object 3: Frosted Glass Instant Inquiry Pill (Bottom Left) */}
      <div
        ref={inquiryRef}
        className="pointer-events-auto absolute bottom-12 left-6 sm:bottom-16 sm:left-16 hidden lg:flex items-center gap-3 rounded-2xl border border-beige-border bg-white/80 p-3.5 shadow-floating backdrop-blur-lg [transform-style:preserve-3d] transition-transform hover:scale-105"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E1EDDB] text-[#284724]">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider">
            Instagram DM • Pooja S.
          </p>
          <p className="text-xs font-medium text-ink-primary italic">
            &ldquo;Can you deliver to Andheri by Friday?&rdquo;
          </p>
        </div>
      </div>

      {/* Object 4: Deep Burgundy Action Reminder Pill (Bottom Right) */}
      <div
        ref={alertRef}
        className="pointer-events-auto absolute bottom-8 right-8 sm:bottom-12 sm:right-20 hidden lg:flex items-center gap-2.5 rounded-2xl border border-burgundy-border bg-burgundy-subtle/90 p-3 shadow-floating backdrop-blur-md [transform-style:preserve-3d] transition-transform hover:scale-105"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-burgundy-accent text-white">
          <Clock className="h-3.5 w-3.5" />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-burgundy-deep">
            Follow-up Due Today
          </span>
          <p className="text-xs font-semibold text-ink-primary">
            Send pricing draft
          </p>
        </div>
      </div>
    </div>
  );
}
