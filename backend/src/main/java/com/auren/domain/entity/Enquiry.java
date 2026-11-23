package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "enquiries")
public class Enquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @Column(nullable = false)
    private String channel = "INSTAGRAM";

    @Column(name = "raw_message", columnDefinition = "TEXT")
    private String rawMessage;

    @Column(name = "image_url")
    private String imageUrl;

    private String intent;

    @Column(nullable = false)
    private String urgency = "NORMAL";

    @Column(nullable = false)
    private String status = "NEW";

    @Column(name = "extracted_data", columnDefinition = "TEXT")
    private String extractedDataJson;

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

    public Enquiry() {}

    public Enquiry(UUID id, Workspace workspace, Customer customer, String channel, String rawMessage, String imageUrl, String intent, String urgency, String status, String extractedDataJson, Boolean isDeleted, Instant deletedAt, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.customer = customer;
        this.channel = channel != null ? channel : "INSTAGRAM";
        this.rawMessage = rawMessage;
        this.imageUrl = imageUrl;
        this.intent = intent;
        this.urgency = urgency != null ? urgency : "NORMAL";
        this.status = status != null ? status : "NEW";
        this.extractedDataJson = extractedDataJson;
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

    public String getChannel() { return channel; }
    public void setChannel(String channel) { this.channel = channel; }

    public String getRawMessage() { return rawMessage; }
    public void setRawMessage(String rawMessage) { this.rawMessage = rawMessage; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public String getUrgency() { return urgency; }
    public void setUrgency(String urgency) { this.urgency = urgency; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getExtractedDataJson() { return extractedDataJson; }
    public void setExtractedDataJson(String extractedDataJson) { this.extractedDataJson = extractedDataJson; }

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

    public static EnquiryBuilder builder() { return new EnquiryBuilder(); }

    public static class EnquiryBuilder {
        private UUID id;
        private Workspace workspace;
        private Customer customer;
        private String channel = "INSTAGRAM";
        private String rawMessage;
        private String imageUrl;
        private String intent;
        private String urgency = "NORMAL";
        private String status = "NEW";
        private String extractedDataJson;
        private Boolean isDeleted = false;
        private Instant deletedAt;
        private Instant createdAt;
        private Instant updatedAt;

        public EnquiryBuilder id(UUID id) { this.id = id; return this; }
        public EnquiryBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public EnquiryBuilder customer(Customer customer) { this.customer = customer; return this; }
        public EnquiryBuilder channel(String channel) { this.channel = channel; return this; }
        public EnquiryBuilder rawMessage(String rawMessage) { this.rawMessage = rawMessage; return this; }
        public EnquiryBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public EnquiryBuilder intent(String intent) { this.intent = intent; return this; }
        public EnquiryBuilder urgency(String urgency) { this.urgency = urgency; return this; }
        public EnquiryBuilder status(String status) { this.status = status; return this; }
        public EnquiryBuilder extractedDataJson(String extractedDataJson) { this.extractedDataJson = extractedDataJson; return this; }
        public EnquiryBuilder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public EnquiryBuilder deletedAt(Instant deletedAt) { this.deletedAt = deletedAt; return this; }
        public EnquiryBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public EnquiryBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Enquiry build() {
            return new Enquiry(id, workspace, customer, channel, rawMessage, imageUrl, intent, urgency, status, extractedDataJson, isDeleted, deletedAt, createdAt, updatedAt);
        }
    }
}
