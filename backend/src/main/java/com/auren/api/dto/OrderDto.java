package com.auren.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class OrderDto {

    public static class RecordPaymentRequest {
        @NotNull
        @DecimalMin(value = "0.01", message = "Payment amount must be greater than zero")
        private BigDecimal paymentAmount;

        @NotNull
        private String paymentMethod;

        public BigDecimal getPaymentAmount() { return paymentAmount; }
        public void setPaymentAmount(BigDecimal paymentAmount) { this.paymentAmount = paymentAmount; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    }
}
