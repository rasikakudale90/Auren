import * as React from "react";
import { cn } from "@/lib/utils";

interface AurenLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  color?: string;
}

export function AurenLogoMark({
  size = 48,
  className,
  color = "#4E5841",
  ...props
}: AurenLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      {...props}
    >
      {/* Top rounded organic leaf shape */}
      <path
        d="M50 14C43 27 38 42 47 52C53 50 59 42 63 35C66 28 62 18 50 14Z"
        fill={color}
        fillOpacity="0.9"
      />
      {/* Bottom left rounded leaf shape */}
      <path
        d="M24 68C22 55 31 43 44 49C44 56 41 64 36 71C31 77 25 76 24 68Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Bottom right rounded leaf shape */}
      <path
        d="M76 68C78 55 69 43 56 49C56 56 59 64 64 71C69 77 75 76 76 68Z"
        fill={color}
        fillOpacity="0.85"
      />
      {/* Subtle organic center fusion dot */}
      <circle cx="50" cy="50" r="4" fill={color} fillOpacity="0.95" />
    </svg>
  );
}

export function AurenLogo({
  className,
  markSize = 36,
  showTagline = false,
  textColor = "text-ink-primary",
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
            "font-display font-bold tracking-[0.22em] text-base leading-none",
            textColor
          )}
        >
          AUREN
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium uppercase tracking-wider text-ink-muted mt-1">
            Social Commerce Workspace
          </span>
        )}
      </div>
    </div>
  );
}
