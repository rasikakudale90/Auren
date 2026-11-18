"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/top-bar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AddEnquiryModal } from "@/components/enquiries/add-enquiry-modal";

interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export function AppShell({ children, pageTitle }: AppShellProps) {
  const [activeBusinessId, setActiveBusinessId] = React.useState<string>("biz-1");
  const [isAddEnquiryOpen, setIsAddEnquiryOpen] = React.useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

  return (
    <div className="flex min-h-screen bg-ivory-warm">
      {/* 1. Desktop Persistent Sidebar */}
      <Sidebar
        activeBusinessId={activeBusinessId}
        onSelectBusiness={(id) => setActiveBusinessId(id)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky Top Bar */}
        <TopBar
          pageTitle={pageTitle}
          onOpenAddEnquiry={() => setIsAddEnquiryOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>

        {/* Mobile Navigation Bar */}
        <MobileNav onOpenAddEnquiry={() => setIsAddEnquiryOpen(true)} />
      </div>

      {/* 3. Global Add Enquiry Modal */}
      <AddEnquiryModal
        isOpen={isAddEnquiryOpen}
        onClose={() => setIsAddEnquiryOpen(false)}
      />
    </div>
  );
}
