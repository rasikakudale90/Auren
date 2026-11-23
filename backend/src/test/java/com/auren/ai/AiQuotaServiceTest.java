package com.auren.ai;

import com.auren.ai.dto.AiQuotaResponse;
import com.auren.ai.exception.AiQuotaExceededException;
import com.auren.ai.service.AiQuotaService;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.WorkspaceRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AiQuotaServiceTest {

    @Mock
    private WorkspaceRepository workspaceRepository;

    @InjectMocks
    private AiQuotaService quotaService;

    @Test
    @DisplayName("Retrieve quota calculates remaining and percentage correctly")
    void testGetQuotaCalculations() {
        UUID wsId = UUID.randomUUID();
        Workspace ws = Workspace.builder()
                .id(wsId)
                .aiQuotaMonthly(500)
                .aiQuotaUsed(150)
                .build();

        when(workspaceRepository.findById(wsId)).thenReturn(Optional.of(ws));

        AiQuotaResponse response = quotaService.getQuota(wsId);

        assertEquals(500, response.getMonthlyLimit());
        assertEquals(150, response.getUsed());
        assertEquals(350, response.getRemaining());
        assertEquals(30.0, response.getPercentageUsed());
    }

    @Test
    @DisplayName("Validate quota consumes token successfully when under limit")
    void testValidateAndConsumeQuotaSuccess() {
        UUID wsId = UUID.randomUUID();
        Workspace ws = Workspace.builder()
                .id(wsId)
                .aiQuotaMonthly(500)
                .aiQuotaUsed(499)
                .build();

        when(workspaceRepository.findById(wsId)).thenReturn(Optional.of(ws));

        quotaService.validateAndConsumeQuota(wsId);

        assertEquals(500, ws.getAiQuotaUsed());
        verify(workspaceRepository, times(1)).save(ws);
    }

    @Test
    @DisplayName("Validate quota throws AiQuotaExceededException when limit is reached")
    void testValidateQuotaThrowsWhenExceeded() {
        UUID wsId = UUID.randomUUID();
        Workspace ws = Workspace.builder()
                .id(wsId)
                .aiQuotaMonthly(500)
                .aiQuotaUsed(500)
                .build();

        when(workspaceRepository.findById(wsId)).thenReturn(Optional.of(ws));

        assertThrows(AiQuotaExceededException.class, () -> quotaService.validateAndConsumeQuota(wsId));
        verify(workspaceRepository, never()).save(ws);
    }
}
