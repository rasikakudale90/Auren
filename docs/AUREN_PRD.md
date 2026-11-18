# AUREN

## Product Requirements Document (PRD)

**Version:** 2.1  
**Status:** Product definition / development planning  
**Product type:** Mobile-first web application with PWA support  
**Product name:** AUREN  
**Tagline:** Every conversation. Every customer. Every order. One workspace.  
**Product category:** Social-commerce business workspace  
**Initial audience:** Small product-selling businesses  
**Development environment:** Google Antigravity IDE  
**Development and deployment constraint:** Free-tier-first; no mandatory paid services  
**Initial enquiry capture:** Manual entry and copy-paste from customer conversations  
**AI roadmap:** Basic AI extraction in Phase 1; advanced AI assistance in later phases

---

## Brand Identity

- **Brand name:** AUREN
- **Name meaning / brand idea:** AUREN is a coined brand name intended to represent a more organised, clear and considered way to run a business. It is a brand concept, not a literal dictionary definition.
- **Hero tagline:** Every conversation. Every customer. Every order. One workspace.
- **Brand promise:** Bring customer enquiries, customer details, follow-ups and orders from multiple channels into one simple workspace.
- **Brand voice:** Clear, confident, practical, calm and professional. Avoid exaggerated AI claims, jargon and promises that the product cannot yet deliver.
- **Naming note:** Domain, company-name and trademark availability have not been verified. Complete appropriate checks before public commercial launch.

The brand name and tagline should be used consistently across the web app, landing page, documentation, demo materials and portfolio presentation. The tagline describes the intended product experience; it must not imply automatic platform integrations or inbox synchronisation that are not implemented.

---

## 1. Product Overview

### 1.1 Product vision

A simple, reliable workspace that helps small product-selling businesses organise customer enquiries, customers, products, orders and follow-ups that originate from multiple online and social channels.

The application should reduce the need to search through old conversations, notebooks and spreadsheets. It should be easy enough for a business owner to use from a phone without learning a complicated CRM.

### 1.2 The problem

Small businesses often receive customer enquiries and orders through more than one channel, including:

- Instagram DMs
- WhatsApp conversations
- Facebook messages
- Telegram conversations
- Website contact forms or chat
- Other social platforms, referrals or direct enquiries

Customers may ask questions such as:

- "Price?"
- "Is this available in medium?"
- "Can you deliver to Pune by Friday?"
- "Can I customise this?"
- "I need two pieces."
- "I will confirm tomorrow."

As conversations increase, an owner may struggle to remember:

- Who enquired and where the enquiry came from.
- Which product, variant or quantity the customer wanted.
- Which enquiries still need a response or follow-up.
- Which enquiries became confirmed orders.
- Which orders are pending, in progress or completed.
- Whether a customer has enquired or purchased before.

Owners may search old conversations, keep informal notes, use spreadsheets or rely on memory. These are product hypotheses and must be validated with real business owners. The product must not assume that every seller has the same workflow.

### 1.3 Proposed solution

Provide one lightweight workspace where a business owner can:

1. Capture an enquiry by entering details manually or pasting a customer message.
2. Select the channel where the enquiry originated.
3. Use AI to extract possible customer, product, quantity, variant, location and date details.
4. Review and correct the extracted information before saving.
5. Organise enquiries and customer records.
6. Set and manage follow-ups.
7. Convert an enquiry into an order without entering the same information again.
8. Track order progress and basic payment status.
9. Maintain a simple product catalogue and reusable quick replies.
10. See the business tasks that need attention.

The owner remains in control. The application does not send messages, confirm orders, collect payments or make business decisions without the owner's action.

### 1.4 Product positioning

**A lightweight social-commerce business workspace for small product sellers who receive customer enquiries from multiple online channels.**

It is not initially:

- An Instagram-only tool.
- A replacement for Instagram, WhatsApp, Facebook or other messaging apps.
- A full e-commerce storefront.
- A payment gateway or accounting system.
- An enterprise CRM.
- An automatic social inbox.

### 1.5 Core product promise

"Know who enquired, what they wanted, where the enquiry came from, what needs attention and which enquiries became orders — without searching through old conversations."

### 1.6 Product success principle

The product is successful when a real business owner can manage part of their daily enquiry-to-order workflow with less effort than before. The number of features shipped is not the measure of success.

---

## 2. Product Principles

1. **Less work, not more work:** Capturing and updating information should take as few steps as possible.
2. **Multi-channel by design:** An enquiry can originate from any supported source label; the core workflow must not depend on a platform integration.
3. **Mobile first:** Owners should be able to use the main workflows comfortably on a phone.
4. **Owner stays in control:** AI suggests; the owner reviews and confirms.
5. **No forced setup:** Product catalogue and quick-reply setup must be optional.
6. **No unnecessary data entry:** Do not ask for information that is not useful.
7. **Familiar language:** Use terms such as Enquiries, Customers, Products, Orders and Follow-ups.
8. **Reliable without AI:** Core enquiry, customer and order management must work when AI is unavailable or its free quota is exhausted.
9. **Privacy by default:** Store only necessary customer information and provide clear edit and deletion controls.
10. **Free-tier-first engineering:** Prefer free-tier services and open-source tools; avoid architecture that requires a paid subscription to run the MVP.
11. **Simple architecture:** Do not introduce extra services, queues or infrastructure unless a demonstrated requirement justifies them.
12. **Honest product claims:** Do not advertise integrations, automation, AI accuracy or business outcomes that have not been implemented and tested.

