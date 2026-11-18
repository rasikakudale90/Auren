"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Users,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onOpenAddEnquiry: () => void;
}

export function MobileNav({ onOpenAddEnquiry }: MobileNavProps) {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Enquiries", href: "/enquiries", icon: MessageSquare },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
    { label: "Customers", href: "/customers", icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-border bg-ivory-soft/95 px-2 backdrop-blur-md lg:hidden">
      {navItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium transition-colors",
              isActive ? "text-sage-forest font-semibold" : "text-ink-secondary"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Center Action Button: Add Enquiry */}
      <button
        onClick={onOpenAddEnquiry}
        className="flex h-11 w-11 -translate-y-2 items-center justify-center rounded-full bg-sage-accent text-ivory-soft shadow-panel transition-transform active:scale-95"
        aria-label="Add new enquiry"
      >
        <Plus className="h-5 w-5" />
      </button>

      {navItems.slice(2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 text-[11px] font-medium transition-colors",
              isActive ? "text-sage-forest font-semibold" : "text-ink-secondary"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
