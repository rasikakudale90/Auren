package com.auren.domain;

import com.auren.domain.entity.Order;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class OrderInvariantsTest {

    @Test
    @DisplayName("Balance due invariant: totalAmount - amountPaid")
    void testBalanceDueCalculation() {
        Order order = Order.builder()
                .totalAmount(new BigDecimal("1500.00"))
                .amountPaid(new BigDecimal("500.00"))
                .build();

        order.calculateBalanceAndStatus();

        assertEquals(new BigDecimal("1000.00"), order.getBalanceDue());
        assertEquals("PARTIALLY_PAID", order.getPaymentStatus());
    }

    @Test
    @DisplayName("Payment status: PAID when amountPaid >= totalAmount")
    void testPaidStatus() {
        Order order = Order.builder()
                .totalAmount(new BigDecimal("2000.00"))
                .amountPaid(new BigDecimal("2000.00"))
                .build();

        order.calculateBalanceAndStatus();

        assertEquals(BigDecimal.ZERO, order.getBalanceDue());
        assertEquals("PAID", order.getPaymentStatus());
    }

    @Test
    @DisplayName("Payment status: UNPAID when amountPaid is 0")
    void testUnpaidStatus() {
        Order order = Order.builder()
                .totalAmount(new BigDecimal("3500.00"))
                .amountPaid(BigDecimal.ZERO)
                .build();

        order.calculateBalanceAndStatus();

        assertEquals(new BigDecimal("3500.00"), order.getBalanceDue());
        assertEquals("UNPAID", order.getPaymentStatus());
    }
}
