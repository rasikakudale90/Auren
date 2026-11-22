package com.auren.api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.UUID;

public class AuthDto {

    @Data
    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
    }

    @Data
    public static class SignupRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        @NotBlank
        private String fullName;
        private String businessName;
        private String category;
    }

    @Data
    public static class AuthResponse {
        private String token;
        private UUID userId;
        private String email;
        private String fullName;
        private UUID workspaceId;
        private String businessName;
    }
}
