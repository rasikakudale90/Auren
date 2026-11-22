package com.auren.domain.repository;

import com.auren.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    List<Customer> findByWorkspaceIdAndIsDeletedFalse(UUID workspaceId);
    Optional<Customer> findByIdAndWorkspaceId(UUID id, UUID workspaceId);

    @Query("SELECT c FROM Customer c WHERE c.workspace.id = :workspaceId AND c.isDeleted = false AND (" +
           "(:phone IS NOT NULL AND c.phone = :phone) OR " +
           "(:handle IS NOT NULL AND LOWER(c.handle) = LOWER(:handle)))")
    List<Customer> findPotentialDuplicates(
            @Param("workspaceId") UUID workspaceId,
            @Param("phone") String phone,
            @Param("handle") String handle
    );
}
