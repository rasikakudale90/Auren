package com.auren.api.controller;

import com.auren.ai.dto.AiQuotaResponse;
import com.auren.ai.dto.ExtractionDraft;
import com.auren.ai.service.AiExtractionService;
import com.auren.ai.service.AiQuotaService;
import com.auren.api.dto.AiExtractionDto;
import com.auren.api.dto.ApiResponse;
import com.auren.security.jwt.AurenUserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
@Slf4j
public class AiExtractionController {

    private final AiExtractionService aiExtractionService;
    private final AiQuotaService aiQuotaService;

    private static final List<String> ALLOWED_IMAGE_TYPES = List.of(
            "image/png", "image/jpeg", "image/jpg", "image/webp"
    );
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per SRS FR-ENQ-003

    @PostMapping("/extract/text")
    public ResponseEntity<ApiResponse<ExtractionDraft>> extractFromText(
            @Valid @RequestBody AiExtractionDto.TextExtractRequest request,
            @AuthenticationPrincipal AurenUserPrincipal principal) {

        aiQuotaService.validateAndConsumeQuota(principal.getWorkspaceId());
        ExtractionDraft draft = aiExtractionService.extractFromText(principal.getWorkspaceId(), request.getText());

        return ResponseEntity.ok(ApiResponse.ok(draft, "Draft extracted successfully"));
    }

    @PostMapping(value = "/extract/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ExtractionDraft>> extractFromImage(
            @RequestParam("file") MultipartFile file,
            @AuthenticationPrincipal AurenUserPrincipal principal) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Screenshot file is required");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 10MB limit (SRS FR-ENQ-003)");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_IMAGE_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid image format. Allowed: PNG, JPEG, WebP");
        }

        aiQuotaService.validateAndConsumeQuota(principal.getWorkspaceId());
        ExtractionDraft draft = aiExtractionService.extractFromImage(
                principal.getWorkspaceId(),
                file.getBytes(),
                contentType
        );

        return ResponseEntity.ok(ApiResponse.ok(draft, "Draft extracted from screenshot"));
    }

    @GetMapping("/quota")
    public ResponseEntity<ApiResponse<AiQuotaResponse>> getQuota(
            @AuthenticationPrincipal AurenUserPrincipal principal) {

        AiQuotaResponse quota = aiQuotaService.getQuota(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(quota, "AI quota retrieved"));
    }
}
