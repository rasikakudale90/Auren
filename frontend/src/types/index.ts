// AUREN Domain Data Models matching docs/AUREN_SRS.md

export type SourceChannel =
  | "Instagram"
  | "WhatsApp"
  | "Facebook"
  | "Telegram"
  | "Website"
  | "Phone call"
  | "Walk-in"
  | "Referral"
  | "Other";

export type EnquiryStatus =
  | "New"
  | "Replied"
  | "Interested"
  | "Waiting for Customer"
  | "Converted"
  | "Lost";

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export type PaymentStatus =
  | "Unpaid"
  | "Partially Paid"
  | "Paid"
  | "Refunded";

export type PaymentMethod =
  | "Cash"
  | "UPI"
  | "Bank Transfer"
  | "Card"
  | "Other";

export interface Business {
  id: string;
  name: string;
  category: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  logoUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  aiQuotaUsed: number;
  aiQuotaLimit: number;
  aiQuotaResetDate: string;
}

export interface Customer {
  id: string;
  businessId: string;
  name: string;
  phone?: string;
  email?: string;
  socialHandle?: string;
  channel?: SourceChannel;
  tags: string[];
  notes?: string;
  totalEnquiries: number;
  totalOrders: number;
  totalSpend: number;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryExtractedDraft {
  customerName?: string;
  socialHandle?: string;
  phone?: string;
  productInterest?: string;
  variant?: string;
  quantity?: number;
  customizationNotes?: string;
  deliveryLocation?: string;
  budgetOrAgreedPrice?: number;
  urgencyOrRequiredDate?: string;
  enquiryType?: string;
  suggestedCustomerMatchId?: string;
  suggestedFollowUpDate?: string;
}

export interface Enquiry {
  id: string;
  businessId: string;
  customerId?: string;
  customerName: string;
  customerHandle?: string;
  customerPhone?: string;
  sourceChannel: SourceChannel;
  status: EnquiryStatus;
  originalMessage: string;
  messageNotes?: string;
  productInterest?: string;
  variant?: string;
  quantity?: number;
  expectedValue?: number;
  followUpDate?: string;
  receivedAt: string;
  createdAt: string;
  updatedAt: string;
  screenshots?: string[];
  isAiExtracted?: boolean;
}

export interface FollowUp {
  id: string;
  businessId: string;
  enquiryId?: string;
  customerId?: string;
  customerName: string;
  customerHandle?: string;
  dueAt: string;
  note: string;
  status: "Pending" | "Completed";
  completedAt?: string;
  sourceChannel: SourceChannel;
  productInterest?: string;
}

export interface OrderItem {
  id: string;
  productId?: string;
  productName: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PaymentRecord {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  recordedAt: string;
  referenceNote?: string;
  type: "Payment" | "Refund";
}

export interface Order {
  id: string;
  orderReference: string; // e.g. ORD-2026-081
  businessId: string;
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerHandle?: string;
  enquiryId?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryAddress?: string;
  deliveryDateExpected?: string;
  notes?: string;
  payments: PaymentRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  variants: string[];
  stockQuantity: number;
  lowStockThreshold: number;
  imageUrl?: string;
  sku?: string;
  isArchived: boolean;
}

export interface QuickReply {
  id: string;
  businessId: string;
  title: string;
  category: "Price" | "Delivery" | "Availability" | "Customisation" | "General";
  message: string;
}

export interface NotificationItem {
  id: string;
  businessId: string;
  type: "follow_up" | "new_enquiry" | "new_order" | "low_stock";
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
  linkUrl?: string;
}
