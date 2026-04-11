# Unified Nexus Web Platform Work Plan

## 1. Project Intent

Build a production-grade, modular SPA for Unified Nexus with a PHP + MySQL backend, admin CRUD, secure authentication, and a premium mobile-first UI that follows the strict design guide.

Tagline to preserve across key touchpoints: **We Work We Win**.

## 2. Requirement Compliance Matrix (From design-guide.md)

### 2.1 Must-Have Technology

- Frontend: HTML5, CSS3, Vanilla JavaScript.
- Backend: PHP.
- Database: MySQL.
- No inline CSS.
- Lightweight libraries only if justified.

### 2.2 Must-Have UX/UI

- Mobile-first architecture.
- SPA navigation and section flow.
- Light and dark themes with smooth transitions and no contrast issues.
- Premium matte, minimal, flat, slightly old-school aesthetic.
- Very subtle radius (~2px), strong typography hierarchy, muted palette.

### 2.3 Must-Have Pages/Sections (single-page sections)

- Loading screen (curtain-style opening).
- Hero with tagline, media background, subtle particles/shapes.
- About with org description, vision, bullets, relevant imagery.
- Clubs (dynamic from backend, including president).
- Executive team cards in provided order.
- Apply form with validation.

### 2.4 Must-Have Backend/Admin

- Password-protected admin panel.
- Admin password from environment config.
- Full CRUD for clubs.
- Manage executive members (image, name, role, order).
- View and delete applications.

### 2.5 Must-Have Security

- Input sanitization.
- Prepared statements for all DB interaction.
- Secure file upload handling.
- Frontend + backend validation.
- Environment-based config via `.env`.

### 2.6 Must-Have Structure & Documentation

- Folder set required: `/css`, `/js`, `/php`, `/api`, `/images`, `/config`.
- Non-monolithic modular architecture.
- `README.md` inside every folder explaining purpose and interactions.

## 3. Content Model and Data Sources

Extracted from project content files:

- Organization name: Unified Nexus.
- Tagline: We Work We Win.
- About and Vision text available.
- Leadership order available (President, Director, Manager in General, Secretary, Treasurer, IT Head, Head of Operation, Head of Discipline and Ethics, Club Ambassador).
- Clubs list available:
  - Music Club
  - Debate Club
  - Charity Club
  - Art and Culture Club
  - Drama Club
  - Research and Presentation Club
  - Student Council
  - Environment Club
  - Literature Club
  - Dance Club
- Benefits list available for About/Why Join section.

Implementation note:

- Executive section display order must follow source order exactly using an explicit `display_order` field in DB.

## 4. Architecture Plan (Target)

### 4.1 Runtime Architecture

- Client SPA renders sections and fetches JSON from API endpoints.
- Public API serves clubs, executive members, and application submission.
- Admin UI (separate route/file) performs authenticated CRUD operations via admin API endpoints.
- PHP service layer performs validation, sanitization, upload checks, and DB operations.
- MySQL stores all persistent data.

### 4.2 Code Architecture Principles

- Separation of concerns:
  - UI components and behaviors in `/js`.
  - visual system in `/css`.
  - request handlers in `/api`.
  - reusable backend utilities in `/php`.
  - environment/bootstrap in `/config`.
- Reusable utility modules for:
  - API client
  - form validation
  - theme management
  - DOM rendering
  - admin auth/session checks

## 5. Planned Folder Structure

```text
unified-nexus/
  index.html
  admin.html
  plan.md
  design-guide.md
  UN.md
  unified-nexus.txt

  css/
    README.md
    variables.css
    base.css
    layout.css
    components.css
    sections.css
    themes.css
    admin.css
    animations.css

  js/
    README.md
    app.js
    router.js
    state.js
    api-client.js
    theme.js
    loader.js
    particles.js
    validators.js
    sections/
      hero.js
      about.js
      clubs.js
      executive.js
      apply.js
    admin/
      auth.js
      clubs-admin.js
      executive-admin.js
      applications-admin.js
      admin-app.js

  api/
    README.md
    public/
      clubs.php
      executive.php
      apply.php
    admin/
      login.php
      logout.php
      clubs-list.php
      clubs-create.php
      clubs-update.php
      clubs-delete.php
      executive-list.php
      executive-create.php
      executive-update.php
      executive-delete.php
      applications-list.php
      applications-delete.php

  php/
    README.md
    bootstrap.php
    env.php
    db.php
    response.php
    sanitizer.php
    validator.php
    upload.php
    auth.php
    repositories/
      clubs-repository.php
      executive-repository.php
      applications-repository.php

  config/
    README.md
    .env.example
    config.php

  images/
    README.md
    branding/
    leadership/
    clubs/
    uploads/
```

