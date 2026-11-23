package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.api.dto.AuthDto;
import com.auren.api.dto.PasswordResetDto;
import com.auren.domain.entity.User;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.UserRepository;
import com.auren.domain.repository.WorkspaceRepository;
import com.auren.email.service.EmailService;
import com.auren.security.jwt.JwtTokenProvider;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final WorkspaceRepository workspaceRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;
    private final EmailService emailService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> signup(@Valid @RequestBody AuthDto.SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + req.getEmail());
        }

        User user = User.builder()
                .email(req.getEmail())
                .fullName(req.getFullName())
                .passwordHash(passwordEncoder.encode(req.getPassword()))
                .build();
        user = userRepository.save(user);

        String businessName = req.getBusinessName() != null && !req.getBusinessName().isBlank()
                ? req.getBusinessName()
                : req.getFullName() + "'s Studio";

        Workspace workspace = Workspace.builder()
                .owner(user)
                .name(businessName)
                .category(req.getCategory() != null ? req.getCategory() : "Handmade & Crafts")
                .currencyCode("INR")
                .timeZone("Asia/Kolkata")
                .build();
        workspace = workspaceRepository.save(workspace);

        String token = tokenProvider.generateToken(user.getId(), user.getEmail(), workspace.getId());

        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.setToken(token);
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setWorkspaceId(workspace.getId());
        response.setBusinessName(workspace.getName());

        return ResponseEntity.ok(ApiResponse.ok(response, "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthDto.AuthResponse>> login(@Valid @RequestBody AuthDto.LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        List<Workspace> workspaces = workspaceRepository.findByOwnerId(user.getId());
        Workspace primaryWorkspace = workspaces.isEmpty() ? null : workspaces.get(0);

        String token = tokenProvider.generateToken(
                user.getId(),
                user.getEmail(),
                primaryWorkspace != null ? primaryWorkspace.getId() : null
        );

        AuthDto.AuthResponse response = new AuthDto.AuthResponse();
        response.setToken(token);
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        if (primaryWorkspace != null) {
            response.setWorkspaceId(primaryWorkspace.getId());
            response.setBusinessName(primaryWorkspace.getName());
        }

        return ResponseEntity.ok(ApiResponse.ok(response, "Login successful"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody PasswordResetDto.ForgotPasswordRequest req) {
        userRepository.findByEmail(req.getEmail()).ifPresent(user -> {
            String resetToken = tokenProvider.generateToken(user.getId(), user.getEmail(), null);
            emailService.sendPasswordResetEmail(user.getEmail(), resetToken);
        });
        return ResponseEntity.ok(ApiResponse.ok(null, "If an account exists, a reset link has been dispatched to your email."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody PasswordResetDto.ResetPasswordRequest req) {
        if (!tokenProvider.validateToken(req.getToken())) {
            throw new IllegalArgumentException("Invalid or expired password reset token");
        }
        UUID userId = tokenProvider.getUserIdFromToken(req.getToken());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);

        emailService.sendSecurityAlert(user.getEmail(), "Password Changed", "Your AUREN account password was successfully updated.");
        return ResponseEntity.ok(ApiResponse.ok(null, "Password reset successfully. You can now log in."));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody PasswordResetDto.VerifyEmailRequest req) {
        if (!tokenProvider.validateToken(req.getToken())) {
            throw new IllegalArgumentException("Invalid or expired verification token");
        }
        return ResponseEntity.ok(ApiResponse.ok(null, "Email verified successfully"));
    }
}
