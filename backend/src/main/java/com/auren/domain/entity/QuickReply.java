package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "quick_replies")
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
    private String category;

    @Column(name = "message_body", columnDefinition = "TEXT", nullable = false)
    private String messageBody;

    private String shortcut;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public QuickReply() {}

    public QuickReply(UUID id, Workspace workspace, String title, String category, String messageBody, String shortcut, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.title = title;
        this.category = category;
        this.messageBody = messageBody;
        this.shortcut = shortcut;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getMessageBody() { return messageBody; }
    public void setMessageBody(String messageBody) { this.messageBody = messageBody; }

    public String getShortcut() { return shortcut; }
    public void setShortcut(String shortcut) { this.shortcut = shortcut; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public static QuickReplyBuilder builder() { return new QuickReplyBuilder(); }

    public static class QuickReplyBuilder {
        private UUID id;
        private Workspace workspace;
        private String title;
        private String category;
        private String messageBody;
        private String shortcut;
        private Instant createdAt;
        private Instant updatedAt;

        public QuickReplyBuilder id(UUID id) { this.id = id; return this; }
        public QuickReplyBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public QuickReplyBuilder title(String title) { this.title = title; return this; }
        public QuickReplyBuilder category(String category) { this.category = category; return this; }
        public QuickReplyBuilder messageBody(String messageBody) { this.messageBody = messageBody; return this; }
        public QuickReplyBuilder shortcut(String shortcut) { this.shortcut = shortcut; return this; }
        public QuickReplyBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public QuickReplyBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public QuickReply build() {
            return new QuickReply(id, workspace, title, category, messageBody, shortcut, createdAt, updatedAt);
        }
    }
}
