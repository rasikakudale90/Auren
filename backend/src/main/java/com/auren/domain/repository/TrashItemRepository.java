package com.auren.domain.repository;

import com.auren.domain.entity.TrashItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TrashItemRepository extends JpaRepository<TrashItem, UUID> {
    List<TrashItem> findByWorkspaceIdOrderByDeletedAtDesc(UUID workspaceId);
}
