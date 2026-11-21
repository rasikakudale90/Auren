"use client";

import * as React from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lenisInstance: any = null;
    let animationFrameId: number;

    import("lenis")
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenisInstance?.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        }

        animationFrameId = requestAnimationFrame(raf);
      })
      .catch((err) => {
        console.warn("Lenis smooth scroll fallback to native:", err);
      });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (lenisInstance) lenisInstance.destroy();
    };
  }, []);

  return <>{children}</>;
}
