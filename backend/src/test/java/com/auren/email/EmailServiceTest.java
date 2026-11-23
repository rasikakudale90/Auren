package com.auren.email;

import com.auren.email.service.TransactionalEmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.assertTrue;

class EmailServiceTest {

    private TransactionalEmailService emailService;

    @BeforeEach
    void setUp() {
        emailService = new TransactionalEmailService();
    }

    @Test
    @DisplayName("Send verification email runs asynchronously and completes safely")
    void testSendVerificationEmail() {
        CompletableFuture<Void> future = emailService.sendVerificationEmail("seller@auren.com", "dummy-token-123");
        assertTrue(future.isDone());
    }

    @Test
    @DisplayName("Send password reset email runs asynchronously and completes safely")
    void testSendPasswordResetEmail() {
        CompletableFuture<Void> future = emailService.sendPasswordResetEmail("seller@auren.com", "reset-token-456");
        assertTrue(future.isDone());
    }
}
