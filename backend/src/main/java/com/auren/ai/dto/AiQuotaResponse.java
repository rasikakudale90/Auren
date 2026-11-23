package com.auren.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiQuotaResponse {
    private int monthlyLimit;
    private int used;
    private int remaining;
    private double percentageUsed;
}
