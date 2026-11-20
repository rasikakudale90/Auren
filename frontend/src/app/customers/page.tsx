"use client";

import * as React from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Tag,
  Phone,
  Mail,
  Instagram,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useWorkspace } from "@/context/workspace-context";
import { Customer } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function CustomersPage() {
  const { customers, orders, resolveCustomerDuplicate } = useWorkspace();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string>("All");
  const [activeCustomer, setActiveCustomer] = React.useState<Customer | null>(null);

  // Duplicate warning state
  const [showDuplicateBanner, setShowDuplicateBanner] = React.useState(true);

  // All unique tags
  const allTags = ["All", ...Array.from(new Set(customers.flatMap((c) => c.tags)))];

  const filteredCustomers = customers.filter((cust) => {
    const matchesTag = selectedTag === "All" || cust.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery === "" ||
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cust.socialHandle &&
        cust.socialHandle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (cust.phone && cust.phone.includes(searchQuery));

    return matchesTag && matchesSearch;
  });

  return (
    <AppShell pageTitle="Customers">
      {/* 1. Page Header */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
              Customer Directory
            </h2>
            <p className="mt-0.5 text-xs text-ink-secondary">
              Maintain customer records, contact references, and complete inquiry/purchase histories.
            </p>
          </div>
        </div>

        {/* Potential Duplicate Banner (SRS Requirement FR-CUST-003) */}
        {showDuplicateBanner && (
          <div className="flex items-center justify-between rounded-xl border border-[#E8DFC2] bg-pastel-butter/60 p-3.5 text-xs text-[#5C4A1A]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0 text-[#8F6B12]" />
              <span>
                <strong>Duplicate match suggested:</strong> A new enquiry from WhatsApp shares phone number <code>+91 98210 99482</code> with existing customer <strong>Pooja Sharma</strong>.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowDuplicateBanner(false)}
                className="font-semibold text-sage-forest underline hover:text-ink-primary"
              >
                Review & Link
              </button>
              <button
                type="button"
                onClick={() => setShowDuplicateBanner(false)}
                className="text-ink-muted hover:text-ink-primary"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedTag === tag
                  ? "bg-sage-accent text-ivory-soft shadow-subtle"
                  : "bg-ivory-soft border border-border text-ink-secondary hover:bg-ivory-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-muted" />
          <Input
            type="search"
            placeholder="Search by customer name, Instagram handle, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* 2. Customer Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((cust) => (
          <Card
            key={cust.id}
            className="cursor-pointer transition-all hover:border-sage-accent/60 hover:shadow-subtle"
            onClick={() => setActiveCustomer(cust)}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pastel-sage text-sage-forest font-bold text-sm">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-ink-primary">
                      {cust.name}
                    </h3>
                    {cust.socialHandle && (
                      <p className="text-xs text-ink-muted font-mono">
                        {cust.socialHandle}
                      </p>
                    )}
                  </div>
                </div>

                <Badge variant="outline" className="text-[10px]">
                  {cust.channel || "Multi-channel"}
                </Badge>
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1">
                {cust.tags.map((t) => {
                  const isVip = t.toLowerCase().includes("vip") || t.toLowerCase().includes("high value");
                  return (
                    <span
                      key={t}
                      className={
                        isVip
                          ? "rounded border border-burgundy-border bg-burgundy-subtle px-2 py-0.5 text-[10px] font-semibold text-burgundy-deep"
                          : "rounded border border-beige-border bg-beige-warm px-2 py-0.5 text-[10px] font-medium text-ink-primary"
                      }
                    >
                      {t}
                    </span>
                  );
                })}
              </div>

              {/* Notes */}
              {cust.notes && (
                <p className="mt-3 text-xs text-ink-secondary line-clamp-2 bg-ivory-warm p-2 rounded-md border border-border/60">
                  {cust.notes}
                </p>
              )}

              {/* Stats Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-ink-secondary">
                <div className="flex items-center gap-3">
                  <span>
                    <strong>{cust.totalOrders}</strong> orders
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{cust.totalEnquiries}</strong> inquiries
                  </span>
                </div>
                <span className="font-semibold text-sage-forest">
                  {formatCurrency(cust.totalSpend)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Customer Detail Dialog */}
      {activeCustomer && (
        <Dialog open={!!activeCustomer} onOpenChange={() => setActiveCustomer(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pastel-sage text-sage-forest font-bold text-base">
                  {activeCustomer.name.charAt(0)}
                </div>
                <div>
                  <DialogTitle>{activeCustomer.name}</DialogTitle>
                  <DialogDescription>
                    {activeCustomer.socialHandle || "Direct contact"} • Customer since{" "}
                    {formatDate(activeCustomer.createdAt)}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Contact info grid */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-ivory-warm p-3.5 text-xs">
                <div>
                  <span className="text-ink-muted">Phone Number:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeCustomer.phone || "Not recorded"}
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Email:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeCustomer.email || "Not recorded"}
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Total Inquiries:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeCustomer.totalEnquiries} inquiries
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Total Verified Spend:</span>
                  <p className="font-semibold text-sage-forest">
                    {formatCurrency(activeCustomer.totalSpend)}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Customer Tags
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {activeCustomer.tags.map((t) => (
                    <Badge key={t} variant="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Customer Notes */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Owner Notes
                </label>
                <p className="mt-1 rounded-lg border border-border bg-ivory-soft p-3 text-xs text-ink-secondary">
                  {activeCustomer.notes || "No specific customer notes added."}
                </p>
              </div>

              {/* Linked Orders History */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Order History ({activeCustomer.totalOrders})
                </label>
                <div className="mt-1.5 divide-y divide-border rounded-lg border border-border bg-ivory-warm">
                  {orders
                    .filter((o) => o.customerId === activeCustomer.id)
                    .map((ord) => (
                      <div
                        key={ord.id}
                        className="flex items-center justify-between p-3 text-xs"
                      >
                        <div>
                          <p className="font-semibold text-ink-primary font-mono">
                            {ord.orderReference}
                          </p>
                          <p className="text-[11px] text-ink-muted">
                            {formatDate(ord.createdAt)} • {ord.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sage-forest">
                            {formatCurrency(ord.totalAmount)}
                          </p>
                          <span className="text-[10px] text-ink-muted">
                            {ord.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  {orders.filter((o) => o.customerId === activeCustomer.id).length ===
                    0 && (
                    <p className="p-3 text-xs text-ink-muted">
                      No orders confirmed yet for this customer.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end border-t border-border pt-3">
                <Button variant="outline" size="sm" onClick={() => setActiveCustomer(null)}>
                  Close Profile
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
