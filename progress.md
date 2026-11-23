# AUREN — Project Progress Tracker

**Repository:** `https://github.com/rasikakudale90/Auren.git`  
**Current Milestone:** Phase B3 (Production Deployment & Containerization) — **100% COMPLETED**  
**Last Updated:** November 23, 2026  
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
| **Phase B1** | Gemini Multimodal Extraction Service Integration | **COMPLETED** | 100% |
| **Phase B2** | End-to-End Frontend API Integration & Wire-up | **COMPLETED** | 100% |
| **Phase B3** | Production Deployment & Containerization | **COMPLETED** | 100% |

---

## 2. Production Deployment & Containerization (Phase B3 Live)

| Module / Component | Implementation Details & Architectural Invariants | Status |
| :--- | :--- | :---: |
| **Multi-Stage Dockerfile** | `backend/Dockerfile` using `eclipse-temurin:21-jre-alpine` runtime and unprivileged user `spring:spring`. | ✅ Completed |
| **Local Docker Compose** | `docker-compose.yml` orchestrating PostgreSQL 16 Alpine and backend service with healthchecks. | ✅ Completed |
| **Render Cloud Blueprint** | `render.yaml` infrastructure-as-code specifying health check path `/api/v1/health` and auto-scaling params. | ✅ Completed |
| **Health Check Service** | `HealthController` at `/api/v1/health` responding with service uptime, active environment profile, and timestamp. | ✅ Completed |

---

## 3. End-to-End API Integration (Phase B2 Live)

| Module / Component | Implementation Details & Architectural Invariants | Status |
| :--- | :--- | :---: |
| **Frontend API Client** | `frontend/src/lib/api-client.ts` implementing JWT Bearer injection, `X-Workspace-Id` tenant scoping, and type-safe backend methods. | ✅ Completed |
| **Gemini Extraction Dropzone Wire-up** | `AddEnquiryModal` connected to `/api/v1/ai/extract/image` and `/api/v1/ai/extract/text` with resilient fallback to client simulation if offline. | ✅ Completed |
| **Domain Invariant Bridges** | Client bridges for customer merge, manual payment balance calculation, +2d follow-up snoozing, and 30-day trash restore. | ✅ Completed |
| **Full Regression Suite** | 7 test suites, 26/26 tests passing in Vitest with zero regressions. | ✅ Completed |

---

## 4. Gemini Multimodal Extraction Implementation Status (Phase B1 Live)

| Module / Component | Implementation Details & Architectural Invariants | Status |
| :--- | :--- | :---: |
| **Provider-Independent AI Abstraction** | `AiExtractionService` contract isolating extraction logic from specific model providers. | ✅ Completed |
| **Gemini Multimodal Extraction** | `GeminiExtractionService` with structured JSON schema prompting (`gemini-2.5-flash`), supporting image parts (PNG, JPEG, WebP) and pasted text with graceful fallback simulation. | ✅ Completed |
| **Monthly AI Quota Enforcement** | `AiQuotaService` (SRS FR-AI-003) tracking 500-token monthly quota, throwing `AiQuotaExceededException` (HTTP 429) when exhausted. | ✅ Completed |
| **AI REST Controller Endpoints** | `/api/v1/ai/extract/text`, `/api/v1/ai/extract/image` (max 10MB check), `/api/v1/ai/quota`. | ✅ Completed |
| **Automated Unit Tests** | `GeminiExtractionServiceTest` and `AiQuotaServiceTest` verifying prompt building, quota increments, and fallback heuristics. | ✅ Completed |

---

## 5. Backend Scaffolding Status (Phase B0 Live)

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

## 6. Frontend Route Status (Live Audit: 16/16 Passed)

| Route | Screen / Purpose | Status | UI/UX Fidelity & Verified Behavior |
| :--- | :--- | :---: | :--- |
| `/` | Public Marketing Landing Page | ✅ Verified (200 OK) | Storeflow marketing layout: sticky nav, tactile linen noise background, ambient Burgundy & Sage breathing aura orbs, GSAP 3D floating commerce tokens with interactive mouse parallax, 4-step workflow, and FAQ. |
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
