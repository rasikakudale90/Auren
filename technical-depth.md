# AUREN — Technical Depth & Architecture Document

**Author/Owner:** Rasika Kudale  
**Last Updated:** November 23, 2026  
**Stack:** 
- **Frontend:** Next.js 14.2 (App Router), React 18, TypeScript 5.6, Tailwind CSS 3.4, Radix UI Primitives, GSAP 3.12, Lenis 1.1, Lucide Icons, Vitest 5.1, JSDOM
- **Backend:** Java 21 LTS, Spring Boot 3.3.5, Maven, Spring Data JPA, Spring Security, Flyway, Supabase PostgreSQL, JJWT 0.12.6
- **AI Engine:** Google Gemini 2.5 Flash / 1.5 Flash (via provider-independent abstraction `AiExtractionService`)
- **DevOps & Containerization:** Docker (Multi-stage Eclipse Temurin 21 Alpine), Docker Compose (PostgreSQL 16 Alpine), Render PaaS Blueprint

---

## 1. System Philosophy & Technical Boundaries

AUREN is built as a **cross-platform social-commerce workspace** tailored for small product artisans (ceramics, fashion, jewellery, home bakers, custom gifts). It is **not** an automated chatbot or bloated enterprise ERP. The core technical boundaries:

1. **Architecture Milestone Status (All Phases 100% Completed)**:
   - **Frontend Foundation (Phase F):** 100% Completed with high-fidelity reactive workspace, responsive layout, GSAP 3D floating objects, and Lenis smooth scrolling.
   - **Backend Foundation (Phase B0):** 100% Completed with Spring Boot 3.3.5 scaffolding, Supabase PostgreSQL Flyway migrations (V1 & V2), domain entities, multi-tenant workspace isolation, stateless JWT security, and REST API controller endpoints.
   - **Gemini Multimodal Service (Phase B1):** 100% Completed with provider-independent `AiExtractionService`, `GeminiExtractionService` multimodal processing, monthly AI quota tracking (`AiQuotaService` FR-AI-003), and dedicated REST endpoints.
   - **End-to-End API Wire-Up (Phase B2):** 100% Completed with typed `ApiClient` in frontend, screenshot dropzone connected to Gemini backend endpoints, and client fallback simulation for offline resilience (26/26 tests passing).
   - **Production Deployment & Containerization (Phase B3):** 100% Completed with multi-stage Dockerfile, local docker-compose orchestration, and Render deployment blueprint.
2. **Editorial Aesthetics (Non-AI-Generic)**:
   - **Muted Sage Green (`#4E5841`, `#384835`, `#E3E8DC`)**: Primary brand anchor, primary action CTAs, verified status pills, and active navigation indicators.
   - **Warm Linen Beige (`#EFECE6`, `#F5F2EB`, `#FAF8F5`)**: Background surfaces, card wells, secondary buttons, and receipt containers.
   - **Deep Burgundy (`#6E2639`, `#541B29`, `#FBF2F4`)**: High-contrast urgency highlights (due-today follow-ups, pending payment balances, VIP customer badges, retention warnings, and wax seals).
   - Absolute ban on neon tones, generic purple gradients, corporate glass cubes, and dominant terracotta/coral.
3. **Kinetic & Microinteraction Architecture**:
   - **GSAP (`gsap`)**: 3D floating commerce tokens with continuous bobbing animations and interactive mouse parallax tilt (`[perspective:1200px]`, `[transform-style:preserve-3d]`).
   - **Lenis (`lenis`)**: Studio-grade kinetic momentum smooth scrolling.
   - **SSR Dynamic Isolation**: All window/DOM-dependent animation libraries are dynamically imported inside `useEffect` or loaded via `next/dynamic` with `{ ssr: false }` to strictly prevent Node.js SSR 500 module resolution errors.
4. **Layout Navigation Pinned State**:
   - The workspace layout root is locked to `h-screen overflow-hidden` with a sticky `shrink-0 z-40` TopBar and independent `<main className="flex-1 overflow-y-auto">` container. This guarantees the hamburger menu and header **never** scroll out of view when scrolling down long lists or dashboards.

---

## 2. Directory Structure & Architecture

