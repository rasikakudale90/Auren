# AUREN — Software Requirements Specification (SRS)

**Document version:** 1.0  
**Status:** Implementation baseline — ready for review and execution  
**Product:** AUREN — Social Commerce Business Assistant  
**Tagline:** Every conversation. Every customer. Every order. One workspace.  
**Document purpose:** Provide Google Antigravity's AI Agent with an unambiguous product, functional, technical, security, quality, and delivery specification.

---

## 0. Instructions for the AI Agent

This document is the authoritative implementation specification for AUREN. Read it fully before making code changes.

### 0.1 Rules of execution

1. Treat this SRS as the source of truth. Do not silently invent product behaviour, expand scope, or replace an agreed technology.
2. Implement in small, verifiable milestones. Before each milestone, inspect the existing repository and report its current structure and state.
3. If the repository already contains working code, preserve it. Do not overwrite or regenerate the project blindly.
4. Do not start every module at once. Implement in the dependency order in Section 17.
5. For each requirement, implement its acceptance criteria and tests. Do not mark a requirement complete merely because a screen or API exists.
6. Keep frontend, backend, database, and API contracts consistent. Update OpenAPI documentation and tests whenever a contract changes.
7. Use environment-driven configuration. Never hardcode credentials, tokens, provider keys, deployment URLs, quotas, or environment-specific values.
8. Never read, print, copy, commit, or expose real `.env` files or secrets. `.env.example` may contain placeholder names and safe example values only.
9. Do not push to GitHub, deploy to production, run destructive database operations, or use real customer data unless the user explicitly approves that action.
10. Do not add paid services or incur usage charges. Check free-tier eligibility, limits, commercial-use terms, and current availability before selecting providers. If a free option cannot satisfy a requirement, stop and explain the trade-off rather than silently selecting a paid service.
11. Use fictional demo data only. Never put real personal/customer data into screenshots, seed files, tests, logs, or public demos.
12. Do not claim that an external integration, email, backup, deployment, or AI feature works until it has been tested end to end in the relevant environment.
13. If a decision is genuinely missing or contradictory, stop at that decision, explain the impact, and ask one focused question. Do not guess.
14. Keep implementation straightforward and maintainable. Do not introduce microservices, event brokers, Kubernetes, complex caching infrastructure, or other premature infrastructure.
15. Keep a traceability record linking requirement IDs to code areas and tests.

### 0.2 Definition of implementation completion

A feature is complete only when:
- Its UI and API behaviour match this SRS.
- Validation and permission checks exist on the server, not only in the UI.
- Data is persisted correctly and is isolated by business ownership.
- Loading, empty, success, validation, and failure states are handled.
- Relevant automated tests pass.
- Accessibility and responsive behaviour are checked.
- Documentation is updated where required.

---

## 1. Introduction

### 1.1 Product overview

AUREN is a cross-platform social-commerce workspace for small product-selling businesses. It helps business owners organise customer enquiries, customer records, follow-ups, products, orders, and manual payment tracking in one place.

Small sellers often receive customer enquiries through Instagram, WhatsApp, Facebook, Telegram, websites, phone calls, walk-ins, referrals, and other channels. Important information can become scattered across conversations, notes, and spreadsheets. AUREN provides one organised workspace without requiring direct social-platform integrations in the MVP.

The owner can manually enter an enquiry, paste a customer conversation, or upload a screenshot. AI can extract relevant information into an editable draft. The owner must review and approve the draft before it is saved.

### 1.2 Product vision

Make everyday social-commerce operations easier to manage by bringing customer conversations, enquiries, follow-ups, and orders into one reliable workspace.

### 1.3 Target users

Primary users are owners/operators of small product-selling businesses, including:
- Fashion and clothing sellers.
- Jewellery and accessories sellers.
- Home bakers and food-product sellers.
- Handmade and customised-gift sellers.
- Beauty and cosmetics sellers.
- Home décor and other small product businesses.

MVP access is owner-only. Team members, staff permissions, and collaboration are future scope.

### 1.4 Product boundaries

AUREN is a business-management workspace, not a social network, storefront, payment processor, accounting package, or automated messaging platform.

### 1.5 Terminology

| Term | Meaning |
|---|---|
| Account | A person's AUREN login identity |
| Business | An independent workspace owned by an account |
| Enquiry | A potential customer's request or conversation recorded in AUREN |
| Customer | A person or buyer record associated with one business |
| Follow-up | A reminder/action associated with an enquiry or customer |
| Order | A purchase record created by the business owner |
| Source channel | Where an enquiry originated, e.g. Instagram or WhatsApp |
| AI extraction | Converting pasted text or a screenshot into a suggested structured enquiry |
| Soft delete | Hiding a record while retaining it temporarily for recovery |
| Trash | The section where soft-deleted records can be restored or permanently deleted |

---

## 2. Scope and Priorities

Requirements use MoSCoW priority.

- **MUST:** Required for a safe, usable first release.
- **SHOULD:** Important and expected where feasible, but may be scheduled after the essential workflow if it threatens release quality.
- **COULD:** Useful enhancement; implement only after Must and Should requirements are stable.
- **WON'T (MVP):** Explicitly excluded from the first release. It must not be implemented unless the product owner changes this SRS.

### 2.1 MVP outcome

The MVP must allow a business owner to:
1. Register and securely sign in.
2. Create and configure a business workspace.
3. Capture an enquiry manually or use AI to extract information from pasted text or an uploaded screenshot.
4. Review and edit AI suggestions before saving.
5. Maintain customer records and link enquiries to customers.
6. schedule and manage follow-ups.
7. Create and manage orders linked to enquiries/customers.
8. Track order status and manually record payments.
9. Maintain a basic product catalogue where useful.
10. View a dashboard and in-app notifications.
11. Export business data and manage deletion.
12. Use the application reliably on desktop and mobile browsers as an installable PWA.

### 2.2 Priority baseline

The AI Agent must preserve this priority order. If implementation time is constrained, deliver Must requirements first and do not silently downgrade security, data isolation, or data integrity.

**MUST — essential release**
- Account registration, email verification, login/logout, password reset, secure sessions.
- Business creation, settings needed by core workflows, and business switching.
- Business ownership enforcement on every private API and data query.
- Customer and enquiry CRUD, manual enquiry capture, status management, source channel.
- AI extraction from pasted text and screenshots, with strict review-before-save and manual fallback.
- Follow-up scheduling and in-app due/overdue reminders.
- Order creation and management, payment tracking, and enquiry/customer linking.
- Basic dashboard for enquiries, orders, follow-ups, and revenue summary.
- Product records sufficient to support order items; basic stock quantity if low-stock alerts are enabled.
- Responsive UI, installable PWA, online-only behaviour.
- Server-side validation, secure file handling, standard error responses, logging without private content.
- Database migrations, automated tests, CI checks, staging/production separation, backups and recovery documentation.
- Privacy policy/terms acknowledgement and account export/deletion flows.

**SHOULD — include if it does not compromise the Must release**
- Product image gallery, variants, SKU, low-stock indicators.
- Customer tags, duplicate suggestions, manual merge.
- Customer communication history.
- Custom enquiry statuses, source channels, and enquiry custom fields.
- Search, filters, saved views, bulk actions.
- CSV import and filtered exports.
- Trash and restore workflow; activity history.
- PDF payment receipts.
- Notification centre history and notification preferences.
- Guided onboarding, contextual empty states, sample demo data.
- Help/support, feedback, What's New, public landing page, isolated interactive demo.
- Admin panel and privacy-conscious aggregate platform metrics.
- Device/session management and new-device email alerts.
- Dark/light/system theme, accessibility refinements to WCAG 2.2 AA target.
- Autosave for selected enquiry/order drafts and unsaved-change warnings.

**COULD — only after core release is stable**
- More advanced dashboard/analytics.
- Additional workflow automation.
- More advanced reporting and export formats.
- Additional AI capabilities such as AI-generated reply suggestions.
- Other improvements supported by pilot feedback.

**WON'T — MVP exclusions**
- Automatic inbox access, automatic DM reading, or automatic message sending.
- Direct Instagram, WhatsApp, Facebook, Telegram, or other social-platform integrations.
- Scraping, browser automation, or collecting platform credentials.
- Public third-party API, public webhooks, or customer-facing API keys.
- Payment gateway, subscriptions, billing, accounting, GST/tax invoicing, or automated reconciliation.
- Storefront, shopping cart, customer checkout, or public product marketplace.
- Native Android/iOS applications.
- Offline data editing, offline queue, and background synchronisation.
- Team accounts, staff roles, invitations, and collaboration.
- 2FA in MVP.
- Recurring follow-ups.
- Partial order fulfilment.
- Video uploads.
- External analytics/marketing trackers or optional marketing cookies.
- Public service-status page.
- Admin browsing of private customer messages, customer details, orders, or uploaded screenshots by default.

