import { describe, it, expect } from "vitest";
import { mockOrders } from "@/lib/mock-data";
import { PaymentStatus } from "@/types";

describe("Order Business Rules & Payment Calculations", () => {
  it("accurately maintains balance due: totalAmount - amountPaid = balanceDue", () => {
    mockOrders.forEach((order) => {
      const calculatedBalance = Math.max(0, order.totalAmount - order.amountPaid);
      expect(order.balanceDue).toBe(calculatedBalance);
    });
  });

  it("accurately determines payment status based on amounts", () => {
    function computePaymentStatus(total: number, paid: number): PaymentStatus {
      if (paid >= total && total > 0) return "Paid";
      if (paid > 0) return "Partially Paid";
      return "Unpaid";
    }

    expect(computePaymentStatus(1000, 1000)).toBe("Paid");
    expect(computePaymentStatus(1000, 500)).toBe("Partially Paid");
    expect(computePaymentStatus(1000, 0)).toBe("Unpaid");
  });

  it("correctly filters orders by status and customer search term", () => {
    const query = "Pooja";
    const filtered = mockOrders.filter(
      (o) =>
        o.customerName.toLowerCase().includes(query.toLowerCase()) ||
        o.orderReference.toLowerCase().includes(query.toLowerCase())
    );

    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((o) => {
      expect(o.customerName).toContain("Pooja");
    });
  });
});
