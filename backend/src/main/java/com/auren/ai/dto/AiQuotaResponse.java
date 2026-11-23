package com.auren.ai.dto;

public class AiQuotaResponse {
    private int monthlyLimit;
    private int used;
    private int remaining;
    private double percentageUsed;

    public AiQuotaResponse() {}

    public AiQuotaResponse(int monthlyLimit, int used, int remaining, double percentageUsed) {
        this.monthlyLimit = monthlyLimit;
        this.used = used;
        this.remaining = remaining;
        this.percentageUsed = percentageUsed;
    }

    public int getMonthlyLimit() { return monthlyLimit; }
    public void setMonthlyLimit(int monthlyLimit) { this.monthlyLimit = monthlyLimit; }

    public int getUsed() { return used; }
    public void setUsed(int used) { this.used = used; }

    public int getRemaining() { return remaining; }
    public void setRemaining(int remaining) { this.remaining = remaining; }

    public double getPercentageUsed() { return percentageUsed; }
    public void setPercentageUsed(double percentageUsed) { this.percentageUsed = percentageUsed; }

    public static AiQuotaResponseBuilder builder() { return new AiQuotaResponseBuilder(); }

    public static class AiQuotaResponseBuilder {
        private int monthlyLimit;
        private int used;
        private int remaining;
        private double percentageUsed;

        public AiQuotaResponseBuilder monthlyLimit(int monthlyLimit) { this.monthlyLimit = monthlyLimit; return this; }
        public AiQuotaResponseBuilder used(int used) { this.used = used; return this; }
        public AiQuotaResponseBuilder remaining(int remaining) { this.remaining = remaining; return this; }
        public AiQuotaResponseBuilder percentageUsed(double percentageUsed) { this.percentageUsed = percentageUsed; return this; }

        public AiQuotaResponse build() {
            return new AiQuotaResponse(monthlyLimit, used, remaining, percentageUsed);
        }
    }
}
