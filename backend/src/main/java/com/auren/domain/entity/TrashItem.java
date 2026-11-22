package com.auren.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "v_trash_retention_items")
@Immutable
@Getter
public class TrashItem {

    @Id
    private UUID id;

    @Column(name = "workspace_id")
    private UUID workspaceId;

    @Column(name = "item_type")
    private String itemType; // enquiry, customer, order, follow_up

    private String title;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Column(name = "days_remaining")
    private Integer daysRemaining;
}
