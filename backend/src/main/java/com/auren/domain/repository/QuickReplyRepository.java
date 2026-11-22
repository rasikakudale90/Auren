package com.auren.domain.repository;

import com.auren.domain.entity.QuickReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface QuickReplyRepository extends JpaRepository<QuickReply, UUID> {
    List<QuickReply> findByWorkspaceId(UUID workspaceId);
    List<QuickReply> findByWorkspaceIdAndCategory(UUID workspaceId, String category);
}