---

## 3. Overall Description

### 3.1 User classes

| User class | Permissions |
|---|---|
| Business owner | Manages their account and all workspaces they own |
| Platform administrator | Manages platform-level accounts, feedback, maintenance, and aggregate metrics; no default access to private business content |
| Public visitor | Views landing page, public demo, legal pages, and registration/login pages |

There are no business staff/member roles in MVP.

### 3.2 Operating environment

- Modern desktop and mobile browsers.
- Responsive web application with installable PWA support.
- Internet connection required for normal use.
- Frontend hosted on Vercel (planned).
- Backend hosted on Render (planned).
- PostgreSQL hosted on Supabase (planned).
- Private object storage for uploaded images/screenshots (provider to be selected after free-tier review).

### 3.3 Constraints

- Free-tier-first development and pilot.
- Do not assume free-tier services are unlimited or permanent.
- Provider plans, quotas, commercial-use terms, sleep/inactivity behaviour, and backup capabilities must be checked before deployment.
- No paid API usage without explicit product-owner approval.
- External provider credentials remain server-side.
- No social-platform API integration in MVP.
- AUREN must remain usable for manual data entry if AI is unavailable or quota is exhausted.

### 3.4 High-level architecture

Use a **modular monolith**:

```text
Browser / Installable PWA
        |
        | HTTPS / JSON REST API
        v
Next.js + TypeScript Frontend
        |
        v
Spring Boot REST Backend
  |       |        |       |
 Auth   Business  AI    Background Jobs
  |       |        |       |
  +-------+--------+-------+
                  |
          Spring Data JPA
                  |
             PostgreSQL
                  |
       Private Object Storage
```

The backend is the authority for authentication, authorisation, validation, business rules, quota enforcement, and data access.

---

## 4. Technology Stack

### 4.1 Frontend

| Concern | Required choice |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI components | shadcn/ui |
| Package manager | npm |
| Shared state | Zustand only where cross-page/shared state is needed |
| Local state | React built-in state/hooks |
| Forms | React Hook Form |
| Validation | Zod |
| PWA | Installable PWA; online-only MVP |
| Navigation | Desktop sidebar; mobile bottom navigation; secondary sections in a menu |

Do not add Redux or another global state framework unless the product owner approves a documented need.

### 4.2 Backend

| Concern | Required choice |
|---|---|
| Language | Java 21 LTS |
| Framework | Latest stable Spring Boot version compatible with Java 21 at implementation time |
| Build | Maven |
| Persistence | Spring Data JPA + Hibernate |
| Migrations | Flyway version-controlled SQL migrations |
| Security | Spring Security |
| API | REST + JSON |
| API prefix | `/api/v1/` |
| Documentation | OpenAPI/Swagger |
| Database | PostgreSQL |

### 4.3 Backend architecture

Use layered responsibilities inside a package-by-feature structure.

```text
com.auren
├── auth
├── business
├── customer
├── enquiry
├── followup
├── order
├── product
├── notification
├── ai
├── file
├── importexport
├── admin
└── common
```

Each feature may contain its own controller, service, repository, DTOs, validation, and mapping classes.

Request flow:

```text
Controller -> Service -> Repository -> PostgreSQL
```

Rules:
- Controllers handle HTTP concerns and DTO input/output.
- Services contain business rules and transaction boundaries.
- Repositories handle persistence only.
- Never expose JPA entities directly from API endpoints.
- Use DTOs and explicit mapping.
- Avoid business logic in controllers.
- Use transactions for multi-record operations.
- Do not create microservices.

### 4.4 Database conventions

- PostgreSQL.
- UUID primary keys for all primary entities.
- Use `created_at` and `updated_at` timestamps where relevant.
- Store timestamps consistently (UTC); convert for display using the selected business timezone.
- Use database constraints and indexes for important relationships and uniqueness rules.
- Use Flyway for every schema change.
- Do not use Hibernate auto-DDL in production.
- Business-owned records must carry an explicit business relationship and be protected by ownership checks.
- Keep uploaded binary files in object storage; store metadata and object references in PostgreSQL.

---

## 5. Functional Requirements

### 5.1 Authentication and account security

**FR-AUTH-001 — Registration**  
Priority: MUST  
The system shall allow a user to register using an email address and password.  
Acceptance criteria:
- Email is normalised and checked for uniqueness.
- Password policy is enforced server-side.
- Registration creates an unverified account state.
- The user is informed that email verification is required.
- Duplicate or invalid registration receives a safe, understandable error.

**FR-AUTH-002 — Email verification**  
Priority: MUST  
The system shall require email verification before normal account use.  
Acceptance criteria:
- Verification token is random, single-use, time-limited, and stored safely (e.g. hashed).
- Expired/used tokens are rejected.
- User can request a new verification email subject to rate limits.
- Verification emails are sent asynchronously.
- Verification status is checked by the backend.

**FR-AUTH-003 — Login and logout**  
Priority: MUST  
The system shall support email/password login and Google login.  
Acceptance criteria:
- Spring Security manages authentication and authorisation.
- Passwords are hashed using BCrypt.
- JWT access and refresh token strategy is used.
- Tokens are delivered/stored using secure HttpOnly cookies; do not store tokens in localStorage.
- Cookies use Secure in production and appropriate SameSite settings.
- Logout revokes the refresh session.
- Invalid credentials do not reveal whether an email exists.

**FR-AUTH-004 — Refresh session**  
Priority: MUST  
The system shall support short-lived access tokens and longer-lived refresh tokens.  
Acceptance criteria:
- Refresh tokens rotate on use.
- Reuse of a revoked/rotated token is rejected and handled safely.
- Refresh sessions can be revoked on logout or account security events.
- Session records support device/session management.

**FR-AUTH-005 — Password reset**  
Priority: MUST  
The system shall provide a secure email-based password reset.  
Acceptance criteria:
- Reset token is single-use, time-limited, and stored safely.
- Reset requests are rate-limited.
- Password is revalidated and rehashed.
- Existing refresh sessions are revoked after a successful reset.
- Response does not disclose account existence.

**FR-AUTH-006 — Google login**  
Priority: MUST  
The system shall support Google sign-in through a secure OAuth/OIDC flow.  
Acceptance criteria:
- Backend validates the identity response and issuer/audience/signature as appropriate.
- Account linking follows a safe verified-email policy.
- No client-supplied identity claim is trusted without validation.
- Provider configuration is environment-driven.

**FR-AUTH-007 — Account profile and email change**  
Priority: SHOULD  
Users shall manage personal account profile separately from business settings. Email changes require verification of the new address and notification to the old address.

**FR-AUTH-008 — Session management**  
Priority: SHOULD  
Users shall view active sessions with basic device information and revoke one or all sessions. New-device login triggers an email alert.  
Acceptance criteria:
- Revocation invalidates the relevant refresh session.
- Device details are approximate and privacy-conscious.
- Email alert is asynchronous and must not block login.

**FR-AUTH-009 — Account deactivation and deletion**  
Priority: MUST  
Users shall be able to temporarily deactivate an account and separately request permanent deletion.  
Acceptance criteria:
- Deactivation preserves data but blocks normal access.
- Reactivation requires secure verification.
- Permanent deletion requires a clear warning and explicit confirmation.
- User is offered export before deletion.
- Deletion covers associated businesses, records, and files, subject to documented backup retention.
- Backup-retention limits and eventual purge timing are disclosed.

**FR-AUTH-010 — Login protection**  
Priority: MUST  
Rate-limit login, password reset, verification, email change, and other sensitive authentication endpoints. Use temporary protection against repeated failures without permanent lockout. Use adaptive CAPTCHA only when suspicious activity warrants it.

**FR-AUTH-011 — Password policy**  
Priority: MUST  
Enforce a documented minimum password length and reject common/compromised passwords where a safe supported mechanism is available. Do not force periodic password changes.

### 5.2 Business workspace management

**FR-BIZ-001 — Create business**  
Priority: MUST  
An account shall be able to create and own multiple business workspaces. Each business has independent data.

**FR-BIZ-002 — Business isolation**  
Priority: MUST  
Every business-owned record must be accessible only to an authorised owner of that business.  
Acceptance criteria:
- Backend derives the authenticated account from the verified session.
- The backend checks ownership for every read, create, update, archive, delete, export, and file operation.
- A client-supplied business ID is never treated as proof of access.
- Cross-business access tests cover guessed/modified UUIDs and nested resources.
- Database constraints reinforce valid business relationships.
- No shared customer records across separate businesses.