---

## 3. Target Users

### 3.1 Initial target audience

Small product-selling businesses that receive customer enquiries through social platforms or other online channels.

Potential initial segments include:

- Clothing and fashion sellers
- Jewellery and accessories sellers
- Home bakers and small food businesses
- Handmade and customised-product sellers
- Gift businesses
- Beauty and cosmetics sellers
- Small home décor businesses

These are candidate segments for research, not proof that all have the same problem.

### 3.2 Later audiences

After validating the initial product-seller workflow, consider:

- Makeup artists
- Photographers
- Tutors
- Freelancers and designers
- Other service providers

Service workflows may need appointments, quotations or bookings rather than product orders. Do not force these workflows into the first release.

### 3.3 Typical user characteristics

- Runs a business alone or with a small team.
- Uses a phone for most customer communication.
- Receives enquiries from one or more online channels.
- May not use a formal CRM.
- May maintain customer or order details in notebooks, spreadsheets or chat history.
- Wants practical time savings rather than complex reports.
- May be uncomfortable with technical setup or lengthy onboarding.
- May have limited internet connectivity or use an entry-level mobile device.

### 3.4 Jobs to be done

When a customer enquires, the owner wants to record what the customer wants without copying information into many fields.

When the same customer contacts the business again, the owner wants to find the customer's previous enquiries and orders.

When a customer has not confirmed an order, the owner wants to know whether a follow-up is due.

When an enquiry becomes an order, the owner wants to carry the existing information forward without entering it again.

When an order is being prepared or delivered, the owner wants to know its current status.

At the start or end of the day, the owner wants a short view of what needs attention.

---

## 4. Goals and Non-Goals

### 4.1 MVP goals

- Support manual enquiry entry and copy-paste capture.
- Record the source channel for every enquiry.
- Use basic AI extraction to prepare an editable enquiry draft.
- Preserve the original customer message.
- Keep enquiries organised by status.
- Maintain simple customer records and customer history.
- Allow an enquiry to become an order without re-entering its details.
- Track basic order status and payment status.
- Provide a simple follow-up list.
- Provide an optional basic product catalogue.
- Provide reusable quick replies that owners can copy.
- Provide a useful daily dashboard.
- Work well on mobile screens.
- Remain usable without AI.
- Validate the product with a small number of real business owners.
- Be suitable for a public portfolio demonstration and future client conversations.

### 4.2 Non-goals for the MVP

- Automatically reading every social media DM.
- Direct Instagram, WhatsApp, Facebook or Telegram inbox integration.
- Automatically sending or replying to messages.
- Collecting social media passwords.
- Unofficial scraping or browser automation of social platforms.
- Public online storefront or shopping cart.
- Payment gateway or automatic payment collection.
- Accounting, tax filing or invoicing.
- Warehouse-level inventory management.
- Complex employee roles and permissions.
- Advanced marketing automation.
- Supporting every business category from day one.
- Separate Android and iOS applications before validating the web product.
- Paid-only services that are necessary for the core workflow.

### 4.3 Portfolio goals

The project should demonstrate the ability to build and deploy a practical business application, including:

- Responsive user experience.
- Authentication and account isolation.
- Relational database design.
- Backend APIs and validation.
- AI integration with structured output and fallback.
- Error handling and testing.
- Deployment and environment configuration.
- Clear documentation and a working demo.

A portfolio demonstration must use fictional or permission-approved data, not real customer conversations without consent.

---

## 5. Main User Journeys

### 5.1 First-time setup

1. Owner creates an account.
2. Owner enters a business name and selects a business category.
3. Owner may optionally add products and quick replies.
4. Owner sees a simple dashboard with a clear "Add enquiry" action.
5. A short example explains how to paste a customer message and select its source.
6. The owner can create the first enquiry without completing catalogue setup.

Do not make catalogue setup compulsory.

### 5.2 Capture an enquiry

1. Owner opens "Add enquiry".
2. Owner selects a source channel, such as Instagram, WhatsApp, Facebook, Telegram, Website or Other.
3. Owner pastes the customer message or enters details manually.
4. If AI is available, the application extracts possible details.
5. The application displays an editable preview.
6. Owner corrects any incorrect details and confirms.
7. The enquiry is saved with its source channel and original message.

If AI is unavailable or fails, the original message must remain available and the owner must be able to save the enquiry manually.

### 5.3 Manage an enquiry

1. Owner sees the enquiry in the list.
2. Owner can open its details.
3. Owner can update status, add notes or set a follow-up date.
4. Owner can search by customer, handle, product or message text where supported.
5. Owner can filter by status and source channel.
6. Owner can archive or delete the enquiry.

### 5.4 Manage a customer

1. Owner opens a customer record from an enquiry or customer list.
2. Owner sees the customer's available contact details.
3. Owner sees previous enquiries and orders associated with that customer.
4. Owner can correct customer details.
5. Owner can link an enquiry to an existing customer or create a new customer.
6. The application must not automatically merge people based only on similar names.

### 5.5 Convert an enquiry into an order

1. Owner selects "Create order" from an enquiry.
2. Existing customer and product details are carried over.
3. Owner adds missing details such as quantity, agreed amount, expected date and order items.
4. Owner records the payment status if known.
5. Owner reviews and confirms the order.
6. The order appears in the Orders section and remains linked to its source enquiry.

The application must not treat an enquiry as a confirmed order until the owner confirms it.

### 5.6 Daily use

