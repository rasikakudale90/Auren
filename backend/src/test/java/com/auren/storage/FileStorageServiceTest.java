package com.auren.storage;

import com.auren.storage.dto.FileUploadResponse;
import com.auren.storage.service.SupabaseStorageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class FileStorageServiceTest {

    private SupabaseStorageService storageService;

    @BeforeEach
    void setUp() {
        storageService = new SupabaseStorageService();
    }

    @Test
    @DisplayName("Upload file generates tenant-scoped path and 15-minute signed URL")
    void testUploadFileAndSignedUrl() {
        UUID wsId = UUID.randomUUID();
        byte[] dummyData = "dummy screenshot content".getBytes();

        FileUploadResponse res = storageService.uploadFile(wsId, "screenshots", "chat.png", dummyData, "image/png");

        assertNotNull(res);
        assertTrue(res.getStoragePath().startsWith(wsId.toString()));
        assertTrue(res.getStoragePath().contains("screenshots"));
        assertNotNull(res.getSignedUrl());
        assertNotNull(res.getExpiresAt());
        assertEquals("chat.png", res.getFileName());
    }
}