**FR-BIZ-003 — Business switcher**  
Priority: MUST  
Users shall switch between their businesses using a workspace switcher. Remember the last-used business after login. Do not combine metrics/data across businesses in one dashboard.

**FR-BIZ-004 — Business profile/settings**  
Priority: MUST  
Business settings shall include name, logo, description, contact details, address, category, currency, timezone, date format, receipt details, and relevant workflow settings.  
Acceptance criteria:
- Settings are scoped to the selected business.
- Currency and timezone are independent per business.
- Default currency is INR.
- Default timezone is Asia/Kolkata.
- Default date format is DD/MM/YYYY.
- User can select another supported currency, timezone, and date format.

**FR-BIZ-005 — Archive and restore business**  
Priority: SHOULD  
A business may be archived and restored. Archiving hides it from normal workspace lists but does not permanently delete its data.

### 5.3 Customers

**FR-CUST-001 — Customer CRUD**  
Priority: MUST  
Owners shall create, view, edit, and archive customer records.  
Fields:
- Name (required).
- Phone (optional).
- Email (optional).
- Social username/handle (optional).
- Notes (optional).
- Tags (optional, when tagging feature is enabled).

**FR-CUST-002 — Independent customer records**  
Priority: MUST  
A customer record belongs to one business only. The same person may have separate records in different business workspaces.

**FR-CUST-003 — Duplicate suggestions**  
Priority: SHOULD  
The system shall detect possible duplicate customers by phone, email, or social username and ask the owner to review. Never merge automatically.

**FR-CUST-004 — Manual merge**  
Priority: SHOULD  
Owner may manually merge selected duplicate customer records after reviewing the information and linked enquiries/orders. Preserve valid relationships and avoid losing data.

**FR-CUST-005 — Customer tags**  
Priority: SHOULD  
Support predefined and owner-created tags. Multiple tags may be assigned to a customer. Tags are searchable/filterable and scoped to the business.

**FR-CUST-006 — Communication history**  
Priority: SHOULD  
Allow manual communication-history entries with channel, date/time, notes/summary, outcome, and next action. No automatic message synchronisation.

### 5.4 Enquiries

**FR-ENQ-001 — Manual enquiry capture**  
Priority: MUST  
Owner shall be able to create an enquiry manually.  
Minimum fields:
- Enquiry title or short summary.
- Customer link or new customer details.
- Source channel.
- Enquiry status.
- Message/notes.
- Product/service interest where known.
- Date/time received.
- Optional expected value/quoted amount where relevant.

**FR-ENQ-002 — Source channels**  
Priority: MUST  
Provide predefined channels:
- Instagram
- WhatsApp
- Facebook
- Telegram
- Website
- Phone call
- Walk-in
- Referral
- Other

Owner may create custom channels. Channels are scoped to the business.

**FR-ENQ-003 — Enquiry statuses**  
Priority: MUST  
Provide default statuses:
- New
- Contacted
- Interested
- Waiting for Customer
- Converted
- Lost

Owners may create and manage custom statuses. Status changes must be validated and recorded in basic activity history where enabled.

**FR-ENQ-004 — Paste conversation**  
Priority: MUST  
Owner shall be able to paste customer conversation text into an enquiry capture flow and request AI extraction.

**FR-ENQ-005 — Screenshot extraction**  
Priority: MUST  
Owner shall be able to upload up to 3 screenshots for AI extraction.  
Acceptance criteria:
- Supported formats: JPG, PNG, WebP.
- Each screenshot is at most 10 MB before upload.
- File type and actual content are validated server-side.
- Uploaded files are private.
- Owner chooses whether to retain or discard the screenshot after extraction.
- Retained screenshots are linked to the relevant enquiry and protected by ownership checks.
- No public file URLs.

**FR-ENQ-006 — AI extraction draft**  
Priority: MUST  
AI shall extract supported fields from pasted text or screenshots into an editable draft.  
Acceptance criteria:
- The system extracts all supported information it can identify.
- Unknown or ambiguous values remain blank or are marked for review.
- AI must not invent customer details, product names, quantities, prices, delivery information, or commitments.
- Suggested customer matches are presented for owner selection.
- Suggested category/intent may be shown where useful.
- The owner must review and explicitly approve before saving.
- The AI must never create an enquiry/customer/order without owner confirmation.
- Extraction supports English, Hindi, Marathi, and Hinglish, with automatic language detection.

**FR-ENQ-007 — Multiple enquiries in one conversation**  
Priority: SHOULD  
If a pasted conversation contains multiple potential enquiries, show separate editable drafts. The owner reviews and saves each independently. No automatic save.

**FR-ENQ-008 — Enquiry-to-customer linking**  
Priority: MUST  
An enquiry may be linked to an existing customer or a newly created customer. AI suggestions never link automatically.

**FR-ENQ-009 — Enquiry-to-order conversion**  
Priority: MUST  
An enquiry may be marked Converted and linked to one or more orders. Preserve the enquiry after conversion.

**FR-ENQ-010 — Enquiry custom fields**  
Priority: SHOULD  
Allow business owners to define custom enquiry fields of types Text, Number, Date, Dropdown, Checkbox, and Multi-select. Owners can create, edit, and reorder fields. Changes must not silently corrupt existing values.

**FR-ENQ-011 — Search and filters**  
Priority: SHOULD  
Support global search and enquiry-specific search/filters, including status, source channel, date, and relevant customer/product attributes.

### 5.5 Follow-ups

**FR-FUP-001 — Schedule follow-up**  
Priority: MUST  
Owner shall schedule a one-time follow-up against an enquiry/customer with due date/time and optional note.

**FR-FUP-002 — Follow-up status**  
Priority: MUST  
Follow-ups can be marked Pending or Completed. Overdue status is derived from due time and completion state.

**FR-FUP-003 — Due/overdue notification**  
Priority: MUST  
Generate in-app notifications for due and overdue follow-ups using the business timezone. Avoid duplicate notifications for the same event.

**FR-FUP-004 — No recurrence**  
Priority: MUST  
Recurring follow-ups are out of MVP scope.

**FR-FUP-005 — Bulk follow-up actions**  
Priority: SHOULD  
Allow selected follow-ups to be marked completed or otherwise updated where safe. Confirm destructive actions.

### 5.6 Orders and payments

**FR-ORD-001 — Create order**  
Priority: MUST  
Owner shall create an order linked to a customer and optionally an enquiry. An enquiry may link to multiple orders.

**FR-ORD-002 — Order details**  
Priority: MUST  
An order shall support:
- Order reference.
- Customer.
- Optional enquiry.
- Order items.
- Quantity and unit price.
- Item/line totals.
- Order total.
- Order status.
- Payment status.
- Delivery details.
- Notes.
- Created/updated timestamps.

**FR-ORD-003 — Order statuses**  
Priority: MUST  
Provide a practical default order lifecycle, including at minimum Pending, Confirmed, Processing, Shipped/Dispatched, Delivered, and Cancelled. Exact display labels may be refined during UI design but must be consistent across UI/API.

**FR-ORD-004 — Payment statuses**  
Priority: MUST  
Support Unpaid, Partially Paid, Paid, and Refunded.

**FR-ORD-005 — Manual payment records**  
Priority: MUST  
Owner shall manually record payments with amount, date/time, payment method, and optional reference/note. Supported default methods: Cash, UPI, Bank Transfer, Card, Other. Owner may add custom methods.

**FR-ORD-006 — Payment balance calculation**  
Priority: MUST  
Calculate paid amount and remaining balance from payment records. Validate amounts and prevent invalid totals. Refund handling must not incorrectly inflate revenue or paid balance.

**FR-ORD-007 — Cancelled orders**  
Priority: MUST  
Cancelled orders remain stored with Cancelled status and are excluded from active-order and revenue summaries. They remain available in history.

**FR-ORD-008 — Partial fulfilment**  
Priority: MUST  
Partial order fulfilment is not supported in MVP. Each order has one delivery/fulfilment status.

**FR-ORD-009 — Payment receipt PDF**  
Priority: SHOULD  
Generate a basic downloadable PDF receipt showing business/customer details, order reference, amount paid, payment date/method, and remaining balance. It is not a tax invoice or GST invoice.

**FR-ORD-010 — Order search and bulk actions**  
Priority: SHOULD  
Support order search/filtering and safe bulk operations where meaningful. Destructive actions require confirmation.

### 5.7 Products and stock

**FR-PROD-001 — Product catalogue**  
Priority: MUST  
Support basic product records sufficient to create order items. Minimum fields: name, optional description, price, optional category, and optional stock quantity.