```text
E:\Auren\
├── backend/
│   ├── Dockerfile                                # Multi-stage Alpine containerization
│   ├── pom.xml                                   # Spring Boot 3.3.5 Maven build file
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/auren/
│   │   │   │   ├── AurenApplication.java         # Spring Boot entry point
│   │   │   │   ├── ai/
│   │   │   │   │   ├── dto/                      # ExtractionDraft, DetectedItem, AiQuotaResponse
│   │   │   │   │   ├── exception/                # AiQuotaExceededException (HTTP 429)
│   │   │   │   │   └── service/                  # AiExtractionService, GeminiExtractionService, AiQuotaService
│   │   │   │   ├── api/
│   │   │   │   │   ├── controller/               # Auth, Health, AiExtraction, Enquiry, Customer, Order, Product, FollowUp, Trash
│   │   │   │   │   ├── dto/                      # Typed request/response records & ApiResponse envelope
│   │   │   │   │   └── exception/                # GlobalExceptionHandler with structured JSON responses
│   │   │   │   ├── domain/
│   │   │   │   │   ├── entity/                   # JPA entities (Workspace, Customer, Enquiry, Order, etc.)
│   │   │   │   │   ├── repository/               # Spring Data JPA repositories with workspace isolation
│   │   │   │   │   └── service/                  # Business invariants (Balance calculations, Tag merge, Trash)
│   │   │   │   └── security/
│   │   │   │       ├── config/SecurityConfig.java# Stateless security filter chain & CORS config
│   │   │   │       └── jwt/                      # JwtTokenProvider, JwtAuthenticationFilter, AurenUserPrincipal
│   │   │   └── resources/
│   │   │       ├── application.yml               # Base application configuration
│   │   │       ├── application-dev.yml           # Supabase DB & JPA settings
│   │   │       └── db/migration/
│   │   │           ├── V1__init_schema.sql       # PostgreSQL schema with tenant indexes
│   │   │           └── V2__trash_retention_view.sql # Unified view for 30-day soft-delete items
│   │   └── test/java/com/auren/                  # Unit test suites (OrderInvariants, CustomerMerge, JWT, Gemini, Quota)
├── docker-compose.yml                           # Local PostgreSQL + Spring Boot orchestration
├── render.yaml                                  # Render Cloud deployment blueprint
├── docs/
│   ├── images/                                   # Authoritative visual references
│   ├── AUREN_PRD.md                             # Product requirements and seller persona
│   ├── AUREN_SRS.md                             # Functional requirements & business rules
│   ├── AUREN_DESIGN_TOKENS_v1.1.md                 # Approved design system specification
│   └── AUREN_Frontend.md                        # Frontend implementation blueprint
├── progress.md                                  # Project milestone and progress tracking
├── technical-depth.md                           # This architecture & technical specification file
├── AUREN_Agents.md                              # Agent system prompts and rules
└── frontend/                                    # Next.js 14.2 App Router client
    └── src/
        ├── lib/api-client.ts                    # Phase B2 API client with JWT bearer & tenant header
        └── components/enquiries/add-enquiry-modal.tsx # Dropzone connected to Gemini backend
```

---

## 3. Core Technical Invariants & Business Logic

### A. Order Payment & Balance Invariant:
$$\text{balanceDue} = \max(0, \text{totalAmount} - \text{amountPaid})$$
$$\text{paymentStatus} = \begin{cases} 
\text{"Paid"} & \text{if } \text{amountPaid} \ge \text{totalAmount} \land \text{totalAmount} > 0 \\ 
\text{"Partially Paid"} & \text{if } 0 < \text{amountPaid} < \text{totalAmount} \\ 
\text{"Unpaid"} & \text{otherwise} 
\end{cases}$$
* **Implementation:** Enforced both in frontend TypeScript utilities and in backend `@PrePersist`/`@PreUpdate` lifecycle callbacks on the JPA `Order` entity.

### B. Customer Duplicate Resolution & Tag Consolidation:
- Detection rule: Matches existing customer if `phone` (normalized digits) or social `handle` (case-insensitive) matches an existing record in the same workspace.
- Consolidation behavior:
  - Phone, email, and address merge into primary record.
  - Tag array is unionized: $\text{tags}_{\text{merged}} = \text{Unique}(\text{tags}_{\text{primary}} \cup \text{tags}_{\text{duplicate}})$.
  - Duplicate record is soft-deleted and transitioned to the 30-day retention trash queue.
* **Implementation:** Managed via `CustomerDuplicateMergeService` in Spring Boot backend, exposed via `apiClient.mergeCustomers(...)`.

### C. 30-Day Soft-Delete Retention Policy (SRS FR-DATA-002 / SEC-004):
- Inquiries, customers, products, or orders deleted by the seller are never permanently expunged immediately.
- Items are tagged with `deletedAt: timestamp` and `daysRemaining: \lfloor 30 - (\text{now} - \text{deletedAt})_{\text{days}} \rfloor`.
- Sellers can restore any item with 1 click before the 30-day window expires.
* **Implementation:** Handled via the PostgreSQL view `v_trash_retention_items` and `TrashService.restoreItem(...)`.

### D. Multimodal AI Extraction & Quota Tracking (SRS FR-AI-001, FR-AI-002, FR-AI-003):
- Provider-independent `AiExtractionService` abstracts Google Gemini REST calls.
- Enforces strict monthly limit (500 tokens/operations per workspace) via `AiQuotaService`, rejecting excess operations with HTTP 429 (`AiQuotaExceededException`).
- Multimodal processing converts uploaded chat screenshots (PNG, JPEG, WebP $\le$ 10MB) into structured `ExtractionDraft` models containing customer details, intent, items, and confidence ratings.

---

## 4. Multi-Tenant Security & Workspace Context Isolation

- All incoming API requests are verified through `JwtAuthenticationFilter`.
- `AurenUserPrincipal` provides the validated `userId` and active `workspaceId`.
- Every JPA repository query filters by `workspaceId` (e.g. `findByWorkspaceIdAndIsDeletedFalse`) to strictly enforce that tenants cannot read or mutate data belonging to other businesses.
