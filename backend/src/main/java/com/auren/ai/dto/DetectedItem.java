package com.auren.ai.dto;

import java.math.BigDecimal;

public class DetectedItem {
    private String name;
    private Integer quantity = 1;
    private BigDecimal estimatedPrice;
    private String notes;

    public DetectedItem() {}

    public DetectedItem(String name, Integer quantity, BigDecimal estimatedPrice, String notes) {
        this.name = name;
        this.quantity = quantity != null ? quantity : 1;
        this.estimatedPrice = estimatedPrice;
        this.notes = notes;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public BigDecimal getEstimatedPrice() { return estimatedPrice; }
    public void setEstimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public static DetectedItemBuilder builder() { return new DetectedItemBuilder(); }

    public static class DetectedItemBuilder {
        private String name;
        private Integer quantity = 1;
        private BigDecimal estimatedPrice;
        private String notes;

        public DetectedItemBuilder name(String name) { this.name = name; return this; }
        public DetectedItemBuilder quantity(Integer quantity) { this.quantity = quantity; return this; }
        public DetectedItemBuilder estimatedPrice(BigDecimal estimatedPrice) { this.estimatedPrice = estimatedPrice; return this; }
        public DetectedItemBuilder notes(String notes) { this.notes = notes; return this; }

        public DetectedItem build() {
            return new DetectedItem(name, quantity, estimatedPrice, notes);
        }
    }
}
