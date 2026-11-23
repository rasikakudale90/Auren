package com.auren.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminMetricsResponse {
    private long totalUsers;
    private long totalWorkspaces;
    private long totalOrders;
    private long totalEnquiries;
    private long totalFeedbackSubmissions;
}