**FR-PROD-002 — Product images**  
Priority: SHOULD  
Support multiple product images in JPG, PNG, or WebP, maximum 5 MB per uploaded original before processing. Images are private unless a later approved public use case requires otherwise.

**FR-PROD-003 — Variants and SKU**  
Priority: SHOULD  
Support variants such as size and colour, and optional SKU. Keep variant and order-item references consistent.

**FR-PROD-004 — Stock quantity**  
Priority: SHOULD  
Allow manual stock quantity updates. Do not implement supplier management, purchase orders, or advanced inventory accounting.

**FR-PROD-005 — Low-stock notification**  
Priority: SHOULD  
Allow a configurable low-stock threshold and generate an in-app notification when stock reaches the threshold. Avoid repeated duplicate alerts until stock changes/recovery rules are met.

### 5.8 Dashboard and search

**FR-DASH-001 — Business dashboard**  
Priority: MUST  
Dashboard is scoped to the currently selected business and shows:
- Total/new enquiries.
- Total orders.
- Pending follow-ups.
- Revenue summary.
- Recent enquiries.
- Recent orders.
- Low-stock products when product stock is enabled.

**FR-DASH-002 — Revenue calculation**  
Priority: MUST  
Define revenue consistently using recorded payments for non-cancelled orders, excluding refunded amounts as appropriate. Display selected date range and business currency. Do not present order value as collected revenue.

**FR-DASH-003 — Global search**  
Priority: SHOULD  
Search relevant records within the selected business only. Search results must enforce business ownership and respect archived/deleted visibility.

**FR-DASH-004 — Section filters**  
Priority: SHOULD  
Each major section shall provide useful filters and sorting.

**FR-DASH-005 — Saved views**  
Priority: SHOULD  
Owners may save, edit, and delete named filter views. Views are private to the selected business.

### 5.9 Notifications

**FR-NOTIF-001 — In-app notifications**  
Priority: MUST  
Generate in-app notifications for:
- Follow-ups due/overdue.
- New enquiries.
- Newly created orders.
- Low-stock products (when enabled).

**FR-NOTIF-002 — Notification centre**  
Priority: SHOULD  
Provide notification history with read/unread state and timestamps. Owner can mark notifications as read and revisit older notifications.

**FR-NOTIF-003 — Grouping**  
Priority: SHOULD  
Group similar notifications to reduce clutter without hiding important individual records or actions.

**FR-NOTIF-004 — Preferences**  
Priority: SHOULD  
Allow per-business preferences for follow-up, new-enquiry, new-order, and low-stock notifications.

**FR-NOTIF-005 — No browser push**  
Priority: MUST  
Browser push notifications are excluded from MVP. Notifications are in-app only.

### 5.10 Files and media

**FR-FILE-001 — Provider-independent storage**  
Priority: MUST  
Implement an object-storage abstraction. Choose the concrete free-tier provider only after checking limits, privacy, and commercial-use conditions.

**FR-FILE-002 — Private access**  
Priority: MUST  
Files are private and retrieved only through authorised, short-lived signed URLs or an equivalent secure mechanism. Verify ownership before issuing access.

**FR-FILE-003 — Validation**  
Priority: MUST  
Accept only JPG, PNG, and WebP for supported image uploads. Enforce 5 MB product-image and 10 MB screenshot limits. Validate actual content, not only filename or browser MIME type.

**FR-FILE-004 — Optimisation**  
Priority: SHOULD  
Optimise/compress and resize images while preserving acceptable quality. Keep originals only where necessary and justified.

**FR-FILE-005 — Deletion consistency**  
Priority: MUST  
When a record/file is permanently deleted, remove associated objects according to the retention policy. Handle failed object deletion safely and retry/record the failure.

**FR-FILE-006 — No video**  
Priority: MUST  
Video uploads are excluded from MVP.

### 5.11 Import, export, trash, and activity

**FR-DATA-001 — CSV export**  
Priority: MUST  
Allow complete business data export as separate CSV files by data type:
- Customers.
- Enquiries.
- Follow-ups.
- Orders and order items.
- Products and variants.
- Quick replies, if implemented.

**FR-DATA-002 — Section export**  
Priority: SHOULD  
Allow filtered or selected records to be exported from relevant sections.

**FR-DATA-003 — CSV import**  
Priority: SHOULD  
Support customer and product CSV import using downloadable templates. Provide validation preview, row-level errors, and duplicate detection. Do not require automatic column mapping or Excel support.

**FR-DATA-004 — Trash**  
Priority: SHOULD  
Soft-deleted records appear in a dedicated Trash section with restore, manual permanent-delete, and scheduled-deletion information.

**FR-DATA-005 — Retention**  
Priority: MUST  
Use hybrid deletion: soft-delete initially; records remain recoverable for a documented/configurable retention period and are permanently deleted after expiry. Account deletion follows a separate policy. The exact retention duration must be configured/documented before production; do not invent a legal retention period.

**FR-DATA-006 — Activity history**  
Priority: SHOULD  
Keep basic activity history with action and timestamp for important changes. Full before/after audit history is not required in MVP.

### 5.12 Quick replies and communication

**FR-COMM-001 — Manual quick replies**  
Priority: SHOULD  
Allow owners to save and reuse manually written response templates. AUREN does not send the message; the owner copies it into the external channel.

**FR-COMM-002 — AI replies excluded**  
Priority: MUST  
AI-generated customer replies are excluded from MVP and may be considered in Phase 2.

**FR-COMM-003 — No message sending**  
Priority: MUST  
AUREN must not send messages to Instagram, WhatsApp, Facebook, Telegram, email recipients, or customers as an automated action in MVP.

### 5.13 Onboarding, help, feedback, and public site

**FR-UX-001 — Guided onboarding**  
Priority: SHOULD  
Guide a new owner through welcome, business profile, category, basic settings, and dashboard checklist.

**FR-UX-002 — Dashboard checklist**  
Priority: SHOULD  
Show onboarding tasks, auto-complete when appropriate, allow dismissal, and hide after completion/dismissal.

**FR-UX-003 — Empty states**  
Priority: SHOULD  
Major sections must show helpful empty states with a concise explanation and relevant next action.

**FR-UX-004 — Sample data**  
Priority: SHOULD  
Offer optional fictional sample data, clearly labelled and easy to remove. Keep demo/sample data separate from real records.

**FR-UX-005 — Help/support**  
Priority: SHOULD  
Provide FAQs, guides, troubleshooting, contact-support form, and basic issue reporting. No live chat.

**FR-UX-006 — Feedback**  
Priority: SHOULD  
Allow general feedback, bug reports, and feature suggestions with optional description/screenshot and a confirmation state.

**FR-UX-007 — What's New**  
Priority: SHOULD  
Show release notes with release date and categories such as features, improvements, and bug fixes.

**FR-UX-008 — Public landing page**  
Priority: SHOULD  
Provide product introduction, value proposition, features, screenshots/demo preview, benefits, FAQ, sign-up/login, and contact information.

**FR-UX-009 — Interactive public demo**  
Priority: SHOULD  
Provide an isolated demo workspace with fictional data, plus screenshots/videos. It must not expose or share real user data or permit demo data to contaminate real accounts.

**FR-UX-010 — Pricing and subscriptions**  
Priority: MUST  
No pricing page, paid subscriptions, or subscription payment processing in MVP. The initial pilot is free.

### 5.14 Platform administration

**FR-ADMIN-001 — Admin access**  
Priority: SHOULD  
Provide a basic platform admin panel. Admin privileges are assigned only through backend-controlled roles and an initial allowlist/provisioning process. Normal users cannot grant themselves admin access.

**FR-ADMIN-002 — Admin overview**  
Priority: SHOULD  
Admin may view registered users, associated business-account metadata, and submitted feedback/bug reports.

**FR-ADMIN-003 — Suspension**  
Priority: SHOULD  
Admin may temporarily suspend an account for abuse/security reasons, record a reason, and restore it later.

**FR-ADMIN-004 — Sensitive admin actions**  
Priority: MUST  
Suspension, restoration, and admin privilege changes require confirmation and are recorded.

**FR-ADMIN-005 — Private business content**  
Priority: MUST  
Admin cannot browse private business data by default, including customer details, messages, orders, and screenshots. Do not create a hidden support backdoor.

**FR-ADMIN-006 — Aggregate metrics**  
Priority: SHOULD  
Show privacy-conscious aggregate metrics: registered users, active businesses, enquiry/order counts, feature usage, AI usage/failure, and application errors. Do not include private customer message content.

**FR-ADMIN-007 — Maintenance mode**  
Priority: SHOULD  
Admin may enable maintenance mode. Show a clear maintenance message to users while preserving secure admin access.

---

## 6. AI Extraction Requirements

### 6.1 Provider strategy

