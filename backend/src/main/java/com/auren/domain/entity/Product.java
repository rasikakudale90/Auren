package com.auren.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id", nullable = false)
    private Workspace workspace;

    @Column(nullable = false)
    private String name;

    private String sku;

    @Column(nullable = false)
    private BigDecimal price = BigDecimal.ZERO;

    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;

    @Column(name = "low_stock_threshold", nullable = false)
    private Integer lowStockThreshold = 5;

    private String category;

    @Column(columnDefinition = "TEXT")
    private String variants;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Instant updatedAt;

    public Product() {}

    public Product(UUID id, Workspace workspace, String name, String sku, BigDecimal price, Integer stockQuantity, Integer lowStockThreshold, String category, String variants, Boolean isActive, Boolean isDeleted, Instant deletedAt, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.workspace = workspace;
        this.name = name;
        this.sku = sku;
        this.price = price != null ? price : BigDecimal.ZERO;
        this.stockQuantity = stockQuantity != null ? stockQuantity : 0;
        this.lowStockThreshold = lowStockThreshold != null ? lowStockThreshold : 5;
        this.category = category;
        this.variants = variants;
        this.isActive = isActive != null ? isActive : true;
        this.isDeleted = isDeleted != null ? isDeleted : false;
        this.deletedAt = deletedAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStockQuantity() { return stockQuantity; }
    public void setStockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; }

    public Integer getLowStockThreshold() { return lowStockThreshold; }
    public void setLowStockThreshold(Integer lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getVariants() { return variants; }
    public void setVariants(String variants) { this.variants = variants; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }

    public Instant getDeletedAt() { return deletedAt; }
    public void setDeletedAt(Instant deletedAt) { this.deletedAt = deletedAt; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public boolean isLowStock() {
        return stockQuantity <= lowStockThreshold;
    }

    public void markDeleted() {
        this.isDeleted = true;
        this.deletedAt = Instant.now();
    }

    public void restore() {
        this.isDeleted = false;
        this.deletedAt = null;
    }

    public static ProductBuilder builder() { return new ProductBuilder(); }

    public static class ProductBuilder {
        private UUID id;
        private Workspace workspace;
        private String name;
        private String sku;
        private BigDecimal price = BigDecimal.ZERO;
        private Integer stockQuantity = 0;
        private Integer lowStockThreshold = 5;
        private String category;
        private String variants;
        private Boolean isActive = true;
        private Boolean isDeleted = false;
        private Instant deletedAt;
        private Instant createdAt;
        private Instant updatedAt;

        public ProductBuilder id(UUID id) { this.id = id; return this; }
        public ProductBuilder workspace(Workspace workspace) { this.workspace = workspace; return this; }
        public ProductBuilder name(String name) { this.name = name; return this; }
        public ProductBuilder sku(String sku) { this.sku = sku; return this; }
        public ProductBuilder price(BigDecimal price) { this.price = price; return this; }
        public ProductBuilder stockQuantity(Integer stockQuantity) { this.stockQuantity = stockQuantity; return this; }
        public ProductBuilder lowStockThreshold(Integer lowStockThreshold) { this.lowStockThreshold = lowStockThreshold; return this; }
        public ProductBuilder category(String category) { this.category = category; return this; }
        public ProductBuilder variants(String variants) { this.variants = variants; return this; }
        public ProductBuilder isActive(Boolean isActive) { this.isActive = isActive; return this; }
        public ProductBuilder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public ProductBuilder deletedAt(Instant deletedAt) { this.deletedAt = deletedAt; return this; }
        public ProductBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public ProductBuilder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public Product build() {
            return new Product(id, workspace, name, sku, price, stockQuantity, lowStockThreshold, category, variants, isActive, isDeleted, deletedAt, createdAt, updatedAt);
        }
    }
}
