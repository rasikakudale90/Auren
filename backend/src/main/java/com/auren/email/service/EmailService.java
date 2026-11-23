package com.auren.email.service;

import java.util.concurrent.CompletableFuture;

/**
 * Provider-independent transactional email service abstraction (SRS Section 12).
 */
public interface EmailService {

    CompletableFuture<Void> sendVerificationEmail(String recipientEmail, String verificationToken);

    CompletableFuture<Void> sendPasswordResetEmail(String recipientEmail, String resetToken);

    CompletableFuture<Void> sendSecurityAlert(String recipientEmail, String subject, String body);
}
