package com.auren.jobs;

import com.auren.domain.entity.Customer;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.CustomerRepository;
import com.auren.domain.repository.EnquiryRepository;
import com.auren.domain.repository.FollowUpRepository;
import com.auren.domain.repository.OrderRepository;
import com.auren.domain.repository.WorkspaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobsTest {

    @Mock
    private WorkspaceRepository workspaceRepository;
    @Mock
    private EnquiryRepository enquiryRepository;
    @Mock
    private CustomerRepository customerRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private FollowUpRepository followUpRepository;

    @InjectMocks
    private AiQuotaResetJob quotaResetJob;

    @InjectMocks
    private TrashPurgeJob trashPurgeJob;

    @Test
    @DisplayName("AI Quota reset job resets all workspace counters to 0")
    void testQuotaResetJob() {
        Workspace ws1 = Workspace.builder().aiQuotaUsed(120).build();
        Workspace ws2 = Workspace.builder().aiQuotaUsed(450).build();

        when(workspaceRepository.findAll()).thenReturn(List.of(ws1, ws2));

        quotaResetJob.resetMonthlyQuotas();

        assertEquals(0, ws1.getAiQuotaUsed());
        assertEquals(0, ws2.getAiQuotaUsed());
        verify(workspaceRepository, times(1)).saveAll(anyList());
    }

    @Test
    @DisplayName("Trash purge job hard-deletes records deleted over 30 days ago")
    void testTrashPurgeJob() {
        Customer expiredCust = Customer.builder()
                .fullName("Old Deleted")
                .isDeleted(true)
                .deletedAt(Instant.now().minus(35, ChronoUnit.DAYS))
                .build();

        Customer recentCust = Customer.builder()
                .fullName("Recently Deleted")
                .isDeleted(true)
                .deletedAt(Instant.now().minus(5, ChronoUnit.DAYS))
                .build();

        when(customerRepository.findAll()).thenReturn(List.of(expiredCust, recentCust));

        trashPurgeJob.purgeExpiredTrash();

        verify(customerRepository, times(1)).deleteAll(List.of(expiredCust));
    }
}
