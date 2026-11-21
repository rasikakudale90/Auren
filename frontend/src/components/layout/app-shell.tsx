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
  X,
  Store,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AddEnquiryModal } from "@/components/enquiries/add-enquiry-modal";
import { AurenLogoMark } from "@/components/ui/auren-logo";
import { useWorkspace } from "@/context/workspace-context";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  const [isAddEnquiryOpen, setIsAddEnquiryOpen] = React.useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  const { activeBusiness, enquiries, followUps, notifications } = useWorkspace();

  const newEnquiriesCount = enquiries.filter((e) => e.status === "New").length;
  const pendingFollowUpsCount = followUps.filter((f) => f.status === "Pending").length;
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;

  const mobileNavItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      label: "Enquiries",
      href: "/enquiries",
      icon: MessageSquare,
      badge: newEnquiriesCount > 0 ? String(newEnquiriesCount) : undefined,
      badgeColor: "bg-pastel-sage text-sage-forest",
    },
    { label: "Customers", href: "/customers", icon: Users },
    {
      label: "Follow-ups",
      href: "/follow-ups",
      icon: Clock,
      badge: pendingFollowUpsCount > 0 ? String(pendingFollowUpsCount) : undefined,
      badgeColor: "bg-burgundy-subtle text-burgundy-deep border border-burgundy-border/60",
    },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
    { label: "Products", href: "/products", icon: Package },
    { label: "Quick Replies", href: "/quick-replies", icon: Zap },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: unreadNotifsCount > 0 ? String(unreadNotifsCount) : undefined,
      badgeColor: "bg-pastel-sage text-sage-forest",
    },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ivory-warm">
      {/* 1. Desktop Persistent Sidebar */}
      <Sidebar />

      {/* 2. Main Workspace Layout (Locked h-screen flex-col so TopBar and Hamburger NEVER scroll down) */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        {/* Sticky Fixed Top Bar */}
        <TopBar
          pageTitle={pageTitle}
          onOpenAddEnquiry={() => setIsAddEnquiryOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Scrollable Page Body (Only this area scrolls) */}
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav onOpenAddEnquiry={() => setIsAddEnquiryOpen(true)} />
      </div>

      {/* 3. Mobile Slide-out Drawer Menu (Activated via Hamburger) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-ink-primary/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-ivory-soft p-5 shadow-floating border-r border-border">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <AurenLogoMark size={28} color="#4E5841" />
                <span className="font-display text-base font-bold tracking-[0.18em] text-ink-primary">
                  AUREN
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-ink-secondary hover:bg-ivory-muted hover:text-ink-primary"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Active Workspace Pill */}
            <div className="my-4 flex items-center gap-2.5 rounded-xl border border-beige-border bg-beige-warm p-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
                <Store className="h-3.5 w-3.5" />
              </div>
              <div className="truncate">
                <p className="truncate text-xs font-bold text-ink-primary">
                  {activeBusiness.name}
                </p>
                <p className="truncate text-[10px] text-ink-muted">
                  {activeBusiness.category}
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto pt-1">
              {mobileNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all",
                      isActive
                        ? "bg-pastel-sage/70 text-sage-forest shadow-subtle"
                        : "text-ink-secondary hover:bg-beige-warm hover:text-ink-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("h-4 w-4", isActive ? "text-sage-forest" : "text-ink-muted")} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", item.badgeColor)}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* 4. Global Add Enquiry Modal */}
      <AddEnquiryModal
        isOpen={isAddEnquiryOpen}
        onClose={() => setIsAddEnquiryOpen(false)}
      />
    </div>
  );
}
