# Unified Nexus Execution TODO

This TODO follows `plan.md` and is split into two delivery halves.

## Session Scope (Half 1 Only)
Complete foundation through public-facing backend and initial SPA integration baseline.

## Half 1: Foundation + Public Platform Baseline

### A. Planning and Structure
- [x] Confirm requirements and architecture from `plan.md`.
- [ ] Create mandatory directory structure:
  - [ ] `css/`
  - [ ] `js/`
  - [ ] `php/`
  - [ ] `api/`
  - [ ] `images/`
  - [ ] `config/`
- [ ] Add required subfolders (`js/sections`, `js/admin`, `api/public`, `api/admin`, `php/repositories`, image subfolders).
- [ ] Add `README.md` inside every top-level required folder and key subfolders.

### B. Configuration and Core Backend
- [ ] Create `.env.example` with required keys.
- [ ] Implement config loader (`config/config.php`).
- [ ] Implement environment parser (`php/env.php`).
- [ ] Implement DB connector (`php/db.php`) with PDO best practices.
- [ ] Implement shared bootstrap (`php/bootstrap.php`).
- [ ] Implement JSON response helper (`php/response.php`).
- [ ] Implement sanitization helper (`php/sanitizer.php`).
- [ ] Implement validation helper (`php/validator.php`).
- [ ] Implement upload security helper (`php/upload.php`) for future admin uploads.
- [ ] Implement auth/session helper (`php/auth.php`) baseline for upcoming admin work.

### C. Data Layer and SQL
- [ ] Add SQL schema file for required tables and indexes.
- [ ] Add SQL seed file with:
  - [ ] Club seed records.
  - [ ] Executive order seed records.
- [ ] Build repositories:
  - [ ] clubs repository
  - [ ] executive repository
  - [ ] applications repository

### D. Public API (Required in First Half)
- [ ] `GET /api/public/clubs.php`
- [ ] `GET /api/public/executive.php`
- [ ] `POST /api/public/apply.php`
- [ ] Ensure strict input validation and prepared statements.
- [ ] Ensure consistent JSON response format.

### E. Frontend Baseline (First-Half Extent)
- [ ] Build SPA shell (`index.html`) with required section anchors.
- [ ] Implement CSS token system and theme foundation using required palette.
- [ ] Implement loader scaffold and initial animation hooks.
- [ ] Implement JS app entry, API client, theme toggle, and validators.
- [ ] Render clubs and executive from API.
- [ ] Wire apply form submit flow.

### F. Half-1 Verification
- [ ] Validate endpoint responses for success and failure paths.
- [ ] Validate mobile-first layout at small viewport.
- [ ] Validate light/dark token switching.
- [ ] Validate no inline CSS usage.
- [ ] Confirm all required top-level folder READMEs exist.

## Half 2: Remaining Work (Deferred)
- [ ] Admin login/logout endpoints and admin UI.
- [ ] Admin full CRUD for clubs.
- [ ] Admin executive management with secure uploads.
- [ ] Admin applications view/delete.
- [ ] CSRF and deeper session hardening in admin write flows.
- [ ] Visual polish pass (particles, final typography tuning, section refinements).
- [ ] Final documentation hardening and deployment notes.
- [ ] Full QA and release readiness checklist.

## “Half Done” Definition for This Session
The session is considered complete when all items in sections A through F are implemented and verified at a practical baseline level, without starting admin CRUD UI flows.
