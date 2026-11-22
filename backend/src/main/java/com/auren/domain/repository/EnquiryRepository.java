package com.auren.domain.repository;

import com.auren.domain.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, UUID> {
    List<Enquiry> findByWorkspaceIdAndIsDeletedFalse(UUID workspaceId);
    Optional<Enquiry> findByIdAndWorkspaceId(UUID id, UUID workspaceId);
    List<Enquiry> findByWorkspaceIdAndStatusAndIsDeletedFalse(UUID workspaceId, String status);
}