The owner opens the dashboard and can quickly see:

- New or recently updated enquiries.
- Follow-ups due today.
- Overdue follow-ups.
- Orders that need attention.
- Pending payment amounts, where recorded.
- Recently completed orders.

The dashboard should prioritise actions, not decorative charts.

---

## 6. Functional Requirements

### 6.1 Account and business profile

**Phase 1 requirements**

- Email-based sign-up and login.
- Secure authentication using a suitable free-tier or open-source option.
- Basic business profile: business name and category.
- Edit profile and sign out.
- Account deletion process.
- User data must be isolated by business/account.
- Clear loading, empty, success and error states.

**Acceptance criteria**

- A user can access only their own business data.
- Protected pages require a valid session.
- The application explains why customer information is collected.
- A user can request deletion of their records and account through a clearly documented process.
- Authentication secrets are never stored in source code.

### 6.2 Enquiry capture and source channels

**Phase 1 requirements**

- Add an enquiry manually.
- Paste a customer message into a text field.
- Select the source channel.
- Preserve the original message.
- Allow an owner to edit all extracted or manually entered fields.
- Allow an enquiry to be saved with incomplete information.
- Allow a source to be marked as Other with an optional source note.
- Allow the owner to record the date received if it differs from the current date.

**Initial source channel values**

- Instagram
- WhatsApp
- Facebook
- Telegram
- Website
- Phone call
- Walk-in
- Referral
- Other

These are source labels only. Their presence does not mean that an integration exists.

**Potential extracted fields**

- Customer name
- Social handle or contact reference, if provided
- Product or service of interest
- Variant, size or colour
- Quantity
- Customisation request
- City or delivery location
- Budget, only if explicitly mentioned
- Required date or urgency
- Enquiry type, such as price, availability or custom order

**Acceptance criteria**

- An owner can save an enquiry without completing every field.
- The original message is retained.
- The source channel is visible in enquiry details and list views.
- Unknown details remain blank.
- AI-extracted details are shown as suggestions until confirmed.
- An AI failure never blocks manual saving.
- The app never invents a customer identity, price, quantity or date.

### 6.3 AI extraction

**Phase 1 requirements**

- Convert pasted text into a structured draft.
- Use a defined response schema.
- Return only information supported by the supplied message.
- Represent unknown values as empty or null.
- Display the original message alongside the extracted draft.
- Let the owner edit every suggested field.
- Handle malformed, incomplete or unexpected model responses.
- Provide a manual-entry fallback.
- Apply sensible input-length limits.
- Avoid sending unnecessary customer information to an AI provider.

**Reliability requirements**

- AI output must be validated by the backend before use.
- Treat pasted messages as untrusted data, not instructions to the AI system.
- Do not allow message text to override system instructions or application rules.
- Do not silently save unreviewed AI output as confirmed business data.
- Do not call the AI service if the owner chooses manual entry.
- Track basic AI request failures and usage without logging sensitive message content unnecessarily.
- Provide a clear message when a free quota or provider limit is reached.

**Free-tier requirement**

The application must remain fully usable for manual enquiry, customer and order management when the AI provider is unavailable, rate-limited or out of free quota. No paid AI subscription may be required for core application use.

### 6.4 Enquiry management

**Phase 1 requirements**

- List enquiries in a mobile-friendly layout.
- Search by customer, handle or product.
- Filter by status and source channel.
- View enquiry details and original message.
- Add and edit notes.
- Edit customer and enquiry details.
- Set or update a follow-up date.
- Archive or delete an enquiry.
- Show created and updated dates.

**Suggested enquiry statuses**

- New
- Replied
- Interested
- Follow-up due
- Converted
- Not converted

Keep the status list short. Validate labels with pilot owners before finalising them. Avoid creating a status that duplicates a separate follow-up field.

### 6.5 Follow-up management

**Phase 1 requirements**

- Set a follow-up date manually.
- Show follow-ups due today.
- Show overdue follow-ups.
- Mark a follow-up as completed.
- Allow the owner to reschedule or dismiss it.
- Link each follow-up to the relevant enquiry and customer.

**AI-assisted behaviour**

- AI may suggest a follow-up date only when the message contains a clear date or timing phrase.
- A suggested date must be visibly labelled as a suggestion.
- Vague language must not be converted into a definite date without owner confirmation.

**Important behaviour**

- Do not repeatedly nag the owner.
- Do not send external notifications in Phase 1.
- Do not create duplicate active follow-ups for the same enquiry and purpose without warning.

### 6.6 Customer records

**Phase 1 requirements**

- Create a customer from an enquiry.
- Link multiple enquiries to the same customer.
- Store only useful details voluntarily entered by the owner.
- Show previous enquiries and orders.
- Allow customer details to be corrected.
- Allow an owner to search customers.
- Provide a manual way to link an enquiry to an existing customer.
- Provide a manual merge process only if it can be implemented safely and tested.

**Matching rules**

- Do not automatically merge records based only on similar names.
- Use a reliable identifier, such as an exact handle or phone number, as a possible match.
- Show possible matches for owner confirmation where appropriate.
- Do not assume that two platform handles belong to the same person.

### 6.7 Product catalogue

**Phase 1 requirements — optional setup**

Allow an owner to save:

- Product name
- Product image, if supported within free storage limits
- Price
- Available variants, such as size or colour
- Short description
- Availability note
- Optional SKU or internal reference

The catalogue is an internal reference for the owner. It is not a public online store and does not require stock accounting in Phase 1.

