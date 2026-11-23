package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String category; // BUG, FEATURE_REQUEST, GENERAL

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private Integer rating; // 1 to 5

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;
}
