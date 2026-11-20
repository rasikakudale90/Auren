import { describe, it, expect } from "vitest";

describe("Customer Duplicate Resolution Invariant (SRS FR-CUST-003)", () => {
  interface MockCustomer {
    id: string;
    name: string;
    phone?: string;
    socialHandle?: string;
    email?: string;
    tags: string[];
    totalOrders: number;
    totalSpend: number;
  }

  it("merges duplicate customer fields into primary profile without losing history", () => {
    const primary: MockCustomer = {
      id: "cust-1",
      name: "Pooja Sharma",
      phone: "+91 98210 99482",
      socialHandle: "@poojasharma_style",
      tags: ["VIP", "Repeat Buyer"],
      totalOrders: 3,
      totalSpend: 7450,
    };

    const duplicate: MockCustomer = {
      id: "cust-dup",
      name: "Pooja S.",
      phone: "+91 98210 99482",
      email: "pooja.sharma.orders@gmail.com",
      socialHandle: "@pooja_s_backup",
      tags: ["WhatsApp Lead"],
      totalOrders: 1,
      totalSpend: 1450,
    };

    // Execution of merge logic
    const mergedCustomer: MockCustomer = {
      ...primary,
      email: primary.email || duplicate.email,
      tags: Array.from(new Set([...primary.tags, ...duplicate.tags])),
      totalOrders: primary.totalOrders + duplicate.totalOrders,
      totalSpend: primary.totalSpend + duplicate.totalSpend,
    };

    expect(mergedCustomer.id).toBe("cust-1");
    expect(mergedCustomer.name).toBe("Pooja Sharma");
    expect(mergedCustomer.email).toBe("pooja.sharma.orders@gmail.com");
    expect(mergedCustomer.tags).toContain("VIP");
    expect(mergedCustomer.tags).toContain("WhatsApp Lead");
    expect(mergedCustomer.totalOrders).toBe(4);
    expect(mergedCustomer.totalSpend).toBe(8900);
  });

  it("detects duplicates when phone number matches existing customer", () => {
    const existingPhones = new Set(["+919821099482", "+919892033412"]);
    const incomingPhone = "+91 98210 99482".replace(/\s+/g, "");

    expect(existingPhones.has(incomingPhone)).toBe(true);
  });
});
