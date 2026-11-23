package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "follow_ups")
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enquiry_id")
    private Enquiry enquiry;

    @Column(nullable = false)
    private String title;

    @Column(name = "due_date", nullable = false)
    private Instant dueDate;

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private String priority = "MEDIUM";

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

    public FollowUp() {}

    public FollowUp(UUID id, Workspace workspace, Customer customer, Enquiry enquiry, String title, Instant dueDate, String status, String priority, Boolean isDeleted, Instant deletedAt, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.customer = customer;
        this.enquiry = enquiry;
        this.title = title;
        this.dueDate = dueDate;
        this.status = status != null ? status : "PENDING";
        this.priority = priority != null ? priority : "MEDIUM";
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

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Instant getDueDate() { return dueDate; }
    public void setDueDate(Instant dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }

    public Instant getDeletedAt() { return deletedAt; }
    public void setDeletedAt(Instant deletedAt) { this.deletedAt = deletedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public void snoozeDays(int days) {
        this.dueDate = this.dueDate.plusSeconds((long) days * 86400);
        this.status = "SNOOZED";
    }

    public void markDeleted() {
        this.isDeleted = true;
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
    }

    public static FollowUpBuilder builder() { return new FollowUpBuilder(); }

    public static class FollowUpBuilder {
        private UUID id;
        private Workspace workspace;
        private Customer customer;
        private Enquiry enquiry;
        private String title;
        private Instant dueDate;
        private String status = "PENDING";
        private String priority = "MEDIUM";
        private Boolean isDeleted = false;
        private Instant deletedAt;
        private Instant createdAt;
        private Instant updatedAt;

        public FollowUpBuilder id(UUID id) { this.id = id; return this; }
        public FollowUpBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public FollowUpBuilder customer(Customer customer) { this.customer = customer; return this; }
        public FollowUpBuilder enquiry(Enquiry enquiry) { this.enquiry = enquiry; return this; }
        public FollowUpBuilder title(String title) { this.title = title; return this; }
        public FollowUpBuilder dueDate(Instant dueDate) { this.dueDate = dueDate; return this; }
        public FollowUpBuilder status(String status) { this.status = status; return this; }
        public FollowUpBuilder priority(String priority) { this.priority = priority; return this; }
        public FollowUpBuilder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public FollowUpBuilder deletedAt(Instant deletedAt) { this.deletedAt = deletedAt; return this; }
        public FollowUpBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public FollowUpBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public FollowUp build() {
            return new FollowUp(id, workspace, customer, enquiry, title, dueDate, status, priority, isDeleted, deletedAt, createdAt, updatedAt);
        }
    }
}
