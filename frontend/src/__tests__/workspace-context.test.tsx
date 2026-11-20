import React from "react";
import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WorkspaceProvider, useWorkspace } from "@/context/workspace-context";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <WorkspaceProvider>{children}</WorkspaceProvider>
);

describe("WorkspaceContext & Multi-Business Isolation", () => {
  it("initializes with active business biz-1 (Aura Studio & Crafts)", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    expect(result.current.activeBusinessId).toBe("biz-1");
    expect(result.current.activeBusiness.name).toBe("Aura Studio & Crafts");
    expect(result.current.enquiries.length).toBeGreaterThan(0);
    expect(result.current.products.length).toBeGreaterThan(0);
  });

  it("switches business to biz-2 (Loom & Linen Apparel) and isolates dataset", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });

    act(() => {
      result.current.setActiveBusinessId("biz-2");
    });

    expect(result.current.activeBusinessId).toBe("biz-2");
    expect(result.current.activeBusiness.name).toBe("Loom & Linen Apparel");
    // All returned enquiries and products must belong exclusively to biz-2
    expect(result.current.enquiries.every((e) => e.businessId === "biz-2")).toBe(true);
    expect(result.current.products.every((p) => p.businessId === "biz-2")).toBe(true);
    expect(result.current.orders.every((o) => o.businessId === "biz-2")).toBe(true);
  });

  it("creates a new enquiry and records it in workspace state", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });

    act(() => {
      result.current.setActiveBusinessId("biz-1");
    });

    const initialCount = result.current.enquiries.length;

    act(() => {
      result.current.addEnquiry({
        customerName: "Maya Kapoor",
        sourceChannel: "Instagram",
        productInterest: "Handcrafted Ceramic Vase",
        expectedValue: 1450,
      });
    });

    expect(result.current.enquiries.length).toBe(initialCount + 1);
    expect(result.current.enquiries[0].customerName).toBe("Maya Kapoor");
    expect(result.current.enquiries[0].status).toBe("New");
  });

  it("converts an enquiry to an order and marks enquiry status as Converted", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });

    let targetEnquiryId = "";
    act(() => {
      const enq = result.current.addEnquiry({
        customerName: "Samir Khan",
        sourceChannel: "WhatsApp",
        productInterest: "Custom Soy Wax Candle",
        expectedValue: 1300,
      });
      targetEnquiryId = enq.id;
    });

    const initialOrderCount = result.current.orders.length;

    act(() => {
      result.current.convertEnquiryToOrder(targetEnquiryId, {
        items: [
          {
            productId: "prod-2",
            productName: "Custom Soy Wax Candle",
            quantity: 2,
            unitPrice: 650,
            lineTotal: 1300,
          },
        ],
        deliveryCharge: 100,
        initialPayment: {
          amount: 500,
          method: "UPI",
          referenceNote: "Advance UPI",
        },
      });
    });

    // Check order created
    expect(result.current.orders.length).toBe(initialOrderCount + 1);
    const createdOrder = result.current.orders[0];
    expect(createdOrder.totalAmount).toBe(1400); // 1300 + 100
    expect(createdOrder.amountPaid).toBe(500);
    expect(createdOrder.balanceDue).toBe(900);
    expect(createdOrder.paymentStatus).toBe("Partially Paid");

    // Check enquiry updated
    const updatedEnquiry = result.current.enquiries.find((e) => e.id === targetEnquiryId);
    expect(updatedEnquiry?.status).toBe("Converted");
  });

  it("records balance payment on an order and updates paymentStatus to Paid", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });
    const orderToPay = result.current.orders.find((o) => o.balanceDue > 0);

    if (orderToPay) {
      const remainingBalance = orderToPay.balanceDue;
      act(() => {
        result.current.recordPayment(orderToPay.id, remainingBalance, "Cash", "Cleared at counter");
      });

      const updatedOrder = result.current.orders.find((o) => o.id === orderToPay.id);
      expect(updatedOrder?.balanceDue).toBe(0);
      expect(updatedOrder?.paymentStatus).toBe("Paid");
    }
  });

  it("toggles to empty state mode and returns 0 records for fresh seller demo", () => {
    const { result } = renderHook(() => useWorkspace(), { wrapper });

    act(() => {
      result.current.setIsDemoMode(false);
    });

    expect(result.current.isDemoMode).toBe(false);
    expect(result.current.enquiries.length).toBe(0);
    expect(result.current.customers.length).toBe(0);
    expect(result.current.orders.length).toBe(0);
    expect(result.current.products.length).toBe(0);
    expect(result.current.followUps.length).toBe(0);
  });
});
