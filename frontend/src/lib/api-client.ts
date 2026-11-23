/**
 * AUREN API Client for Spring Boot Backend Integration (Phase B2)
 * Handles JWT Bearer attachment, tenant workspace scoping, and standardized error parsing.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export interface ExtractedDraftResponse {
  channel: string;
  customerName: string;
  customerHandle?: string;
  customerPhone?: string;
  intent: string;
  urgency: string;
  rawText: string;
  summary: string;
  detectedItems: {
    name: string;
    quantity: number;
    estimatedPrice?: number;
    notes?: string;
  }[];
  shippingAddress?: string;
  confidenceScore: number;
}

export interface AiQuotaData {
  monthlyLimit: number;
  used: number;
  remaining: number;
  percentageUsed: number;
}

class ApiClient {
  private getHeaders(isMultipart = false): Record<string, string> {
    const headers: Record<string, string> = {};

    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auren_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const workspaceId = localStorage.getItem("auren_workspace_id");
      if (workspaceId) {
        headers["X-Workspace-Id"] = workspaceId;
      }
    }

    return headers;
  }

  private async handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Request failed with status ${res.status}`);
    }
    const json: ApiResponse<T> = await res.json();
    return json.data;
  }

  // --- Auth APIs ---
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse<{ token: string; userId: string; workspaceId: string }>(res);
  }

  async signup(data: { email: string; password: string; fullName: string; businessName?: string; category?: string }) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<{ token: string; userId: string; workspaceId: string }>(res);
  }

  // --- Gemini AI Multimodal APIs ---
  async extractText(text: string): Promise<ExtractedDraftResponse> {
    const res = await fetch(`${API_BASE_URL}/ai/extract/text`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
    return this.handleResponse<ExtractedDraftResponse>(res);
  }

  async extractImage(file: File): Promise<ExtractedDraftResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/ai/extract/image`, {
      method: "POST",
      headers: this.getHeaders(true),
      body: formData,
    });
    return this.handleResponse<ExtractedDraftResponse>(res);
  }

  async getAiQuota(): Promise<AiQuotaData> {
    const res = await fetch(`${API_BASE_URL}/ai/quota`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<AiQuotaData>(res);
  }

  // --- Customer Merge API (Domain Invariant B) ---
  async mergeCustomers(primaryCustomerId: string, duplicateCustomerId: string) {
    const res = await fetch(`${API_BASE_URL}/customers/merge`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ primaryCustomerId, duplicateCustomerId }),
    });
    return this.handleResponse<any>(res);
  }

  // --- Order Payment API (Domain Invariant A) ---
  async recordPayment(orderId: string, paymentAmount: number, paymentMethod: string) {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/payments`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ paymentAmount, paymentMethod }),
    });
    return this.handleResponse<any>(res);
  }

  // --- Follow-up Snooze API ---
  async snoozeFollowUp(followUpId: string, days = 2) {
    const res = await fetch(`${API_BASE_URL}/follow-ups/${followUpId}/snooze?days=${days}`, {
      method: "PATCH",
      headers: this.getHeaders(),
    });
    return this.handleResponse<any>(res);
  }

  // --- 30-Day Trash Retention API (Domain Invariant C) ---
  async getTrashItems() {
    const res = await fetch(`${API_BASE_URL}/trash`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse<any[]>(res);
  }

  async restoreTrashItem(itemType: string, itemId: string) {
    const res = await fetch(`${API_BASE_URL}/trash/restore?itemType=${itemType}&itemId=${itemId}`, {
      method: "POST",
      headers: this.getHeaders(),
    });
    return this.handleResponse<void>(res);
  }
}

export const apiClient = new ApiClient();
