package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "quick_replies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuickReply {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String category; // Greeting, Pricing, Payment, Delivery

    @Column(name = "message_body", columnDefinition = "TEXT", nullable = false)
    private String messageBody;

    private String shortcut;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;
}
