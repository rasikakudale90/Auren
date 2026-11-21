"use client";

import * as React from "react";

export function EditorialBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Tactile SVG Linen/Paper Noise Layer */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="linen-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#linen-noise)" />
      </svg>

      {/* 2. Deep Burgundy Radial Aura (Top-Right / Subtle focal warmth) */}
      <div
        className="absolute -top-[15%] -right-[10%] h-[600px] w-[600px] rounded-full blur-[120px] opacity-25 animate-pulseAura"
        style={{
          background:
            "radial-gradient(circle, rgba(110, 38, 57, 0.45) 0%, rgba(84, 27, 41, 0.15) 50%, transparent 70%)",
        }}
      />

      {/* 3. Muted Sage Green Radial Aura (Bottom-Left / Organic calm) */}
      <div
        className="absolute top-[45%] -left-[10%] h-[650px] w-[650px] rounded-full blur-[140px] opacity-25 animate-pulseAura"
        style={{
          background:
            "radial-gradient(circle, rgba(78, 88, 65, 0.45) 0%, rgba(53, 74, 53, 0.15) 55%, transparent 75%)",
          animationDelay: "3.5s",
        }}
      />

      {/* 4. Warm Linen Beige Radial Glow (Center-Top ambient fill) */}
      <div
        className="absolute top-[10%] left-[25%] h-[500px] w-[700px] rounded-full blur-[100px] opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(239, 236, 230, 0.9) 0%, rgba(221, 214, 201, 0.3) 60%, transparent 80%)",
        }}
      />

      {/* 5. Deep Burgundy Secondary Accent (Footer / Edge) */}
      <div
        className="absolute -bottom-[20%] right-[20%] h-[550px] w-[550px] rounded-full blur-[130px] opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(110, 38, 57, 0.35) 0%, transparent 65%)",
        }}
      />

      {/* 6. Subtle Editorial Structural Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #242522 1px, transparent 1px), linear-gradient(to bottom, #242522 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
