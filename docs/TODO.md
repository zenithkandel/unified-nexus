# Unified Nexus Execution TODO

This TODO follows `plan.md` and is split into two delivery halves.

## Session Scope (Half 1 Only)

Complete foundation through public-facing backend and initial SPA integration baseline.

## Half 1: Foundation + Public Platform Baseline

### A. Planning and Structure

- [x] Confirm requirements and architecture from `plan.md`.
- [x] Create mandatory directory structure:
  - [x] `css/`
  - [x] `js/`
  - [x] `php/`
  - [x] `api/`
  - [x] `images/`
  - [x] `config/`
- [x] Add required subfolders (`js/sections`, `js/admin`, `api/public`, `api/admin`, `php/repositories`, image subfolders).
- [x] Add `README.md` inside every top-level required folder and key subfolders.

### B. Configuration and Core Backend

- [x] Create `.env.example` with required keys.
- [x] Implement config loader (`config/config.php`).
- [x] Implement environment parser (`php/env.php`).
- [x] Implement DB connector (`php/db.php`) with PDO best practices.
- [x] Implement shared bootstrap (`php/bootstrap.php`).
- [x] Implement JSON response helper (`php/response.php`).
- [x] Implement sanitization helper (`php/sanitizer.php`).
- [x] Implement validation helper (`php/validator.php`).
- [x] Implement upload security helper (`php/upload.php`) for future admin uploads.
- [x] Implement auth/session helper (`php/auth.php`) baseline for upcoming admin work.

### C. Data Layer and SQL

- [x] Add SQL schema file for required tables and indexes.
- [x] Add SQL seed file with:
  - [x] Club seed records.
  - [x] Executive order seed records.
- [x] Build repositories:
  - [x] clubs repository
  - [x] executive repository
  - [x] applications repository

### D. Public API (Required in First Half)

- [x] `GET /api/public/clubs.php`
- [x] `GET /api/public/executive.php`
- [x] `POST /api/public/apply.php`
- [x] Ensure strict input validation and prepared statements.
- [x] Ensure consistent JSON response format.

### E. Frontend Baseline (First-Half Extent)

- [x] Build SPA shell (`index.html`) with required section anchors.
- [x] Implement CSS token system and theme foundation using required palette.
- [x] Implement loader scaffold and initial animation hooks.
- [x] Implement JS app entry, API client, theme toggle, and validators.
- [x] Render clubs and executive from API.
- [x] Wire apply form submit flow.

### F. Half-1 Verification

- [ ] Validate endpoint responses for success and failure paths.
- [ ] Validate mobile-first layout at small viewport.
- [ ] Validate light/dark token switching.
- [x] Validate no inline CSS usage.
- [x] Confirm all required top-level folder READMEs exist.

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
