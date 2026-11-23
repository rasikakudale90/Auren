package com.auren.storage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileUploadResponse {
    private String storagePath;
    private String signedUrl;
    private String fileName;
    private long fileSize;
    private String contentType;
    private Instant expiresAt;
}
