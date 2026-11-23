package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.Product;
import com.auren.domain.repository.ProductRepository;
import com.auren.security.jwt.AurenUserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> listProducts(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<Product> products = productRepository.findByWorkspaceIdAndIsDeletedFalse(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(products, "Products retrieved"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> softDeleteProduct(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Product product = productRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
        product.markDeleted();
        productRepository.save(product);
        return ResponseEntity.ok(ApiResponse.ok(null, "Product moved to 30-day trash retention"));
    }
}
