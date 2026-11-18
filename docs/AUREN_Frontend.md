# AUREN — Frontend Implementation Blueprint

**Purpose:** Rebuild and complete the AUREN frontend as a polished, responsive, working product interface.

**Primary references**
- `docs/AUREN_SRS.md` — functional requirements and approved product scope.
- `docs/AUREN_DESIGN_TOKENS.md` — latest approved visual system. Use the latest version available in the repository; if `AUREN_DESIGN_TOKENS_v1.1.md` is present, it is the source of truth.
- `AUREN_Agents.md` — project-wide agent rules.

> **Priority:** SRS → latest Design Tokens → this frontend blueprint. If anything conflicts, follow the higher-priority source and report the conflict instead of silently inventing a solution.

---

## 1. Mission and Working Rules

The existing frontend has become inconsistent/broken. Your task is to inspect it carefully and restore it into one coherent AUREN experience—not to blindly replace the repository.

1. Inspect the complete frontend structure, routes, components, dependencies, and current Git state before editing.
2. Identify what is reusable, what is broken, and what is missing. Do not delete working features or overwrite files without understanding their purpose.
3. Read the SRS, latest design tokens, and `AUREN_Agents.md` before implementation.
4. Build **frontend only** in this phase. Use typed mock data and mock service functions. Do not connect to the backend, Supabase, Gemini, or real APIs yet.
5. Do not add features outside the approved SRS. Do not invent business rules, data, analytics, permissions, or workflows.
6. Keep all screens connected through realistic navigation and working interactions. No dead buttons, decorative controls pretending to work, or placeholder links.
7. Implement incrementally, but complete the full frontend scope in this assignment. Do not stop after creating only a landing page or dashboard.
8. Run lint, type-check, build, and available tests. Fix issues introduced by your work and report exact results.
9. Do not deploy, change hosted resources, install paid services, or use paid assets without permission.
10. Do not access or modify `.env` files. Do not expose secrets.

Before coding, provide a short audit and implementation plan. Then proceed with the implementation without waiting for approval unless you discover a destructive ambiguity, missing required asset, or conflict with the SRS.

---

## 2. Product Understanding

AUREN is a cross-platform social-commerce workspace for small product sellers: fashion, jewellery, home bakers, handmade/custom gifts, cosmetics, accessories, and similar businesses.

**Brand tagline:**  
*Every conversation. Every customer. Every order. One workspace.*

**Main marketing headline:**  
*Command Your Business With Confidence.*

AUREN helps an owner organise manually captured customer enquiries, customer records, follow-ups, products, orders, and manual payment records in one workspace.

### Core workflow

1. Owner manually enters an enquiry, pastes a message, or uploads a screenshot.
2. AI-assisted extraction may prefill an editable draft in the future backend-connected phase.
3. Owner reviews and confirms the extracted details before saving.
4. Owner manages the enquiry, customer, status, and follow-up.
5. Owner can convert an enquiry into an order.
6. Owner manages order details and manually records payment status.
7. Owner can keep reusable quick replies and communication history as defined by the SRS.

For this frontend-only phase, demonstrate these flows with mock data and local UI state. Clearly label simulated behaviour in code; never imply that data is being saved to a real server.

---

## 3. Approved Technology and Frontend Boundaries

Follow the existing approved frontend stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate
- React Hook Form + Zod for forms where already included or justified
- GSAP for carefully selected motion
- Lenis for smooth scrolling on the public marketing experience, if compatible with the current app

Use the package manager and conventions already established in the repository. Avoid unnecessary dependencies.

### Frontend architecture

- Use a clear separation between `app` routes, shared components, feature components, types, mock data, and mock service functions.
- Keep business logic out of presentation components.
- Use reusable form fields, tables, dialogs, dropdowns, badges, empty states, loading states, and page headers.
- Use typed interfaces for all mock entities.
- Keep mock data centralised and realistic.
- Use a small, predictable state approach. Do not add a state library unless the existing architecture needs it.
- Do not put API URLs, secrets, or environment-specific values into components.
- Prepare service boundaries so mock services can later be replaced by backend API calls without rewriting the UI.

---

## 4. Visual Direction — Non-Negotiable

AUREN must look like a premium, thoughtfully art-directed SaaS product—not a generic AI-generated dashboard or template.

### Overall style

