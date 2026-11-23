package com.auren.ai.service;

import com.auren.ai.dto.ExtractionDraft;

import java.util.UUID;

/**
 * Provider-independent AI service abstraction for social commerce extraction.
 * Complies with AUREN_Agents.md Rule 2 & SRS Section 3.
 */
public interface AiExtractionService {

    /**
     * Extracts structured customer enquiry draft from text (pasted DM or message).
     */
    ExtractionDraft extractFromText(UUID workspaceId, String text);

    /**
     * Extracts structured customer enquiry draft from multimodal image (chat screenshot).
     */
    ExtractionDraft extractFromImage(UUID workspaceId, byte[] imageBytes, String mimeType);
}
