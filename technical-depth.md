# AUREN — Technical Depth & Architecture Document

**Author/Owner:** Rasika Kudale  
**Last Updated:** November 22, 2026  
**Stack:** Next.js 14.2 (App Router), React 18, TypeScript 5.6, Tailwind CSS 3.4, Radix UI Primitives, GSAP 3.12, Lenis 1.1, Lucide Icons, Vitest 5.1, JSDOM  

---

## 1. System Philosophy & Technical Boundaries

AUREN is built as a **cross-platform social-commerce workspace** tailored for small product artisans (ceramics, fashion, jewellery, home bakers, custom gifts). It is **not** an automated chatbot or bloated enterprise ERP. The core technical boundaries:

1. **Frontend-Only Mock Phase (Milestone Complete)**:
   - High-fidelity reactive workspace powered by `WorkspaceContext` with multi-business isolation (*Aura Studio & Crafts* vs. *Loom & Linen Apparel*) and a toggleable blank onboarding state.
   - All AI extraction behaviors (multilingual text and screenshot dropzone) operate via typed client-side simulators with editable drafts before saving.
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
├── docs/
│   ├── images/
│   │   ├── AurenLogin .png            # Authoritative visual reference for /login
│   │   └── AurenLogin1.png            # Authoritative left-panel couple photography
│   ├── AUREN_PRD.md                  # Product requirements and seller persona
│   ├── AUREN_SRS.md                  # Functional requirements & business rules
│   ├── AUREN_DESIGN_TOKENS_v1.1.md      # Approved design system specification
│   └── AUREN_Frontend.md             # Comprehensive frontend implementation blueprint
├── progress.md                       # Project milestone and progress tracking
├── technical-depth.md                # This architecture & technical specification file
├── AUREN_Agents.md                   # Agent system prompts and rules
├── AUREN.txt                         # User design directives and notes
└── frontend/
    ├── public/
    │   └── images/
    │       └── auren-login-left.png  # Deployed asset of AurenLogin1.png
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx            # Root layout with SmoothScrollProvider & WorkspaceProvider
    │   │   ├── globals.css           # Tailwind base, linen scrollbars, shimmer gleam, tilt
    │   │   ├── page.tsx              # Public marketing landing page with 3D GSAP objects
    │   │   ├── (auth)/
    │   │   │   ├── login/            # Split-screen auth (Google only, no Apple)
    │   │   │   ├── signup/           # Business registration & category picker
    │   │   │   ├── register/         # Alias route
    │   │   │   ├── forgot-password/  # Password reset flow
    │   │   │   └── verify-email/     # Email verification reminder
    │   │   ├── onboarding/           # 3-step business setup wizard
    │   │   ├── dashboard/            # KPI digest cards, hover tilt, due follow-up banners
    │   │   ├── enquiries/            # Inquiries table, drag-and-drop screenshots, bulk actions
    │   │   ├── customers/            # Directory, duplicate comparison & merge dialog
    │   │   ├── orders/               # Order pipeline, payment balance calculator, receipts
    │   │   ├── products/             # Catalogue, variant tags, low-stock threshold warning
    │   │   ├── follow-ups/           # Date-grouped queue, +2d snooze action, badge decrement
    │   │   ├── quick-replies/        # Reusable templates with 1-click clipboard copy
    │   │   ├── notifications/        # In-app operational alert center
    │   │   └── settings/             # Profile, regional standard, AI quota, 30-day trash retention
    │   ├── components/
    │   │   ├── animations/
    │   │   │   └── floating-objects.tsx # GSAP 3D floating commerce tokens with parallax
    │   │   ├── providers/
    │   │   │   └── smooth-scroll-provider.tsx # Lenis smooth scrolling provider
    │   │   ├── layout/               # AppShell (fixed viewport), Sidebar, TopBar, MobileNav
    │   │   ├── ui/                   # Button, Card, Badge, Input, EditorialBackground, Dialog
    │   │   └── enquiries/            # AddEnquiryModal (Dropzone, draft review, progress bar)
    │   ├── context/
    │   │   └── workspace-context.tsx # Central multi-business reactive state store
    │   ├── lib/
    │   │   ├── mock-data.ts          # Typed mock seed data for multi-business testing
    │   │   └── utils.ts              # Currency (₹ INR), date formatting, cn helper
    │   ├── types/
    │   │   └── index.ts              # Domain entities (Customer, Enquiry, Order, TrashItem)
    │   └── __tests__/                # Vitest unit & integration test suites
    │       ├── login.test.tsx        # Auth UI & Google-only validation (5 tests)
    │       ├── workspace-context.test.tsx # Multi-business state isolation (6 tests)
    │       ├── screenshot-upload.test.ts # HTML5 dropzone & file validation (4 tests)
    │       ├── customer-duplicate.test.ts # Duplicate detection & merge logic (2 tests)
    │       ├── enquiries.test.ts     # Status transitions & filtering (3 tests)
    │       ├── orders.test.ts        # Payment status calculations (3 tests)
    │       └── trash-retention.test.ts # 30-day soft-delete & restore logic (3 tests)
    ├── vitest.config.ts              # Vitest runner with JSDOM
    └── tailwind.config.ts            # Custom colors, keyframes (shimmer, pulseAura, floatSubtle)
