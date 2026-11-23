package com.auren.ai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetectedItem {
    private String name;
    @Builder.Default
    private Integer quantity = 1;
    private BigDecimal estimatedPrice;
    private String notes;
}
