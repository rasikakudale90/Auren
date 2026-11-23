package com.auren.ai.service;

import com.auren.ai.dto.AiQuotaResponse;
import com.auren.ai.exception.AiQuotaExceededException;
import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.WorkspaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Enforces SRS FR-AI-003: AI Quota Tracking & Monthly Limits.
 */
@Service
public class AiQuotaService {

    private final WorkspaceRepository workspaceRepository;
    public AiQuotaService(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }


    public AiQuotaResponse getQuota(UUID workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found: " + workspaceId));

        int limit = workspace.getAiQuotaMonthly() != null ? workspace.getAiQuotaMonthly() : 500;
        int used = workspace.getAiQuotaUsed() != null ? workspace.getAiQuotaUsed() : 0;
        int remaining = Math.max(0, limit - used);
        double percentage = limit > 0 ? (double) used / limit * 100.0 : 100.0;

        return AiQuotaResponse.builder()
                .monthlyLimit(limit)
                .used(used)
                .remaining(remaining)
                .percentageUsed(Math.round(percentage * 10.0) / 10.0)
                .build();
    }

    @Transactional
    public void validateAndConsumeQuota(UUID workspaceId) {
        Workspace workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new IllegalArgumentException("Workspace not found: " + workspaceId));

        int limit = workspace.getAiQuotaMonthly() != null ? workspace.getAiQuotaMonthly() : 500;
        int used = workspace.getAiQuotaUsed() != null ? workspace.getAiQuotaUsed() : 0;

        if (used >= limit) {
            throw new AiQuotaExceededException(
                    "Monthly AI extraction quota reached (" + used + "/" + limit + "). Please upgrade or wait for quota reset."
            );
        }

        workspace.setAiQuotaUsed(used + 1);
        workspaceRepository.save(workspace);
    }
}
