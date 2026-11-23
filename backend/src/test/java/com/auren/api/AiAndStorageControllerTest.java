package com.auren.api;

import com.auren.ai.dto.AiQuotaResponse;
import com.auren.ai.dto.ExtractionDraft;
import com.auren.ai.service.AiExtractionService;
import com.auren.ai.service.AiQuotaService;
import com.auren.api.controller.AiExtractionController;
import com.auren.api.controller.FileController;
import com.auren.api.controller.ImportController;
import com.auren.api.controller.TrashController;
import com.auren.domain.entity.TrashItem;
import com.auren.domain.service.TrashService;
import com.auren.importer.service.CsvImportService;
import com.auren.security.jwt.AurenUserPrincipal;
import com.auren.security.jwt.JwtTokenProvider;
import com.auren.storage.service.FileStorageService;
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

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {
        AiExtractionController.class,
        FileController.class,
        ImportController.class,
        TrashController.class
})
@AutoConfigureMockMvc(addFilters = false)
class AiAndStorageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AiExtractionService aiExtractionService;

    @MockBean
    private AiQuotaService aiQuotaService;

    @MockBean
    private FileStorageService fileStorageService;

    @MockBean
    private CsvImportService csvImportService;

    @MockBean
    private TrashService trashService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @Test
    @DisplayName("GET /ai/quota returns current usage and monthly limit")
    void testGetAiQuota() throws Exception {
        UUID workspaceId = UUID.randomUUID();
        AurenUserPrincipal principal = new AurenUserPrincipal(UUID.randomUUID(), "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            Mockito.when(aiQuotaService.getQuota(workspaceId))
                    .thenReturn(new AiQuotaResponse(500, 25, 475, 5.0));

            mockMvc.perform(get("/ai/quota"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.used").value(25))
                    .andExpect(jsonPath("$.data.monthlyLimit").value(500))
                    .andExpect(jsonPath("$.data.remaining").value(475));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }

    @Test
    @DisplayName("POST /ai/extract/text extracts structured draft")
    void testExtractText() throws Exception {
        UUID workspaceId = UUID.randomUUID();
        AurenUserPrincipal principal = new AurenUserPrincipal(UUID.randomUUID(), "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            ExtractionDraft draft = new ExtractionDraft();
            draft.setCustomerName("Riya Patel");
            draft.setCustomerHandle("@riyap");
            draft.setCustomerPhone("+919876543210");
            draft.setShippingAddress("Flat 402, Mumbai");
            draft.setRawText("Hi, I want to order Blue Silk Kurti.");
            draft.setSummary("Blue Silk Kurti order inquiry");

            Mockito.when(aiExtractionService.extractFromText(eq(workspaceId), anyString())).thenReturn(draft);

            String payload = """
                    {
                        "text": "Hi, I want to order Blue Silk Kurti. My address is Flat 402, Mumbai. Riya Patel @riyap"
                    }
                    """;

            mockMvc.perform(post("/ai/extract/text")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(payload))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data.customerName").value("Riya Patel"))
                    .andExpect(jsonPath("$.data.summary").value("Blue Silk Kurti order inquiry"));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }

    @Test
    @DisplayName("GET /trash lists items currently retained in 30-day window")
    void testGetTrash() throws Exception {
        UUID workspaceId = UUID.randomUUID();
        AurenUserPrincipal principal = new AurenUserPrincipal(UUID.randomUUID(), "seller@auren.com", workspaceId);
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                principal, null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );

        org.springframework.security.core.context.SecurityContext context = org.springframework.security.core.context.SecurityContextHolder.createEmptyContext();
        context.setAuthentication(auth);
        org.springframework.security.core.context.SecurityContextHolder.setContext(context);

        try {
            TrashItem item = new TrashItem(
                    UUID.randomUUID(), workspaceId, "CUSTOMER", "Old Lead",
                    Instant.now().minusSeconds(86400), 29
            );

            Mockito.when(trashService.getTrashItems(workspaceId)).thenReturn(List.of(item));

            mockMvc.perform(get("/trash"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.success").value(true))
                    .andExpect(jsonPath("$.data[0].title").value("Old Lead"))
                    .andExpect(jsonPath("$.data[0].itemType").value("CUSTOMER"));
        } finally {
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
        }
    }

    @Test
    @DisplayName("GET /import/template/customers returns CSV template")
    void testDownloadTemplate() throws Exception {
        mockMvc.perform(get("/import/template/customers"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("text/csv"));
    }
}
