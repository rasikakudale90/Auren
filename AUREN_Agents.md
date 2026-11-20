# AUREN — Agent Instructions

## 1. Project Context

- **Project:** AUREN — a cross-platform social-commerce workspace for small product sellers.
- **Purpose:** Help business owners manage enquiries, customers, follow-ups, products, orders, and manual payment records in one workspace.
- **Primary specification:** `docs/AUREN_SRS.md`.
- **Design reference:** `docs/AUREN_DESIGN_TOKENS.md` (use the latest approved version).
- Read the relevant SRS and design-token sections before implementing. If a requirement is unclear, state the assumption and choose the smallest safe implementation.
- Build for Google Antigravity and free-tier services where feasible.

## 2. Approved Stack and Architecture

- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui; deploy to Vercel.
- **Backend:** Java 21 LTS, Spring Boot, Maven, Spring Data JPA, and Flyway; deploy to Render.
- **Database and authentication:** Supabase PostgreSQL and the authentication approach defined in the SRS.
- **AI:** Gemini through a provider-independent backend service abstraction.
- **Testing:** JUnit 5, Mockito, Spring Boot Test, and Playwright.
- **Version control:** Git/GitHub when authorized.

Avoid unnecessary infrastructure and dependencies. Do not introduce new services or architectural complexity without a clear need and approval.

## 3. MVP Scope

Implement only the capabilities defined in the approved SRS, including:

1. Business workspace and owner account management.
2. Enquiry capture through manual entry, pasted messages, and screenshot upload.
3. AI-assisted extraction into an editable draft; the owner must review and confirm before saving.
4. Customer records, enquiry statuses, follow-ups, and in-app notifications.
5. Product catalogue, orders, and manual payment tracking.
6. Dashboard, search, activity history, and the approved import/export features.

**Do not** add direct social-platform inbox integrations, scraping, automatic DM sending, payment gateways, storefront features, or other deferred scope unless explicitly approved.

## 4. Frontend-First Workflow and Design

- Build the frontend first using typed mock data and mock service functions. Do not connect the backend until explicitly requested.
- Follow the latest approved AUREN design tokens for colours, typography, spacing, layout, components, imagery, and motion.
- Keep the interface premium, clear, responsive, accessible, and suitable for different types of small businesses.
- Use GSAP and Lenis only as specified in the design tokens; avoid excessive animation and unnecessary 3D effects.
- Do not invent screens, workflows, or visual styles that conflict with the SRS or design tokens.

## 5. Implementation Workflow

1. **Inspect first:** Review the repository, existing code, project instructions, SRS, design tokens, and environment.
2. **Plan:** Break the work into small tasks with affected files and acceptance criteria.
3. **Implement incrementally:** Do not generate the whole application in one pass or overwrite existing work without inspection.
4. **Test:** Run relevant checks and report the actual commands and results.
5. **Review:** Check responsiveness, accessibility, security, validation, and regressions.
6. **Summarize:** State what changed, tests run, known limitations, and the next step.

## 6. API, Database, and Security

- Keep controllers thin and place business logic in service classes.
- Validate all inputs and return consistent, safe API errors.
- Enforce authentication, authorization, and business-level data isolation on the server.
- Never trust user or business IDs supplied by the browser without verifying ownership.
- Use database migrations for schema changes and keep secrets out of source code.
- Keep credentials in environment variables; never expose server secrets in frontend code.
- Follow the SRS for file access, AI quotas, retention, and deletion rules.

## 7. Testing and Acceptance

- Add tests alongside each feature.
- Test validation, permissions, business data isolation, enquiry and order workflows, AI extraction failure paths, and API error handling where applicable.
- Use deterministic test data and mock external services in unit tests.
- Clearly identify tests not run because required credentials or services are unavailable.
- Never claim tests passed unless they were actually run.

## 8. Deployment and Scope Control

- Follow the approved Vercel, Render, and Supabase deployment architecture.
- Keep development, staging, and production configuration separate.
- Do not deploy, create external resources, modify hosted databases, or consume paid services without explicit authorization.
- Do not access or modify `.env` files unless explicitly authorized.
- Keep the SRS, README, and configuration examples aligned with implementation changes.
- Do not add future-scope features without approval.

## 9. Communication and Reporting

- Be direct, practical, and explain steps simply.
- Explain meaningful trade-offs before adding complexity.
- Never invent test results, deployment URLs, credentials, user data, or provider limits.
- If blocked, state what is missing and the smallest next action.
- Use English for project communication and generated content.

## 10. Call me by my name

- Address the user as **Rasika babe** when speaking directly to them each and every time.

