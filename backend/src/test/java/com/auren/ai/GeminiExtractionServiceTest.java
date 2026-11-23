package com.auren.ai;

import com.auren.ai.dto.ExtractionDraft;
import com.auren.ai.service.GeminiExtractionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class GeminiExtractionServiceTest {

    private GeminiExtractionService service;

    @BeforeEach
    void setUp() {
        // Empty API key triggers graceful fallback simulation
        service = new GeminiExtractionService(new ObjectMapper(), "", "gemini-2.5-flash");
    }

    @Test
    @DisplayName("Fallback text extraction detects pricing intent")
    void testFallbackTextExtractionPricing() {
        String message = "Hi! Can you tell me the price of the terracotta vase?";
        ExtractionDraft draft = service.extractFromText(UUID.randomUUID(), message);

        assertNotNull(draft);
        assertEquals("PRICING", draft.getIntent());
        assertEquals("INSTAGRAM", draft.getChannel());
        assertFalse(draft.getDetectedItems().isEmpty());
    }

    @Test
    @DisplayName("Fallback text extraction detects order intent and high urgency")
    void testFallbackTextExtractionOrderUrgent() {
        String message = "I want to order 2 sets right now, it is urgent for Friday!";
        ExtractionDraft draft = service.extractFromText(UUID.randomUUID(), message);

        assertNotNull(draft);
        assertEquals("ORDER", draft.getIntent());
        assertEquals("HIGH", draft.getUrgency());
    }

    @Test
    @DisplayName("Fallback image extraction extracts structured draft from screenshot")
    void testFallbackImageExtraction() {
        byte[] dummyImage = new byte[]{1, 2, 3, 4};
        ExtractionDraft draft = service.extractFromImage(UUID.randomUUID(), dummyImage, "image/png");

        assertNotNull(draft);
        assertEquals("Ananya Verma", draft.getCustomerName());
        assertEquals("@ananya_v", draft.getCustomerHandle());
        assertEquals("ORDER", draft.getIntent());
        assertNotNull(draft.getShippingAddress());
    }
}
