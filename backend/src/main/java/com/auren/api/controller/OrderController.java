package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.api.dto.OrderDto;
import com.auren.domain.entity.Order;
import com.auren.domain.repository.OrderRepository;
import com.auren.domain.service.OrderService;
import com.auren.security.jwt.AurenUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Order>>> listOrders(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<Order> orders = orderRepository.findByWorkspaceIdAndIsDeletedFalse(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(orders, "Orders retrieved"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrder(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Order order = orderRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        return ResponseEntity.ok(ApiResponse.ok(order, "Order found"));
    }

    @PostMapping("/{id}/payments")
    public ResponseEntity<ApiResponse<Order>> recordPayment(
            @PathVariable UUID id,
            @Valid @RequestBody OrderDto.RecordPaymentRequest req,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Order order = orderService.recordPayment(
                principal.getWorkspaceId(),
                id,
                req.getPaymentAmount(),
                req.getPaymentMethod()
        );
        return ResponseEntity.ok(ApiResponse.ok(order, "Payment recorded successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> softDeleteOrder(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Order order = orderRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        order.markDeleted();
        orderRepository.save(order);
        return ResponseEntity.ok(ApiResponse.ok(null, "Order moved to 30-day trash retention"));
    }
}
