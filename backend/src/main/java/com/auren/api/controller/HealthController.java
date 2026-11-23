package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        return ResponseEntity.ok(ApiResponse.ok(
                Map.of(
                        "status", "UP",
                        "service", "auren-backend",
                        "environment", System.getProperty("spring.profiles.active", "dev"),
                        "timestamp", Instant.now().toString()
                ),
                "Service is running smoothly"
        ));
    }
}
