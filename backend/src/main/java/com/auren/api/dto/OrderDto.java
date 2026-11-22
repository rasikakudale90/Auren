package com.auren.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

public class OrderDto {

    @Data
    public static class RecordPaymentRequest {
        @NotNull
        @DecimalMin(value = "0.01", message = "Payment amount must be greater than zero")
        private BigDecimal paymentAmount;

        @NotNull
        private String paymentMethod; // CASH, UPI, BANK_TRANSFER
    }
}
