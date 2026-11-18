# AUREN — Design Tokens & Frontend Visual System
**Version:** 1.1  
**Status:** Frontend implementation source of truth  
**Product:** AUREN — Social Commerce Business Assistant

---

## 1. Instructions for the Google Antigravity Agent

This document is the visual and interaction source of truth for AUREN's frontend.

- Follow these tokens and component rules consistently across every page.
- Do not introduce unrelated colours, gradients, typography, shadows, radii, or animation styles.
- Use the Storeflow reference for layout clarity and product hierarchy, not as a template to copy.
- Build real responsive components; do not use a complete generated screenshot as a page background.
- Keep the product credible, calm, premium, trustworthy, and useful to different types of small businesses.
- Do not make the brand look specific to a bakery, fashion store, cosmetics shop, or any single business category.
- Use realistic photography and restrained visual details. Avoid generic AI landing-page patterns.
- Frontend-first implementation: use realistic mock data and typed service interfaces until backend integration is ready.
- Do not claim persistence or integrations that are not implemented.

## 2. Product and Brand Context

**Brand:** AUREN  
**Tagline:** Every conversation. Every customer. Every order. One workspace.  
**Marketing headline:** Command Your Business With Confidence.

AUREN is a cross-platform social-commerce workspace for small product sellers. It helps owners organise enquiries, customers, follow-ups, orders, products, and manual payment records in one place.

The initial experience is platform-independent. Do not imply that AUREN automatically connects to Instagram, WhatsApp, Facebook, or other social inboxes. Enquiries can be entered manually, pasted from conversations, or extracted from uploaded screenshots with owner review.

## 3. Visual Reference Direction

Primary visual inspiration: Storeflow SaaS Store Management Dashboard (Dribbble reference supplied by the user).

Borrow:
- Clear split between navigation, workspace, and content.
- Calm, light surfaces and restrained data presentation.
- Strong hierarchy and well-spaced sections.
- Subtle muted green/sage accents.
- A polished, real SaaS-product feel.

Do not copy its exact screen, logo, assets, or brand identity. AUREN must retain its own visual language.

The reference is a visual direction, not a verified pixel-level specification. Exact original font files, CSS values, hover states, animation timelines, and gradient definitions are not assumed.

## 4. Overall Art Direction

**Direction:** Warm editorial SaaS + restrained pastel workspace.

The product should feel:
- Premium, composed, and trustworthy.
- Friendly to independent business owners.
- Neutral enough for many business categories.
- Modern without looking futuristic or excessively technical.
- Designed by a thoughtful product team rather than assembled from a generic dashboard template.

Use warm ivory as the foundation, muted sage as the signature accent, and other pastels as supporting accents only.

## 5. Colour System

### 5.1 Neutral foundation

| Token | HEX | Usage |
|---|---|---|
| Warm ivory | `#F7F6F2` | Main app/page background |
| Soft white | `#FFFDF9` | Cards, panels, forms |
| Muted neutral | `#F1F0EA` | Secondary surfaces, subtle wells |
| Primary ink | `#242522` | Main text and headings |
| Secondary text | `#6E706A` | Supporting text |
| Muted text | `#92938D` | Metadata, placeholders |
| Border | `#E7E5DE` | Hairline borders and dividers |

### 5.2 Pastel palette

| Token | HEX | Role |
|---|---|---|
| Pastel sage | `#E3E8DC` | Signature pastel surface |
| Dusty blush | `#F2DFDA` | Secondary decorative surface |
| Soft peach | `#F4E3D5` | Secondary decorative surface |
| Pastel lilac | `#E9E4F0` | Secondary decorative surface |
| Butter yellow | `#F2EBD5` | Small highlight surface |
| Powder blue | `#E1E9ED` | Secondary information surface |
| Muted mauve | `#EADDE5` | Occasional decorative surface |

### 5.3 Brand accent — muted sage/olive

| Token | HEX | Usage |
|---|---|---|
| Sage accent | `#777C68` | Primary brand accent, selected states |
| Sage hover | `#656A58` | Hover/pressed state |
| Deep forest | `#354A35` | Rare high-contrast accent or illustration detail |
| Light sage | `#AEBAA7` | Borders, supporting illustration tones |
| Fresh muted green | `#939E6A` | Small highlights only |

