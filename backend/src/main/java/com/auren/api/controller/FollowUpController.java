package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.FollowUp;
import com.auren.domain.repository.FollowUpRepository;
import com.auren.security.jwt.AurenUserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/follow-ups")
public class FollowUpController {

    private final FollowUpRepository followUpRepository;
    public FollowUpController(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<FollowUp>>> listFollowUps(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<FollowUp> tasks = followUpRepository.findByWorkspaceIdAndIsDeletedFalse(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(tasks, "Follow-up tasks retrieved"));
    }

    @PatchMapping("/{id}/snooze")
    public ResponseEntity<ApiResponse<FollowUp>> snoozeTask(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "2") int days,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        FollowUp followUp = followUpRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Follow-up task not found: " + id));
        followUp.snoozeDays(days);
        return ResponseEntity.ok(ApiResponse.ok(followUpRepository.save(followUp), "Task snoozed by " + days + " days"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> softDeleteFollowUp(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        FollowUp followUp = followUpRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Follow-up task not found: " + id));
        followUp.markDeleted();
        followUpRepository.save(followUp);
        return ResponseEntity.ok(ApiResponse.ok(null, "Follow-up task moved to 30-day trash retention"));
    }
}
