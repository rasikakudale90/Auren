package com.auren.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExtractionDraft {
    private String channel;        // INSTAGRAM, WHATSAPP, FACEBOOK, EMAIL, MANUAL
    private String customerName;
    private String customerHandle;
    private String customerPhone;
    private String intent;         // ORDER, INQUIRY, PRICING, CUSTOMIZATION
    @Builder.Default
    private String urgency = "NORMAL"; // LOW, NORMAL, HIGH, URGENT
    private String rawText;
    private String summary;
    @Builder.Default
    private List<DetectedItem> detectedItems = new ArrayList<>();
    private String shippingAddress;
    @Builder.Default
    private Double confidenceScore = 0.95;
}
