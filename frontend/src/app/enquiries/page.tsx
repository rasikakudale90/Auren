"use client";

import * as React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  Filter,
  Plus,
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Calendar,
  X,
  ExternalLink,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";
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
import { mockEnquiries, mockCustomers, mockProducts } from "@/lib/mock-data";
import { Enquiry, EnquiryStatus, SourceChannel } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const STATUSES: (EnquiryStatus | "All")[] = [
  "All",
  "New",
  "Replied",
  "Interested",
  "Waiting for Customer",
  "Converted",
  "Lost",
];

const CHANNELS: (SourceChannel | "All")[] = [
  "All",
  "Instagram",
  "WhatsApp",
  "Facebook",
  "Telegram",
  "Website",
];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = React.useState<Enquiry[]>(mockEnquiries);
  const [selectedStatus, setSelectedStatus] = React.useState<EnquiryStatus | "All">("All");
  const [selectedChannel, setSelectedChannel] = React.useState<SourceChannel | "All">("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeEnquiry, setActiveEnquiry] = React.useState<Enquiry | null>(null);

  // Convert to order modal state
  const [convertingEnquiry, setConvertingEnquiry] = React.useState<Enquiry | null>(null);
  const [orderQuantity, setOrderQuantity] = React.useState(1);
  const [orderAgreedPrice, setOrderAgreedPrice] = React.useState<number>(0);
  const [orderSuccess, setOrderSuccess] = React.useState(false);

  // Filter logic
  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus =
      selectedStatus === "All" || enq.status === selectedStatus;
    const matchesChannel =
      selectedChannel === "All" || enq.sourceChannel === selectedChannel;
    const matchesSearch =
      searchQuery === "" ||
      enq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (enq.customerHandle &&
        enq.customerHandle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (enq.productInterest &&
        enq.productInterest.toLowerCase().includes(searchQuery.toLowerCase())) ||
      enq.originalMessage.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesChannel && matchesSearch;
  });

  const handleUpdateStatus = (newStatus: EnquiryStatus) => {
    if (!activeEnquiry) return;
    const updated = enquiries.map((e) =>
      e.id === activeEnquiry.id ? { ...e, status: newStatus } : e
    );
    setEnquiries(updated);
    setActiveEnquiry({ ...activeEnquiry, status: newStatus });
  };

  const handleStartConversion = (enq: Enquiry) => {
    setConvertingEnquiry(enq);
    setOrderQuantity(enq.quantity || 1);
    setOrderAgreedPrice(enq.expectedValue || 1450);
  };

  const handleConfirmOrder = () => {
    if (!convertingEnquiry) return;
    setOrderSuccess(true);
    setTimeout(() => {
      // Mark enquiry as converted
      const updated = enquiries.map((e) =>
        e.id === convertingEnquiry.id ? { ...e, status: "Converted" as EnquiryStatus } : e
      );
      setEnquiries(updated);
      setOrderSuccess(false);
      setConvertingEnquiry(null);
      if (activeEnquiry?.id === convertingEnquiry.id) {
        setActiveEnquiry({ ...activeEnquiry, status: "Converted" });
      }
    }, 800);
  };

  return (
    <AppShell pageTitle="Enquiries">
      {/* 1. Header & Quick Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
              Customer Inquiries Directory
            </h2>
            <p className="mt-0.5 text-xs text-ink-secondary">
              Track and organize inquiries across Instagram DMs, WhatsApp, and Telegram.
            </p>
          </div>
        </div>

        {/* Status Tab Pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedStatus === st
                  ? "bg-sage-accent text-ivory-soft shadow-subtle"
                  : "bg-ivory-soft border border-border text-ink-secondary hover:bg-ivory-muted"
              }`}
            >
              {st}
              {st === "All" && ` (${enquiries.length})`}
            </button>
          ))}
        </div>

        {/* Search & Channel Filter */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-muted" />
            <Input
              type="search"
              placeholder="Search by customer, handle, product or chat text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-ink-muted">Channel:</span>
            <select
              value={selectedChannel}
              onChange={(e: any) => setSelectedChannel(e.target.value)}
              className="rounded-md border border-border bg-ivory-soft px-2.5 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sage-accent"
            >
              {CHANNELS.map((ch) => (
                <option key={ch} value={ch}>
                  {ch}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Enquiries List Grid */}
      {filteredEnquiries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-ivory-soft p-12 text-center">
          <MessageSquare className="mx-auto h-8 w-8 text-ink-muted" />
          <h3 className="mt-3 font-display text-sm font-semibold text-ink-primary">
            No inquiries match your filters
          </h3>
          <p className="mt-1 text-xs text-ink-secondary">
            Try clearing search queries or switching channel tabs.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEnquiries.map((enq) => (
            <Card
              key={enq.id}
              className="cursor-pointer transition-all hover:border-sage-accent/60 hover:shadow-subtle"
              onClick={() => setActiveEnquiry(enq)}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left: Customer Info */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pastel-sage text-sage-forest font-bold text-xs">
                      {enq.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display text-sm font-semibold text-ink-primary">
                          {enq.customerName}
                        </span>
                        {enq.customerHandle && (
                          <span className="text-xs text-ink-muted font-mono">
                            {enq.customerHandle}
                          </span>
                        )}
                        <span className="rounded bg-ivory-warm border border-border px-1.5 py-0.5 text-[10px] text-ink-secondary">
                          {enq.sourceChannel}
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        Received {formatDate(enq.receivedAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right: Badges & Quoted Value */}
                  <div className="flex items-center gap-2 self-start">
                    {enq.isAiExtracted && (
                      <span className="flex items-center gap-1 rounded bg-pastel-sage/70 px-2 py-0.5 text-[10px] font-semibold text-sage-forest">
                        <Sparkles className="h-3 w-3" />
                        <span>AI Draft</span>
                      </span>
                    )}
                    <Badge
                      variant={
                        enq.status === "New"
                          ? "new"
                          : enq.status === "Interested"
                          ? "interested"
                          : enq.status === "Converted"
                          ? "converted"
                          : enq.status === "Lost"
                          ? "lost"
                          : "replied"
                      }
                    >
                      {enq.status}
                    </Badge>
                  </div>
                </div>

                {/* Message Quote */}
                <p className="mt-3 text-xs text-ink-secondary bg-ivory-warm p-3 rounded-lg border border-border/70 italic line-clamp-2">
                  &ldquo;{enq.originalMessage}&rdquo;
                </p>

                {/* Footer Attributes */}
                <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3 text-xs">
                  <div className="flex items-center gap-3 text-ink-secondary">
                    <span>
                      Interest:{" "}
                      <strong className="text-ink-primary">
                        {enq.productInterest || "General Inquiry"}
                      </strong>
                    </span>
                    {enq.variant && (
                      <span className="text-ink-muted">
                        Variant: {enq.variant}
                      </span>
                    )}
                    {enq.quantity && (
                      <span className="text-ink-muted">Qty: {enq.quantity}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {enq.expectedValue && (
                      <span className="font-semibold text-sage-forest">
                        {formatCurrency(enq.expectedValue)}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveEnquiry(enq);
                      }}
                      className="font-medium text-sage-accent hover:underline"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 3. Enquiry Detail Drawer / Dialog */}
      {activeEnquiry && (
        <Dialog open={!!activeEnquiry} onOpenChange={() => setActiveEnquiry(null)}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <DialogTitle>{activeEnquiry.customerName}</DialogTitle>
                    <DialogDescription>
                      {activeEnquiry.customerHandle || "No handle"} • {activeEnquiry.sourceChannel}
                    </DialogDescription>
                  </div>
                </div>

                <Badge
                  variant={
                    activeEnquiry.status === "New"
                      ? "new"
                      : activeEnquiry.status === "Interested"
                      ? "interested"
                      : activeEnquiry.status === "Converted"
                      ? "converted"
                      : "replied"
                  }
                >
                  {activeEnquiry.status}
                </Badge>
              </div>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Original Message */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Original Customer Conversation
                </label>
                <div className="mt-1 rounded-lg border border-border bg-ivory-warm p-3 text-xs text-ink-secondary italic leading-relaxed">
                  &ldquo;{activeEnquiry.originalMessage}&rdquo;
                </div>
              </div>

              {/* Extracted Details Grid */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-ivory-soft p-3.5 text-xs">
                <div>
                  <span className="text-ink-muted">Product Interest:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeEnquiry.productInterest || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Variant:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeEnquiry.variant || "Standard"}
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Quantity:</span>
                  <p className="font-semibold text-ink-primary">
                    {activeEnquiry.quantity || 1}
                  </p>
                </div>
                <div>
                  <span className="text-ink-muted">Estimated / Quoted Value:</span>
                  <p className="font-semibold text-sage-forest">
                    {activeEnquiry.expectedValue
                      ? formatCurrency(activeEnquiry.expectedValue)
                      : "Not quoted"}
                  </p>
                </div>
              </div>

              {/* Status Updater */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Update Enquiry Status
                </label>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {(["New", "Replied", "Interested", "Waiting for Customer", "Converted", "Lost"] as EnquiryStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateStatus(st)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${
                          activeEnquiry.status === st
                            ? "bg-sage-accent text-ivory-soft"
                            : "border border-border bg-ivory-soft text-ink-secondary hover:bg-ivory-muted"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="text-xs font-semibold text-ink-primary">
                  Internal Notes & Delivery Location
                </label>
                <p className="mt-1 text-xs text-ink-secondary bg-ivory-warm p-2.5 rounded-md border border-border">
                  {activeEnquiry.messageNotes || "No notes recorded yet."}
                </p>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-t border-border pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveEnquiry(null)}
                  className="text-xs"
                >
                  Close
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleStartConversion(activeEnquiry)}
                    size="sm"
                    className="gap-1.5 bg-sage-accent text-xs text-ivory-soft hover:bg-sage-hover"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Convert to Order</span>
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* 4. Convert Enquiry to Order Modal (Direct carry-over) */}
      {convertingEnquiry && (
        <Dialog open={!!convertingEnquiry} onOpenChange={() => setConvertingEnquiry(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <DialogTitle>Create Confirmed Order</DialogTitle>
                  <DialogDescription>
                    Convert enquiry into an order without re-entering customer details.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {orderSuccess ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-sage-forest" />
                <h3 className="mt-3 font-display text-base font-bold text-ink-primary">
                  Order Created Successfully!
                </h3>
                <p className="mt-1 text-xs text-ink-secondary">
                  The enquiry has been marked as Converted and linked to the new order.
                </p>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="rounded-lg border border-border bg-ivory-warm p-3 text-xs">
                  <p className="font-semibold text-ink-primary">
                    Customer: {convertingEnquiry.customerName}
                  </p>
                  <p className="text-ink-muted">
                    Channel: {convertingEnquiry.sourceChannel} • {convertingEnquiry.customerHandle || "Direct"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-ink-primary">
                      Product Name
                    </label>
                    <Input
                      value={convertingEnquiry.productInterest || "Custom Product"}
                      readOnly
                      className="mt-1 bg-ivory-warm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-ink-primary">
                        Quantity
                      </label>
                      <Input
                        type="number"
                        min="1"
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(parseInt(e.target.value) || 1)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-ink-primary">
                        Agreed Total Price (₹)
                      </label>
                      <Input
                        type="number"
                        value={orderAgreedPrice}
                        onChange={(e) => setOrderAgreedPrice(parseFloat(e.target.value) || 0)}
                        className="mt-1 font-semibold text-sage-forest"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 border-t border-border pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setConvertingEnquiry(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmOrder}
                    size="sm"
                    className="gap-1.5 bg-sage-accent text-ivory-soft hover:bg-sage-hover"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Confirm & Create Order</span>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
