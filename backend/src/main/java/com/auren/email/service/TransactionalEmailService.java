package com.auren.email.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

/**
 * Transactional Email Service implementation.
 * Dispatches asynchronously without blocking the user (SRS Section 12 rules).
 */
@Service
public class TransactionalEmailService implements EmailService {
    private static final Logger log = LoggerFactory.getLogger(TransactionalEmailService.class);


    @Value("${auren.email.from:noreply@auren.com}")
    private String fromEmail;

    @Value("${auren.app.url:http://localhost:3000}")
    private String appUrl;

    @Override
    @Async
    public CompletableFuture<Void> sendVerificationEmail(String recipientEmail, String verificationToken) {
        String link = appUrl + "/verify-email?token=" + verificationToken;
        log.info("[EMAIL DISPATCH] To: {} | Subject: Verify your AUREN account | Link: {}", recipientEmail, link);
        // Transactional SMTP / Resend dispatch happens here in production
        return CompletableFuture.completedFuture(null);
    }

    @Override
    @Async
    public CompletableFuture<Void> sendPasswordResetEmail(String recipientEmail, String resetToken) {
        String link = appUrl + "/reset-password?token=" + resetToken;
        log.info("[EMAIL DISPATCH] To: {} | Subject: Reset your AUREN password | Link: {}", recipientEmail, link);
        return CompletableFuture.completedFuture(null);
    }

    @Override
    @Async
    public CompletableFuture<Void> sendSecurityAlert(String recipientEmail, String subject, String body) {
        log.info("[SECURITY ALERT EMAIL] To: {} | Subject: {} | Message: {}", recipientEmail, subject, body);
        return CompletableFuture.completedFuture(null);
    }
}
