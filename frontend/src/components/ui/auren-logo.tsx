import * as React from "react";
import { cn } from "@/lib/utils";

interface AurenLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

/**
 * AurenLogoMark: Precision SVG recreation of the official AUREN emblem
 * from docs/images/AurenLogin .png and AurenLogin1.png.
 * Features the signature organic peaked canopy and the three balanced foundational pebbles.
 */
export function AurenLogoMark({
  size = 56,
  className,
  color = "#4E5841",
  ...props
}: AurenLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Peaked Organic Arch / Canopy */}
      <path
        d="M60 16C50 16 38 29 33 46C29 59 34 71 44 71C49 71 53 66 60 66C67 66 71 71 76 71C86 71 91 59 87 46C82 29 70 16 60 16ZM60 52C55.5 52 52 47.5 52 42C52 36.5 55.5 32 60 32C64.5 32 68 36.5 68 42C68 47.5 64.5 52 60 52Z"
        fill={color}
      />
      {/* Foundational Left Pebble */}
      <ellipse
        cx="39"
        cy="87"
        rx="14"
        ry="8.5"
        transform="rotate(-8 39 87)"
        fill={color}
        fillOpacity="0.72"
      />
      {/* Foundational Center Pebble */}
      <ellipse
        cx="60"
        cy="89"
        rx="9"
        ry="6"
        fill={color}
        fillOpacity="0.6"
      />
      {/* Foundational Right Pebble */}
      <ellipse
        cx="81"
        cy="87"
        rx="14"
        ry="8.5"
        transform="rotate(8 81 87)"
        fill={color}
        fillOpacity="0.72"
      />
    </svg>
  );
}

export function AurenLogo({
  className,
  markSize = 36,
  showTagline = false,
  textColor = "text-[#242522]",
}: {
  className?: string;
  markSize?: number;
  showTagline?: boolean;
  textColor?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <AurenLogoMark size={markSize} />
      <div className="flex flex-col">
        <span
          className={cn(
            "font-display font-bold tracking-[0.25em] text-base leading-none",
            textColor
          )}
        >
          AUREN
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#6E706A] mt-1">
            Social Commerce Workspace
          </span>
        )}
      </div>
    </div>
  );
}