**Acceptance criteria**

- An owner can use the application without adding products.
- Products can be created, edited and archived.
- Product information can be selected when creating or converting an enquiry into an order.
- Product prices are not silently treated as the final agreed order price.

### 6.8 Quick replies

**Phase 1 requirements — optional setup**

- Save reusable responses.
- Organise replies using simple labels such as Price, Delivery, Availability and Customisation.
- Copy a reply with one action.
- Edit and delete saved replies.
- Keep replies editable before the owner sends them through their original communication platform.

Quick replies are copied to the clipboard. The application does not send them to social platforms in Phase 1.

### 6.9 Order management

**Phase 1 requirements**

- Create an order from an enquiry.
- Carry over customer and relevant product details.
- Support one or more order items.
- Record product, quantity, agreed unit price and line total.
- Record discounts or adjustments only if included in the simple order calculation.
- Record agreed order amount.
- Record expected delivery or fulfilment date when relevant.
- Add a short order note.
- Track a simple order status.
- Track basic payment status.
- Link the order to its source enquiry and customer.
- Allow owner edits with a clear update history where practical.

**Suggested order statuses**

- Pending confirmation
- Confirmed
- In progress
- Ready
- Dispatched / handed over
- Completed
- Cancelled

Not every business needs every status. Keep the initial workflow simple.

**Basic payment status**

- Unpaid
- Partially paid
- Paid
- Refunded (record only; no payment processing)

Where practical, record amount paid and remaining balance. These are owner-entered records, not verified bank or payment-gateway transactions.

**Out of scope**

- Payment gateway
- Automatic payment verification
- Shipping carrier integration
- Accounting and tax management
- Formal invoicing
- Advanced inventory management

### 6.10 Dashboard and insights

**Phase 1 dashboard**

- New enquiries
- Follow-ups due today
- Overdue follow-ups
- Active orders
- Orders awaiting confirmation
- Orders with unpaid or partial payment, where recorded
- Recently completed orders

**Later insights**

- Enquiries received over time
- Enquiry-to-order conversion
- Most enquired-about products
- Source-channel breakdown
- Repeat customers
- Cancelled orders and recorded reasons
- Order value trends based only on recorded data

Show only metrics owners understand and can act on. Do not imply that the application measures total business revenue unless the necessary order data is recorded. Label estimates and recorded totals clearly.

### 6.11 Notifications

**Phase 1**

- In-app due and overdue follow-up list.
- Dashboard indicators for tasks requiring attention.

**Later phases**

- Optional email or Telegram reminders, subject to free-tier availability and user demand.
- Notification preferences.
- Sensible frequency controls.
- Duplicate prevention.
- Links back to the relevant enquiry or order.

Do not make a paid notification provider a requirement for the core product.

### 6.12 Language support

- Initial application interface: simple English.
- Test AI extraction against realistic English, Hindi, Marathi and Hinglish messages.
- Include informal spelling, abbreviations and typos in the test set.
- Do not promise reliable multilingual extraction until it has been evaluated.
- Preserve the original customer message regardless of extraction language.

### 6.13 Search, filters and sorting

**Phase 1 requirements**

- Search enquiries by customer, handle and product.
- Filter enquiries by status and source channel.
- Filter orders by status and payment status.
- Search customers by available name or handle.
- Sort recent activity in a predictable way.
- Provide clear empty states when filters return no results.

### 6.14 Data export and deletion

**Phase 1 minimum**

- Provide a documented account deletion process.
- Provide a way for users to request a copy of their business data.
- Define what happens to linked records when an enquiry, customer or order is deleted.
- Prefer archive/soft-delete for records where accidental deletion would be harmful.
- Ensure deletion rules do not expose another business's records.

A self-service export can be prioritised after the core data model is stable, but data portability must be considered from the beginning.

---

## 7. Product Experience and UX Requirements

### 7.1 Navigation

Keep the main navigation small:

- Home
- Enquiries
- Orders
- Customers
- Products
- Quick Replies
- Settings

On smaller screens, use a compact mobile navigation pattern. The "Add enquiry" action should remain easy to reach.

### 7.2 UX rules

- Mobile-first and responsive.
- Fast loading on ordinary mobile networks.
- Clear empty states with a useful next action.
- Large, easy-to-tap controls.
- Minimal forms and sensible defaults.
- Avoid unnecessary charts, pop-ups and onboarding steps.
- Use familiar language rather than CRM terminology.
- Show confirmation before destructive actions.
- Make AI output easy to correct.
- Display source channel consistently.
- Do not require catalogue setup before the first enquiry.
- Keep manual capture available even if AI is disabled.
- Make copy-to-clipboard actions clear and provide feedback.

### 7.3 Accessibility and usability

- Use readable text sizes and sufficient contrast.
- Provide labels for form fields.
- Ensure keyboard navigation for important desktop workflows.
- Do not rely on colour alone to communicate status.
- Show validation errors close to the relevant field.
- Use clear date and currency formatting.
- Avoid unnecessarily complex tables on mobile.

### 7.4 Speed target

The normal manual enquiry capture flow should take less than 10 seconds after the owner has the message ready, excluding unusually slow network conditions.

AI response time is separate and must not block manual saving. This is a target to test, not a guaranteed performance claim.

---

## 8. Social Platform and Channel Strategy

### 8.1 Initial approach: manual multi-channel capture

The Phase 1 application is multi-channel in its data model, not an integrated social inbox.

