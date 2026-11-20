"use client";

import * as React from "react";
import {
  Business,
  Customer,
  Enquiry,
  EnquiryStatus,
  FollowUp,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  NotificationItem,
  QuickReply,
} from "@/types";
import {
  mockBusinesses,
  mockCustomers,
  mockProducts,
  mockEnquiries,
  mockFollowUps,
  mockOrders,
  mockQuickReplies,
  mockNotifications,
} from "@/lib/mock-data";

export interface ConvertOrderPayload {
  items: {
    productId: string;
    productName: string;
    variant?: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  deliveryCharge?: number;
  deliveryAddress?: string;
  notes?: string;
  initialPayment?: {
    amount: number;
    method: PaymentMethod;
    referenceNote?: string;
  };
}

export interface WorkspaceContextType {
  // Business switcher
  businesses: Business[];
  activeBusinessId: string;
  activeBusiness: Business;
  setActiveBusinessId: (id: string) => void;

  // Demo / Blank mode toggle for testing empty states
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;

  // Active records (isolated by active business, or empty when demo mode is off)
  enquiries: Enquiry[];
  customers: Customer[];
  orders: Order[];
  products: Product[];
  followUps: FollowUp[];
  notifications: NotificationItem[];
  quickReplies: QuickReply[];

  // Reactive mutations
  addEnquiry: (draft: Partial<Enquiry>) => Enquiry;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  convertEnquiryToOrder: (enquiryId: string, payload: ConvertOrderPayload) => Order;
  recordPayment: (
    orderId: string,
    amount: number,
    method: PaymentMethod,
    referenceNote?: string
  ) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  completeFollowUp: (id: string) => void;
  snoozeFollowUp: (id: string, daysAhead?: number) => void;
  resolveCustomerDuplicate: (primaryCustId: string, duplicateCustId: string) => void;
  markNotificationRead: (id: string) => void;
  addProduct: (product: Omit<Product, "id" | "businessId">) => Product;
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [businesses] = React.useState<Business[]>(mockBusinesses);
  const [activeBusinessId, setActiveBusinessId] = React.useState<string>("biz-1");
  const [isDemoMode, setIsDemoMode] = React.useState<boolean>(true);

  // Core state stores
  const [allEnquiries, setAllEnquiries] = React.useState<Enquiry[]>(mockEnquiries);
  const [allCustomers, setAllCustomers] = React.useState<Customer[]>(mockCustomers);
  const [allOrders, setAllOrders] = React.useState<Order[]>(mockOrders);
  const [allProducts, setAllProducts] = React.useState<Product[]>(mockProducts);
  const [allFollowUps, setAllFollowUps] = React.useState<FollowUp[]>(mockFollowUps);
  const [allNotifications, setAllNotifications] = React.useState<NotificationItem[]>(mockNotifications);
  const [allQuickReplies] = React.useState<QuickReply[]>(mockQuickReplies);

  // Active business resolution
  const activeBusiness =
    businesses.find((b) => b.id === activeBusinessId) || businesses[0];

