package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.api.dto.CustomerDto;
import com.auren.domain.entity.Customer;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.service.CustomerDuplicateMergeService;
import com.auren.security.jwt.AurenUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final CustomerDuplicateMergeService mergeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Customer>>> listCustomers(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<Customer> customers = customerRepository.findByWorkspaceIdAndIsDeletedFalse(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(customers, "Customers retrieved"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Customer>> getCustomer(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Customer customer = customerRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + id));
        return ResponseEntity.ok(ApiResponse.ok(customer, "Customer found"));
    }

    @PostMapping("/merge")
    public ResponseEntity<ApiResponse<Customer>> mergeDuplicates(
            @Valid @RequestBody CustomerDto.MergeRequest req,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Customer merged = mergeService.mergeDuplicates(
                principal.getWorkspaceId(),
                req.getPrimaryCustomerId(),
                req.getDuplicateCustomerId()
        );
        return ResponseEntity.ok(ApiResponse.ok(merged, "Customers merged successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> softDeleteCustomer(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Customer customer = customerRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Customer not found: " + id));
        customer.markDeleted();
        customerRepository.save(customer);
        return ResponseEntity.ok(ApiResponse.ok(null, "Customer moved to 30-day trash retention"));
    }
}