The owner continues using their existing platforms. When an enquiry needs tracking, the owner:

1. Copies the customer message.
2. Opens the business assistant.
3. Selects the source channel.
4. Pastes the message or enters the details manually.
5. Reviews the AI draft, if AI is available.
6. Saves the enquiry.

This keeps the first release independent of external platform permissions and API approvals.

### 8.2 Source channel is not an integration

A source option such as WhatsApp or Instagram only records where the owner says the enquiry came from. It does not provide automatic message access, synchronisation or sending.

The interface and marketing material must communicate this distinction honestly.

### 8.3 Future integrations

Investigate official APIs and their current eligibility, permissions, account requirements, review process, costs and technical restrictions before planning integration.

Potential future channels include:

- Instagram Messaging API
- WhatsApp Business Platform
- Facebook Messenger Platform
- Telegram Bot API
- Website enquiry forms or supported integrations

Do not use unofficial scraping, browser automation, password collection or methods that put customer accounts at risk.

### 8.4 Integration principle

An integration should reduce effort meaningfully and be requested by actual users. Do not build it merely because it is technically possible.

---

## 9. Privacy, Trust and Data Handling

The application stores information copied from customer conversations. This requires clear and careful handling.

Requirements:

- Explain what information is stored and why.
- Store only information needed for the product's purpose.
- Keep each business's data isolated.
- Use secure authentication and access controls.
- Protect data in transit and at rest using appropriate platform capabilities.
- Do not expose customer messages publicly.
- Provide record deletion and account deletion processes.
- Define retention and backup policies.
- Do not use customer messages to train or improve models unless there is a clear, lawful basis and appropriate consent.
- Disclose when message content is sent to an external AI provider.
- Minimise sensitive data sent to AI services.
- Avoid logging full customer messages in application logs.
- Review applicable privacy and data-protection obligations before public launch.
- Do not ask owners for social media passwords.

### 9.1 Demo data

- Use fictional sample businesses and fictional customer conversations in public demos.
- Obtain permission before using real business or customer information.
- Never publish private customer messages, phone numbers or addresses in screenshots or videos.
- Provide a way to reset demo data if a public demo account is offered.

---

## 10. Non-Technical Requirements

### 10.1 User research

Do not assume the product is valuable just because the problem sounds plausible.

Speak with owners from a few different product-selling categories. Ask about their current process before pitching the solution.

Useful interview questions:

1. Where do most of your customer enquiries arrive?
2. Do customers contact you through more than one platform?
3. What do you do after someone asks for a price?
4. How do you remember customers who said they would confirm later?
5. How do you track orders after a customer confirms?
6. Which part of this process takes the most time?
7. What tools or notebooks do you currently use?
8. What would make a new tool feel like extra work?
9. Would you be willing to test a simple version with real enquiries?

Avoid leading questions such as "Would you use my AI CRM?" Ask about actual past behaviour.

### 10.2 Pilot testing

- Recruit 3–5 owners for an initial pilot if possible.
- Include owners who use different source channels.
- Let them use the product with real workflows, not only sample data.
- Observe where they hesitate, abandon a task or enter duplicate information.
- Ask for feedback after several days of use.
- Fix the biggest friction points before adding more features.
- Obtain permission before using any customer message or business information in testing.

### 10.3 Onboarding

- Let users create an enquiry before asking them to configure everything.
- Make product catalogue setup optional.
- Provide one short example.
- Explain how to select the source channel.
- Explain what happens to pasted customer messages.
- Avoid lengthy tutorials.

### 10.4 Support and feedback

- Provide a simple feedback/contact option.
- Explain how to correct or delete records.
- Have a clear process for reporting bugs.
- Keep help content short and task-focused.
- Record feedback and prioritise repeated problems rather than one-off feature requests.

### 10.5 Pricing and business model

Do not decide pricing before understanding how often the product is used and how much value it creates.

A possible future model:

- **Free:** Basic enquiry, customer and order tracking with reasonable usage limits.
- **Paid later:** Higher usage limits, advanced insights, team access and supported integrations.

Do not introduce artificial limits that make the basic workflow frustrating. Pricing must be validated with owners. The portfolio/demo version should not require a paid subscription to demonstrate its core workflows.

### 10.6 Go-to-market approach

Start with direct conversations, not paid advertising.

Potential channels:

- Local product-selling businesses.
- Small seller communities.
- Referrals from pilot users.
- Direct outreach to businesses whose workflow appears relevant.
- Freelancing platforms and portfolio listings.
- Demonstrations using fictional or permission-approved sample data.

The initial pitch should focus on the business outcome: fewer forgotten enquiries, clearer order tracking and less manual record keeping. Avoid leading with technical terms such as LLM, JSON extraction or AI agents.

### 10.7 Freelancing and portfolio presentation

The project should be prepared for both real-business demonstrations and a developer portfolio.

Portfolio deliverables:

- Public live demo, subject to hosting limits and safe demo access.
- Public source repository, with no secrets or private customer data.
- Clear README and setup instructions.
- Screenshots of the main workflows.
- Short demonstration video.
- Architecture diagram.
- Feature list and known limitations.
- Sample data clearly marked as fictional.
- Deployment notes and environment variable documentation.

Do not claim that the application has real customers, production-scale reliability or platform integrations unless those claims are true.

---

## 11. Success Metrics

### 11.1 Product usability

- Time required to save an enquiry.
- Percentage of enquiry captures completed successfully.
- Percentage of users who complete the first enquiry without help.
- Number of corrections required after AI extraction.
- Percentage of users who can find an existing enquiry or order without assistance.