- Warm editorial SaaS with a restrained pastel workspace.
- Premium, clean, calm, confident, and business-neutral.
- Use the Storeflow reference direction from the design tokens: clear hierarchy, considered spacing, refined cards, and practical information density.
- The product must suit different seller categories. Do not make the whole interface look like a bakery, cosmetics store, fashion shop, or any one niche.
- Prefer natural visual details, purposeful whitespace, clear typography, subtle borders, and consistent alignment.
- Avoid excessive glassmorphism, neon colours, oversized gradients, floating blobs, random decorative icons, excessive rounded cards, and template-like layouts.

### Colour system

The latest design-token file is authoritative. Key direction:

- Warm ivory and soft white form the main foundation.
- **Muted pastel sage green is the leading pastel accent for the login page** and an important brand accent throughout the experience.
- Use sage/green for primary actions, selected states, links, and small emphasis areas.
- Use supporting pastels (dusty blush, soft peach, lilac, butter, powder blue) sparingly for secondary visual grouping.
- Keep most screens neutral; pastel colours should support hierarchy, not compete with content.
- Use the exact approved hex values from the latest design tokens.
- **Do not use rust, orange, terracotta, or coral as dominant colours.**
- Do not introduce a different colour palette for individual business categories.

### Typography and surfaces

- Follow the typography scale and font choices in the latest design tokens.
- Maintain consistent page titles, section headings, body text, labels, helper text, and metadata.
- Use subtle neutral borders and restrained shadows.
- Cards should have consistent radii and padding. Do not wrap every single item in a separate card.
- Use clear contrast and visible focus states. Meet WCAG 2.2 AA where practical.

### Motion

- Use GSAP for a few meaningful entrance or section transitions, not constant movement.
- Use Lenis only where it improves the public landing-page scroll experience.
- Respect reduced-motion preferences.
- Avoid animation that delays access to content or makes dashboard controls feel slow.
- 3D/floating elements are optional and must remain subtle; do not add them merely for decoration.

---

## 5. Application Structure and Required Screens

Build the public experience and the authenticated workspace as separate visual contexts that still share the AUREN brand.

Use the SRS for exact route names if already defined. The route structure below is a recommended organisation, not permission to invent new product functionality.

### A. Public routes

#### 1. Landing page — `/`

Create a complete public marketing landing page for AUREN.

**Header**
- AUREN logo/wordmark.
- Simple navigation links that scroll to relevant landing sections.
- Clear `Log in` and `Get started` actions.
- Responsive mobile navigation.

**Hero section**
- Headline: **Command Your Business With Confidence.**
- Supporting tagline: **Every conversation. Every customer. Every order. One workspace.**
- Explain in plain language that AUREN helps small product sellers manage enquiries, customers, follow-ups, orders, and payment records in one place.
- Primary CTA: `Get started`.
- Secondary CTA: `Explore the workspace` or `See how it works`.
- Use a realistic product/workspace visual or a carefully composed dashboard preview. Do not use fake customer logos, fabricated testimonials, or invented usage statistics.

**Problem / value section**
- Explain the practical pain of scattered customer conversations, forgotten follow-ups, and disconnected order details.
- Keep copy specific to small sellers. Avoid exaggerated claims.

**How it works**
- Show the simple workflow: capture an enquiry → review details → follow up → manage the order.
- Use concise steps and a clear visual sequence.

**Feature sections**
Present the approved capabilities:
- Enquiry capture from manual entry, pasted messages, and screenshot upload.
- AI-assisted extraction with owner review before saving (describe as a product capability; do not claim it is live in this mock-only frontend).
- Customer management and enquiry status tracking.
- Follow-up organisation and in-app notifications.
- Product catalogue and order management.
- Manual payment tracking.
- Dashboard and business overview.

**Workspace preview / demo**
- Include a visually convincing preview of the actual AUREN interface.
- If an interactive demo is implemented, keep it clearly in demo mode with fictional sample data.
- Do not make demo interactions look like real account actions or persist data to a server.

**Who it helps**
- Use neutral examples across different small-seller types, without changing the brand palette for each category.

**FAQ**
- Answer only questions supported by the SRS and current product decisions.
- Do not promise direct Instagram/WhatsApp inbox sync, automatic DM sending, payment gateway support, or features outside the MVP.

**Final CTA**
- Repeat the value proposition and provide clear sign-up/login actions.

