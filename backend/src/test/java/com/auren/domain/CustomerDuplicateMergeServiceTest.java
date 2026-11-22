package com.auren.domain;

import com.auren.domain.entity.Customer;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.service.CustomerDuplicateMergeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CustomerDuplicateMergeServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private CustomerDuplicateMergeService mergeService;

    @Test
    @DisplayName("Merge consolidates phone and creates union of unique tags")
    void testMergeDuplicatesAndTagUnion() {
        UUID workspaceId = UUID.randomUUID();
        UUID primaryId = UUID.randomUUID();
        UUID dupId = UUID.randomUUID();

        Customer primary = Customer.builder()
                .id(primaryId)
                .fullName("Pooja Sharma")
                .phone(null)
                .email("pooja@example.com")
                .tags(new ArrayList<>(List.of("VIP", "Diwali Campaign")))
                .totalSpend(new BigDecimal("4500.00"))
                .build();

        Customer duplicate = Customer.builder()
                .id(dupId)
                .fullName("Pooja S")
                .phone("+91 98200 12345")
                .tags(new ArrayList<>(List.of("Diwali Campaign", "Ceramics")))
                .totalSpend(new BigDecimal("1500.00"))
                .build();

        when(customerRepository.findByIdAndWorkspaceId(primaryId, workspaceId)).thenReturn(Optional.of(primary));
        when(customerRepository.findByIdAndWorkspaceId(dupId, workspaceId)).thenReturn(Optional.of(duplicate));
        when(customerRepository.save(any(Customer.class))).thenAnswer(i -> i.getArgument(0));

        Customer merged = mergeService.mergeDuplicates(workspaceId, primaryId, dupId);

        // Verification
        assertEquals("+91 98200 12345", merged.getPhone());
        assertEquals(3, merged.getTags().size());
        assertTrue(merged.getTags().containsAll(List.of("VIP", "Diwali Campaign", "Ceramics")));
        assertEquals(new BigDecimal("6000.00"), merged.getTotalSpend());
        assertTrue(duplicate.getIsDeleted());
        assertNotNull(duplicate.getDeletedAt());
    }
}
