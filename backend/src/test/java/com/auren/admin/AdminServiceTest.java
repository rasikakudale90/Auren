package com.auren.admin;

import com.auren.admin.dto.AdminMetricsResponse;
import com.auren.admin.service.AdminService;
import com.auren.domain.entity.Feedback;
import com.auren.domain.entity.User;
import com.auren.domain.repository.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AdminServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private WorkspaceRepository workspaceRepository;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private EnquiryRepository enquiryRepository;
    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private AdminService adminService;

    @Test
    @DisplayName("Retrieve platform metrics returns accurate counts")
    void testGetPlatformMetrics() {
        when(userRepository.count()).thenReturn(25L);
        when(workspaceRepository.count()).thenReturn(30L);
        when(orderRepository.count()).thenReturn(140L);
        when(enquiryRepository.count()).thenReturn(320L);
        when(feedbackRepository.count()).thenReturn(12L);

        AdminMetricsResponse metrics = adminService.getPlatformMetrics();

        assertEquals(25L, metrics.getTotalUsers());
        assertEquals(30L, metrics.getTotalWorkspaces());
        assertEquals(140L, metrics.getTotalOrders());
        assertEquals(320L, metrics.getTotalEnquiries());
        assertEquals(12L, metrics.getTotalFeedbackSubmissions());
    }

    @Test
    @DisplayName("Submit feedback persists feedback record")
    void testSubmitFeedback() {
        UUID userId = UUID.randomUUID();
        User user = User.builder().id(userId).email("artisan@auren.com").build();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        adminService.submitFeedback(userId, "FEATURE_REQUEST", "Love the warm linen theme!", 5);

        verify(feedbackRepository, times(1)).save(any(Feedback.class));
    }
}