The green family is the recognisable accent direction, but it must remain muted and sophisticated rather than bright or saturated.

### 5.4 Colour balance

- 70–80% neutral ivory/white/grey surfaces.
- 10–20% sage and muted green accents.
- Remaining colour reserved for small pastel accents and status semantics.
- Do not use one pastel colour as a full-screen brand wash.
- Avoid strong rust, burnt orange, terracotta, or brown as dominant UI colours.
- Do not assign a business-category colour as the brand colour. AUREN must work equally well for fashion, jewellery, home bakers, handmade goods, cosmetics, and other sellers.

### 5.5 Functional colours

Use restrained, accessible semantic colours for success, warning, error, and information. These are status colours, not brand colours. Always pair colour with a text label or icon; never rely on colour alone.

## 6. Gradient System

Gradients are subtle atmospheric transitions, not decorative focal points.

Approved directions:
- Pastel sage `#E3E8DC` → warm ivory `#F7F6F2`.
- Dusty blush `#F2DFDA` → soft peach `#F4E3D5`.
- Pastel lilac `#E9E4F0` → powder blue `#E1E9ED`.
- Butter yellow `#F2EBD5` → warm ivory `#F7F6F2`.

Rules:
- Use low contrast and broad, soft transitions.
- Prefer gradients on marketing sections, onboarding backgrounds, or subtle hero atmosphere.
- Use no more than one noticeable gradient in a viewport.
- Do not use gradients in dense tables, forms, navigation, or data-heavy panels.
- No animated gradients, neon gradients, or glossy multi-colour effects.
- The login page may use a restrained sage-to-ivory gradient as part of its left visual composition.

## 7. Login Page — Specific Colour and Layout Direction

This section is an explicit implementation decision and overrides generic colour balancing where needed for the login composition.

**Leading pastel accent: muted pastel sage green.** Sage must be the most visible pastel accent on the login page, while warm ivory remains the dominant base. This connects the login experience to the Storeflow inspiration and AUREN's wider design system.

Layout:
- Desktop: two-column split screen.
- Left side: approximately 55–60% width, containing the visual/story panel.
- Right side: approximately 40–45% width, containing the functional login form.
- Mobile: stack or simplify the visual panel; keep the login form immediately accessible.

Left visual panel:
- Warm ivory foundation with a soft sage-to-ivory gradient.
- Include both a woman and a man, representing independent business owners.
- Use realistic, editorial-quality photography: natural expressions, believable skin texture, natural hands, real-world lighting, and a thoughtfully styled small-business workspace.
- The people should look like real people in a real commercial photograph, not synthetic stock-AI characters.
- Keep the composition calm, premium, and credible.
- Headline text:
  **AUREN**
  **Command Your Business With Confidence**
- Ensure the text has sufficient contrast and breathing room.

Right login panel:
- Soft white/ivory surface.
- Clear, minimal form hierarchy.
- Dark ink text, subtle borders, muted sage primary action.
- Inputs should have quiet neutral backgrounds and visible focus states.
- Avoid a rust/orange dominant palette.
- Do not place the entire login UI inside a generated image; implement it as real accessible frontend components.

Photography prompt for Google Antigravity's available image-generation model:
> Create a premium, photorealistic editorial campaign photograph for a refined SaaS brand serving independent small-business owners. Show one woman and one man together in a believable, beautifully organised small-business studio, collaborating naturally around order packaging and a notebook. They should look like real working adults, with natural expressions, realistic skin texture, authentic hands, and candid body language. Use soft natural daylight, warm ivory architecture, muted pastel sage-green details, subtle neutral materials, and understated styling. Composition should feel like an art-directed commercial lifestyle photograph, not a generic AI stock image. Keep the left/central composition visually rich but uncluttered, with calm negative space for headline overlay. No text, no logos, no watermark, no fake UI, no exaggerated props, no orange/rust colour cast, no plastic skin, no distorted hands. Wide landscape composition, high detail, premium photographic realism.

If the user supplies a specific reference photograph, preserve the requested broad composition and both-person presence without reproducing protected artwork pixel-for-pixel.

## 8. Typography