## 6. Database Plan

### 6.1 Tables

#### clubs

- id (PK, int, auto increment)
- name (varchar 120, unique)
- description (text)
- theme_motive (text)
- president_name (varchar 120)
- hero_image_path (varchar 255, nullable)
- is_active (tinyint default 1)
- display_order (int default 0)
- created_at (datetime)
- updated_at (datetime)

#### executive_members

- id (PK, int, auto increment)
- full_name (varchar 120)
- role_title (varchar 150)
- photo_path (varchar 255)
- display_order (int, unique by order expectation)
- is_active (tinyint default 1)
- created_at (datetime)
- updated_at (datetime)

#### applications

- id (PK, int, auto increment)
- applicant_name (varchar 120)
- contact_email (varchar 150)
- contact_phone (varchar 30, nullable)
- selected_club_id (int, FK -> clubs.id)
- message (text)
- status (enum: new, reviewed, archived default new)
- submitted_at (datetime)
- ip_hash (char 64, nullable)

### 6.2 Indexing and Integrity

- Index on `clubs.display_order`.
- Index on `executive_members.display_order`.
- Index on `applications.submitted_at`.
- FK with `ON UPDATE CASCADE` and `ON DELETE RESTRICT` for application club linkage.

## 7. API Contract Plan

### 7.1 Public Endpoints

- `GET /api/public/clubs.php`
  - Returns ordered active clubs.
- `GET /api/public/executive.php`
  - Returns ordered active executive members.
- `POST /api/public/apply.php`
  - Accepts application payload.
  - Validates required fields and club existence.

### 7.2 Admin Auth Endpoints

- `POST /api/admin/login.php`
  - Verifies password from `.env`.
  - Starts secure session.
- `POST /api/admin/logout.php`
  - Destroys admin session.

### 7.3 Admin Data Endpoints

- Clubs: list/create/update/delete.
- Executive: list/create/update/delete.
- Applications: list/delete.

### 7.4 Response Standard

- JSON format:
  - `success` (bool)
  - `message` (string)
  - `data` (object|array|null)
  - `errors` (array)

## 8. Frontend Implementation Plan (SPA)

### 8.1 SPA Navigation Strategy

- Single `index.html` with section anchors.
- Smooth scroll and active nav highlighting.
- Lazy render where useful (clubs/executive after fetch).

### 8.2 Section Build Plan

1. Loader

- Curtain animation using CSS keyframes and JS exit trigger after initial data readiness.

2. Hero

- Tagline prominence.
- Background image or simple slider from curated assets.
- Subtle slow particles/shapes (CPU-light, motion-safe).

3. About

- Use official About + Vision text.
- Include values and benefits bullets.
- Support image panel.

4. Clubs

- Dynamic cards from API.
- Card fields: name, description, motive, president.
- Graceful fallback if image unavailable.

5. Executive Team

- Dynamic cards from API.
- Enforce backend order by `display_order`.
- Role and name prominence with clean card layout.

6. Apply

- Fields: name, contact info, selected club, message.
- Client validation and inline errors.
- Success and failure states.

### 8.3 Theme System Plan

- CSS variables in `variables.css` + theme overrides in `themes.css`.
- `data-theme` attribute on root.
- Persist preference in localStorage.
- Accessible contrast verified for both themes.

## 9. Visual System Plan

### 9.1 Required Base Palette Tokens

- `--color-base-1: #57545B`
- `--color-base-2: #716F75`
- `--color-base-3: #959294`
- `--color-base-4: #AAAAAA`
- `--color-accent-1: #7F2B3E`
- `--color-accent-2: #661B28`

### 9.2 Token Categories

