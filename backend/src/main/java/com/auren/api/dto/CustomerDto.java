package com.auren.api.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class CustomerDto {

    public static class MergeRequest {
        @NotNull
        private UUID primaryCustomerId;

        @NotNull
        private UUID duplicateCustomerId;

        public UUID getPrimaryCustomerId() { return primaryCustomerId; }
        public void setPrimaryCustomerId(UUID primaryCustomerId) { this.primaryCustomerId = primaryCustomerId; }
        public UUID getDuplicateCustomerId() { return duplicateCustomerId; }
        public void setDuplicateCustomerId(UUID duplicateCustomerId) { this.duplicateCustomerId = duplicateCustomerId; }
    }
}
