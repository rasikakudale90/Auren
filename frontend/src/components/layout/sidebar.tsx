"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Clock,
  ShoppingBag,
  Package,
  Zap,
  Bell,
  Settings,
  ChevronDown,
  Sparkles,
  Store,
  Check,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockBusinesses } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AurenLogoMark } from "@/components/ui/auren-logo";

interface SidebarProps {
  activeBusinessId: string;
  onSelectBusiness: (bizId: string) => void;
}

export function Sidebar({ activeBusinessId, onSelectBusiness }: SidebarProps) {
  const pathname = usePathname();
  const currentBusiness =
    mockBusinesses.find((b) => b.id === activeBusinessId) || mockBusinesses[0];

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Enquiries", href: "/enquiries", icon: MessageSquare, badge: "3" },
    { label: "Customers", href: "/customers", icon: Users },
    { label: "Follow-ups", href: "/follow-ups", icon: Clock, badge: "1" },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
    { label: "Products", href: "/products", icon: Package },
    { label: "Quick Replies", href: "/quick-replies", icon: Zap },
    { label: "Notifications", href: "/notifications", icon: Bell },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden h-screen w-64 flex-col border-r border-border bg-ivory-soft lg:flex">
      {/* 1. App Header & Workspace Switcher */}
      <div className="border-b border-border p-4">
        <Link href="/" className="flex items-center gap-2 mb-3 px-1">
          <AurenLogoMark size={28} color="#4E5841" />
          <div>
            <span className="font-display text-base font-bold tracking-[0.18em] text-ink-primary">
              AUREN
            </span>
            <span className="ml-1.5 text-[10px] font-medium text-sage-accent uppercase tracking-wider">
              Workspace
            </span>
          </div>
        </Link>

        {/* Business Selector Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center justify-between rounded-lg border border-border bg-ivory-warm p-2 text-left transition-colors hover:bg-ivory-muted focus:outline-none focus:ring-1 focus:ring-sage-accent">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-pastel-sage text-sage-forest">
                  <Store className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <p className="truncate text-xs font-semibold text-ink-primary">
                    {currentBusiness.name}
                  </p>
                  <p className="truncate text-[10px] text-ink-muted">
                    {currentBusiness.category}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 shrink-0 text-ink-muted" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
            {mockBusinesses.map((biz) => (
              <DropdownMenuItem
                key={biz.id}
                onClick={() => onSelectBusiness(biz.id)}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{biz.name}</p>
                  <p className="text-[10px] text-ink-muted">{biz.category}</p>
                </div>
                {biz.id === currentBusiness.id && (
                  <Check className="h-3.5 w-3.5 text-sage-accent" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/onboarding" className="flex items-center gap-2 text-sage-accent">
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Create New Workspace</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 2. Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-all",
                isActive
                  ? "bg-pastel-sage/70 text-sage-forest font-semibold shadow-subtle"
                  : "text-ink-secondary hover:bg-ivory-muted hover:text-ink-primary"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive
                      ? "text-sage-forest"
                      : "text-ink-muted group-hover:text-ink-primary"
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-bold",
                    isActive
                      ? "bg-sage-accent text-ivory-soft"
                      : "bg-ivory-muted text-ink-muted group-hover:bg-pastel-sage group-hover:text-sage-forest"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* 3. AI Extraction Quota Widget */}
      <div className="m-3 rounded-lg border border-border bg-ivory-warm p-3">
        <div className="flex items-center justify-between text-xs font-semibold text-ink-primary">
          <div className="flex items-center gap-1.5 text-sage-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Gemini AI Quota</span>
          </div>
          <span className="text-[10px] font-medium text-ink-muted">
            {currentBusiness.aiQuotaUsed} / {currentBusiness.aiQuotaLimit}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-sage-accent transition-all duration-300"
            style={{
              width: `${(currentBusiness.aiQuotaUsed / currentBusiness.aiQuotaLimit) * 100}%`,
            }}
          />
        </div>
        <p className="mt-1.5 text-[10px] text-ink-muted">
          Resets on {currentBusiness.aiQuotaResetDate} • Free Tier
        </p>
      </div>

      {/* 4. User Profile & Sign Out */}
      <div className="border-t border-border p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-accent text-ivory-soft text-xs font-bold">
              R
            </div>
            <div>
              <p className="text-xs font-semibold text-ink-primary">Rasika</p>
              <p className="text-[10px] text-ink-muted">Business Owner</p>
            </div>
          </div>
          <Link
            href="/login"
            title="Sign out"
            className="rounded p-1.5 text-ink-muted hover:bg-ivory-muted hover:text-ink-primary"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
