package com.auren.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

public class AiExtractionDto {

    @Data
    public static class TextExtractRequest {
        @NotBlank(message = "Message text cannot be blank")
        private String text;
    }
}
