package com.auren.api.controller;

import com.auren.admin.dto.AdminMetricsResponse;
import com.auren.admin.service.AdminService;
import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.Feedback;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/metrics")
    public ResponseEntity<ApiResponse<AdminMetricsResponse>> getMetrics() {
        AdminMetricsResponse metrics = adminService.getPlatformMetrics();
        return ResponseEntity.ok(ApiResponse.ok(metrics, "Platform aggregate metrics retrieved"));
    }

    @GetMapping("/feedback")
    public ResponseEntity<ApiResponse<List<Feedback>>> getFeedback() {
        List<Feedback> feedback = adminService.getAllFeedback();
        return ResponseEntity.ok(ApiResponse.ok(feedback, "Feedback records retrieved"));
    }
}
