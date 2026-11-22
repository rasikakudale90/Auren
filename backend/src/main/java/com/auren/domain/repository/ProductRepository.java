package com.auren.domain.repository;

import com.auren.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByWorkspaceIdAndIsDeletedFalse(UUID workspaceId);
    Optional<Product> findByIdAndWorkspaceId(UUID id, UUID workspaceId);
}