- Use an external AI API through a provider-independent backend abstraction.
- Initial provider: Google Gemini API.
- Provider can be replaced without changing enquiry-domain logic.
- API keys remain on the backend only.
- No AI key or privileged provider configuration may be shipped to the browser.
- Provider selection and model name must be environment-driven.
- Verify current free-tier quota, data handling, regional availability, and commercial-use terms before enabling production use.

### 6.2 Extraction input limits

**FR-AI-001 — Input limits**  
Priority: MUST  
Maximum 10,000 characters per text extraction and maximum 3 screenshots per extraction. Validate before sending to provider. Return a user-friendly limit error.

**FR-AI-002 — Structured extraction**  
Priority: MUST  
Request structured output matching a backend-defined schema. Validate provider output against that schema before returning it to the frontend. Reject malformed or unexpected fields safely.

**FR-AI-003 — No hallucinated data**  
Priority: MUST  
Extract only information supported by the input. Unknown, unclear, or conflicting fields remain blank or flagged for review. Never invent facts.

**FR-AI-004 — Adaptive extraction**  
Priority: MUST  
Extract all relevant supported fields available in the input. Do not require the owner to configure a list of fields before extraction.

**FR-AI-005 — Languages**  
Priority: MUST  
Support English, Hindi, Marathi, and Hinglish, with automatic language detection. Preserve original customer wording where useful.

**FR-AI-006 — Review before save**  
Priority: MUST  
Every extraction result is an editable draft. No customer or enquiry is persisted from AI output until the owner explicitly confirms.

**FR-AI-007 — Customer match suggestions**  
Priority: SHOULD  
Suggest possible matches from the current business only. The owner chooses whether to link or create a customer.

**FR-AI-008 — Multiple enquiry detection**  
Priority: SHOULD  
Detect multiple potential enquiries in one conversation and return separate drafts for owner review.

**FR-AI-009 — Review indicators**  
Priority: MUST  
Use simple indicators such as Needs review, Missing information, and Ready for review. Do not show numeric confidence scores.

**FR-AI-010 — Retry policy**  
Priority: MUST  
Retry temporary AI failures up to 2 times. Do not retry permanent errors or quota exhaustion. Provide manual Retry where appropriate, subject to quota. Preserve original input and prevent duplicate records.

**FR-AI-011 — Failure fallback**  
Priority: MUST  
If AI is unavailable, fails, or quota is exhausted, allow manual enquiry creation. Do not block the core enquiry workflow.

**FR-AI-012 — Failure metadata**  
Priority: MUST  
Store only failure category, timestamp, and provider error code where available. Do not store customer message content or personal data in AI error logs.

**FR-AI-013 — Extraction history**  
Priority: SHOULD  
Keep only the latest extraction result and basic usage metadata (timestamp, provider, token usage where available, success/failure). Do not retain every prior attempt. The final owner-approved enquiry remains stored normally.

**FR-AI-014 — User correction feedback**  
Priority: SHOULD  
Allow owners to correct fields and optionally report categories such as incorrect product/customer details, incorrect price, or other. Customer data must not automatically be used for model training.

### 6.3 AI quota management

**FR-AI-015 — Per-business usage tracking**  
Priority: MUST  
Track AI usage per business and display the remaining quota.

**FR-AI-016 — Monthly reset**  
Priority: MUST  
Quota resets on the first day of each calendar month. Unused quota does not carry forward. Show the next reset date using a clear date/time convention.

**FR-AI-017 — Quota enforcement**  
Priority: MUST  
Enforce quotas on the backend. Do not rely on frontend counters.

**FR-AI-018 — No override**  
Priority: MUST  
No manual quota override by the business owner. When exhausted, manual enquiry capture remains available.

**FR-AI-019 — Admin quota configuration**  
Priority: SHOULD  
Platform admin sets default quota and may configure individual business limits.

**FR-AI-020 — Immediate quota changes**  
Priority: MUST  
Quota changes apply immediately. If a reduced quota is below current usage, block further AI extraction until the quota is increased or reset.

**FR-AI-021 — Emergency AI switch**  
Priority: MUST  
Platform admin can disable/enable AI platform-wide. Manual enquiry capture must continue to work.

**FR-AI-022 — Basic AI analytics**  
Priority: SHOULD  
Show total, successful, and failed extractions and remaining quota. No advanced technical AI analytics dashboard.

---

## 7. Non-Functional Requirements

### 7.1 Performance

**NFR-PERF-001** — Normal API operations should target under 500 ms under expected MVP load, excluding AI processing and file uploads.  
**NFR-PERF-002** — Design initially for approximately 100–500 businesses, with a path to scale without premature complexity.  
**NFR-PERF-003** — Use server-side pagination for lists. Default page size is 20; allow 10 or 50 and remember the user's preference.  
**NFR-PERF-004** — Use a configured HikariCP connection pool compatible with the hosting database connection limit. Set sensible connection and query timeouts.  
**NFR-PERF-005** — Monitor slow database queries and optimise them.  
**NFR-PERF-006** — Use selective caching only for stable data such as settings, source channels, and product categories. Invalidate/refresh when updated. Do not cache sensitive or frequently changing records without a clear reason.

### 7.2 Security and privacy

**NFR-SEC-001** — All production traffic must use HTTPS.  
**NFR-SEC-002** — Enforce authentication and business-level authorisation server-side for every private operation.  
**NFR-SEC-003** — Use secure HttpOnly cookies for authentication tokens; never localStorage.  
**NFR-SEC-004** — Hash passwords using BCrypt.  
**NFR-SEC-005** — Protect against common web risks including injection, XSS, CSRF where applicable to cookie-based authentication, broken access control, insecure direct object references, and unsafe file uploads.  
**NFR-SEC-006** — Rate-limit public and sensitive endpoints; stricter limits for authentication and AI endpoints. Return HTTP 429 when rate limits are exceeded.  
**NFR-SEC-007** — Do not log passwords, tokens, API keys, customer messages, uploaded content, or sensitive personal data.  
**NFR-SEC-008** — Use least-privilege service credentials and separate secrets per environment.  
**NFR-SEC-009** — Keep AI, email, storage, database, and OAuth secrets on the backend.  
**NFR-SEC-010** — Provide Privacy Policy and Terms of Service before public registration. Disclose data collection, AI processing, retention, export/deletion, and user responsibilities. Review applicable Indian legal requirements before public launch.  
**NFR-SEC-011** — Essential cookies only. No optional analytics/marketing cookies in MVP.  
**NFR-SEC-012** — Admin must not have default access to private business content.

### 7.3 Reliability and failure handling

**NFR-REL-001** — Handle provider/network outages gracefully with clear user-facing errors.  
**NFR-REL-002** — Preserve unsaved form data where practical and provide manual retry.  
**NFR-REL-003** — Retry only transient failures and only when the operation is safe to repeat. Never blindly retry create operations. Use idempotency protection where appropriate.  
**NFR-REL-004** — Use background processing for large CSV import/export and asynchronous email. Show job status, progress where practical, completion/failure, and row-level error reports.  
**NFR-REL-005** — Use Spring scheduling for recurring internal tasks such as reminder generation, retention cleanup, and quota reset. Ensure jobs are idempotent and safe if repeated.  
**NFR-REL-006** — Provide health checks for backend, database, and critical dependencies without exposing sensitive infrastructure details.  
**NFR-REL-007** — Define initial recovery objectives: RTO 24 hours and RPO 24 hours, subject to actual provider-plan capabilities.  
**NFR-REL-008** — Provide graceful maintenance mode and clear user messaging.

### 7.4 Backup and disaster recovery

**NFR-BACKUP-001** — Schedule daily database backups, subject to hosting plan support.  
**NFR-BACKUP-002** — Keep daily backups for 7 days where provider/storage capabilities allow.  
**NFR-BACKUP-003** — Back up uploaded files separately from database records.  
**NFR-BACKUP-004** — Document recovery procedures for database corruption/loss, file loss, server failure, and compromised credentials.  
**NFR-BACKUP-005** — Perform monthly restore tests for database and files, verify integrity, and record test results.  
**NFR-BACKUP-006** — Before production deployment, verify actual backup, retention, and restore features of the chosen free-tier plans. If requirements cannot be met, report the gap and obtain approval for a revised plan.

### 7.5 Usability and accessibility

