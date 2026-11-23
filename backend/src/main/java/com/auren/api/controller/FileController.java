package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.security.jwt.AurenUserPrincipal;
import com.auren.storage.dto.FileUploadResponse;
import com.auren.storage.service.FileStorageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    private final FileStorageService fileStorageService;
    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }


    private static final List<String> ALLOWED_TYPES = List.of(
            "image/png", "image/jpeg", "image/jpg", "image/webp"
    );
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB screenshot limit (SRS FR-FILE-003)

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<FileUploadResponse>> uploadMedia(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "screenshots") String folder,
            @AuthenticationPrincipal AurenUserPrincipal principal) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 10MB limit (SRS FR-FILE-003)");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new IllegalArgumentException("Invalid format. Allowed: PNG, JPEG, WebP. No video allowed (FR-FILE-006).");
        }

        FileUploadResponse response = fileStorageService.uploadFile(
                principal.getWorkspaceId(),
                folder,
                file.getOriginalFilename(),
                file.getBytes(),
                contentType
        );

        return ResponseEntity.ok(ApiResponse.ok(response, "File uploaded successfully to private storage"));
    }

    @GetMapping("/url")
    public ResponseEntity<ApiResponse<String>> getSignedUrl(
            @RequestParam String path,
            @RequestParam(defaultValue = "15") int expiryMinutes) {
        String signedUrl = fileStorageService.generatePresignedUrl(path, expiryMinutes);
        return ResponseEntity.ok(ApiResponse.ok(signedUrl, "Short-lived signed URL generated"));
    }
}
