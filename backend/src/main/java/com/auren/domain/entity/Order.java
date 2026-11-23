package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
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
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "amount_paid", nullable = false)
    private BigDecimal amountPaid = BigDecimal.ZERO;

    @Column(name = "balance_due", nullable = false)
    private BigDecimal balanceDue = BigDecimal.ZERO;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus = "UNPAID";

    @Column(name = "fulfillment_status", nullable = false)
    private String fulfillmentStatus = "PENDING";

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public Order() {}

    public Order(UUID id, Workspace workspace, Customer customer, Enquiry enquiry, String orderNumber, BigDecimal totalAmount, BigDecimal amountPaid, BigDecimal balanceDue, String paymentStatus, String fulfillmentStatus, String paymentMethod, String notes, List<OrderItem> items, Boolean isDeleted, Instant deletedAt, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.customer = customer;
        this.enquiry = enquiry;
        this.orderNumber = orderNumber;
        this.totalAmount = totalAmount != null ? totalAmount : BigDecimal.ZERO;
        this.amountPaid = amountPaid != null ? amountPaid : BigDecimal.ZERO;
        this.balanceDue = balanceDue != null ? balanceDue : BigDecimal.ZERO;
        this.paymentStatus = paymentStatus != null ? paymentStatus : "UNPAID";
        this.fulfillmentStatus = fulfillmentStatus != null ? fulfillmentStatus : "PENDING";
        this.paymentMethod = paymentMethod;
        this.notes = notes;
        this.items = items != null ? items : new ArrayList<>();
        this.isDeleted = isDeleted != null ? isDeleted : false;
        this.deletedAt = deletedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }

    public Enquiry getEnquiry() { return enquiry; }
    public void setEnquiry(Enquiry enquiry) { this.enquiry = enquiry; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public BigDecimal getTotalAmount() { return totalAmount; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }

    public BigDecimal getAmountPaid() { return amountPaid; }
    public void setAmountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; }

    public BigDecimal getBalanceDue() { return balanceDue; }
    public void setBalanceDue(BigDecimal balanceDue) { this.balanceDue = balanceDue; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getFulfillmentStatus() { return fulfillmentStatus; }
    public void setFulfillmentStatus(String fulfillmentStatus) { this.fulfillmentStatus = fulfillmentStatus; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }

    public Instant getDeletedAt() { return deletedAt; }
    public void setDeletedAt(Instant deletedAt) { this.deletedAt = deletedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

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

    public static OrderBuilder builder() { return new OrderBuilder(); }

    public static class OrderBuilder {
        private UUID id;
        private Workspace workspace;
        private Customer customer;
        private Enquiry enquiry;
        private String orderNumber;
        private BigDecimal totalAmount = BigDecimal.ZERO;
        private BigDecimal amountPaid = BigDecimal.ZERO;
        private BigDecimal balanceDue = BigDecimal.ZERO;
        private String paymentStatus = "UNPAID";
        private String fulfillmentStatus = "PENDING";
        private String paymentMethod;
        private String notes;
        private List<OrderItem> items = new ArrayList<>();
        private Boolean isDeleted = false;
        private Instant deletedAt;
        private Instant createdAt;
        private Instant updatedAt;

        public OrderBuilder id(UUID id) { this.id = id; return this; }
        public OrderBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public OrderBuilder customer(Customer customer) { this.customer = customer; return this; }
        public OrderBuilder enquiry(Enquiry enquiry) { this.enquiry = enquiry; return this; }
        public OrderBuilder orderNumber(String orderNumber) { this.orderNumber = orderNumber; return this; }
        public OrderBuilder totalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; return this; }
        public OrderBuilder amountPaid(BigDecimal amountPaid) { this.amountPaid = amountPaid; return this; }
        public OrderBuilder balanceDue(BigDecimal balanceDue) { this.balanceDue = balanceDue; return this; }
        public OrderBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public OrderBuilder fulfillmentStatus(String fulfillmentStatus) { this.fulfillmentStatus = fulfillmentStatus; return this; }
        public OrderBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public OrderBuilder notes(String notes) { this.notes = notes; return this; }
        public OrderBuilder items(List<OrderItem> items) { this.items = items; return this; }
        public OrderBuilder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public OrderBuilder deletedAt(Instant deletedAt) { this.deletedAt = deletedAt; return this; }
        public OrderBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public OrderBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Order build() {
            return new Order(id, workspace, customer, enquiry, orderNumber, totalAmount, amountPaid, balanceDue, paymentStatus, fulfillmentStatus, paymentMethod, notes, items, isDeleted, deletedAt, createdAt, updatedAt);
        }
    }
}