**Footer**
- AUREN branding, tagline, navigation, contact information only if a real approved contact value exists, and Privacy/Terms links only if actual pages or approved content exist.
- Do not invent email addresses, legal text, social accounts, or company details.

**Important:** There is no pricing page in the MVP. AUREN is free during initial validation. Do not add pricing cards, subscription plans, checkout, or payment-gateway UI.

#### 2. Login page — `/login`

This page has a specific visual reference supplied by the owner. Recreate its composition and visual hierarchy closely, while applying the approved AUREN sage-green palette instead of the reference's coral/orange accents.

**Desktop composition**
- Full-viewport split layout.
- Left visual panel approximately 53–55% width.
- Right authentication panel approximately 45–47% width.
- The two sides should feel like one designed composition, not two unrelated templates.

**Left panel**
- Use a realistic, premium lifestyle photograph of **both a man and a woman** working together in a small boutique/business environment, handling or preparing a customer package.
- The scene should feel like authentic editorial/commercial photography: natural expressions, believable hands, realistic faces, natural daylight, real materials, and a lived-in but tidy workspace.
- Include subtle plants, shelving, clothing/product details, and a work counter where appropriate.
- Place the AUREN logo near the top-left.
- Place the headline and tagline in the lower-left over a subtle dark readability overlay:
  - Small brand label: `AUREN`
  - Main headline: `Command Your Business With Confidence.`
  - Supporting line: `Every conversation. Every customer. Every order. One workspace.`
- Preserve strong text contrast and a deliberate line break similar to the supplied reference.

**Right panel**
- Warm ivory/off-white background.
- Centered AUREN logo and wordmark near the upper section.
- Heading: `Log in or Sign up`
- Supporting text: `Welcome back`
- Google sign-in option, if the approved authentication flow supports it.
- Divider with `or`.
- Email address field.
- Password field with show/hide control.
- `Remember me` only if supported by the SRS authentication behaviour.
- `Forgot password?` link.
- Full-width primary `Log In` button.
- Bottom prompt: `Don’t have an account? Sign up for free`
- Use restrained sage green for primary action, focus, links, and small accents.
- Keep form width comfortable and alignment precise.
- Do not add Apple sign-in unless it is explicitly approved in the SRS.
- Do not render the entire login page as one flat image. The photograph may be an image asset, but all text, fields, buttons, and form states must be real frontend elements.

**Image-generation direction**
If a suitable image asset is not already present, use the image-generation capability available in the development workflow. Generate only the left-side lifestyle photograph, not a screenshot of the full UI.

Prompt:
> Photorealistic premium editorial commercial photograph for a modern small-business SaaS brand. A friendly young adult man and woman working together at the counter of a tasteful independent boutique, carefully preparing a small customer package. Both people clearly visible, natural candid expressions, realistic hands and proportions, authentic Indian contemporary small-business atmosphere without stereotypical styling, warm natural window daylight, muted sage-green clothing or subtle sage accents, soft ivory walls, natural wood, a few tasteful plants, shelves with understated products, realistic camera depth and texture, refined art direction, documentary lifestyle photography, sophisticated and believable, no text, no logos, no watermark, no UI, no orange or terracotta colour cast, no artificial-looking faces, no plastic skin.

Use a separate dark translucent gradient/overlay in CSS over the lower portion of the photograph for legible white text. Do not bake headline text into the photograph.

**Mobile behaviour**
- Stack the page cleanly.
- Keep the photograph as a compact top/hero section; do not let it push the form excessively far down.
- Ensure the form is immediately usable without horizontal scrolling.
- Keep the headline readable and avoid cropping the people awkwardly.

#### 3. Sign-up page — `/signup`

- Follow the same visual language as login.
- Implement only the fields and validation required by the SRS.
- Include Google sign-up only if supported by the approved auth flow.
- Include clear links back to login and the required email-verification state.
- Do not add unapproved fields or onboarding questions.

#### 4. Forgot/reset password

- Implement the screens/states required by the SRS.
- Use the same authentication shell and form components.
- Provide clear success, loading, invalid-input, and error feedback.
- Do not imply an email was sent when using mock services; show a clearly simulated demo response.

### B. Authenticated workspace

Use a consistent application shell:

- Left sidebar on desktop with AUREN logo, workspace/business switcher, primary navigation, and account area.
- Main content region with page title, contextual actions, and consistent content width.
- Responsive sidebar/drawer on smaller screens.
- Clear active navigation state.
- Keep the visual system calm and neutral; use sage for selected navigation and primary actions.
- Avoid making the workspace look like the public marketing landing page.

