package com.auren.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.auren.domain.entity.FollowUp;
import com.auren.domain.repository.FollowUpRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

/**
 * Implements SRS Section 11 Job 1:
 * Scans for due/overdue follow-ups and logs operational alerts.
 * Runs hourly.
 */
@Component
public class FollowUpScannerJob {
    private static final Logger log = LoggerFactory.getLogger(FollowUpScannerJob.class);


    private final FollowUpRepository followUpRepository;
    public FollowUpScannerJob(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }


    @Scheduled(cron = "${auren.jobs.followup-scanner.cron:0 0 * * * ?}")
    public void scanDueFollowUps() {
        Instant now = Instant.now();
        List<FollowUp> overdue = followUpRepository.findAll().stream()
                .filter(f -> !Boolean.TRUE.equals(f.getIsDeleted()) &&
                             !"COMPLETED".equalsIgnoreCase(f.getStatus()) &&
                             f.getDueDate() != null && f.getDueDate().isBefore(now))
                .toList();

        if (!overdue.isEmpty()) {
            log.warn("Detected {} overdue follow-up tasks requiring urgent seller attention.", overdue.size());
        }
    }
}
