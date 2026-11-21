# AUREN — Project Progress Tracker

**Repository:** `https://github.com/rasikakudale90/Auren.git`  
**Current Milestone:** Phase F (Frontend Foundations & Core Workspace UX) — **100% COMPLETED**  
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
| **Phase B0** | Spring Boot Backend & Supabase Database Scaffolding | **PENDING** | 0% |
| **Phase B1** | Gemini Multimodal Extraction Service Integration | **PENDING** | 0% |

---

## 2. Route & Screen Implementation Status (Live Audit: 16/16 Passed)

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

## 3. Automated Test Suite Status

Vitest, React Testing Library, and `@testing-library/jest-dom` are configured in `frontend/`:
- `src/__tests__/login.test.tsx` (5 tests passing — Google only, email/password validation)
- `src/__tests__/workspace-context.test.tsx` (6 tests passing — Multi-business isolation, reactive state)
- `src/__tests__/screenshot-upload.test.ts` (4 tests passing — Drag-and-drop, $\le 10$MB size check)
- `src/__tests__/customer-duplicate.test.ts` (2 tests passing — Phone match & tag union)
- `src/__tests__/enquiries.test.ts` (3 tests passing — Status workflow transitions)
- `src/__tests__/orders.test.ts` (3 tests passing — Order balance & payment status invariants)
- `src/__tests__/trash-retention.test.ts` (3 tests passing — 30-day countdown, restore & empty actions)
**Total: 7 suites, 26 tests passing with 0 errors.**  
**Live Route Audit: 16/16 routes verified with HTTP 200 OK.**  
**Production Build: 19/19 App Router static routes compiled.**

---

## 4. Next Session Milestone Preview: Backend Scaffolding (Phase B0)

When ready to resume in the next session, we will start **Phase B0**:
1. Spring Boot 3.3.x backend scaffolding with Java 21 and Maven.
2. Supabase PostgreSQL schema migration scripts matching domain invariants (`docs/AUREN_SRS.md`).
3. Spring Security JWT integration matching user profiles.
4. REST API controller contracts mapping to existing Next.js frontend services.