**NFR-UX-001** — Responsive layout for desktop, tablet, and mobile.  
**NFR-UX-002** — Desktop uses sidebar navigation; mobile uses bottom navigation and a menu for secondary sections.  
**NFR-UX-003** — Support light, dark, and system theme preferences at account level.  
**NFR-UX-004** — Interface language is English-only in MVP. AI extraction still supports English, Hindi, Marathi, and Hinglish.  
**NFR-UX-005** — Target WCAG 2.2 AA: keyboard navigation, visible focus, sufficient contrast, screen-reader labels, accessible forms/validation, and scalable text.  
**NFR-UX-006** — Use consistent loading, empty, success, validation, and error states.  
**NFR-UX-007** — No custom keyboard shortcuts in MVP; normal keyboard accessibility is required.  
**NFR-UX-008** — PWA is installable but online-only. Show a clear offline/unavailable state. Do not promise offline editing or sync.

### 7.6 Observability

**NFR-OBS-001** — Use structured backend logs with correlation/request IDs where practical.  
**NFR-OBS-002** — Add frontend/backend error monitoring through a provider-independent integration. Select a free-tier provider only after checking privacy, quotas, and terms.  
**NFR-OBS-003** — Redact secrets and private data from error monitoring.  
**NFR-OBS-004** — Monitor API error spikes, repeated login failures, unusual AI usage, storage growth, and critical server/database issues.  
**NFR-OBS-005** — Use first-party aggregate platform metrics only. Do not add third-party analytics trackers in MVP.

### 7.7 Session and form behaviour

**NFR-SESSION-001** — Automatically log out after 30 minutes of inactivity. Warn before logout where practical.  
**NFR-SESSION-002** — Allow multiple active sessions/devices; users can revoke individual/all sessions (SHOULD feature).  
**NFR-FORM-001** — Autosave selected enquiry and order drafts locally where practical. Restore after reload and clear after successful submission. Avoid storing unnecessary sensitive data.  
**NFR-FORM-002** — Warn before navigating away from forms with unsaved changes.

---

## 8. API Requirements

### 8.1 General API conventions

- Base path: `/api/v1/`.
- JSON request/response bodies unless a file upload/download is required.
- UUIDs for public resource identifiers.
- Use DTOs, not persistence entities.
- Validate all request fields on the backend.
- Use consistent HTTP status codes.
- Return a standard error shape.

Example error response:

```json
{
  "errorCode": "VALIDATION_ERROR",
  "message": "Please review the highlighted fields.",
  "timestamp": "2026-01-01T10:00:00Z",
  "fieldErrors": [
    {
      "field": "customerName",
      "message": "Customer name is required."
    }
  ],
  "requestId": "example-request-id"
}
```

Do not return stack traces, SQL details, provider secrets, or internal implementation details.

### 8.2 API areas

The following are logical API areas, not a requirement to implement all endpoints in one milestone:

| Area | Example base path |
|---|---|
| Authentication | `/api/v1/auth` |
| Account profile/sessions | `/api/v1/account` |
| Businesses | `/api/v1/businesses` |
| Customers | `/api/v1/customers` |
| Enquiries | `/api/v1/enquiries` |
| AI extraction | `/api/v1/ai/extractions` |
| Follow-ups | `/api/v1/follow-ups` |
| Orders | `/api/v1/orders` |
| Payments | `/api/v1/orders/{orderId}/payments` |
| Products | `/api/v1/products` |
| Notifications | `/api/v1/notifications` |
| Files | `/api/v1/files` |
| Import/export | `/api/v1/imports`, `/api/v1/exports` |
| Feedback | `/api/v1/feedback` |
| Admin | `/api/v1/admin` |

### 8.3 API design rules

1. Use pagination for list endpoints.
2. Apply business scope from the authenticated principal and validate the selected business membership/ownership.
3. Do not trust a `businessId` supplied by the browser without checking ownership.
4. Use explicit request/response DTOs.
5. Document endpoints, parameters, response schemas, and error codes in OpenAPI.
6. Use idempotency protection for operations where network retries could create duplicate records.
7. Use appropriate status codes: 200/201/204, 400, 401, 403 or safe 404, 409, 422 where appropriate, 429, and 5xx.
8. Do not expose internal provider errors to users.
9. Do not create public API keys or external webhook endpoints in MVP.

---

## 9. Data Model — Logical Baseline

The final physical schema is to be designed by the backend agent and reviewed before migrations are applied. The following entities and relationships are required. This is a logical model, not permission to add unnecessary complexity.

### 9.1 Core entities

| Entity | Important fields / relationships |
|---|---|
| Account | UUID, email, password hash or external identity reference, verification state, account state, timestamps |
| AuthSession | UUID, account, refresh-token hash, device metadata, expiry, revoked timestamp |
| Business | UUID, owner account, name, category, logo reference, contact/address, currency, timezone, date format, state |
| BusinessSettings | Business, receipt settings, AI quota/configuration, notification preferences |
| Customer | UUID, business, name, optional phone/email/social handle, notes, archive/delete state |
| CustomerTag | UUID, business, name |
| CustomerTagAssignment | Customer, tag |
| CommunicationEntry | UUID, business, customer, channel, timestamp, summary, outcome, next action |
| Enquiry | UUID, business, customer, title/summary, message/notes, source channel, status, received timestamp, optional value, archive/delete state |
| EnquiryCustomFieldDefinition | UUID, business, name, type, order, options/configuration |
| EnquiryCustomFieldValue | Enquiry, field definition, typed/stored value |
| FollowUp | UUID, business, customer and/or enquiry, due timestamp, note, status, completion timestamp |
| Product | UUID, business, name, description, category, price, stock quantity, archive/delete state |
| ProductImage | UUID, business, product, storage key, MIME type, size, dimensions, ordering |
| ProductVariant | UUID, product, option values, SKU, price/stock overrides if supported |
| Order | UUID, business, customer, optional enquiry, order reference, status, payment status, total, delivery details, notes |
| OrderItem | UUID, order, optional product/variant reference, product snapshot/name, quantity, unit price, line total |
| Payment | UUID, order, amount, method, paid timestamp, reference/note, type/status for refund handling |
| SourceChannel | UUID, business, name, predefined/custom marker, active state |
| Notification | UUID, business, type, related entity reference, message, created timestamp, read timestamp, grouping key |
| FileMetadata | UUID, business, owner record reference, storage key, file name, MIME type, size, retention/deletion state |
| ActivityEntry | UUID, business, actor, action, entity type/id, timestamp, minimal safe metadata |
| AiUsage | UUID, business, timestamp, provider/model, token usage where available, outcome, failure category/code |
| Feedback | UUID, account/business if relevant, category, description, optional attachment reference, status |
| AdminAction | UUID, admin account, action, target account, reason, timestamp |

### 9.2 Relationship rules

- One Account can own multiple Businesses.
- Every Business has one owner in MVP.
- Every Customer belongs to exactly one Business.
- Every Enquiry belongs to one Business and may link to one Customer.
- One Customer may have many Enquiries.
- One Enquiry may link to multiple Orders.
- Every Order belongs to one Business and one Customer; it may link to one Enquiry.
- One Order has one or more OrderItems.
- One Order may have multiple Payment records.
- Product records belong to one Business.
- Product images and variants belong to their Product and Business.
- Follow-ups belong to one Business and may reference a Customer and/or Enquiry.
- Notifications belong to one Business and reference a relevant event/record.
- All file references must be checked against the owning business and record.

### 9.3 Data integrity rules

- Store money as a decimal type with explicit currency; never use floating-point for monetary calculations.
- Validate quantity and monetary amounts as positive/non-negative as appropriate.
- Snapshot product name and unit price into order items so later product edits do not rewrite historical orders.
- Prevent an order from linking to a customer/enquiry/product belonging to another business.
- Use database constraints for foreign keys and valid unique business-scoped values where appropriate.
- Soft-deleted records must be excluded from normal lists unless the user is viewing Trash.
- Permanent deletion must handle dependent records and stored files according to an explicit deletion policy.
- Do not cascade-delete business data accidentally through an unreviewed ORM relationship.

---

## 10. Business Rules

1. All business data is isolated per business workspace.
2. No customer record is shared between businesses.
3. A user can switch workspaces, but there is no combined cross-business dashboard.
4. An enquiry remains after conversion and may link to multiple orders.
5. Cancelled orders remain in history and are excluded from active order and revenue summaries.
6. Partial payments are supported; partial fulfilment is not.
7. Payment status is derived/validated against payment records and refunds.
8. Product catalogue is optional for a business workflow; an order may use a manually entered item where necessary.
9. AI output is never saved without owner review and explicit confirmation.
10. AI must not fabricate missing information.
11. Manual enquiry entry must work when AI is disabled, unavailable, or over quota.
12. AI quota is tracked per business, resets on the first day of each calendar month, and does not roll over.
13. AI quota is enforced server-side; the admin emergency switch disables AI platform-wide.
14. Follow-ups are one-time only in MVP.
15. In-app reminders use the business's configured timezone.
16. No external message is sent by AUREN in MVP.
17. All uploaded files are private and accessed through authorised short-lived links.
18. Records use soft deletion initially, then permanent deletion after the configured retention period. The retention duration must be explicitly set before production.
19. Account deletion is separate from ordinary record deletion and must disclose backup-retention limits.
20. Data export is available before account deletion.
21. The platform administrator has no default access to private business content.
22. Demo/sample data is fictional and isolated from real accounts.

