package com.auren.api.controller;

import com.auren.admin.service.AdminService;
import com.auren.api.dto.ApiResponse;
import com.auren.security.jwt.AurenUserPrincipal;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    private final AdminService adminService;
    public FeedbackController(AdminService adminService) {
        this.adminService = adminService;
    }


    public static class FeedbackRequest {
        private String category; // BUG, FEATURE_REQUEST, GENERAL
        @NotBlank
        private String message;
        private Integer rating; // 1 to 5

        public FeedbackRequest() {}

        public FeedbackRequest(String category, String message, Integer rating) {
            this.category = category;
            this.message = message;
            this.rating = rating;
        }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public Integer getRating() { return rating; }
        public void setRating(Integer rating) { this.rating = rating; }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> submitFeedback(
            @RequestBody FeedbackRequest req,
            @AuthenticationPrincipal AurenUserPrincipal principal) {

        adminService.submitFeedback(principal.getUserId(), req.getCategory(), req.getMessage(), req.getRating());
        return ResponseEntity.ok(ApiResponse.ok(null, "Feedback submitted successfully. Thank you!"));
    }
}
