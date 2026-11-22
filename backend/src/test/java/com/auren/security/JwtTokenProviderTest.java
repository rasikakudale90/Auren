package com.auren.security;

import com.auren.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtTokenProviderTest {

    private JwtTokenProvider tokenProvider;
    private final String secret = "1234567890123456789012345678901234567890123456789012345678901234";

    @BeforeEach
    void setUp() {
        tokenProvider = new JwtTokenProvider(secret, 3600000);
    }

    @Test
    @DisplayName("Generate and parse valid JWT claims with tenant workspace isolation")
    void testTokenGenerationAndValidation() {
        UUID userId = UUID.randomUUID();
        UUID workspaceId = UUID.randomUUID();
        String email = "artisan@auren.com";

        String token = tokenProvider.generateToken(userId, email, workspaceId);

        assertNotNull(token);
        assertTrue(tokenProvider.validateToken(token));
        assertEquals(userId, tokenProvider.getUserIdFromToken(token));
        assertEquals(email, tokenProvider.getEmailFromToken(token));
        assertEquals(workspaceId, tokenProvider.getWorkspaceIdFromToken(token));
    }

    @Test
    @DisplayName("Invalid token fails validation safely")
    void testInvalidToken() {
        assertFalse(tokenProvider.validateToken("invalid.token.payload"));
    }
}