---

## 11. Background Jobs and Asynchronous Processing

Use a simple, reliable hybrid approach:
- Spring scheduling for recurring internal tasks.
- Background job processing for large imports/exports and asynchronous email.
- Do not introduce a message broker for MVP unless a proven requirement demands it.

Required jobs:
1. Generate due/overdue follow-up notifications.
2. Send verification, password-reset, new-device, and essential account emails asynchronously.
3. Retry temporary email delivery failures and track delivery status where provider support permits.
4. Prevent duplicate email/notification generation.
5. Reset monthly AI quotas on the first day of the calendar month, using a documented timezone convention.
6. Permanently delete expired soft-deleted records/files according to retention settings.
7. Process large CSV imports/exports and expose job status, progress where practical, completion/failure, and error report.

All jobs must be idempotent, observable, and safe if they run more than once. Avoid duplicate records or notifications.

---

## 12. Email Requirements

Use a provider-independent email service abstraction. Choose a concrete provider only after checking:
- Free-tier limits.
- Domain verification requirements.
- Deliverability.
- Commercial-use terms.
- Data processing/privacy terms.
- Rate limits and availability.

Required email purposes:
- Email verification.
- Password reset.
- New-device login alert.
- Email-change verification and old-address notification.
- Essential account/security notifications.

Rules:
- Send asynchronously.
- Keep credentials server-side.
- Do not block normal user interactions while email is sent.
- Retry temporary failures only.
- Avoid duplicate emails.
- Never expose provider error details or secrets to users.

---

## 13. Deployment and Environments

### 13.1 Planned hosting

| Component | Planned provider |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| PostgreSQL | Supabase |
| Object storage | Provider-independent; free-tier provider to be selected |
| CI/CD | GitHub Actions |

These are planned choices, not a guarantee that a current free plan supports the required workload. Verify current terms, quotas, sleep behaviour, commercial use, storage, bandwidth, database connections, backups, and restore capability before deployment.

### 13.2 Environments

Maintain three separate environments:
1. Development.
2. Staging.
3. Production.

Requirements:
- Separate databases and credentials for staging and production.
- Never use production private data in staging unless it is properly anonymised.
- Environment-specific configuration must be externalised.
- No secrets committed to Git.
- `.env.example` contains placeholder keys only.
- GitHub Actions secrets and hosting secret stores hold deployment credentials.

### 13.3 Database migrations

- Use Flyway SQL migrations.
- Every schema change is version-controlled.
- Test migrations in development and staging before production.
- Do not make manual production schema edits.
- Document rollback or forward-fix procedure.
- Do not run destructive migrations without explicit approval and verified backup.

### 13.4 CI/CD

GitHub Actions shall run:
- Backend tests.
- Frontend tests.
- Formatting and lint checks.
- Build checks.
- Dependency/security checks where practical.
- Migration validation where practical.

Deployment policy:
- Pull request/branch checks must pass before merge.
- Approved merges may deploy to staging.
- Production deployment requires explicit approval.
- Failed checks block deployment.
- The AI Agent must not push, merge, or deploy without user approval.

---

## 14. Testing and Quality Assurance

### 14.1 Required testing layers

**Backend**
- JUnit 5.
- Mockito.
- Spring Boot Test.
- Repository/integration tests with a real PostgreSQL-compatible test setup where practical.
- API/security tests.

**Frontend**
- Component and form validation tests.
- UI state tests for loading, empty, success, and failure.
- Accessibility checks for key flows.

**End-to-end**
- Playwright for critical browser workflows.

The exact frontend unit/component test framework may be selected during implementation, provided it integrates with Next.js/TypeScript and supports reliable automated tests. Do not add overlapping test frameworks without reason.

### 14.2 Mandatory test scenarios

1. Registration, verification, login, logout, refresh, password reset.
2. Expired/reused verification and reset tokens.
3. Session revocation and inactivity expiry.
4. Business creation and workspace switching.
5. Cross-business access attempts for every major resource.
6. Manual customer/enquiry creation and editing.
7. AI extraction success, malformed response, ambiguous fields, multiple enquiries, quota exhaustion, provider outage, retry, and manual fallback.
8. Screenshot upload validation, private access, and deletion.
9. Follow-up due/overdue generation and duplicate prevention.
10. Order creation, multiple orders per enquiry, payment calculations, refunds, and cancelled-order summaries.
11. Product and variant handling where implemented.
12. CSV import/export validation and job failures where implemented.
13. Soft delete, restore, permanent delete, and retention cleanup.
14. Data export and account deletion.
15. Notification read/unread and grouping.
16. API validation and standard error responses.
17. Responsive navigation and critical mobile flows.
18. PWA installation and offline/unavailable messaging.
19. Background job idempotency.
20. Backup restoration procedure and integrity verification.

### 14.3 Release-blocking defects

Do not release with:
- Data loss or corruption.
- Cross-business data exposure.
- Authentication/authorisation bypass.
- Critical privacy/security vulnerabilities.
- Broken core enquiry/customer/order workflow.
- Incorrect payment calculations that could mislead users.
- Uncontrolled paid API usage.
- Unrecoverable production deployment/database migration failure.

Critical bugs must be fixed and retested before release.

---

## 15. User Interface and Navigation Baseline

The UI should feel professional, calm, modern, and business-oriented. Avoid generic AI-generated visual patterns, excessive gradients, unnecessary animation, and clutter.

### 15.1 Main application navigation

Suggested primary sections:
- Dashboard
- Enquiries
- Customers
- Follow-ups
- Orders
- Products
- Notifications
- Settings

Secondary sections may be placed in menus:
- Trash
- Import/Export
- Quick Replies
- Help & Support
- Feedback
- What's New

### 15.2 Responsive navigation

- Desktop: persistent sidebar and top workspace/account controls.
- Mobile: bottom navigation for primary sections; secondary sections in a menu.
- Do not simply shrink the desktop layout on mobile.
- Forms, tables, dialogs, and data views must remain usable on narrow screens.

### 15.3 UI state requirements

Every data-driven screen must handle:
- Initial loading.
- Empty state.
- Successful data display.
- Validation errors.
- API/provider failure.
- No network/offline state.
- Permission/expired-session state.
- Destructive-action confirmation.

---

## 16. Privacy, Legal, and Demo Requirements

1. Publish Privacy Policy and Terms of Service before public registration.
2. Explain that enquiry text/screenshots may be processed by an external AI provider when AI extraction is used.
3. Explain data collection, processing, retention, export, deletion, and user responsibilities.
4. Review applicable Indian privacy/data-protection and consumer/business obligations before public launch.
5. Do not claim legal compliance solely because this SRS includes privacy requirements.
6. Use fictional data in seed scripts, screenshots, demo videos, and public interactive demos.
7. Demo environment must be isolated and resettable.
8. No customer data is automatically used to train AI models.
9. Do not add optional analytics or marketing cookies in MVP.
10. Provide a clear contact/support route for privacy or account issues.

---

## 17. Implementation Roadmap

The AI Agent must follow this order. Each phase requires a brief implementation plan, code changes, tests, and a completion report before proceeding.

### Phase 0 — Repository audit and foundation

1. Inspect repository, branches, existing code, package files, and current implementation.
2. Report what exists and what is missing.
3. Confirm Java 21, Node/npm, Maven, and required local tooling.
4. Establish or verify frontend and backend project structure.
5. Add safe environment configuration and `.env.example` placeholders.
6. Configure formatting, linting, tests, and GitHub Actions.
7. Configure Flyway and local development database.
8. Establish OpenAPI and standard error response conventions.
9. Do not overwrite working code.

**Exit criteria:** Both applications build; baseline tests and CI pass; configuration contains no committed secrets.

### Phase 1 — Secure account and business foundation

1. Account registration and verification.
2. Login/logout, Google login, token refresh, password reset.
3. Session and inactivity handling.
4. Business creation, settings, and switching.
5. Business ownership/authorisation enforcement.
6. Core database migrations and security tests.

**Exit criteria:** Users can securely access only their own business workspaces; cross-business tests pass.

### Phase 2 — Core business records

1. Customers.
2. Manual enquiries and source channels.
3. Enquiry statuses.
4. Customer/enquiry linking.
5. Follow-ups and due/overdue notifications.
6. Products sufficient for order items.
7. Orders, order items, manual payments, and order statuses.
8. Dashboard summary.
9. Responsive navigation and core UI states.

