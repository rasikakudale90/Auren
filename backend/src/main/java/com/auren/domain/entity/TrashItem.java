package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "v_trash_retention_items")
@Immutable
public class TrashItem {

    @Id
    private UUID id;

    @Column(name = "workspace_id")
    private UUID workspaceId;

    @Column(name = "item_type")
    private String itemType;

    private String title;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Column(name = "days_remaining")
    private Integer daysRemaining;

    public TrashItem() {}

    public TrashItem(UUID id, UUID workspaceId, String itemType, String title, Instant deletedAt, Integer daysRemaining) {
        this.id = id;
        this.workspaceId = workspaceId;
        this.itemType = itemType;
        this.title = title;
        this.deletedAt = deletedAt;
        this.daysRemaining = daysRemaining;
    }

    public UUID getId() { return id; }
    public UUID getWorkspaceId() { return workspaceId; }
    public String getItemType() { return itemType; }
    public String getTitle() { return title; }
    public Instant getDeletedAt() { return deletedAt; }
    public Integer getDaysRemaining() { return daysRemaining; }
}
