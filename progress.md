# AUREN — Project Progress Tracker

**Repository:** `https://github.com/rasikakudale90/Auren.git`  
**Current Milestone:** Phase B0 (Spring Boot Backend & Supabase Database Scaffolding) — **100% COMPLETED**  
**Last Updated:** November 22, 2026  
**Primary References:** `docs/AUREN_PRD.md`, `docs/AUREN_SRS.md`, `docs/AUREN_DESIGN_TOKENS_v1.1.md`, `docs/AUREN_Frontend.md`, `technical-depth.md`

---

## 1. Executive Status Summary

| Phase | Description | Status | Completion % |
| :--- | :--- | :---: | :---: |
| **Phase F0** | Repository Initialization & Scaffolding | **COMPLETED** | 100% |
| **Phase F1** | Design Tokens, Atoms & Responsive App Shell | **COMPLETED** | 100% |
| **Phase F1.5** | Editorial Palette: Warm Linen Beige & Deep Burgundy Tokens | **COMPLETED** | 100% |
| **Phase F2** | Public Marketing & Split Authentication Routes | **COMPLETED** | 100% |
| **Phase F3** | Authenticated Workspace Modules & State Depth (`WorkspaceContext`) | **COMPLETED** | 100% |
| **Phase F4** | Kinetic Polish: GSAP 3D Floating Objects, Lenis Smooth Scroll & Fixed Header | **COMPLETED** | 100% |
| **Phase B0** | Spring Boot 3.3.x Backend & Supabase Database Scaffolding | **COMPLETED** | 100% |
| **Phase B1** | Gemini Multimodal Extraction Service Integration | **PENDING** | 0% |

---

## 2. Backend Scaffolding Implementation Status (Phase B0 Live)

| Module / Component | Implementation Details & Architectural Invariants | Status |
| :--- | :--- | :---: |
| **Spring Boot 3.3.5 Scaffolding** | Java 21, Maven POM with Web, Security, Data JPA, Validation, PostgreSQL, Flyway, JJWT (0.12.6). | ✅ Completed |
| **Flyway Schema Migrations** | `V1__init_schema.sql` (users, workspaces, customers, enquiries, products, orders, order_items, follow_ups, quick_replies). | ✅ Completed |
| **30-Day Trash Retention View** | `V2__trash_retention_view.sql` dynamic SQL view calculating remaining days ($\le 30$) across all soft-deleted records. | ✅ Completed |
| **Domain JPA Entities** | 9 mapped JPA entities with Lombok, audit timestamps, and multi-tenant workspace isolation. | ✅ Completed |
| **Business Invariants Engine** | Order balance invariant $\text{balanceDue} = \max(0, \text{totalAmount} - \text{amountPaid})$; Customer duplicate phone/handle match & tag unionization; manual payment recording. | ✅ Completed |
| **Spring Security & Stateless JWT** | `JwtAuthenticationFilter`, `JwtTokenProvider`, BCrypt password hashing, and CORS configured for Next.js frontend. | ✅ Completed |
| **REST API Controller Endpoints** | `/auth/signup`, `/auth/login`, `/enquiries`, `/customers`, `/customers/merge`, `/orders`, `/orders/{id}/payments`, `/products`, `/follow-ups`, `/trash`, `/trash/restore`. | ✅ Completed |
| **Global Error Handling** | `GlobalExceptionHandler` with standardized JSON `ApiResponse<T>` envelopes. | ✅ Completed |

---

## 3. Frontend Route Status (Live Audit: 16/16 Passed)

| Route | Screen / Purpose | Status | UI/UX Fidelity & Verified Behavior |
| :--- | :--- | :---: | :--- |
| `/` | Public Marketing Landing Page | ✅ Verified (200 OK) | Complete Storeflow marketing layout: sticky nav, tactile linen noise background, ambient Burgundy & Sage breathing aura orbs, GSAP 3D floating commerce tokens with interactive mouse parallax, 4-step workflow, and FAQ. |
| `/login` | Authentication Screen | ✅ Verified (200 OK) | 50/50 equal-width split. Left framed image (`AurenLogin1.png`) uncropped with top Auren logo and bottom tagline 100% visible. Right panel has Google-only social sign-in (Apple removed per directive), microinteractions, and dark sage CTA. |
| `/signup` | Seller Account Registration | ✅ Verified (200 OK) | Balanced 50/50 split matching `/login`, business category picker, and direct route to `/onboarding`. |
| `/register` | Route Alias | ✅ Verified (200 OK) | Mirrors `/signup`. |
| `/forgot-password` | Password Recovery Flow | ✅ Verified (200 OK) | Email submission form with simulated reset instruction banner. |
| `/verify-email` | Email Verification State | ✅ Verified (200 OK) | Verification reminder with resend countdown timer. |
| `/onboarding` | 3-Step Business Setup Wizard | ✅ Verified (200 OK) | Step 1 (Identity), Step 2 (Regional Settings - INR/Asia:Kolkata), Step 3 (Launch Workspace). |
| `/dashboard` | Main Operational Workspace | ✅ Verified (200 OK) | Storeflow KPI cards with hover tilt, recent inquiries feed, urgent follow-up alert banner with Burgundy styling, fully wired to `WorkspaceContext`. |
| `/enquiries` | Inquiries Directory & Capture | ✅ Verified (200 OK) | Inquiries table, channel filters, status pills, HTML5 drag-and-drop screenshot upload with client preview, simulated Gemini multimodal extraction, editable draft review, floating bulk action bar, and "Convert to Order" flow. |
| `/customers` | Customer Management | ✅ Verified (200 OK) | Customer cards, contact metadata, spend tracking, order history drawer, duplicate contact warning banner, and side-by-side interactive comparison & merge modal with phone consolidation. |
| `/orders` | Order Pipeline & Payments | ✅ Verified (200 OK) | Order lifecycle stages, itemized breakdowns, manual "Record Payment" drawer (Cash/UPI/Bank Transfer balance calculator), printable receipt modal, and empty state. |
| `/products` | Internal Product Catalogue | ✅ Verified (200 OK) | Product card grid, variant tags, stock quantities, low-stock threshold warning pills, empty state, and "Add Product" drawer. |
| `/follow-ups` | Follow-up Task Queue | ✅ Verified (200 OK) | Date-grouped tasks (Due Today, Upcoming, Completed) with reactive checkbox state syncing, +2-day snooze action, dynamic badge decrementing, and empty state. |
| `/quick-replies` | Reusable Message Templates | ✅ Verified (200 OK) | Categorized templates (Greeting, Pricing, Payment, Delivery) with functional 1-click clipboard copy. |
| `/notifications`| In-App Notification Center | ✅ Verified (200 OK) | Operational alert cards (due follow-ups in Burgundy, low stock, new inquiries) with filter toggles. |
| `/settings` | Business Settings & Preferences | ✅ Verified (200 OK) | Business profile, regional preferences (INR / Asia/Kolkata), AI quota progress bar, complete CSV export, and 30-Day Trash Retention section with restore/purge (SRS FR-DATA-002 / SEC-004). |

---

## 4. Next Session Milestone: Phase B1 (Gemini Multimodal Extraction)

When ready to resume in the next phase, we will implement **Phase B1**:
1. Gemini API SDK client integration in Spring Boot backend.
2. Multimodal prompt templates for parsing social screenshots (Instagram DMs, WhatsApp chats).
3. Structured JSON schema extraction into editable Enquiry draft responses.