- Primary UI font: Inter.
- Optional marketing display font: Manrope, used sparingly.
- Use consistent weights and clear hierarchy.
- Avoid decorative script fonts, excessive all-caps, and overly thin text.
- Use comfortable line-height for body copy and forms.
- Headings should feel confident and editorial, not oversized for their own sake.

Suggested hierarchy:
- Display/hero: 44–60px desktop, responsive down to 34px.
- Page title: 28–36px.
- Section title: 18–24px.
- Body: 14–16px.
- Labels and metadata: 12–13px.

## 9. Layout, Grid, and Spacing

- Use a consistent spacing scale based on 4px increments.
- Desktop app shell: persistent sidebar plus flexible main workspace.
- Keep content widths readable; avoid stretching forms and text across very wide screens.
- Use generous whitespace but do not waste space in operational workflows.
- Mobile: compact navigation, stacked content, touch-friendly controls.
- Maintain consistent alignment across page headers, filters, tables, and cards.

## 10. Navigation and Information Architecture

Primary app navigation should support:
- Overview / Dashboard
- Enquiries
- Customers
- Follow-ups
- Orders
- Products
- Quick Replies
- Notifications
- Settings

Use clear labels and simple line icons. Show the active destination with a restrained sage treatment. Avoid excessive nested navigation.

## 11. Screen-Level Design Guidance

### Landing page
- Editorial hero with AUREN positioning and a clear call to action.
- Use realistic business photography or a carefully composed product screenshot.
- Explain the workflow: capture enquiry → review details → follow up → convert to order.
- Include product UI previews and trust-building explanations.
- Avoid fake testimonials, fake customer counts, and unsupported claims.

### Authentication
- Follow Section 7.
- Keep forms simple and reassuring.
- Include clear validation, password visibility control, and recovery links.
- Keep focus states and keyboard navigation accessible.

### Onboarding
- Short, guided setup.
- Use restrained pastel surfaces to distinguish steps.
- Avoid asking for unnecessary information before the owner can understand the product.

### Dashboard
- Show useful operational summaries: new enquiries, pending follow-ups, active orders, and payment overview.
- Prioritise actionable information over decorative charts.
- Use realistic sample data during frontend development and label demo data clearly.

### Enquiries
- Prioritise fast scanning, status clarity, search, filters, and quick actions.
- Use compact rows or cards depending on viewport.
- Make the source/channel visible without implying direct platform integration.

### Customers
- Clear customer identity, contact details, tags, and enquiry/order history.
- Avoid cluttered profile cards.

### Follow-ups
- Make due, upcoming, and completed follow-ups easy to distinguish.
- Use clear dates and action labels.

### Orders and payments
- Use readable order status, amount, customer, and payment state.
- Payment tracking is manual in the MVP; do not imply payment-gateway integration.

### Products
- Use simple product rows/cards with clear image, name, price, and availability information.
- Avoid turning the workspace into a storefront builder.

### Settings
- Group related preferences into calm, scannable sections.
- Use consistent form layouts and explicit save feedback.

## 12. Component Styling

### Cards
- Soft white surfaces on warm ivory backgrounds.
- Subtle borders; shadows only where elevation is meaningful.
- Avoid repetitive oversized rounded cards.

### Tables
- Clean typography, quiet row separators, clear column hierarchy.
- Use subtle hover states.
- Do not use gradient table backgrounds.

### Forms
- Consistent label placement, field heights, help text, and validation.
- Focus ring uses the muted sage accent.
- Error messages must be explicit and readable.

### Buttons
- Primary: muted sage background with sufficient contrast.
- Secondary: neutral surface with border.
- Tertiary: text/quiet action.
- Provide hover, active, disabled, loading, and focus states.

### Status pills
- Small, restrained, text-labelled semantic indicators.
- Avoid bright saturated fills.

### Dialogs and drawers
- Clear title, concise explanation, predictable actions.
- Use overlays and elevation sparingly.

## 13. Imagery and Illustration

- Prefer authentic editorial photography over generic AI imagery.
- Use natural materials, believable workspaces, real packaging, notebooks, and everyday commerce details.
- Keep imagery business-neutral: do not make all scenes look like a bakery, fashion boutique, or cosmetics studio.
- Avoid random 3D blobs, floating abstract spheres, excessive glassmorphism, and generic AI illustrations.
- Do not use images that contain illegible fake text or fabricated UI.

