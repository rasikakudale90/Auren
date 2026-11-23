package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    private Integer rating;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    public Feedback() {}

    public Feedback(UUID id, User user, String category, String message, Integer rating, Instant createdAt) {
        this.id = id;
        this.user = user;
        this.category = category != null ? category : "GENERAL";
        this.message = message;
        this.rating = rating;
        this.createdAt = createdAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public static FeedbackBuilder builder() { return new FeedbackBuilder(); }

    public static class FeedbackBuilder {
        private UUID id;
        private User user;
        private String category = "GENERAL";
        private String message;
        private Integer rating;
        private Instant createdAt;

        public FeedbackBuilder id(UUID id) { this.id = id; return this; }
        public FeedbackBuilder user(User user) { this.user = user; return this; }
        public FeedbackBuilder category(String category) { this.category = category; return this; }
        public FeedbackBuilder message(String message) { this.message = message; return this; }
        public FeedbackBuilder rating(Integer rating) { this.rating = rating; return this; }
        public FeedbackBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Feedback build() {
            return new Feedback(id, user, category, message, rating, createdAt);
        }
    }
}
