package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "workspaces")
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(nullable = false)
    private String name;

    private String category;

    @Column(name = "currency_code", nullable = false)
    private String currencyCode = "INR";

    @Column(name = "time_zone", nullable = false)
    private String timeZone = "Asia/Kolkata";

    @Column(name = "ai_quota_monthly", nullable = false)
    private Integer aiQuotaMonthly = 500;

    @Column(name = "ai_quota_used", nullable = false)
    private Integer aiQuotaUsed = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public Workspace() {}

    public Workspace(UUID id, User owner, String name, String category, String currencyCode, String timeZone, Integer aiQuotaMonthly, Integer aiQuotaUsed, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.category = category;
        this.currencyCode = currencyCode != null ? currencyCode : "INR";
        this.timeZone = timeZone != null ? timeZone : "Asia/Kolkata";
        this.aiQuotaMonthly = aiQuotaMonthly != null ? aiQuotaMonthly : 500;
        this.aiQuotaUsed = aiQuotaUsed != null ? aiQuotaUsed : 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCurrencyCode() { return currencyCode; }
    public void setCurrencyCode(String currencyCode) { this.currencyCode = currencyCode; }

    public String getTimeZone() { return timeZone; }
    public void setTimeZone(String timeZone) { this.timeZone = timeZone; }

    public Integer getAiQuotaMonthly() { return aiQuotaMonthly; }
    public void setAiQuotaMonthly(Integer aiQuotaMonthly) { this.aiQuotaMonthly = aiQuotaMonthly; }

    public Integer getAiQuotaUsed() { return aiQuotaUsed; }
    public void setAiQuotaUsed(Integer aiQuotaUsed) { this.aiQuotaUsed = aiQuotaUsed; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static WorkspaceBuilder builder() { return new WorkspaceBuilder(); }

    public static class WorkspaceBuilder {
        private UUID id;
        private User owner;
        private String name;
        private String category;
        private String currencyCode = "INR";
        private String timeZone = "Asia/Kolkata";
        private Integer aiQuotaMonthly = 500;
        private Integer aiQuotaUsed = 0;
        private Instant createdAt;
        private Instant updatedAt;

        public WorkspaceBuilder id(UUID id) { this.id = id; return this; }
        public WorkspaceBuilder owner(User owner) { this.owner = owner; return this; }
        public WorkspaceBuilder name(String name) { this.name = name; return this; }
        public WorkspaceBuilder category(String category) { this.category = category; return this; }
        public WorkspaceBuilder currencyCode(String currencyCode) { this.currencyCode = currencyCode; return this; }
        public WorkspaceBuilder timeZone(String timeZone) { this.timeZone = timeZone; return this; }
        public WorkspaceBuilder aiQuotaMonthly(Integer aiQuotaMonthly) { this.aiQuotaMonthly = aiQuotaMonthly; return this; }
        public WorkspaceBuilder aiQuotaUsed(Integer aiQuotaUsed) { this.aiQuotaUsed = aiQuotaUsed; return this; }
        public WorkspaceBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public WorkspaceBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Workspace build() {
            return new Workspace(id, owner, name, category, currencyCode, timeZone, aiQuotaMonthly, aiQuotaUsed, createdAt, updatedAt);
        }
    }
}
