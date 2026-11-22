package com.auren.domain.repository;

import com.auren.domain.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByWorkspaceIdAndIsDeletedFalse(UUID workspaceId);
    Optional<Order> findByIdAndWorkspaceId(UUID id, UUID workspaceId);
    Optional<Order> findByWorkspaceIdAndOrderNumber(UUID workspaceId, String orderNumber);
}
