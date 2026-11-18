"use client";

import * as React from "react";
import Link from "next/link";
import {
  MessageSquare,
  ShoppingBag,
  Clock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Phone,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  mockEnquiries,
  mockOrders,
  mockFollowUps,
  mockCustomers,
  mockBusinesses,
} from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DashboardPage() {
  const currentBiz = mockBusinesses[0];

  // Metrics calculations
  const totalEnquiries = mockEnquiries.length;
  const activeOrders = mockOrders.filter(
    (o) => o.status !== "Delivered" && o.status !== "Cancelled"
  ).length;
  const dueFollowUps = mockFollowUps.filter((f) => f.status === "Pending").length;
  const totalRevenue = mockOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.amountPaid, 0);

  const pendingPayments = mockOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.balanceDue, 0);

  return (
    <AppShell pageTitle="Dashboard">
      {/* 1. Header Banner */}
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-border bg-gradient-to-r from-pastel-sage/50 via-ivory-soft to-ivory-soft p-6 shadow-subtle sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
              Welcome back, Rasika
            </span>
            <span className="rounded-full bg-pastel-sage px-2.5 py-0.5 text-[10px] font-bold text-sage-forest">
              {currentBiz.name}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-secondary">
            Here&apos;s your daily operational overview. You have{" "}
            <span className="font-semibold text-sage-forest">1 follow-up due today</span> and 2 orders in progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/enquiries"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-ivory-soft px-3.5 py-2 text-xs font-medium text-ink-primary shadow-subtle transition-colors hover:bg-ivory-muted"
          >
            <MessageSquare className="h-3.5 w-3.5 text-sage-accent" />
            <span>Review Inquiries</span>
          </Link>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 rounded-lg bg-sage-accent px-3.5 py-2 text-xs font-medium text-ivory-soft shadow-subtle transition-colors hover:bg-sage-hover"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Operational Metrics Grid (Storeflow Inspired) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Card 1: Enquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Total Inquiries
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-blue text-[#2C4857]">
              <MessageSquare className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink-primary font-display">
              {totalEnquiries}
            </div>
            <p className="mt-1 text-[11px] text-ink-secondary flex items-center gap-1">
              <span className="font-semibold text-sage-forest">+3 today</span>
              <span>across Instagram & WhatsApp</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Active Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Active Orders
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink-primary font-display">
              {activeOrders}
            </div>
            <p className="mt-1 text-[11px] text-ink-secondary">
              1 processing • 1 confirmed
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Due Follow-ups */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Pending Follow-ups
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-blush text-[#75342B]">
              <Clock className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink-primary font-display">
              {dueFollowUps}
            </div>
            <p className="mt-1 text-[11px] text-[#75342B] font-semibold flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              <span>1 requires action today</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Collected Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              Collected Revenue
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-butter text-[#5C4A1A]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink-primary font-display">
              {formatCurrency(totalRevenue)}
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">
              {pendingPayments > 0
                ? `${formatCurrency(pendingPayments)} balance pending`
                : "All confirmed orders paid"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Dashboard Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols): Recent Inquiries Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle>Recent Customer Inquiries</CardTitle>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Latest messages across Instagram, WhatsApp, and Telegram.
                </p>
              </div>
              <Link
                href="/enquiries"
                className="text-xs font-semibold text-sage-accent hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>

            <CardContent className="space-y-3">
              {mockEnquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="rounded-xl border border-border bg-ivory-soft p-4 transition-all hover:bg-ivory-muted/40 hover:shadow-subtle"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pastel-sage text-sage-forest text-xs font-bold">
                        {enq.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-ink-primary">
                            {enq.customerName}
                          </span>
                          {enq.customerHandle && (
                            <span className="text-[11px] text-ink-muted">
                              {enq.customerHandle}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-ink-muted">
                          via {enq.sourceChannel} • {formatDate(enq.receivedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {enq.isAiExtracted && (
                        <span
                          title="Extracted with Gemini AI"
                          className="flex items-center gap-1 rounded bg-pastel-sage/60 px-1.5 py-0.5 text-[10px] font-medium text-sage-forest"
                        >
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
                            : "replied"
                        }
                      >
                        {enq.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Message Quote */}
                  <p className="mt-2 text-xs text-ink-secondary line-clamp-2 italic bg-ivory-warm p-2 rounded-lg border border-border/60">
                    &ldquo;{enq.originalMessage}&rdquo;
                  </p>

                  {/* Product Tag & Quoted Amount */}
                  <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-ink-secondary">
                      <span className="font-medium text-ink-primary">
                        {enq.productInterest || "General Inquiry"}
                      </span>
                      {enq.variant && (
                        <span className="text-[10px] text-ink-muted">
                          ({enq.variant})
                        </span>
                      )}
                    </div>
                    {enq.expectedValue && (
                      <span className="font-semibold text-sage-forest">
                        {formatCurrency(enq.expectedValue)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Orders Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle>Active Orders Pipeline</CardTitle>
                <p className="text-xs text-ink-secondary mt-0.5">
                  Orders requiring preparation, packing, or delivery.
                </p>
              </div>
              <Link
                href="/orders"
                className="text-xs font-semibold text-sage-accent hover:underline flex items-center gap-1"
              >
                <span>View Orders</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </CardHeader>

            <CardContent>
              <div className="divide-y divide-border rounded-xl border border-border bg-ivory-warm">
                {mockOrders.slice(0, 3).map((ord) => (
                  <div
                    key={ord.id}
                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-ink-primary font-mono">
                          {ord.orderReference}
                        </span>
                        <span className="text-ink-secondary">• {ord.customerName}</span>
                      </div>
                      <p className="text-[11px] text-ink-muted mt-0.5">
                        {ord.items.map((it) => `${it.productName} (x${it.quantity})`).join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-ink-primary">
                          {formatCurrency(ord.totalAmount)}
                        </p>
                        <Badge
                          variant={
                            ord.paymentStatus === "Paid"
                              ? "paid"
                              : ord.paymentStatus === "Partially Paid"
                              ? "partiallyPaid"
                              : "unpaid"
                          }
                          className="text-[10px]"
                        >
                          {ord.paymentStatus}
                        </Badge>
                      </div>

                      <Badge
                        variant={
                          ord.status === "Delivered"
                            ? "converted"
                            : ord.status === "Processing"
                            ? "interested"
                            : "new"
                        }
                      >
                        {ord.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 Col): Urgent Follow-ups & AI Quota */}
        <div className="space-y-6">
          {/* Urgent Follow-ups */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-sage-accent" />
                <span>Follow-ups Requiring Attention</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockFollowUps
                .filter((f) => f.status === "Pending")
                .map((fup) => {
                  const isDueToday = fup.dueAt.includes("2026-11-18");
                  return (
                    <div
                      key={fup.id}
                      className="rounded-xl border border-border bg-ivory-warm p-3.5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ink-primary">
                          {fup.customerName}
                        </span>
                        <Badge variant={isDueToday ? "dueToday" : "upcoming"}>
                          {isDueToday ? "Due Today" : "Upcoming"}
                        </Badge>
                      </div>
                      <p className="text-xs text-ink-secondary leading-normal">
                        {fup.note}
                      </p>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-ink-muted">
                        <span>via {fup.sourceChannel}</span>
                        <Link
                          href="/follow-ups"
                          className="font-semibold text-sage-accent hover:underline"
                        >
                          Open & Respond
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>

          {/* Quick Reply Shortcuts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Canned Replies</CardTitle>
              <p className="text-xs text-ink-secondary">
                1-click copy templates for Instagram & WhatsApp chats.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="rounded-lg border border-border bg-ivory-warm p-2.5 text-xs">
                <p className="font-semibold text-ink-primary">Ceramic Vase Pricing</p>
                <p className="mt-0.5 text-[11px] text-ink-secondary truncate">
                  &ldquo;Hi! Our Ceramic Vases are ₹1,450 each. Dimensions: 8 inches...&rdquo;
                </p>
              </div>
              <div className="rounded-lg border border-border bg-ivory-warm p-2.5 text-xs">
                <p className="font-semibold text-ink-primary">Shipping Timeline</p>
                <p className="mt-0.5 text-[11px] text-ink-secondary truncate">
                  &ldquo;Hello! We ship across India. Standard delivery takes 3–5 days...&rdquo;
                </p>
              </div>
              <Link
                href="/quick-replies"
                className="block text-center text-xs font-medium text-sage-accent hover:underline pt-2"
              >
                View all templates →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
