package com.auren.ai.dto;

import java.util.ArrayList;
import java.util.List;

public class ExtractionDraft {
    private String channel;
    private String customerName;
    private String customerHandle;
    private String customerPhone;
    private String intent;
    private String urgency = "NORMAL";
    private String rawText;
    private String summary;
    private List<DetectedItem> detectedItems = new ArrayList<>();
    private String shippingAddress;
    private Double confidenceScore = 0.95;

    public ExtractionDraft() {}

    public ExtractionDraft(String channel, String customerName, String customerHandle, String customerPhone, String intent, String urgency, String rawText, String summary, List<DetectedItem> detectedItems, String shippingAddress, Double confidenceScore) {
        this.channel = channel;
        this.customerName = customerName;
        this.customerHandle = customerHandle;
        this.customerPhone = customerPhone;
        this.intent = intent;
        this.urgency = urgency != null ? urgency : "NORMAL";
        this.rawText = rawText;
        this.summary = summary;
        this.detectedItems = detectedItems != null ? detectedItems : new ArrayList<>();
        this.shippingAddress = shippingAddress;
        this.confidenceScore = confidenceScore != null ? confidenceScore : 0.95;
    }

    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerHandle() { return customerHandle; }
    public void setCustomerHandle(String customerHandle) { this.customerHandle = customerHandle; }

    public String getCustomerPhone() { return customerPhone; }
    public void setCustomerPhone(String customerPhone) { this.customerPhone = customerPhone; }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getRawText() { return rawText; }
    public void setRawText(String rawText) { this.rawText = rawText; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public List<DetectedItem> getDetectedItems() { return detectedItems; }
    public void setDetectedItems(List<DetectedItem> detectedItems) { this.detectedItems = detectedItems; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public Double getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; }

    public static ExtractionDraftBuilder builder() { return new ExtractionDraftBuilder(); }

    public static class ExtractionDraftBuilder {
        private String channel;
        private String customerName;
        private String customerHandle;
        private String customerPhone;
        private String intent;
        private String urgency = "NORMAL";
        private String rawText;
        private String summary;
        private List<DetectedItem> detectedItems = new ArrayList<>();
        private String shippingAddress;
        private Double confidenceScore = 0.95;

        public ExtractionDraftBuilder channel(String channel) { this.channel = channel; return this; }
        public ExtractionDraftBuilder customerName(String customerName) { this.customerName = customerName; return this; }
        public ExtractionDraftBuilder customerHandle(String customerHandle) { this.customerHandle = customerHandle; return this; }
        public ExtractionDraftBuilder customerPhone(String customerPhone) { this.customerPhone = customerPhone; return this; }
        public ExtractionDraftBuilder intent(String intent) { this.intent = intent; return this; }
        public ExtractionDraftBuilder urgency(String urgency) { this.urgency = urgency; return this; }
        public ExtractionDraftBuilder rawText(String rawText) { this.rawText = rawText; return this; }
        public ExtractionDraftBuilder summary(String summary) { this.summary = summary; return this; }
        public ExtractionDraftBuilder detectedItems(List<DetectedItem> detectedItems) { this.detectedItems = detectedItems; return this; }
        public ExtractionDraftBuilder shippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; return this; }
        public ExtractionDraftBuilder confidenceScore(Double confidenceScore) { this.confidenceScore = confidenceScore; return this; }

        public ExtractionDraft build() {
            return new ExtractionDraft(channel, customerName, customerHandle, customerPhone, intent, urgency, rawText, summary, detectedItems, shippingAddress, confidenceScore);
        }
    }
}
