package com.auren.admin.dto;

public class AdminMetricsResponse {
    private long totalUsers;
    private long totalWorkspaces;
    private long totalOrders;
    private long totalEnquiries;
    private long totalFeedbackSubmissions;

    public AdminMetricsResponse() {}

    public AdminMetricsResponse(long totalUsers, long totalWorkspaces, long totalOrders, long totalEnquiries, long totalFeedbackSubmissions) {
        this.totalUsers = totalUsers;
        this.totalWorkspaces = totalWorkspaces;
        this.totalOrders = totalOrders;
        this.totalEnquiries = totalEnquiries;
        this.totalFeedbackSubmissions = totalFeedbackSubmissions;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalWorkspaces() { return totalWorkspaces; }
    public void setTotalWorkspaces(long totalWorkspaces) { this.totalWorkspaces = totalWorkspaces; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public long getTotalEnquiries() { return totalEnquiries; }
    public void setTotalEnquiries(long totalEnquiries) { this.totalEnquiries = totalEnquiries; }

    public long getTotalFeedbackSubmissions() { return totalFeedbackSubmissions; }
    public void setTotalFeedbackSubmissions(long totalFeedbackSubmissions) { this.totalFeedbackSubmissions = totalFeedbackSubmissions; }

    public static AdminMetricsResponseBuilder builder() { return new AdminMetricsResponseBuilder(); }

    public static class AdminMetricsResponseBuilder {
        private long totalUsers;
        private long totalWorkspaces;
        private long totalOrders;
        private long totalEnquiries;
        private long totalFeedbackSubmissions;

        public AdminMetricsResponseBuilder totalUsers(long totalUsers) { this.totalUsers = totalUsers; return this; }
        public AdminMetricsResponseBuilder totalWorkspaces(long totalWorkspaces) { this.totalWorkspaces = totalWorkspaces; return this; }
        public AdminMetricsResponseBuilder totalOrders(long totalOrders) { this.totalOrders = totalOrders; return this; }
        public AdminMetricsResponseBuilder totalEnquiries(long totalEnquiries) { this.totalEnquiries = totalEnquiries; return this; }
        public AdminMetricsResponseBuilder totalFeedbackSubmissions(long totalFeedbackSubmissions) { this.totalFeedbackSubmissions = totalFeedbackSubmissions; return this; }

        public AdminMetricsResponse build() {
            return new AdminMetricsResponse(totalUsers, totalWorkspaces, totalOrders, totalEnquiries, totalFeedbackSubmissions);
        }
    }
}