  // Scoped queries
  const enquiries = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allEnquiries.filter((e) => e.businessId === activeBusinessId);
  }, [allEnquiries, activeBusinessId, isDemoMode]);

  const customers = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allCustomers.filter((c) => c.businessId === activeBusinessId);
  }, [allCustomers, activeBusinessId, isDemoMode]);

  const orders = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allOrders.filter((o) => o.businessId === activeBusinessId);
  }, [allOrders, activeBusinessId, isDemoMode]);

  const products = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allProducts.filter((p) => p.businessId === activeBusinessId);
  }, [allProducts, activeBusinessId, isDemoMode]);

  const followUps = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allFollowUps.filter((f) => f.businessId === activeBusinessId);
  }, [allFollowUps, activeBusinessId, isDemoMode]);

  const notifications = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allNotifications.filter((n) => n.businessId === activeBusinessId);
  }, [allNotifications, activeBusinessId, isDemoMode]);

  const quickReplies = React.useMemo(() => {
    if (!isDemoMode) return [];
    return allQuickReplies.filter(
      (q) => !q.businessId || q.businessId === activeBusinessId
    );
  }, [allQuickReplies, activeBusinessId, isDemoMode]);

  // Mutations
  const addEnquiry = React.useCallback(
    (draft: Partial<Enquiry>): Enquiry => {
      const newId = `enq-${Date.now()}`;
      const newEnquiry: Enquiry = {
        id: newId,
        businessId: activeBusinessId,
        customerId: draft.customerId,
        customerName: draft.customerName || "Anonymous Inquiry",
        customerHandle: draft.customerHandle,
        customerPhone: draft.customerPhone,
        sourceChannel: draft.sourceChannel || "Instagram",
        status: draft.status || "New",
        originalMessage: draft.originalMessage || "",
        messageNotes: draft.messageNotes,
        productInterest: draft.productInterest,
        variant: draft.variant,
        quantity: draft.quantity || 1,
        expectedValue: draft.expectedValue,
        followUpDate: draft.followUpDate,
        receivedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isAiExtracted: !!draft.isAiExtracted,
        screenshots: draft.screenshots,
      };

      setAllEnquiries((prev) => [newEnquiry, ...prev]);

      // If follow up date provided, create follow up item automatically
      if (draft.followUpDate) {
        const newFup: FollowUp = {
          id: `fup-${Date.now()}`,
          businessId: activeBusinessId,
          enquiryId: newId,
          customerId: draft.customerId,
          customerName: draft.customerName || "Inquiry Lead",
          customerHandle: draft.customerHandle,
          dueAt: draft.followUpDate,
          note: `Follow up on enquiry: ${draft.productInterest || "General query"}`,
          status: "Pending",
          sourceChannel: draft.sourceChannel || "Instagram",
          productInterest: draft.productInterest,
        };
        setAllFollowUps((prev) => [newFup, ...prev]);
      }

      // Add notification
      const newNotif: NotificationItem = {
        id: `notif-${Date.now()}`,
        businessId: activeBusinessId,
        type: "new_enquiry",
        title: `New ${newEnquiry.sourceChannel} Enquiry`,
        description: `${newEnquiry.customerName} sent an inquiry for ${newEnquiry.productInterest || "products"}.`,
        createdAt: new Date().toISOString(),
        isRead: false,
        linkUrl: "/enquiries",
      };
      setAllNotifications((prev) => [newNotif, ...prev]);

      return newEnquiry;
    },
    [activeBusinessId]
  );

  const updateEnquiryStatus = React.useCallback(
    (id: string, status: EnquiryStatus) => {
      setAllEnquiries((prev) =>
        prev.map((e) =>
          e.id === id ? { ...e, status, updatedAt: new Date().toISOString() } : e
        )
      );
    },
    []
  );

  const convertEnquiryToOrder = React.useCallback(
    (enquiryId: string, payload: ConvertOrderPayload): Order => {
      const sourceEnquiry = allEnquiries.find((e) => e.id === enquiryId);
      const subtotal = payload.items.reduce((sum, item) => sum + item.lineTotal, 0);
      const deliveryCharge = payload.deliveryCharge || 0;
      const totalAmount = subtotal + deliveryCharge;

      const initialPaid = payload.initialPayment ? payload.initialPayment.amount : 0;
      const balanceDue = Math.max(0, totalAmount - initialPaid);

      let paymentStatus: "Paid" | "Partially Paid" | "Unpaid" = "Unpaid";
      if (initialPaid >= totalAmount && totalAmount > 0) {
        paymentStatus = "Paid";
      } else if (initialPaid > 0) {
        paymentStatus = "Partially Paid";
      }

      const orderRef = `ORD-${new Date().getFullYear()}-${Math.floor(
        100 + Math.random() * 900
      )}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderReference: orderRef,
        businessId: activeBusinessId,
        customerId: sourceEnquiry?.customerId || "cust-unlinked",
        customerName: sourceEnquiry?.customerName || "Converted Lead",
        customerPhone: sourceEnquiry?.customerPhone,
        customerHandle: sourceEnquiry?.customerHandle,
        enquiryId,
        items: payload.items.map((item, idx) => ({
          ...item,
          id: `item-${Date.now()}-${idx}`,
        })),
        subtotal,
        deliveryCharge,
        totalAmount,
        amountPaid: initialPaid,
        balanceDue,
        status: "Confirmed",
        paymentStatus,
        deliveryAddress: payload.deliveryAddress,
        deliveryDateExpected: new Date(Date.now() + 4 * 86400000)
          .toISOString()
          .split("T")[0],
        notes: payload.notes,
        payments: payload.initialPayment
          ? [
              {
                id: `pay-${Date.now()}`,
                orderId: `ord-${Date.now()}`,
                amount: payload.initialPayment.amount,
                method: payload.initialPayment.method,
                recordedAt: new Date().toISOString(),
                referenceNote: payload.initialPayment.referenceNote,
                type: "Payment",
              },
            ]
          : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 1. Append order
      setAllOrders((prev) => [newOrder, ...prev]);

      // 2. Mark enquiry as Converted
      setAllEnquiries((prev) =>
        prev.map((e) =>
          e.id === enquiryId
            ? { ...e, status: "Converted", updatedAt: new Date().toISOString() }
            : e
        )
      );

      // 3. Update customer stats if customerId exists
      if (sourceEnquiry?.customerId) {
        setAllCustomers((prev) =>
          prev.map((c) =>
            c.id === sourceEnquiry.customerId
              ? {
                  ...c,
                  totalOrders: c.totalOrders + 1,
                  totalSpend: c.totalSpend + initialPaid,
                  updatedAt: new Date().toISOString(),
                }
              : c
          )
        );
      }

      return newOrder;
    },
    [activeBusinessId, allEnquiries]
  );

  const recordPayment = React.useCallback(
    (
      orderId: string,
      amount: number,
      method: PaymentMethod,
      referenceNote?: string
    ) => {
      setAllOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId) return order;

          const newAmountPaid = order.amountPaid + amount;
          const newBalanceDue = Math.max(0, order.totalAmount - newAmountPaid);
          const newPaymentStatus =
            newAmountPaid >= order.totalAmount
              ? "Paid"
              : newAmountPaid > 0
              ? "Partially Paid"
              : "Unpaid";

          const newPaymentRecord = {
            id: `pay-${Date.now()}`,
            orderId,
            amount,
            method,
            recordedAt: new Date().toISOString(),
            referenceNote,
            type: "Payment" as const,
          };

          return {
            ...order,
            amountPaid: newAmountPaid,
            balanceDue: newBalanceDue,
            paymentStatus: newPaymentStatus,
            payments: [...order.payments, newPaymentRecord],
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    []
  );

  const updateOrderStatus = React.useCallback(
    (orderId: string, status: OrderStatus) => {
      setAllOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
        )
      );
    },
    []
  );

  const completeFollowUp = React.useCallback((id: string) => {
    setAllFollowUps((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status: "Completed",
              completedAt: new Date().toISOString(),
            }
          : f
      )
    );
  }, []);

  const snoozeFollowUp = React.useCallback((id: string, daysAhead: number = 2) => {
    const futureDate = new Date(Date.now() + daysAhead * 86400000).toISOString();
    setAllFollowUps((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              dueAt: futureDate,
              status: "Pending",
            }
          : f
      )
    );
  }, []);

  const resolveCustomerDuplicate = React.useCallback(
    (primaryCustId: string, duplicateCustId: string) => {
      const duplicate = allCustomers.find((c) => c.id === duplicateCustId);
      if (!duplicate) return;

      // Re-link enquiries and orders to primary customer
      setAllEnquiries((prev) =>
        prev.map((e) =>
          e.customerId === duplicateCustId ? { ...e, customerId: primaryCustId } : e
        )
      );

      setAllOrders((prev) =>
        prev.map((o) =>
          o.customerId === duplicateCustId ? { ...o, customerId: primaryCustId } : o
        )
      );

      // Merge metrics and remove duplicate customer
      setAllCustomers((prev) => {
        const withoutDuplicate = prev.filter((c) => c.id !== duplicateCustId);
        return withoutDuplicate.map((c) => {
          if (c.id !== primaryCustId) return c;
          const mergedTags = Array.from(new Set([...c.tags, ...duplicate.tags]));
          return {
            ...c,
            phone: c.phone || duplicate.phone,
            socialHandle: c.socialHandle || duplicate.socialHandle,
            email: c.email || duplicate.email,
            tags: mergedTags,
            totalOrders: c.totalOrders + duplicate.totalOrders,
            totalEnquiries: c.totalEnquiries + duplicate.totalEnquiries,
            totalSpend: c.totalSpend + duplicate.totalSpend,
            updatedAt: new Date().toISOString(),
          };
        });
      });
    },
    [allCustomers]
  );

  const markNotificationRead = React.useCallback((id: string) => {
    setAllNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const addProduct = React.useCallback(
    (productData: Omit<Product, "id" | "businessId">): Product => {
      const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
        businessId: activeBusinessId,
      };
      setAllProducts((prev) => [newProduct, ...prev]);
      return newProduct;
    },
    [activeBusinessId]
  );

  const value = React.useMemo(
    () => ({
      businesses,
      activeBusinessId,
      activeBusiness,
      setActiveBusinessId,
      isDemoMode,
      setIsDemoMode,
      enquiries,
      customers,
      orders,
      products,
      followUps,
      notifications,
      quickReplies,
      addEnquiry,
      updateEnquiryStatus,
      convertEnquiryToOrder,
      recordPayment,
      updateOrderStatus,
      completeFollowUp,
      snoozeFollowUp,
      resolveCustomerDuplicate,
      markNotificationRead,
      addProduct,
    }),
    [
      businesses,
      activeBusinessId,
      activeBusiness,
      isDemoMode,
      enquiries,
      customers,
      orders,
      products,
      followUps,
      notifications,
      quickReplies,
      addEnquiry,
      updateEnquiryStatus,
      convertEnquiryToOrder,
      recordPayment,
      updateOrderStatus,
      completeFollowUp,
      snoozeFollowUp,
      resolveCustomerDuplicate,
      markNotificationRead,
      addProduct,
    ]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