Implement these SRS-backed sections:

#### 1. Dashboard
- Business overview and approved summary metrics.
- Relevant enquiry, follow-up, order, and payment summaries.
- Recent activity or recent records only where supported by the SRS.
- Charts only for metrics that are defined and can be derived from mock data.
- Useful empty state for a new business.
- Do not fabricate impressive statistics or claim real business performance.

#### 2. Enquiries
- Enquiry list with search, filters, sorting, pagination, and saved views where defined by the SRS.
- Clear status badges and customer/context information.
- Add enquiry manually.
- Paste-message capture flow.
- Screenshot upload flow with file type/size guidance from the SRS.
- AI extraction review screen/state: show extracted fields as an editable draft; user must confirm before saving.
- Support multiple enquiries from one conversation if required by the SRS.
- Allow owner-controlled customer matching; never silently merge customers.
- Enquiry detail view with status, notes, communication history, follow-up details, and related order links as defined by the SRS.
- Include loading, empty, error, validation, and success states.

#### 3. Customers
- Customer list, search, filters, and customer detail.
- Show relevant contact details, tags, linked enquiries, linked orders, and activity only as defined in the SRS.
- Make relationships between customer, enquiry, and order clear.
- Use fictional sample data only.

#### 4. Follow-ups and notifications
- Follow-up list or view with due date, related customer/enquiry, and status.
- Create, edit, complete, and reschedule only according to SRS rules.
- In-app notification centre with read/unread states and notification history.
- No browser push notification UI or claims of external messaging.

#### 5. Products / catalogue
- Product list and product detail/form.
- Support the product fields, images, and limits specified in the SRS.
- Provide empty, upload, validation, and error states.
- Do not add inventory/warehouse management unless present in the SRS.

#### 6. Orders
- Order list and order detail.
- Create an order from an enquiry and support the approved manual order workflow.
- Display linked customer and products.
- Show order status and payment summary using SRS-defined states.
- Support cancellation and related history according to the SRS.
- Do not invent partial fulfilment or complex shipping workflows.

#### 7. Payments
- Manual payment recording and payment history.
- Display amount, date, method, status, and receipt actions only as defined in the SRS.
- If PDF receipts are in scope, provide a mock preview/download interaction in this frontend phase.
- No payment gateway, checkout, card collection, or automatic payment processing.

#### 8. Quick replies / communication
- Provide reusable quick-reply management and manual communication history only as defined in the SRS.
- Copy-to-clipboard actions should work.
- Do not implement automatic sending to Instagram, WhatsApp, Facebook, Telegram, or other platforms.

#### 9. Settings and workspace
- Business/workspace switcher for multiple independent businesses.
- Business profile/settings and owner profile settings as defined in the SRS.
- Notification preferences and other approved settings.
- Workspace data must appear isolated in mock data when switching businesses.
- Include account/session/security settings only to the extent specified in the SRS.

#### 10. Import/export and trash
- Implement the approved CSV import/export, bulk actions, and trash/retention UI only as specified in the SRS.
- Use mock processing states and clear confirmation dialogs.
- Do not claim actual file processing or permanent deletion in the mock-only phase.

---

## 6. Shared Components

Create and reuse a consistent component set. Reuse existing components where practical.

- Brand logo/wordmark component.
- Public header and footer.
- Auth layout and auth form.
- App sidebar, mobile navigation, top bar, and workspace switcher.
- Page heading and breadcrumb where needed.
- Buttons, icon buttons, inputs, password input, selects, textareas, date controls, checkboxes, and file upload.
- Search and filter toolbar.
- Data table/list with pagination and responsive behaviour.
- Status badges.
- Summary metric card.
- Dialog, drawer, dropdown, tooltip, and confirmation dialog.
- Toast/inline feedback.
- Empty, loading/skeleton, error, and access-denied states.
- Activity timeline.
- File preview/upload item.
- Reusable form validation and field error display.

Use icons consistently. Avoid emoji as the primary icon system in the application UI.

---

## 7. Mock Data and Interaction Requirements

Create realistic but fictional mock records for at least two different business types so the interface proves that AUREN is business-neutral. Do not use real personal information.

