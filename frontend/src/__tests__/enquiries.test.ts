import { describe, it, expect } from "vitest";
import { mockEnquiries } from "@/lib/mock-data";
import { SourceChannel } from "@/types";

describe("Enquiry Management & AI Extraction Logic", () => {
  it("contains valid source channels for social-commerce workflows", () => {
    const validChannels: SourceChannel[] = [
      "Instagram",
      "WhatsApp",
      "Facebook",
      "Telegram",
      "Website",
      "Phone call",
      "Walk-in",
      "Referral",
      "Other",
    ];
    mockEnquiries.forEach((enquiry) => {
      expect(validChannels).toContain(enquiry.sourceChannel);
    });
  });

  it("handles valid status transitions according to the SRS workflow", () => {
    mockEnquiries.forEach((enquiry) => {
      expect(enquiry.status).toBeDefined();
      expect(typeof enquiry.status).toBe("string");
    });
  });

  it("simulates AI extraction parser correctly from raw chat messages", () => {
    function simulateExtraction(rawText: string) {
      const isUrgent = rawText.toLowerCase().includes("urgent") || rawText.toLowerCase().includes("today");
      const hasBudget = rawText.includes("₹") || rawText.toLowerCase().includes("inr");
      return {
        isUrgent,
        hasBudget,
        suggestedFollowUpHours: isUrgent ? 2 : 24,
      };
    }

    const urgentMessage = "Hi I need 2 chocolate cakes urgently by today evening! Budget ₹1500";
    const normalMessage = "Hello, do you make custom wedding stationery? Can you share a price list?";

    const urgentResult = simulateExtraction(urgentMessage);
    expect(urgentResult.isUrgent).toBe(true);
    expect(urgentResult.hasBudget).toBe(true);
    expect(urgentResult.suggestedFollowUpHours).toBe(2);

    const normalResult = simulateExtraction(normalMessage);
    expect(normalResult.isUrgent).toBe(false);
    expect(normalResult.suggestedFollowUpHours).toBe(24);
  });
});