## 14. Motion and Animation

GSAP may be used for selected marketing-page and onboarding sequences.

- Motion should clarify hierarchy or provide feedback.
- Keep transitions short, smooth, and restrained.
- Avoid animating every card or every element on scroll.
- Respect reduced-motion preferences.
- Never delay access to forms or core workflows for an animation.

3D elements:
- Optional, limited to the marketing hero if they add genuine meaning.
- At most 2–3 tangible commerce-related objects.
- No random glowing orbs or decorative object storms.
- Keep the product UI itself practical and fast.

Lenis:
- Use only for the marketing site if it improves the experience.
- Do not hijack scrolling or interfere with keyboard, touch, accessibility, or browser navigation.
- Do not apply smooth-scroll effects to dense operational app screens by default.

## 15. Micro-interactions

- Clear hover and focus states.
- Small feedback after save, copy, status change, or completion.
- Loading states should communicate what is happening.
- Empty states should explain the next useful action.
- Avoid playful or bouncy motion that undermines trust.

## 16. Charts and Data Visualisation

- Use charts only when they help owners understand operational activity.
- Prefer simple, readable charts with restrained sage and neutral tones.
- Always label axes, units, and time periods.
- Do not use decorative charts with meaningless sample data.
- Ensure data remains understandable without colour alone.

## 17. Accessibility

Target WCAG 2.2 AA where practical.

- Maintain readable contrast for text and controls.
- All interactive controls must be keyboard accessible.
- Provide visible focus indicators.
- Use semantic HTML and correctly associated form labels.
- Provide alt text for meaningful images.
- Respect reduced-motion preferences.
- Do not communicate status through colour alone.

## 18. Frontend Implementation Guidance

Preferred frontend foundation:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui where appropriate
- React Hook Form and Zod for forms and validation
- Zustand only where shared client state is justified
- GSAP for selected motion
- Lenis only for the marketing site where appropriate

Implementation principles:
- Build reusable tokens and components before duplicating page styles.
- Keep business logic out of presentation components.
- Use typed mock data and service interfaces until backend APIs are ready.
- Do not hardcode secrets or expose private API keys in the browser.
- Do not simulate successful persistence when data is only local mock state.
- Keep components responsive and test them at mobile, tablet, and desktop widths.

## 19. Theme Support

The initial visual direction is light mode. If dark mode is implemented, it must be designed intentionally rather than mechanically inverting colours. Preserve contrast, hierarchy, and semantic meaning. Do not let dark mode delay the core frontend.

## 20. Frontend Quality Gate

Before considering a screen complete, verify:
- It follows the AUREN colour and typography tokens.
- It works at mobile, tablet, and desktop sizes.
- Forms have validation, loading, success, and error states.
- Buttons and controls perform their stated actions.
- Empty, populated, and error states are designed.
- Keyboard navigation and focus indicators work.
- No fake integrations, fake metrics, or misleading persistence are shown.
- No accidental rust/orange dominant styling has been introduced.
- Login uses muted pastel sage as its leading pastel accent.

## 21. Recommended Frontend Build Order

1. Design tokens, typography, buttons, inputs, badges, cards, and layout primitives.
2. App shell, navigation, responsive behaviour.
3. Authentication screens, including the split login page.
4. Onboarding.
5. Dashboard with clearly labelled sample data.
6. Enquiries and enquiry detail.
7. Customers and customer detail.
8. Follow-ups.
9. Orders and manual payment tracking.
10. Products, quick replies, notifications, and settings.
11. Landing page polish, selected GSAP motion, and responsive/accessibility review.

## 22. Final Design Direction

AUREN should look like a thoughtfully art-directed, premium business product: warm ivory at its foundation, muted sage as its signature accent, and a small supporting family of pastel tones. The Storeflow reference informs the calm green-led atmosphere and clear SaaS hierarchy, while AUREN keeps its own brand identity.

**For the login page specifically: sage green is the leading pastel accent. Warm ivory remains the dominant background. Blush, peach, lilac, butter, and powder blue are supporting colours only.**

The final result must feel trustworthy and genuinely usable for many kinds of independent sellers — never like a generic AI-generated dashboard.
