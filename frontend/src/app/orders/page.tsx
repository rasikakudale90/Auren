"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  CreditCard,
  Plus,
  Printer,
  CheckCircle2,
  Calendar,
  Search,
  Filter,
  DollarSign,
  Truck,
  ArrowRight,
  X,
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
import { Order, OrderStatus, PaymentMethod, PaymentStatus } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";

const ORDER_STATUSES: (OrderStatus | "All")[] = [
  "All",
  "Pending",
  "Confirmed",
  "Processing",
  "Dispatched",
  "Delivered",
  "Cancelled",
];

export default function OrdersPage() {
  const { orders, recordPayment, updateOrderStatus, activeBusiness } = useWorkspace();
  const [selectedStatus, setSelectedStatus] = React.useState<OrderStatus | "All">("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Payment recording modal
  const [activePaymentOrder, setActivePaymentOrder] = React.useState<Order | null>(null);
  const [paymentAmount, setPaymentAmount] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("UPI");
  const [paymentRef, setPaymentRef] = React.useState("");

  // Receipt preview modal
  const [activeReceiptOrder, setActiveReceiptOrder] = React.useState<Order | null>(null);

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus =
      selectedStatus === "All" || ord.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      ord.orderReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentOrder || paymentAmount <= 0) return;

    recordPayment(
      activePaymentOrder.id,
      paymentAmount,
      paymentMethod,
      paymentRef || "Manual payment verified by owner"
    );

    setActivePaymentOrder(null);
    setPaymentAmount(0);
    setPaymentRef("");
  };

  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    updateOrderStatus(orderId, nextStatus);
  };

  return (
    <AppShell pageTitle="Orders & Payments">
      <div className="mb-6 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink-primary sm:text-2xl">
            Orders & Manual Payments
          </h2>
          <p className="mt-0.5 text-xs text-ink-secondary">
            Manage product fulfillment, customer delivery notes, and verified manual payments.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5 border-b border-border pb-3">
          {ORDER_STATUSES.map((st) => (
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
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-ink-muted" />
          <Input
            type="search"
            placeholder="Search by order ID or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => (
          <Card key={ord.id} className="transition-all hover:border-sage-accent/60">
            <CardContent className="p-5">
              {/* Order Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border/70 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-sage text-sage-forest font-bold text-xs">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-bold text-ink-primary font-mono">
                        {ord.orderReference}
                      </span>
                      <span className="text-xs text-ink-secondary">
                        • {ord.customerName}
                      </span>
                    </div>
                    <p className="text-[10px] text-ink-muted">
                      Created on {formatDate(ord.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      ord.paymentStatus === "Paid"
                        ? "paid"
                        : ord.paymentStatus === "Partially Paid"
                        ? "partiallyPaid"
                        : "unpaid"
                    }
                  >
                    {ord.paymentStatus}
                  </Badge>

                  <select
                    value={ord.status}
                    onChange={(e: any) =>
                      handleUpdateOrderStatus(ord.id, e.target.value)
                    }
                    className="rounded-md border border-border bg-ivory-warm px-2 py-0.5 text-xs text-ink-primary focus-visible:outline-none"
                  >
                    {ORDER_STATUSES.filter((s) => s !== "All").map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Order Items */}
              <div className="my-3 space-y-2">
                {ord.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-medium text-ink-primary">
                        {item.productName}
                      </span>
                      {item.variant && (
                        <span className="text-ink-muted ml-1.5">
                          ({item.variant})
                        </span>
                      )}
                      <span className="text-ink-muted ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-mono text-ink-secondary">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery & Notes */}
              {ord.deliveryAddress && (
                <div className="rounded-lg bg-ivory-warm p-2.5 text-xs text-ink-secondary border border-border/60">
                  <span className="font-semibold text-ink-primary">Delivery: </span>
                  {ord.deliveryAddress}
                </div>
              )}

              {/* Financial Breakdown & Actions Footer */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border/70 pt-3 text-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-ink-muted">Total: </span>
                    <strong className="text-ink-primary font-mono">
                      {formatCurrency(ord.totalAmount)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-ink-muted">Paid: </span>
                    <span className="font-semibold text-sage-forest font-mono">
                      {formatCurrency(ord.amountPaid)}
                    </span>
                  </div>
                  {ord.balanceDue > 0 && (
                    <div>
                      <span className="text-ink-muted">Balance: </span>
                      <span className="font-bold text-[#75342B] font-mono">
                        {formatCurrency(ord.balanceDue)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveReceiptOrder(ord)}
                    className="gap-1 text-xs"
                  >
                    <Printer className="h-3 w-3" />
                    <span>Receipt</span>
                  </Button>

                  {ord.balanceDue > 0 && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setActivePaymentOrder(ord);
                        setPaymentAmount(ord.balanceDue);
                      }}
                      className="gap-1.5 bg-sage-accent text-xs text-ivory-soft hover:bg-sage-hover"
                    >
                      <CreditCard className="h-3 w-3" />
                      <span>Record Payment</span>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Record Payment Dialog */}
      {activePaymentOrder && (
        <Dialog open={!!activePaymentOrder} onOpenChange={() => setActivePaymentOrder(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Record Customer Payment</DialogTitle>
              <DialogDescription>
                Manual owner recording for order {activePaymentOrder.orderReference}.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleRecordPayment} className="space-y-4 pt-2">
              <div className="rounded-lg bg-ivory-warm p-3 text-xs space-y-1">
                <p>
                  <strong>Total Order Amount:</strong> {formatCurrency(activePaymentOrder.totalAmount)}
                </p>
                <p className="text-[#75342B]">
                  <strong>Current Balance Due:</strong> {formatCurrency(activePaymentOrder.balanceDue)}
                </p>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-primary">
                  Amount Received (₹) *
                </label>
                <Input
                  type="number"
                  required
                  min="1"
                  max={activePaymentOrder.balanceDue}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                  className="mt-1 font-bold text-sage-forest"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-primary">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="mt-1 flex h-9 w-full rounded-md border border-border bg-ivory-soft px-3 py-1 text-xs text-ink-primary shadow-subtle focus-visible:outline-none"
                >
                  <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="Cash">Cash on Delivery / Handover</option>
                  <option value="Bank Transfer">Bank Transfer (NEFT / IMPS)</option>
                  <option value="Card">Card Swipe / POS</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-ink-primary">
                  Reference / Transaction Note
                </label>
                <Input
                  placeholder="e.g. UPI ref 439012948210"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActivePaymentOrder(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-sage-accent text-ivory-soft hover:bg-sage-hover"
                >
                  Save Payment Record
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Printable Receipt Preview Modal */}
      {activeReceiptOrder && (
        <Dialog open={!!activeReceiptOrder} onOpenChange={() => setActiveReceiptOrder(null)}>
          <DialogContent className="sm:max-w-md">
            <div className="p-4 border border-border rounded-xl bg-ivory-soft text-ink-primary space-y-4">
              <div className="text-center border-b border-border pb-3">
                <h3 className="font-display text-lg font-bold">Aura Studio & Crafts</h3>
                <p className="text-xs text-ink-muted">Order Payment Receipt</p>
                <p className="text-[10px] text-ink-muted font-mono mt-1">
                  Reference: {activeReceiptOrder.orderReference} • {formatDate(activeReceiptOrder.createdAt)}
                </p>
              </div>

              <div className="text-xs space-y-1">
                <p>
                  <strong>Customer:</strong> {activeReceiptOrder.customerName}
                </p>
                {activeReceiptOrder.customerPhone && (
                  <p>
                    <strong>Phone:</strong> {activeReceiptOrder.customerPhone}
                  </p>
                )}
              </div>

              <div className="divide-y divide-border text-xs border-y border-border py-2">
                {activeReceiptOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between py-1">
                    <span>
                      {it.productName} (x{it.quantity})
                    </span>
                    <span className="font-mono">{formatCurrency(it.lineTotal)}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span>{formatCurrency(activeReceiptOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-sage-forest">
                  <span>Total Amount Paid:</span>
                  <span>{formatCurrency(activeReceiptOrder.amountPaid)}</span>
                </div>
                <div className="flex justify-between text-[#75342B]">
                  <span>Remaining Balance:</span>
                  <span>{formatCurrency(activeReceiptOrder.balanceDue)}</span>
                </div>
              </div>

              <p className="text-[10px] text-center text-ink-muted italic border-t border-border pt-2">
                This is a computer-generated business receipt. Thank you for your support!
              </p>

              <div className="flex justify-center pt-2">
                <Button
                  onClick={() => window.print()}
                  size="sm"
                  className="gap-1.5 bg-sage-accent text-ivory-soft hover:bg-sage-hover text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Receipt</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AppShell>
  );
}
