package com.auren.api.controller;

import com.auren.api.dto.ApiResponse;
import com.auren.domain.entity.Enquiry;
import com.auren.domain.repository.EnquiryRepository;
import com.auren.security.jwt.AurenUserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/enquiries")
public class EnquiryController {

    private final EnquiryRepository enquiryRepository;
    public EnquiryController(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> listEnquiries(
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        List<Enquiry> enquiries = enquiryRepository.findByWorkspaceIdAndIsDeletedFalse(principal.getWorkspaceId());
        return ResponseEntity.ok(ApiResponse.ok(enquiries, "Enquiries retrieved"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Enquiry>> getEnquiry(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Enquiry enquiry = enquiryRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Enquiry not found: " + id));
        return ResponseEntity.ok(ApiResponse.ok(enquiry, "Enquiry found"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> softDeleteEnquiry(
            @PathVariable UUID id,
            @AuthenticationPrincipal AurenUserPrincipal principal) {
        Enquiry enquiry = enquiryRepository.findByIdAndWorkspaceId(id, principal.getWorkspaceId())
                .orElseThrow(() -> new IllegalArgumentException("Enquiry not found: " + id));
        enquiry.markDeleted();
        enquiryRepository.save(enquiry);
        return ResponseEntity.ok(ApiResponse.ok(null, "Enquiry moved to 30-day trash retention"));
    }
}
