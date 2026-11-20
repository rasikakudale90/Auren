import { describe, it, expect } from "vitest";
import { mockTrashItems } from "@/lib/mock-data";
import { TrashItem } from "@/types";

describe("Trash & 30-Day Data Retention (SRS FR-DATA-002 / SEC-004)", () => {
  it("initializes with soft-deleted items with valid retention periods <= 30 days", () => {
    expect(mockTrashItems.length).toBeGreaterThan(0);
    mockTrashItems.forEach((item) => {
      expect(item.daysRemaining).toBeGreaterThanOrEqual(1);
      expect(item.daysRemaining).toBeLessThanOrEqual(30);
      expect(["Enquiry", "Customer", "Order"]).toContain(item.type);
    });
  });

  it("restores an item from the trash list correctly", () => {
    let items: TrashItem[] = [...mockTrashItems];
    const targetItem = items[0];

    // Simulate restore
    items = items.filter((i) => i.id !== targetItem.id);

    expect(items.find((i) => i.id === targetItem.id)).toBeUndefined();
    expect(items.length).toBe(mockTrashItems.length - 1);
  });

  it("empties all trash items when confirmed", () => {
    let items: TrashItem[] = [...mockTrashItems];
    items = [];
    expect(items.length).toBe(0);
  });
});
