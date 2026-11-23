package com.auren.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auren.domain.entity.Workspace;
import com.auren.domain.repository.WorkspaceRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Implements SRS Section 11 & FR-AI-003:
 * Resets monthly AI quotas on the 1st day of every month at midnight.
 */
@Component
public class AiQuotaResetJob {
    private static final Logger log = LoggerFactory.getLogger(AiQuotaResetJob.class);


    private final WorkspaceRepository workspaceRepository;
    public AiQuotaResetJob(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }


    @Scheduled(cron = "${auren.jobs.quota-reset.cron:0 0 0 1 * ?}")
    @Transactional
    public void resetMonthlyQuotas() {
        log.info("Running monthly AI quota reset for all active workspaces.");

        List<Workspace> workspaces = workspaceRepository.findAll();
        for (Workspace ws : workspaces) {
            ws.setAiQuotaUsed(0);
        }
        workspaceRepository.saveAll(workspaces);

        log.info("Successfully reset AI quotas for {} workspaces.", workspaces.size());
    }
}
