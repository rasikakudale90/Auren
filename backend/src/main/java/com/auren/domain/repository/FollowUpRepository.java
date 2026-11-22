package com.auren.domain.repository;

import com.auren.domain.entity.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FollowUpRepository extends JpaRepository<FollowUp, UUID> {
    List<FollowUp> findByWorkspaceIdAndIsDeletedFalse(UUID workspaceId);
    Optional<FollowUp> findByIdAndWorkspaceId(UUID id, UUID workspaceId);
    List<FollowUp> findByWorkspaceIdAndDueDateBeforeAndStatusNotAndIsDeletedFalse(UUID workspaceId, Instant dueDate, String status);
}
