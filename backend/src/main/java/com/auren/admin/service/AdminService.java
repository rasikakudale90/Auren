package com.auren.admin.service;

import com.auren.admin.dto.AdminMetricsResponse;
import com.auren.domain.entity.Feedback;
import com.auren.domain.entity.User;
import com.auren.domain.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

/**
 * Implements SRS Section 5.14 Platform Administration & Privacy-Safe Metrics.
 */
@Service
public class AdminService {

    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final OrderRepository orderRepository;
    private final EnquiryRepository enquiryRepository;
    private final FeedbackRepository feedbackRepository;
    public AdminService(UserRepository userRepository, WorkspaceRepository workspaceRepository, OrderRepository orderRepository, EnquiryRepository enquiryRepository, FeedbackRepository feedbackRepository) {
        this.userRepository = userRepository;
        this.workspaceRepository = workspaceRepository;
        this.orderRepository = orderRepository;
        this.enquiryRepository = enquiryRepository;
        this.feedbackRepository = feedbackRepository;
    }


    public AdminMetricsResponse getPlatformMetrics() {
        return AdminMetricsResponse.builder()
                .totalUsers(userRepository.count())
                .totalWorkspaces(workspaceRepository.count())
                .totalOrders(orderRepository.count())
                .totalEnquiries(enquiryRepository.count())
                .totalFeedbackSubmissions(feedbackRepository.count())
                .build();
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public void submitFeedback(UUID userId, String category, String message, Integer rating) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + userId));

        Feedback fb = Feedback.builder()
                .user(user)
                .category(category != null ? category : "GENERAL")
                .message(message)
                .rating(rating)
                .build();

        feedbackRepository.save(fb);
    }
}
