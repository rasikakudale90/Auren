package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.TrashItem;
import com.auren.domain.service.TrashService;
import com.auren.security.jwt.AurenUserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/trash")
@RequiredArgsConstructor
public class TrashController {

    private final TrashService trashService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TrashItem>>> getTrash(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<TrashItem> items = trashService.getTrashItems(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(items, "30-day trash retention items retrieved"));
    }

    @PostMapping("/restore")
    public ResponseEntity<ApiResponse<Void>> restoreItem(
            @RequestParam String itemType,
            @RequestParam UUID itemId,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        trashService.restoreItem(principal.getWorkspaceId(), itemType, itemId);
        return ResponseEntity.ok(ApiResponse.ok(null, "Item restored successfully"));
    }
}
