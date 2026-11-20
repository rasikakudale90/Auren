# AUREN — Project Progress Tracker

**Repository:** `https://github.com/rasikakudale90/Auren.git`  
**Current Milestone:** Phase F (Frontend Foundations & Core Workspace UX)  
**Last Updated:** November 20, 2026  
**Primary References:** `docs/AUREN_PRD.md`, `docs/AUREN_SRS.md`, `docs/AUREN_DESIGN_TOKENS_v1.1.md`, `docs/AUREN_Frontend.md`

---

## 1. Executive Status Summary

| Phase | Description | Status | Completion % |
| :--- | :--- | :---: | :---: |
| **Phase F0** | Repository Initialization & Scaffolding | **COMPLETED** | 100% |
| **Phase F1** | Design Tokens, Atoms & Responsive App Shell | **COMPLETED** | 100% |
| **Phase F1.5** | Editorial Palette: Warm Linen Beige & Deep Burgundy Tokens | **COMPLETED** | 100% |
| **Phase F2** | Public Marketing & Split Authentication Routes | **COMPLETED** | 100% |
| **Phase F3** | Authenticated Workspace Modules & State Depth (WorkspaceContext) | **IN PROGRESS** | 90% |
| **Phase B0** | Spring Boot Backend & Supabase Database Scaffolding | **PENDING** | 0% |
| **Phase B1** | Gemini Multimodal Extraction Service Integration | **PENDING** | 0% |

---

## 2. Route & Screen Implementation Status

| Route | Screen / Purpose | Status | UI/UX Fidelity & Verified Behavior |
| :--- | :--- | :---: | :--- |
| `/` | Public Marketing Landing Page | ✅ Implemented | Complete Storeflow marketing layout: sticky nav, hero, problem section, 4-step workflow, capabilities, FAQ, and footer. |
| `/login` | Authentication Screen | 🔄 Refined | 50/50 equal-width split. Left framed image (`AurenLogin1.png`) uncropped with top Auren logo and bottom tagline 100% visible. Right panel matches `AurenLogin .png` with exact Auren SVG emblem, Apple/Google social auth, and `#4C563F` sage CTA. |
| `/signup` | Seller Account Registration | 🔄 Refined | Balanced 50/50 split matching `/login`, business category picker, and direct route to `/onboarding`. |
| `/register` | Route Alias | ✅ Implemented | Mirrors `/signup`. |
| `/forgot-password` | Password Recovery Flow | ✅ Implemented | Email submission form with simulated reset instruction banner. |
| `/verify-email` | Email Verification State | ✅ Implemented | Verification reminder with resend countdown timer. |
| `/onboarding` | 3-Step Business Setup Wizard | ✅ Implemented | Step 1 (Identity), Step 2 (Regional Settings - INR/Asia:Kolkata), Step 3 (Launch Workspace). |
| `/dashboard` | Main Operational Workspace | ✅ Implemented | Storeflow KPI cards (Inquiries, Active Orders, Due Follow-ups, Revenue), recent inquiries feed, urgent follow-up alert with Burgundy styling, fully wired to `WorkspaceContext`. |
| `/enquiries` | Inquiries Directory & Capture | ✅ Implemented | Inquiries table, channel filters, status pills, HTML5 drag-and-drop screenshot upload with client preview, simulated Gemini multimodal extraction, editable draft review, and "Convert to Order" flow. |
| `/customers` | Customer Management | 🔄 Needs Merge Modal | Customer cards, contact metadata, spend tracking, order history drawer, duplicate contact warning banner. *(Interactive merge modal in progress)*. |
| `/orders` | Order Pipeline & Payments | ✅ Implemented | Order lifecycle stages, itemized breakdowns, manual "Record Payment" drawer (Cash/UPI/Bank Transfer balance calculator), and printable receipt preview. |
| `/products` | Internal Product Catalogue | ✅ Implemented | Product card grid, variant tags, stock quantities, low-stock threshold warning pills, and "Add Product" drawer. |
| `/follow-ups` | Follow-up Task Queue | ✅ Implemented | Date-grouped tasks (Due Today, Upcoming, Completed) with reactive checkbox state syncing and dynamic badge decrementing. |
| `/quick-replies` | Reusable Message Templates | ✅ Implemented | Categorized templates (Greeting, Pricing, Payment, Delivery) with functional 1-click clipboard copy. |
| `/notifications`| In-App Notification Center | ✅ Implemented | Operational alert cards (due follow-ups, low stock, new inquiries) with filter toggles. |
| `/settings` | Business Settings & Preferences | ✅ Implemented | Business profile, regional preferences (INR / Asia/Kolkata), AI quota progress bar, and CSV export action. |

---

## 3. Automated Test Suite Status

Vitest, React Testing Library, and `@testing-library/jest-dom` are configured in `frontend/`:

- **Test Command:** `npm run test`
- **Current Passing Suites:** 3 passed (11 tests total)
  - `src/__tests__/login.test.tsx` (5 tests): Auren emblem rendering, Apple & Google social sign-in, prefilled email/password, show/hide password toggle, signup navigation.
  - `src/__tests__/orders.test.ts` (3 tests): Mathematical balance due invariant (`totalAmount - amountPaid = balanceDue`), payment status calculation (`Paid`, `Partially Paid`, `Unpaid`), customer order search.
  - `src/__tests__/enquiries.test.ts` (3 tests): Social channel validation, SRS status transition validation, simulated AI parsing of urgency and budgets.

---

## 4. Key Gaps & Next Session Roadmap

1. **Centralized Client State (`WorkspaceContext`)**:
   - Create `src/context/workspace-context.tsx`.
   - Wire `Sidebar`, `TopBar`, `Dashboard`, `Enquiries`, `Customers`, and `Orders` so switching businesses dynamically isolates and updates the data between *Studio Clay* and *Festive Delights*.
2. **True Drag-and-Drop Screenshot Upload**:
   - Replace static button in `AddEnquiryModal` with interactive dropzone featuring instant image preview.
3. **Customer Duplicate Resolution Modal**:
   - Wire the "Review & Link" banner in `/customers` to an interactive duplicate comparison and merge modal.
4. **Follow-up Reactive State**:
   - Persist follow-up completion/snooze in client state and sync badge counters in the sidebar.
5. **Toggleable Empty Workspace States**:
   - Provide a clean demonstration state representing a newly onboarded seller with zero records.
