package com.auren.api.controller;

import com.auren.admin.service.AdminService;
import com.auren.api.dto.ApiResponse;
import com.auren.security.jwt.AurenUserPrincipal;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final AdminService adminService;

    @Data
    public static class FeedbackRequest {
        private String category; // BUG, FEATURE_REQUEST, GENERAL
        @NotBlank
        private String message;
        private Integer rating; // 1 to 5
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitFeedback(
            @RequestBody FeedbackRequest req,
            @AuthenticationPrincipal AurenUserPrincipal principal) {

        adminService.submitFeedback(principal.getUserId(), req.getCategory(), req.getMessage(), req.getRating());
        return ResponseEntity.ok(ApiResponse.ok(null, "Feedback submitted successfully. Thank you!"));
    }
}