### 11.2 Product usefulness

- Enquiries captured per active business.
- Follow-ups completed on time.
- Enquiries converted into orders.
- Weekly active pilot businesses.
- Percentage of pilot users who continue using the product after two weeks.
- Number of owners who report that the product reduces their tracking effort.

### 11.3 Trust and reliability

- Failed or lost enquiry captures.
- Incorrect AI extraction rate on a labelled test set.
- Duplicate customer records.
- Data isolation test failures.
- User-reported privacy or data concerns.
- Application error rate and availability within the limits of the selected free-tier services.

### 11.4 Early validation targets

Treat these as initial targets, not evidence of product-market fit:

- 5–10 owner interviews.
- 3–5 pilot businesses.
- A working manual enquiry capture flow under 10 seconds.
- At least some pilot users returning over multiple weeks.
- No unresolved critical data-isolation or data-loss defects before a public pilot.

A project with no real users can still demonstrate engineering ability in a portfolio, but real usage is needed to validate business value.

---

## 12. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Owners do not want another app | Keep capture fast; validate willingness to use a separate workspace |
| Owners forget to enter enquiries | Test the workflow with real users; explore official integrations only if justified |
| AI extracts incorrect information | Editable preview, preserve original text, validate output and never guess missing details |
| AI free quota is exhausted | Manual workflow must remain fully usable; handle provider limits gracefully |
| Product becomes too complicated | Prioritise enquiries, customers, orders and follow-ups |
| Source channel is mistaken for integration | Clearly label it as a manually selected source |
| Social platform integration is restricted | Keep manual multi-channel capture as the initial workflow |
| Owners do not trust customer-data storage | Clear privacy explanation, access controls and deletion |
| Hosting free tier is insufficient | Monitor usage, minimise resource consumption and keep deployment portable |
| Free-tier provider changes its limits | Avoid deep provider lock-in and document migration options |
| Different business categories need different workflows | Start with one validated product-seller segment |
| Users stop using the product | Observe real usage and remove steps that do not create value |
| Customer records are merged incorrectly | Require reliable matching and owner confirmation |
| Order totals are misunderstood as verified payments | Clearly label amounts as owner-entered records |

---

## 13. Technical Direction and Free-Tier Constraints

### 13.1 Development environment

- Use Google Antigravity IDE as the primary development environment.
- Keep project instructions and architecture documentation inside the repository.
- Break work into small, verifiable implementation tasks.
- Use the IDE's available free capabilities without assuming that every model or feature is permanently free.
- Do not make the application dependent on a paid IDE feature or paid AI coding agent.

Google Antigravity is the development environment; it does not itself guarantee free hosting, database capacity or AI inference.

### 13.2 Suggested technology stack

| Layer | Suggested technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Backend | Spring Boot REST API |
| Database | PostgreSQL |
| Database hosting | A provider with a suitable free tier, or another free PostgreSQL option |
| AI extraction | Provider-agnostic LLM API with structured output, using an available free quota |
| Authentication | Secure authentication compatible with the chosen architecture |
| Image storage | Free-tier object storage only if needed; otherwise defer product images |
| Frontend deployment | A provider with a suitable free tier |
| Backend deployment | A provider with a suitable free tier |
| Version control | Git and GitHub |
| Testing | JUnit, Spring Boot tests and suitable frontend tests |

The exact providers must be evaluated before implementation. Free-tier availability, limits, inactivity policies, commercial-use terms and deployment restrictions can change.

### 13.3 Free-tier rules

1. No mandatory paid API, database, hosting or automation service.
2. No paid AI inference requirement for the core workflow.
3. No paid social platform API requirement in Phase 1.
4. Prefer open-source libraries and standard protocols.
5. Avoid unnecessary infrastructure such as paid queues, managed search or multiple microservices.
6. Monitor database, storage, bandwidth, build and AI usage.
7. Set usage limits and graceful error handling.
8. Keep configuration provider-specific and environment-driven.
9. Document the free-tier limits and any risk of service suspension.
10. If a provider's free tier changes, evaluate a replacement before accepting a mandatory cost.

"Free-tier" does not mean unlimited, guaranteed uptime or permanent availability. Before public launch, check the selected provider's current terms and whether its free plan permits the intended use.

### 13.4 Architecture principles

- Start with a modular monolith: one frontend application, one backend API and one relational database.
- Do not split into microservices for the MVP.
- Keep business logic in the backend.
- Validate all incoming data on the server.
- Validate AI output against a schema.
- Preserve the original message if extraction fails.
- Enforce per-business data access in backend queries and database policies where supported.
- Do not rely only on frontend checks for security.
- Do not hardcode secrets or environment-specific configuration.
- Add tests for enquiry capture, source channel, status changes, order conversion and data isolation.
- Monitor errors and basic service health.
- Keep deployment portable and document the steps to reproduce it.

### 13.5 Authentication and data ownership decision

Choose one clear authentication and data-access design before implementation. Avoid mixing multiple authentication systems.

If a hosted authentication provider is used, document how its user identity maps to the application's business records. If authentication is handled by Spring Boot, implement secure password handling, session/token management and access controls using established libraries.

The backend must verify the authenticated user for every business-owned record operation.

### 13.6 AI provider abstraction

