package com.auren.storage.service;

import com.auren.storage.dto.FileUploadResponse;

import java.util.UUID;

/**
 * Provider-independent private object storage contract (SRS FR-FILE-001 / FR-FILE-002).
 */
public interface FileStorageService {

    FileUploadResponse uploadFile(UUID workspaceId, String folder, String filename, byte[] bytes, String contentType);

    String generatePresignedUrl(String storagePath, int expiryMinutes);

    void deleteFile(String storagePath);
}
