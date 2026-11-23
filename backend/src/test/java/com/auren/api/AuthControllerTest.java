package com.auren.api;

import com.auren.api.controller.AuthController;
import com.auren.domain.entity.User;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.UserRepository;
import com.auren.domain.repository.WorkspaceRepository;
import com.auren.email.service.EmailService;
import com.auren.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private WorkspaceRepository workspaceRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private JwtTokenProvider tokenProvider;

    @MockBean
    private EmailService emailService;

    @Test
    @DisplayName("POST /auth/signup creates account and returns token")
    void testSignupFlow() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID workspaceId = UUID.randomUUID();

        Mockito.when(userRepository.existsByEmail("seller@auren.com")).thenReturn(false);
        Mockito.when(passwordEncoder.encode(any())).thenReturn("hashed_pw");

        User savedUser = User.builder()
                .email("seller@auren.com")
                .fullName("Auren Seller")
                .passwordHash("hashed_pw")
                .build();
        savedUser.setId(userId);
        Mockito.when(userRepository.save(any(User.class))).thenReturn(savedUser);

        Workspace savedWorkspace = Workspace.builder()
                .owner(savedUser)
                .name("Auren Studio")
                .currencyCode("INR")
                .timeZone("Asia/Kolkata")
                .build();
        savedWorkspace.setId(workspaceId);
        Mockito.when(workspaceRepository.save(any(Workspace.class))).thenReturn(savedWorkspace);

        Mockito.when(tokenProvider.generateToken(eq(userId), eq("seller@auren.com"), eq(workspaceId)))
                .thenReturn("mock_jwt_token");

        String payload = """
                {
                    "email": "seller@auren.com",
                    "password": "Password123!",
                    "fullName": "Auren Seller",
                    "businessName": "Auren Studio",
                    "category": "Handmade"
                }
                """;

        mockMvc.perform(post("/auth/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("mock_jwt_token"))
                .andExpect(jsonPath("$.data.email").value("seller@auren.com"));
    }

    @Test
    @DisplayName("POST /auth/login authenticates valid credentials")
    void testLoginFlow() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID workspaceId = UUID.randomUUID();

        User user = User.builder()
                .email("seller@auren.com")
                .fullName("Auren Seller")
                .passwordHash("hashed_pw")
                .build();
        user.setId(userId);

        Workspace workspace = Workspace.builder()
                .owner(user)
                .name("Auren Studio")
                .build();
        workspace.setId(workspaceId);

        Mockito.when(userRepository.findByEmail("seller@auren.com")).thenReturn(Optional.of(user));
        Mockito.when(passwordEncoder.matches("Password123!", "hashed_pw")).thenReturn(true);
        Mockito.when(workspaceRepository.findByOwnerId(userId)).thenReturn(List.of(workspace));
        Mockito.when(tokenProvider.generateToken(userId, "seller@auren.com", workspaceId)).thenReturn("auth_jwt_token");

        String payload = """
                {
                    "email": "seller@auren.com",
                    "password": "Password123!"
                }
                """;

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.token").value("auth_jwt_token"));
    }

    @Test
    @DisplayName("POST /auth/forgot-password sends password reset email")
    void testForgotPassword() throws Exception {
        UUID userId = UUID.randomUUID();
        User user = User.builder().email("seller@auren.com").fullName("Auren Seller").build();
        user.setId(userId);

        Mockito.when(userRepository.findByEmail("seller@auren.com")).thenReturn(Optional.of(user));
        Mockito.when(tokenProvider.generateToken(userId, "seller@auren.com", null)).thenReturn("reset_jwt_token");

        String payload = """
                {
                    "email": "seller@auren.com"
                }
                """;

        mockMvc.perform(post("/auth/forgot-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        Mockito.verify(emailService).sendPasswordResetEmail(eq("seller@auren.com"), eq("reset_jwt_token"));
    }
}
