package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "enquiries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private String channel = "INSTAGRAM";

    @Column(name = "raw_message", columnDefinition = "TEXT")
    private String rawMessage;

    @Column(name = "image_url")
    private String imageUrl;

    private String intent;

    @Column(nullable = false)
    @Builder.Default
    private String urgency = "NORMAL";

    @Column(nullable = false)
    @Builder.Default
    private String status = "NEW"; // NEW, IN_PROGRESS, RESOLVED, CONVERTED

    @Column(name = "extracted_data", columnDefinition = "TEXT")
    private String extractedDataJson;

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

    public void markDeleted() {
        this.isDeleted = true;
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
    }
}
