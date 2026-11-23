package com.auren.storage.dto;

import java.time.Instant;

public class FileUploadResponse {
    private String storagePath;
    private String signedUrl;
    private String fileName;
    private long fileSize;
    private String contentType;
    private Instant expiresAt;

    public FileUploadResponse() {}

    public FileUploadResponse(String storagePath, String signedUrl, String fileName, long fileSize, String contentType, Instant expiresAt) {
        this.storagePath = storagePath;
        this.signedUrl = signedUrl;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.contentType = contentType;
        this.expiresAt = expiresAt;
    }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

    public String getSignedUrl() { return signedUrl; }
    public void setSignedUrl(String signedUrl) { this.signedUrl = signedUrl; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public long getFileSize() { return fileSize; }
    public void setFileSize(long fileSize) { this.fileSize = fileSize; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public Instant getExpiresAt() { return expiresAt; }
    public void setExpiresAt(Instant expiresAt) { this.expiresAt = expiresAt; }

    public static FileUploadResponseBuilder builder() { return new FileUploadResponseBuilder(); }

    public static class FileUploadResponseBuilder {
        private String storagePath;
        private String signedUrl;
        private String fileName;
        private long fileSize;
        private String contentType;
        private Instant expiresAt;

        public FileUploadResponseBuilder storagePath(String storagePath) { this.storagePath = storagePath; return this; }
        public FileUploadResponseBuilder signedUrl(String signedUrl) { this.signedUrl = signedUrl; return this; }
        public FileUploadResponseBuilder fileName(String fileName) { this.fileName = fileName; return this; }
        public FileUploadResponseBuilder fileSize(long fileSize) { this.fileSize = fileSize; return this; }
        public FileUploadResponseBuilder contentType(String contentType) { this.contentType = contentType; return this; }
        public FileUploadResponseBuilder expiresAt(Instant expiresAt) { this.expiresAt = expiresAt; return this; }

        public FileUploadResponse build() {
            return new FileUploadResponse(storagePath, signedUrl, fileName, fileSize, contentType, expiresAt);
        }
    }
}
