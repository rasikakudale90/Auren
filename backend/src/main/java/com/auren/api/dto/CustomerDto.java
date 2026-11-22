package com.auren.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.UUID;

public class CustomerDto {

    @Data
    public static class MergeRequest {
        @NotNull
        private UUID primaryCustomerId;

        @NotNull
        private UUID duplicateCustomerId;
    }
}