- Surface, text, border, accent, muted, success, error tokens.
- Theme-specific token maps for light and dark.
- No component-level hardcoded color values.

### 9.3 Typography and Spacing

- Defined scale for headings/body/captions.
- Tight but breathable spacing rhythm.
- Radius fixed near 2px globally.

## 10. Security and Validation Plan

### 10.1 Backend Security Controls

- PDO prepared statements everywhere.
- Server-side sanitization for all text inputs.
- Strict allowlist checks for enum-like fields.
- CSRF token for admin write endpoints.
- Session hardening:
  - regenerate session ID after login
  - secure cookie flags where possible
  - inactivity timeout

### 10.2 File Upload Security

- MIME and extension validation.
- Max file size limit.
- Randomized file names.
- Store under controlled upload directory.
- Block script execution in upload folder via server rule file.

### 10.3 Frontend Validation

- Required fields, max lengths, format checks.
- Non-blocking UX with inline feedback.
- Backend remains source of truth.

## 11. Delivery Phases and Milestones

### Phase 0: Foundation and Planning

- Confirm architecture, schema, API contracts, and file layout.
- Create all required folders and README files.

Exit criteria:

- Approved structure and plan.

### Phase 1: Core Setup

- Implement config loader, environment parser, DB connection.
- Add shared response/validation/sanitizer utilities.

Exit criteria:

- Backend bootstrap works across endpoints.

### Phase 2: Database and Seed

- Create SQL schema and migration script.
- Seed clubs and executive records from source content.

Exit criteria:

- DB ready with valid initial data and ordering.

### Phase 3: Public API

- Build clubs, executive, apply endpoints.
- Implement full validation + error responses.

Exit criteria:

- Public API tested with valid/invalid payloads.

### Phase 4: Frontend SPA

- Build layout, sections, theme system, loader, particles.
- Connect public API and render dynamic data.

Exit criteria:

- Mobile-first SPA complete with all required sections.

### Phase 5: Admin Panel and CRUD

- Implement secure login/logout.
- Build CRUD for clubs and executive.
- Build application list/delete.

Exit criteria:

- Admin workflow fully operational.

### Phase 6: Hardening and QA

- Security checks, accessibility checks, responsive tests.
- Performance tuning and error-state polishing.

Exit criteria:

- Release candidate approved.

### Phase 7: Documentation and Handover

- Finalize README files in every required folder.
- Add setup, deployment, backup, and maintenance notes.

Exit criteria:

- Team can deploy and maintain without guesswork.

## 12. Testing and QA Plan

### 12.1 Functional Tests

- SPA route/section navigation.
- Clubs and executive data load correctness.
- Form submission success/failure paths.
- Admin CRUD operations and permissions.

### 12.2 Security Tests

- SQL injection attempts.
- Invalid upload attempts.
- Unauthorized admin endpoint access.
- Input edge cases and malformed payloads.

### 12.3 UX/Responsive Tests

- Mobile widths first, then tablet and desktop.
- Theme switch persistence and contrast.
- Animation smoothness on low-mid devices.

## 13. Risks and Mitigations

- Risk: content/order mismatch for executive cards.
  - Mitigation: explicit `display_order` and seed script.
- Risk: upload vulnerabilities.
  - Mitigation: strict upload validator and directory hardening.
- Risk: inconsistent theming.
  - Mitigation: centralized design tokens only.
- Risk: performance drops from effects.
  - Mitigation: lightweight particles and reduced-motion fallback.

## 14. Definition of Done

Project is considered complete when all are true:

- All required SPA sections are implemented and polished.
- Light and dark themes are fully functional and accessible.
- Public API + admin API function with secure validation.
- Admin authentication and CRUD are complete.
- MySQL schema and seed data are integrated.
- Folder structure requirements are fully met.
- Every required folder contains a README.
- No inline CSS, no hardcoded design constants outside token/config files.
- End-to-end flows tested on mobile and desktop.

## 15. Immediate Next Execution Steps

1. Create required folders and README stubs.
2. Build config/bootstrap and DB connection modules.
3. Add schema SQL + seed data for clubs and executive order.
4. Implement public API endpoints.
5. Implement SPA shell and section modules.
6. Implement admin auth and CRUD modules.
7. Run QA hardening and finalize docs.
