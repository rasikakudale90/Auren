package com.auren.api;

import com.auren.admin.dto.AdminMetricsResponse;
import com.auren.admin.service.AdminService;
import com.auren.api.controller.AdminController;
import com.auren.api.controller.FeedbackController;
import com.auren.api.controller.HealthController;
import com.auren.security.jwt.AurenUserPrincipal;
import com.auren.security.jwt.JwtTokenProvider;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {HealthController.class, AdminController.class, FeedbackController.class})
@AutoConfigureMockMvc(addFilters = false)
class HealthAndAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("GET /health returns 200 and UP status")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("UP"))
                .andExpect(jsonPath("$.data.service").value("auren-backend"));
    }

    @Test
    @DisplayName("GET /admin/metrics returns aggregate platform metrics")
    void testAdminMetrics() throws Exception {
        AdminMetricsResponse metrics = new AdminMetricsResponse(45L, 38L, 210L, 120L, 15L);
        Mockito.when(adminService.getPlatformMetrics()).thenReturn(metrics);

        mockMvc.perform(get("/admin/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalUsers").value(45))
                .andExpect(jsonPath("$.data.totalOrders").value(210));
    }

    @Test
    @DisplayName("POST /feedback records feedback successfully")
    void testFeedbackSubmission() throws Exception {
        UUID userId = UUID.randomUUID();
        UUID workspaceId = UUID.randomUUID();
        AurenUserPrincipal principal = new AurenUserPrincipal(userId, "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        String jsonPayload = """
                {
                    "category": "FEATURE_REQUEST",
                    "message": "Add dark mode toggle for mobile view",
                    "rating": 5
                }
                """;

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            mockMvc.perform(post("/feedback")
                            .principal(auth)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(jsonPayload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.message").value("Feedback submitted successfully. Thank you!"));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }
}
