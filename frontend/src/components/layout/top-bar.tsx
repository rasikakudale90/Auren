"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Bell,
  Clock,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWorkspace } from "@/context/workspace-context";

interface TopBarProps {
  onOpenAddEnquiry: () => void;
  onToggleMobileMenu?: () => void;
  pageTitle?: string;
}

export function TopBar({
  onOpenAddEnquiry,
  onToggleMobileMenu,
  pageTitle,
}: TopBarProps) {
  const { followUps, notifications, isDemoMode, setIsDemoMode } = useWorkspace();

  const dueTodayCount = followUps.filter(
    (f) =>
      f.status === "Pending" &&
      (f.dueAt.includes("2026-11-18") || f.dueAt.includes("2026-11-19"))
  ).length;

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-ivory-soft/90 px-4 backdrop-blur-md sm:px-6">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="rounded-md p-1.5 text-ink-secondary hover:bg-ivory-muted lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div>
          <h1 className="font-display text-base font-semibold tracking-tight text-ink-primary sm:text-lg">
            {pageTitle || "Overview"}
          </h1>
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="hidden max-w-xs flex-1 px-4 md:block lg:max-w-md">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-muted" />
          <Input
            type="search"
            placeholder="Search enquiries, customers, or orders..."
            className="h-9 w-full rounded-lg bg-ivory-warm pl-9 text-xs placeholder:text-ink-muted"
          />
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Workspace State Mode Toggle (Showcase vs Empty) */}
        <button
          type="button"
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`hidden items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all sm:inline-flex ${
            isDemoMode
              ? "border-beige-border bg-beige-warm text-ink-primary hover:bg-beige-subtle"
              : "border-burgundy-border bg-burgundy-subtle text-burgundy-deep"
          }`}
          title="Toggle between populated demo records and blank newly-onboarded state"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDemoMode ? "bg-sage-accent" : "bg-burgundy-accent"
            }`}
          />
          <span>{isDemoMode ? "Showcase Data" : "Blank State"}</span>
        </button>

        {/* Due Today Follow-up Pill (Styled in Burgundy) */}
        {dueTodayCount > 0 && (
          <Link
            href="/follow-ups"
            className="hidden items-center gap-1.5 rounded-full border border-burgundy-border bg-burgundy-subtle px-2.5 py-1 text-xs font-semibold text-burgundy-deep transition-colors hover:bg-burgundy-subtle/80 sm:inline-flex"
          >
            <Clock className="h-3 w-3" />
            <span>{dueTodayCount} due</span>
          </Link>
        )}

        {/* Global Add Enquiry Action */}
        <Button
          onClick={onOpenAddEnquiry}
          size="sm"
          className="gap-1.5 bg-sage-accent text-xs font-medium text-ivory-soft shadow-subtle hover:bg-sage-hover"
        >
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Add Enquiry</span>
          <span className="sm:hidden">Enquiry</span>
        </Button>

        {/* Notifications Icon */}
        <Link
          href="/notifications"
          className="relative rounded-lg border border-border bg-ivory-warm p-2 text-ink-secondary transition-colors hover:bg-ivory-muted hover:text-ink-primary"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotifications > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sage-accent text-[10px] font-bold text-ivory-soft">
              {unreadNotifications}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
