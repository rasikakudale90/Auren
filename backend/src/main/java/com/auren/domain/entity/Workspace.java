package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "workspaces")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    @Builder.Default
    private String currencyCode = "INR";

    @Column(name = "time_zone", nullable = false)
    @Builder.Default
    private String timeZone = "Asia/Kolkata";

    @Column(name = "ai_quota_monthly", nullable = false)
    @Builder.Default
    private Integer aiQuotaMonthly = 500;

    @Column(name = "ai_quota_used", nullable = false)
    @Builder.Default
    private Integer aiQuotaUsed = 0;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