```

---

## 3. Core Technical Invariants & Business Logic

### A. Order Payment & Balance Invariant (`src/types/index.ts`):
$$\text{balanceDue} = \max(0, \text{totalAmount} - \text{amountPaid})$$
$$\text{paymentStatus} = \begin{cases} 
\text{"Paid"} & \text{if } \text{amountPaid} \ge \text{totalAmount} \land \text{totalAmount} > 0 \\ 
\text{"Partially Paid"} & \text{if } 0 < \text{amountPaid} < \text{totalAmount} \\ 
\text{"Unpaid"} & \text{otherwise} 
\end{cases}$$

### B. Customer Duplicate Resolution & Tag Consolidation:
- Detection rule: Matches existing customer if `phone` (normalized digits) or social `handle` (case-insensitive) matches an existing record.
- Consolidation behavior:
  - Phone, email, and address merge into primary record.
  - Tag array is unionized: $\text{tags}_{\text{merged}} = \text{Unique}(\text{tags}_{\text{primary}} \cup \text{tags}_{\text{duplicate}})$.
  - Duplicate record is soft-deleted and transitioned to the 30-day retention trash queue.

### C. 30-Day Soft-Delete Retention Policy (SRS FR-DATA-002 / SEC-004):
- Inquiries, customers, or orders deleted by the seller are never permanently expunged immediately.
- Items are tagged with `deletedAt: timestamp` and `daysRemaining: \lfloor 30 - (\text{now} - \text{deletedAt})_{\text{days}} \rfloor`.
- Sellers can restore any item with 1 click before the 30-day window expires.

---

## 4. UI/UX & Kinetic Performance Architecture

### 1. SSR Resilience for Animation Libraries:
- **Challenge:** Webpack in Next.js App Router attempts to pre-bundle client dependencies on the server during dev SSR, causing `Cannot find module './vendor-chunks/lenis.js'` when window-bound libraries are statically imported.
- **Solution:**
  - `SmoothScrollProvider` uses dynamic `import("lenis")` inside client `useEffect` with graceful native fallback.
  - `FloatingObjects` uses dynamic `import("gsap")` inside client `useEffect` with automatic context reversion (`ctx.revert()`).
  - Landing page imports `FloatingObjects` via `dynamic(() => import(...), { ssr: false })`.

### 2. Viewport-Locked Header & Mobile Drawer:
- `AppShell` enforces `h-screen w-full overflow-hidden` on the outermost shell.
- Header (`TopBar`) is pinned with `shrink-0 sticky top-0 z-40`.
- The inner `<main>` container is the sole scrollable viewport (`flex-1 overflow-y-auto`).
- This guarantees the hamburger button never scrolls down on dashboard or list views on mobile or tablet.
- Tapping the hamburger slides out a backdrop-blurred mobile drawer showing the active workspace identity and navigation links with Burgundy/Sage badges.

---

## 5. Quality & Verification Benchmark

- **Automated Unit Tests:** 7 passed test suites, **26/26 tests passing** in Vitest.
- **Live HTTP Route Audit:** **16/16 routes responding with HTTP 200 OK** on `http://localhost:3000` with 0 error overlays.
- **Static TypeScript Check:** `tsc --noEmit` passing with 0 errors.
- **Next.js Production Build:** 19/19 App Router static routes compiled.
- **GitHub Sync:** Pushed and synced cleanly to `origin/main` (`https://github.com/rasikakudale90/Auren.git`).
