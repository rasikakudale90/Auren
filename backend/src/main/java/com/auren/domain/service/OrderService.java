package com.auren.domain.service;

import com.auren.domain.entity.Order;
import com.auren.domain.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Implements Section 3.A from technical-depth.md:
 * balanceDue = max(0, totalAmount - amountPaid)
 * Manual payment recording (Cash / UPI / Bank Transfer)
 */
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional
    public Order recordPayment(UUID workspaceId, UUID orderId, BigDecimal paymentAmount, String paymentMethod) {
        if (paymentAmount == null || paymentAmount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Payment amount must be greater than zero");
        }

        Order order = orderRepository.findByIdAndWorkspaceId(orderId, workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        BigDecimal currentPaid = order.getAmountPaid() != null ? order.getAmountPaid() : BigDecimal.ZERO;
        order.setAmountPaid(currentPaid.add(paymentAmount));
        order.setPaymentMethod(paymentMethod);

        // PrePersist/PreUpdate recalculates balanceDue and paymentStatus automatically
        order.calculateBalanceAndStatus();

        return orderRepository.save(order);
    }
}
