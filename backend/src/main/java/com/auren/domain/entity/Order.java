package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enquiry_id")
    private Enquiry enquiry;

    @Column(name = "order_number", nullable = false)
    private String orderNumber;

    @Column(name = "total_amount", nullable = false)
    @Builder.Default
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "amount_paid", nullable = false)
    @Builder.Default
    private BigDecimal amountPaid = BigDecimal.ZERO;

    @Column(name = "balance_due", nullable = false)
    @Builder.Default
    private BigDecimal balanceDue = BigDecimal.ZERO;

    @Column(name = "payment_status", nullable = false)
    @Builder.Default
    private String paymentStatus = "UNPAID"; // UNPAID, PARTIALLY_PAID, PAID

    @Column(name = "fulfillment_status", nullable = false)
    @Builder.Default
    private String fulfillmentStatus = "PENDING"; // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    /**
     * Core Invariant Rule from technical-depth.md Section 3.A:
     * balanceDue = max(0, totalAmount - amountPaid)
     * paymentStatus = Paid if amountPaid >= totalAmount > 0; Partially Paid if 0 < amountPaid < totalAmount; else Unpaid
     */
    @PrePersist
    @PreUpdate
    public void calculateBalanceAndStatus() {
        BigDecimal total = totalAmount != null ? totalAmount : BigDecimal.ZERO;
        BigDecimal paid = amountPaid != null ? amountPaid : BigDecimal.ZERO;

        this.balanceDue = total.subtract(paid).max(BigDecimal.ZERO);

        if (total.compareTo(BigDecimal.ZERO) > 0 && paid.compareTo(total) >= 0) {
            this.paymentStatus = "PAID";
        } else if (paid.compareTo(BigDecimal.ZERO) > 0 && paid.compareTo(total) < 0) {
            this.paymentStatus = "PARTIALLY_PAID";
        } else {
            this.paymentStatus = "UNPAID";
        }
    }

    public void markDeleted() {
        this.isDeleted = true;
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
    }
}