- Keep the AI integration behind a backend service interface.
- Do not call the AI provider directly from the browser with a secret key.
- Keep provider keys in environment variables.
- Allow AI to be disabled through configuration.
- Provide manual fallback.
- Apply request limits and input-size limits.
- Do not assume free-tier model availability or unlimited calls.
- Avoid sending unnecessary personal information to the provider.

### 13.7 Environment and secrets

- Use environment variables for database URLs, authentication secrets, AI keys and provider configuration.
- Commit an `.env.example` containing placeholders only.
- Never commit `.env` files or credentials.
- Do not expose secret keys in frontend variables or browser bundles.
- Document required variables in the README.
- Use separate development and production configuration.

### 13.8 Testing requirements

At minimum, test:

- Sign-up and login behaviour.
- Access to another user's records is denied.
- Enquiry creation with manual details.
- Enquiry creation with pasted message.
- Source channel is saved and displayed correctly.
- AI extraction success and malformed-response handling.
- AI unavailable or quota-exhausted fallback.
- Enquiry status updates.
- Follow-up creation and completion.
- Customer linking and duplicate prevention.
- Order creation from an enquiry.
- Order item and total calculations.
- Payment status updates.
- Record archive and deletion behaviour.

---

## 14. Suggested Data Entities

Initial entities:

- **User:** Authentication identity and account reference.
- **Business:** Business name, category, owner and settings.
- **Customer:** Name, platform handle, contact details voluntarily entered and business reference.
- **Enquiry:** Business, customer, source channel, original message, extracted fields, status, notes and timestamps.
- **Follow-up:** Related enquiry, due date, completion state and notes.
- **Product:** Business, name, image reference if used, price, variants and availability note.
- **Order:** Business, customer, source enquiry, order items, agreed amount, payment status, expected date and order status.
- **Order Item:** Product reference where available, product name snapshot, quantity, agreed unit price and line total.
- **Quick Reply:** Business, label, reusable response and timestamps.

### 14.1 Data modelling principles

- Every business-owned record must have an unambiguous business/tenant relationship.
- Use database constraints and foreign keys where appropriate.
- Keep source channel as a controlled value or validated field.
- Store a product name and agreed price snapshot on an order item so later product edits do not silently change historical orders.
- Avoid duplicate customer creation where reliable matching is possible.
- Preserve the relationship between an enquiry, customer and resulting order.
- Define archive and deletion behaviour before implementation.

---

## 15. Release Plan and Development Phases

The roadmap contains one validation phase and five product development phases. Later phases are conditional on user evidence, technical feasibility and free-tier constraints. Completing a phase does not automatically justify starting the next one.

### Phase 0 — Problem Validation and Product Design

**Purpose:** Confirm the problem and reduce the risk of building an application owners do not need.

Activities:

- Interview 5–10 product-selling business owners.
- Include more than one source channel in the interviews.
- Observe how owners currently handle enquiries and orders, with permission.
- Identify the most repetitive and frustrating task.
- Find out whether owners use notebooks, spreadsheets, WhatsApp or other tools.
- Validate whether a separate workspace would feel useful or like extra work.
- Create a simple user flow and clickable prototype.
- Test the prototype with potential users.
- Recruit 3–5 pilot businesses if possible.

**Exit criteria:**

- A few owners describe a similar recurring problem.
- At least some owners agree to test a simple solution.
- The initial target segment and core workflow are clear.
- The first version's scope is small enough to build and support.

If needs differ significantly, narrow the target segment before development.

### Phase 1 — Core Social-Commerce Business Assistant (MVP)

**Purpose:** Deliver a working multi-channel enquiry-to-order workspace.

Build:

1. Authentication and business profile.
2. Responsive application shell and navigation.
3. Manual enquiry entry and copy-paste capture.
4. Source channel selection.
5. Basic AI extraction with editable preview.
6. Manual fallback when AI is unavailable.
7. Enquiry list, details, search, filters and status.
8. Customer records and customer history.
9. Follow-up dates and due/overdue list.
10. Basic optional product catalogue.
11. Basic saved quick replies.
12. Create an order from an enquiry.
13. Order items, quantities and agreed amounts.
14. Basic order status and payment status tracking.
15. Dashboard with actionable information.
16. Data isolation, validation, deletion and error handling.
17. Tests for core workflows.
18. Free-tier deployment and documentation.
19. Fictional demo data and a portfolio-ready demonstration.

**Phase 1 exclusions:**

- Automatic social inbox access.
- Automatic message sending.
- WhatsApp or Instagram API integration.
- Team management.
- Advanced analytics.
- Payment gateway.
- Advanced inventory.
- Native mobile applications.

**Exit criteria:**

- A pilot owner can create, find and update an enquiry without developer assistance.
- An enquiry can be linked to a customer and converted into an order.
- Follow-ups and order statuses work reliably.
- Manual workflows remain usable when AI is disabled.
- Cross-business data access tests pass.
- No unresolved critical data-loss or data-isolation defect remains.
- The deployed application and documentation are usable for a controlled demo.

### Phase 2 — Smart Business Assistant

**Purpose:** Reduce repetitive work after the core product is being used.

Potential features:

- Context-aware AI reply suggestions using owner-approved product and FAQ information.
- Better multilingual extraction.
- Improved duplicate customer suggestions.
- Smarter follow-up suggestions.
- AI-assisted daily summaries.
- Order cancellation reasons.
- Repeat customer identification.
- Low-stock alerts for manually maintained stock.
- Optional email or Telegram reminders, if free-tier limits and user demand support them.

**Entry conditions:**

