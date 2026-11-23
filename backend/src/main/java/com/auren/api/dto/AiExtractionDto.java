package com.auren.api.dto;

import jakarta.validation.constraints.NotBlank;

public class AiExtractionDto {

    public static class TextExtractRequest {
        @NotBlank(message = "Message text cannot be blank")
        private String text;

        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }
}
