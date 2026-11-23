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
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    private String phone;
    private String handle;
    private String channel = "INSTAGRAM";
    private String email;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Convert(converter = StringListJsonConverter.class)
    private List<String> tags = new ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "total_spend", nullable = false)
    private BigDecimal totalSpend = BigDecimal.ZERO;

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

    public Customer() {}

    public Customer(UUID id, Workspace workspace, String fullName, String phone, String handle, String channel, String email, String address, List<String> tags, String notes, BigDecimal totalSpend, Boolean isDeleted, Instant deletedAt, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.fullName = fullName;
        this.phone = phone;
        this.handle = handle;
        this.channel = channel != null ? channel : "INSTAGRAM";
        this.email = email;
        this.address = address;
        this.tags = tags != null ? tags : new ArrayList<>();
        this.notes = notes;
        this.totalSpend = totalSpend != null ? totalSpend : BigDecimal.ZERO;
        this.isDeleted = isDeleted != null ? isDeleted : false;
        this.deletedAt = deletedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getHandle() { return handle; }
    public void setHandle(String handle) { this.handle = handle; }

    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public BigDecimal getTotalSpend() { return totalSpend; }
    public void setTotalSpend(BigDecimal totalSpend) { this.totalSpend = totalSpend; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }

    public Instant getDeletedAt() { return deletedAt; }
    public void setDeletedAt(Instant deletedAt) { this.deletedAt = deletedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public void markDeleted() {
        this.isDeleted = true;
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
    }

    public static CustomerBuilder builder() { return new CustomerBuilder(); }

    public static class CustomerBuilder {
        private UUID id;
        private Workspace workspace;
        private String fullName;
        private String phone;
        private String handle;
        private String channel = "INSTAGRAM";
        private String email;
        private String address;
        private List<String> tags = new ArrayList<>();
        private String notes;
        private BigDecimal totalSpend = BigDecimal.ZERO;
        private Boolean isDeleted = false;
        private Instant deletedAt;
        private Instant createdAt;
        private Instant updatedAt;

        public CustomerBuilder id(UUID id) { this.id = id; return this; }
        public CustomerBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public CustomerBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public CustomerBuilder phone(String phone) { this.phone = phone; return this; }
        public CustomerBuilder handle(String handle) { this.handle = handle; return this; }
        public CustomerBuilder channel(String channel) { this.channel = channel; return this; }
        public CustomerBuilder email(String email) { this.email = email; return this; }
        public CustomerBuilder address(String address) { this.address = address; return this; }
        public CustomerBuilder tags(List<String> tags) { this.tags = tags; return this; }
        public CustomerBuilder notes(String notes) { this.notes = notes; return this; }
        public CustomerBuilder totalSpend(BigDecimal totalSpend) { this.totalSpend = totalSpend; return this; }
        public CustomerBuilder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public CustomerBuilder deletedAt(Instant deletedAt) { this.deletedAt = deletedAt; return this; }
        public CustomerBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public CustomerBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Customer build() {
            return new Customer(id, workspace, fullName, phone, handle, channel, email, address, tags, notes, totalSpend, isDeleted, deletedAt, createdAt, updatedAt);
        }
    }
}
