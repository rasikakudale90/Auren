# AUREN — Technical Depth & Architecture Document

**Author/Owner:** Rasika Kudale  
**Last Updated:** November 20, 2026  
**Stack:** Next.js 14.2 (App Router), TypeScript 5.6, Tailwind CSS 3.4, Radix UI Primitives, Lucide Icons, Vitest, JSDOM  

---

## 1. System Philosophy & Non-Negotiable Boundaries

AUREN is built as a **cross-platform social-commerce workspace** tailored for small product artisans (ceramics, fashion, jewellery, home bakers, custom gifts). It is **not** an automated chatbot or full ERP. The core technical boundaries:

1. **Frontend-Only Mock Phase (Current)**:
   - All data operations are executed client-side via typed mock datasets and mock service functions.
   - Zero hardcoded API calls, real external Gemini requests, or Supabase database calls yet.
   - All AI extraction behaviors are explicitly labeled as simulated in the UI.
2. **Design Tokens & Storeflow Aesthetic**:
   - Palette: Warm ivory background (`#F7F6F2`), soft white surfaces (`#FFFDF9`), muted neutral borders (`#E7E5DE`), and signature muted sage green (`#777C68` accent, `#4C563F` for auth/primary action, `#E3E8DC` pastel background).
   - Absolute ban on neon tones, generic glassmorphism, heavy drop shadows, and dominant orange/terracotta/coral.
3. **Authentication Reference Alignment**:
   - Split login screen (`/login`) adheres to `docs/images/AurenLogin .png`.
   - The left photography asset (`docs/images/AurenLogin1.png`) is framed with uncropped aspect ratio (`891x941`) so that both the top AUREN logo and bottom headline/tagline remain 100% visible across mobile, tablet, and widescreen desktop layouts.

---

## 2. Directory Structure & Architecture

```text
E:\Auren\
├── docs/
│   ├── images/
│   │   ├── AurenLogin .png       # Authoritative visual reference for /login
│   │   └── AurenLogin1.png       # Authoritative left-panel couple photography
│   ├── AUREN_PRD.md             # Product requirements and seller persona
│   ├── AUREN_SRS.md             # Functional requirements & business rules
│   ├── AUREN_DESIGN_TOKENS_v1.1.md # Approved design system specification
│   └── AUREN_Frontend.md        # Comprehensive frontend implementation blueprint
├── progress.md                  # Project milestone and progress tracking
├── technical-depth.md           # This architecture & technical specification file
└── frontend/
    ├── public/
    │   └── images/
    │       └── auren-login-left.png # Deployed asset of AurenLogin1.png
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx       # Root layout injecting Inter & Manrope CSS variables
    │   │   ├── globals.css      # Tailwind base layers, token definitions, scrollbars
    │   │   ├── page.tsx         # Public marketing landing page
    │   │   ├── (auth)/
    │   │   │   ├── login/       # Split-screen authentication matching reference
    │   │   │   ├── signup/      # Business account registration
    │   │   │   ├── register/    # Alias routing
    │   │   │   ├── forgot-password/ # Password reset request
    │   │   │   └── verify-email/    # Email verification reminder
    │   │   ├── onboarding/      # 3-step business setup wizard
    │   │   ├── dashboard/       # Key Storeflow operational digest & KPIs
    │   │   ├── enquiries/       # Inquiries table, multi-tab modal, order conversion
    │   │   ├── customers/       # Directory, spend tracking, duplicate warning
    │   │   ├── orders/          # Order pipeline, payment recorder, receipt preview
    │   │   ├── products/        # Catalogue, variants, low-stock threshold pills
    │   │   ├── follow-ups/      # Date-grouped follow-up task queue
    │   │   ├── quick-replies/   # Reusable response templates with copy-to-clipboard
    │   │   ├── notifications/   # Operational alert center
    │   │   └── settings/        # Workspace settings, AI quota bar, CSV export
    │   ├── components/
    │   │   ├── layout/          # AppShell, Sidebar, TopBar, MobileNav
    │   │   ├── ui/              # Button, Card, Badge, Input, Textarea, Dialog, Tabs
    │   │   └── enquiries/       # AddEnquiryModal (Manual, Paste, Screenshot)
    │   ├── lib/
    │   │   ├── mock-data.ts     # Realistic multi-business seed data
    │   │   └── utils.ts         # Formatting utilities (currency, dates, clsx/cn)
    │   ├── types/
    │   │   └── index.ts         # Complete domain interfaces matching SRS
    │   └── __tests__/           # Vitest unit & component test specifications
    ├── vitest.config.ts         # Vitest configuration with JSDOM
    ├── vitest.setup.ts          # Jest-DOM matchers setup
    └── tailwind.config.ts       # Semantic token mappings and font definitions
```

---

## 3. Data Models & Type Invariants (`src/types/index.ts`)

### Key Invariants:
1. **Order Payment Invariant**:
   $$\text{balanceDue} = \max(0, \text{totalAmount} - \text{amountPaid})$$
   $$\text{paymentStatus} = \begin{cases} 
   \text{"Paid"} & \text{if } \text{amountPaid} \ge \text{totalAmount} \land \text{totalAmount} > 0 \\ 
   \text{"Partially Paid"} & \text{if } 0 < \text{amountPaid} < \text{totalAmount} \\ 
   \text{"Unpaid"} & \text{otherwise} 
   \end{cases}$$
2. **Channel Enum**:
   `Instagram | WhatsApp | Facebook | Telegram | Website | Phone call | Walk-in | Referral | Other`
3. **Enquiry Status Workflow**:
   `New → Replied → Interested → Waiting for Customer → Converted | Lost`
4. **Order Status Workflow**:
   `Pending → Confirmed → Processing → Dispatched → Delivered | Cancelled`

---

## 4. State Architecture Blueprint (`WorkspaceContext`)

To be implemented in the immediate next session:

```typescript
interface WorkspaceContextType {
  activeBusiness: Business;
  businesses: Business[];
  setActiveBusiness: (bizId: string) => void;
  enquiries: Enquiry[];
  customers: Customer[];
  orders: Order[];
  products: Product[];
  followUps: FollowUp[];
  addEnquiry: (draft: Partial<Enquiry>) => void;
  updateEnquiryStatus: (id: string, status: EnquiryStatus) => void;
  convertEnquiryToOrder: (enquiryId: string, orderDetails: Partial<Order>) => void;
  recordPayment: (orderId: string, amount: number, method: PaymentMethod, note?: string) => void;
  completeFollowUp: (id: string) => void;
  resolveCustomerDuplicate: (primaryCustId: string, duplicateCustId: string) => void;
}
```

This context will ensure that:
1. When switching from **Studio Clay** (`biz-1`) to **Festive Delights** (`biz-2`), all displayed enquiries, orders, inventory, and revenue metrics isolate and reload automatically.
2. An inquiry converted to an order on `/enquiries` instantly appears on `/orders` and reflects in the `/dashboard` revenue counters.
3. Marking a follow-up complete decrements the badge count across both the sidebar and top-bar.

---

## 5. Quality & Verification Standards

- **Static Analysis**: `npm run lint` & TypeScript compiler (`tsc --noEmit`).
- **Production Build**: `npm run build` must compile all 19 static routes with 0 errors.
- **Automated Tests**: `npm run test` (Vitest with 11+ passing assertions).
- **Asset Integrity**: All images (`/images/auren-login-left.png`) and SVG icons must render without layout shifts or clipping.
