package com.auren.domain.service;

import com.auren.domain.entity.Customer;
import com.auren.domain.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Implements Section 3.B from technical-depth.md:
 * Customer Duplicate Resolution & Tag Consolidation:
 * tags_merged = Unique(tags_primary U tags_duplicate)
 * Duplicate record is soft-deleted and transitioned to the 30-day retention trash queue.
 */
@Service
public class CustomerDuplicateMergeService {

    private final CustomerRepository customerRepository;
    public CustomerDuplicateMergeService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Transactional
    public Customer mergeDuplicates(UUID workspaceId, UUID primaryCustomerId, UUID duplicateCustomerId) {
        Customer primary = customerRepository.findByIdAndWorkspaceId(primaryCustomerId, workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Primary customer not found: " + primaryCustomerId));
        Customer duplicate = customerRepository.findByIdAndWorkspaceId(duplicateCustomerId, workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Duplicate customer not found: " + duplicateCustomerId));

        // 1. Phone, email, address merge if primary is blank
        if ((primary.getPhone() == null || primary.getPhone().isBlank()) && duplicate.getPhone() != null) {
            primary.setPhone(duplicate.getPhone());
        }
        if ((primary.getEmail() == null || primary.getEmail().isBlank()) && duplicate.getEmail() != null) {
            primary.setEmail(duplicate.getEmail());
        }
        if ((primary.getAddress() == null || primary.getAddress().isBlank()) && duplicate.getAddress() != null) {
            primary.setAddress(duplicate.getAddress());
        }

        // 2. Tag union consolidation: tags_merged = Unique(tags_primary U tags_duplicate)
        Set<String> unionTags = new LinkedHashSet<>();
        if (primary.getTags() != null) {
            unionTags.addAll(primary.getTags());
        }
        if (duplicate.getTags() != null) {
            unionTags.addAll(duplicate.getTags());
        }
        primary.setTags(new ArrayList<>(unionTags));

        // 3. Aggregate total spend
        if (duplicate.getTotalSpend() != null) {
            primary.setTotalSpend(primary.getTotalSpend().add(duplicate.getTotalSpend()));
        }

        // 4. Soft-delete duplicate for 30-day retention
        duplicate.markDeleted();
        customerRepository.save(duplicate);

        return customerRepository.save(primary);
    }
}