Mock data should cover:
- More than one business workspace.
- Customers.
- Enquiries in different statuses.
- Follow-ups due and completed.
- Products.
- Orders in relevant statuses.
- Manual payment records.
- Notifications and activity entries.

All visible controls must have a defined frontend behaviour:
- Navigation links navigate to valid routes.
- Search and filters update displayed mock records.
- Forms validate and show field errors.
- Dialogs open and close correctly.
- Create/edit/delete actions update local mock state where appropriate.
- Workspace switching changes the displayed mock workspace data.
- File upload validates accepted types and sizes and shows a preview/state without uploading to a server.
- Copy actions copy the intended text.
- AI extraction is simulated with a clearly identified mock result; never call a real AI provider.
- Loading, success, empty, and error states can be demonstrated.

Use a clear mock service layer so these behaviours can later be replaced with real API calls.

---

## 8. Responsive Behaviour and Accessibility

Test at minimum:
- Large desktop.
- Standard laptop.
- Tablet.
- Mobile width.

Requirements:
- No horizontal overflow.
- Tables adapt to smaller screens using an intentional card/list layout or controlled horizontal scrolling.
- Sidebar becomes a usable mobile drawer.
- Forms remain readable and easy to operate.
- Buttons and inputs have appropriate touch targets.
- All form controls have labels.
- Keyboard navigation and visible focus states work.
- Dialogs manage focus and can be closed accessibly.
- Text and controls have sufficient contrast.
- Respect `prefers-reduced-motion`.

---

## 9. SEO and Performance for Public Pages

- Add meaningful page titles and meta descriptions for public pages.
- Use semantic headings and landmarks.
- Optimise generated image assets and use appropriate image sizing.
- Avoid shipping large animation bundles to authenticated dashboard pages when they are not needed.
- Prevent layout shifts and unnecessary re-renders.
- Use Next.js image handling where suitable.
- Keep public landing-page content crawlable; do not put essential marketing copy only inside images.

---

## 10. Suggested Implementation Order

Complete all stages in this assignment:

1. **Audit and recovery:** inspect the current repository, identify broken frontend areas, confirm current app structure, and preserve reusable code.
2. **Foundation:** establish design tokens, typography, global styles, reusable components, route layouts, and responsive shell.
3. **Public experience:** landing page, login, sign-up, and password recovery screens.
4. **Workspace shell:** sidebar, navigation, workspace switcher, page layout, and shared states.
5. **Core business screens:** dashboard, enquiries, enquiry capture/review, customers, follow-ups, notifications.
6. **Commerce operations:** products, orders, payments, quick replies/communication.
7. **Supporting screens:** settings, import/export, trash, and other SRS-approved sections.
8. **Polish:** responsive pass, accessibility, motion, empty/loading/error states, and consistent visual QA.
9. **Verification:** lint, type-check, tests, production build, and route-by-route smoke test.

Do not stop after any single stage. The final result must be a coherent, navigable frontend across the approved scope.

---

## 11. Definition of Done

The frontend is complete only when:

- The public landing page, login, sign-up, and password recovery experience are implemented.
- The login page follows the supplied reference composition and uses sage green as its leading pastel accent—not coral/orange.
- The man-and-woman business photograph is realistic and is used as an image asset, with text and form built as real UI.
- All SRS-approved workspace sections are present and navigable.
- The main enquiry-to-order workflow can be demonstrated with mock data.
- Forms, filters, dialogs, navigation, workspace switching, and other visible controls behave correctly in the frontend.
- All important screens include loading, empty, error, and success states where relevant.
- Desktop, tablet, and mobile layouts are checked.
- No unapproved integrations or future-scope features have been added.
- No backend or real external API integration has been introduced in this frontend-only phase.
- Lint, type-check, tests, and production build have been run; actual results are reported.
- Existing working functionality has not been unintentionally removed.

## 12. Final Report Required from the Agent

At completion, provide:

1. Summary of the frontend recovered and implemented.
2. Routes/screens completed.
3. Important components and architecture created or reused.
4. Mock workflows that can be demonstrated.
5. Exact validation commands run and their results.
6. Known limitations or incomplete items.
7. Confirmation that no backend/API integration was added.
8. The recommended next step for the backend integration phase.

**Final instruction:** Build AUREN as one cohesive, premium, business-neutral product. Follow the SRS and latest design tokens exactly. Prioritise correctness, consistency, usability, and a realistic small-business workflow over decorative complexity.