**Exit criteria:** Owner can complete the manual workflow from enquiry capture through customer follow-up and order/payment tracking without AI.

### Phase 3 — AI extraction and private files

1. Object-storage abstraction and secure file metadata.
2. Provider-independent AI service abstraction.
3. Gemini provider adapter.
4. Text extraction.
5. Screenshot extraction.
6. Structured output validation and review UI.
7. Quota enforcement and usage indicator.
8. Retry/failure handling and manual fallback.
9. AI emergency switch and admin quota configuration.

**Exit criteria:** AI suggestions are accurate to the supplied input, never auto-save, respect quotas, and fail safely.

### Phase 4 — Supporting business features

Implement Should requirements in priority order:
1. Search and filters.
2. Customer tags and duplicate suggestions.
3. Communication history.
4. Product images/variants/stock.
5. Notification centre/preferences.
6. Trash, restore, and activity history.
7. CSV import/export.
8. PDF payment receipt.
9. Quick replies.
10. Onboarding, empty states, help, feedback, and What's New.

**Exit criteria:** Core workflow remains stable; each delivered feature has tests and acceptance evidence.

### Phase 5 — Admin, public site, and release preparation

1. Basic admin panel with restricted access.
2. Feedback review and account suspension.
3. Aggregate metrics.
4. Landing page and isolated public demo.
5. Legal pages and consent/acknowledgement flow.
6. Monitoring, health checks, backups, and restore procedure.
7. Staging UAT and release checklist.

**Exit criteria:** Pilot-ready release meets Section 19.

### Phase 6 — Pilot

- Pilot with 5–10 businesses across product-selling categories.
- Duration: 4 weeks.
- Collect feedback weekly.
- Evaluate real use, usability, and business impact.
- Do not claim product-market fit or traction based only on registrations.

### Future phases — not MVP

Potential future work, subject to pilot evidence and a new approved specification:
- Official social-platform integrations using approved APIs and permissions.
- AI-generated reply suggestions.
- Advanced analytics/business intelligence.
- Team accounts, roles, and collaboration.
- Public API and webhooks.
- Payment gateway/subscriptions.
- Native mobile apps only if PWA limitations justify them.
- Advanced automation and configurable workflows.

---

## 18. Pilot Measurement

Measure both product usage and practical business impact.

### 18.1 Metrics

- Enquiries, customers, and orders captured.
- Time required to record an enquiry.
- Follow-ups completed on time.
- Enquiry-to-order conversion trends.
- AI extraction success/failure and correction patterns.
- Owner satisfaction and reported friction.
- Continued use during and after the four-week pilot.

### 18.2 Success evaluation

Use a hybrid evaluation:
- A small number of measurable adoption/usability targets.
- Qualitative interviews and feedback.
- Baseline comparison where a pilot business can reasonably provide it.
- Do not invent arbitrary success thresholds before observing baseline workflows.

### 18.3 Pilot process

- Recruit 5–10 businesses from different product-selling categories.
- Demonstrate the workflow and explain current MVP limitations.
- Use fictional data for public demonstrations; real pilot data only with informed permission and appropriate safeguards.
- Collect feedback weekly.
- Record issues and prioritise based on severity, frequency, and impact.
- Evaluate whether owners continue using AUREN after the pilot.

---

## 19. Release Acceptance Checklist

AUREN is ready for pilot only when all applicable Must requirements are satisfied and the following checks pass.

### Product and workflow
- [ ] Account registration, verification, login, logout, and password reset work.
- [ ] Business creation and switching work.
- [ ] Business data is isolated and cross-business tests pass.
- [ ] Manual customer and enquiry workflows work.
- [ ] AI extraction works with text and screenshots, or a documented provider limitation is resolved before claiming it is available.
- [ ] AI output always requires owner review and explicit save.
- [ ] AI quota and manual fallback work.
- [ ] Follow-ups and in-app reminders work without duplicate notifications.
- [ ] Orders, order items, payment records, refunds, and balances are correct.
- [ ] Dashboard metrics are defined and calculated consistently.
- [ ] Product catalogue functionality required by order workflows works.
- [ ] Data export and account deletion are tested.
- [ ] Soft-delete retention and restore behaviour are tested.

### Security and privacy
- [ ] No secrets are committed or exposed in frontend bundles.
- [ ] Secure cookies and refresh-token rotation are verified.
- [ ] Sensitive endpoints are rate-limited.
- [ ] File upload validation and private access are verified.
- [ ] Admin cannot browse private business content by default.
- [ ] Logs and monitoring redact private data.
- [ ] Privacy Policy and Terms are published and reviewed.
- [ ] AI data-processing disclosure is present.

### Quality and operations
- [ ] Backend and frontend automated tests pass.
- [ ] Critical end-to-end workflows pass in staging.
- [ ] Accessibility and responsive checks are completed.
- [ ] CI checks pass.
- [ ] Flyway migrations are tested.
- [ ] Staging and production configurations are separate.
- [ ] Health checks and error monitoring work.
- [ ] Daily backup capability and 7-day retention have been verified against provider plans.
- [ ] Database and file restore tests have been performed.
- [ ] Disaster-recovery procedure is documented.
- [ ] Known-issues list is published/maintained.
- [ ] Help/support contact and release notes are ready.
- [ ] Critical bugs are fixed and retested.

---

## 20. Known Issues and Change Control

Maintain a known-issues list after launch.

Each issue should include:
- Issue ID.
- Short title and description.
- Severity/impact.
- Affected feature/version.
- Workaround, if available.
- Current status.
- Planned fix/release, if known.

Requirements changes:
1. Do not silently alter this SRS.
2. Record proposed changes with reason and affected requirement IDs.
3. Identify impact on scope, data model, APIs, security, tests, and deployment.
4. Obtain product-owner approval before implementing scope changes.
5. Update this document and traceability records after approval.

---

## 21. Requirement Traceability

Maintain a traceability matrix during implementation:

| Requirement ID | Requirement title | Priority | Frontend area | Backend area | Database migration | Tests | Status |
|---|---|---|---|---|---|---|---|
| FR-AUTH-001 | Registration | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-BIZ-002 | Business isolation | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-ENQ-001 | Manual enquiry capture | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-AI-006 | Review before save | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-FUP-001 | Schedule follow-up | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-ORD-001 | Create order | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| FR-DATA-001 | Complete business export | MUST | To be filled | To be filled | To be filled | To be filled | Not started |
| NFR-SEC-002 | Business authorisation | MUST | N/A | To be filled | To be filled | To be filled | Not started |

The matrix must be expanded to cover every implemented requirement. Do not mark a requirement complete without test evidence.

---

## 22. Explicitly Deferred Technical Decisions

The following choices are intentionally provider-/implementation-dependent. The AI Agent must investigate options and present a concise recommendation before locking them in. Prefer free-tier options, but do not assume they satisfy production needs.

1. Concrete email delivery provider.
2. Concrete object-storage provider.
3. Concrete frontend/backend error-monitoring provider.
4. Exact free-tier hosting plans and limits.
5. Exact Google Gemini model and current quota.
6. Exact retention duration for soft-deleted records and backup purge, after legal/product review.
7. Exact frontend component-test framework, provided it fits the selected Next.js stack.
8. Exact order status labels and permitted transitions, while preserving the minimum lifecycle in FR-ORD-003.

For each selection:
- Check current free-tier limits and commercial-use terms.
- Check data location, privacy, security, and retention.
- Check whether a custom domain is required.
- Check rate limits, inactivity/sleep behaviour, storage, bandwidth, and backup/restore features.
- Explain limitations and obtain approval if there is cost or a material product trade-off.
- Keep provider integration behind an abstraction where specified.

---

## 23. Final Instruction to Google Antigravity

Begin with **Phase 0 only**.

First inspect the repository and report:
1. Current directory and project structure.
2. Existing frontend/backend technologies and versions.
3. Existing features and their working state.
4. Existing tests and build status.
5. Configuration/secrets risks (report file names and risk only; never print secret values).
6. Missing foundations relative to this SRS.
7. A milestone plan for Phase 0 with files expected to be created/changed.

Do not implement Phase 1 until the user reviews and approves the Phase 0 audit and plan.

For every later phase:
- State the requirements being implemented by ID.
- List files/modules expected to change.
- Implement only the approved milestone.
- Run relevant tests and report exact results.
- Update the traceability matrix and known-issues list.
- Summarise what works, what does not, and any decisions requiring approval.

**The goal is a dependable, secure, usable AUREN MVP—not the largest possible feature count.**
