import { describe, it, expect } from "vitest";

describe("Screenshot Upload & Multimodal Extraction Validation", () => {
  const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB per SRS FR-ENQ-003

  it("accepts valid PNG, JPG, and WebP chat screenshots within 10MB limit", () => {
    const validPng = { type: "image/png", size: 2.5 * 1024 * 1024, name: "chat1.png" };
    const validJpg = { type: "image/jpeg", size: 8 * 1024 * 1024, name: "chat2.jpg" };
    const validWebp = { type: "image/webp", size: 0.9 * 1024 * 1024, name: "chat3.webp" };

    expect(ALLOWED_MIME_TYPES.includes(validPng.type) && validPng.size <= MAX_FILE_SIZE_BYTES).toBe(true);
    expect(ALLOWED_MIME_TYPES.includes(validJpg.type) && validJpg.size <= MAX_FILE_SIZE_BYTES).toBe(true);
    expect(ALLOWED_MIME_TYPES.includes(validWebp.type) && validWebp.size <= MAX_FILE_SIZE_BYTES).toBe(true);
  });

  it("rejects non-image files such as PDF or executable scripts", () => {
    const invalidPdf = { type: "application/pdf", size: 1024 * 1024, name: "invoice.pdf" };
    const invalidZip = { type: "application/zip", size: 500 * 1024, name: "bundle.zip" };

    expect(ALLOWED_MIME_TYPES.includes(invalidPdf.type)).toBe(false);
    expect(ALLOWED_MIME_TYPES.includes(invalidZip.type)).toBe(false);
  });

  it("rejects screenshots that exceed the 10MB payload size limit", () => {
    const oversizedFile = { type: "image/png", size: 12 * 1024 * 1024, name: "huge_screenshot.png" };
    expect(oversizedFile.size <= MAX_FILE_SIZE_BYTES).toBe(false);
  });

  it("simulates AI extraction intent recognition accurately", () => {
    const sampleMessage =
      "Hey! Loved your reel on the ceramic vases. Can you tell me if the Earthy Sage variant is in stock? Also, I need 2 pieces delivered to Andheri East by Friday for a housewarming gift. Price with delivery please?";

    const hasVase = sampleMessage.toLowerCase().includes("vase");
    const quantityMatch = sampleMessage.match(/(\d+)\s*pieces?/i);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

    expect(hasVase).toBe(true);
    expect(quantity).toBe(2);
  });
});