- Phase 1 users return and use the core workflow.
- Pilot feedback identifies repetitive tasks that AI or automation can genuinely reduce.
- AI cost and quota limits can be handled without breaking core functionality.

**Exit criteria:**

- Smart features save measurable effort for pilot users.
- Suggestions are editable and never sent automatically.
- AI failure does not interrupt core workflows.
- Usage stays within the selected free-tier limits or has a clear fallback.

### Phase 3 — Business Intelligence

**Purpose:** Help owners understand their recorded enquiry and order activity.

Potential features:

- Enquiry trends over time.
- Enquiry-to-order conversion.
- Source-channel breakdown.
- Most enquired-about products.
- Repeat customer trends.
- Cancelled order analysis.
- Recorded order value summaries.
- Exportable business reports.

**Entry conditions:**

- There is enough accurate, consistently recorded data to make insights meaningful.
- Pilot users ask for specific reports or demonstrate a need.

**Exit criteria:**

- Every metric has a clear definition.
- Metrics are based only on available recorded data.
- Users understand the reports and can act on them.
- Reports do not imply unrecorded revenue or platform-wide performance.

### Phase 4 — Multi-Channel Integrations and Automation

**Purpose:** Reduce manual copying only where official integrations provide meaningful value.

Potential features:

- Official Instagram Messaging API integration.
- WhatsApp Business Platform integration.
- Facebook Messenger integration.
- Telegram integration where appropriate.
- Website enquiry form integration.
- Supported message or event synchronisation.
- Automated enquiry creation where officially permitted.
- More advanced workflow automation.

**Entry conditions:**

- Pilot users identify manual capture as a significant remaining problem.
- Official APIs support the required use case.
- Account eligibility, permissions, reviews, costs and terms are understood.
- The integration can be operated within the project's cost constraints or is explicitly treated as an optional future paid capability.

**Exit criteria:**

- Integrations use official supported methods.
- Permissions and account requirements are documented.
- Failures and duplicate events are handled.
- Manual capture remains available.
- No social media password collection or unofficial scraping is used.

### Phase 5 — Business Expansion

**Purpose:** Support businesses with more complex operations after demand is demonstrated.

Potential features:

- Multi-user/team access.
- Employee responsibilities and assignments.
- Role-based permissions.
- More configurable order workflows.
- Advanced customer and product insights.
- More business categories, including service providers.
- Additional business integrations.
- Native Android/iOS application if PWA limitations justify it.
- Advanced automation and reporting.

**Entry conditions:**

- Existing users demonstrate a need for team or expanded workflows.
- The product has a stable core and clear user demand.
- Additional infrastructure and support requirements are understood.

**Exit criteria:**

- New workflows solve validated customer problems.
- Permissions and data isolation are tested.
- Ongoing hosting and maintenance costs are understood.
- The expanded product remains usable and maintainable.

---

## 16. Phase Prioritisation Rules

Use these rules when deciding whether a feature belongs in a phase:

1. Does it solve a problem confirmed by target users?
2. Does it reduce work or create a new task for the owner?
3. Is it required for the enquiry-to-order workflow?
4. Can it be implemented and operated within free-tier constraints?
5. Does it introduce platform permissions, privacy or maintenance risk?
6. Can it be tested with the available time and resources?
7. Will it make the product meaningfully more useful, or is it only technically interesting?

Prioritise the smallest feature set that makes the complete core workflow useful.

Do not add a feature to Phase 1 only because it looks impressive in a portfolio.

---

## 17. Open Questions to Resolve Through Research

1. Which initial seller category has the most painful enquiry-tracking problem?
2. Which channels do the target owners actually use most?
3. Do owners want one combined enquiry list or separate views by source?
4. Which enquiry fields are genuinely useful?
5. Is order tracking required in the first release, or is enquiry follow-up the bigger problem?
6. Do saved quick replies provide enough value without automatic messaging?
7. What reminder channel do owners actually check?
8. How much customer information are owners comfortable storing?
9. Would owners pay for the product, and what outcome would justify the price?
10. Which official platform integrations are available and useful to the intended users?
11. Which free-tier hosting and AI providers meet the project's technical, privacy and commercial-use requirements?

Do not make these decisions based only on assumptions. Use interviews, pilot observations and provider documentation.

---

## 18. Final Product Direction

Build **AUREN**, a focused, mobile-first social-commerce business workspace for small product-selling businesses.

The first release should do five jobs reliably:

1. **Enquiries:** Capture and organise customer interest from multiple source channels.
2. **Customers:** Keep customer details and interaction history organised.
3. **Orders:** Turn confirmed enquiries into trackable orders.
4. **Follow-ups:** Help owners remember what needs attention.
5. **Daily operations:** Show the next actions without requiring complex reporting.

Basic AI extraction should make enquiry capture easier, but the product must remain useful without AI. Product catalogue and quick replies should support the workflow without making setup compulsory.

The initial product is multi-channel through manual capture and source tracking. It must not claim to automatically connect to social platforms until official integrations have actually been implemented and approved.

The long-term opportunity is for **AUREN** to become a lightweight operating workspace for small social-commerce businesses. That direction should be earned through real usage and feedback, not by adding every possible feature at the beginning.

The application should also serve as a credible portfolio project: deployed, documented, secure enough for a controlled pilot, demonstrable with fictional data and built using tools and services that fit the free-tier constraint.

**Product success is not the number of features shipped. It is whether a business owner can manage part of their daily workflow with less effort than before.**
