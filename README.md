# Unified Nexus Platform

Unified Nexus is a student-led platform built to highlight creativity, expression, and collaboration. This repository holds the entire platform's source code.

## System Architecture

The Unified Nexus system follows a modern Vanilla JavaScript Single Page Application (SPA) architecture combined with a minimal PHP/PDO proxy-backend.

1. **Frontend Landing (index.html)**: Features Three.js particle backgrounds, lightweight GSAP-like vanilla CSS animations, and a responsive application form (js/sections/apply.js).
2. **Admin SPA (dmin/index.html)**: A highly polished, performant dashboard with Linear/Vercel-inspired dark/light theming. Handles comprehensive Club, Executive, and Member Application management using AJAX etch() wrappers.
3. **Backend API (pi/)**: Small, modular PHP scripts returning strict JSON schemas ({"success": bool, "data": []}). Secured via robust CSRF, modern sanitization classes, and JWT/Session strategies.
4. **Database Repositories (php/repositories/)**: Data interactions are completely abstracted into repository classes ensuring that raw SQL queries never pollute endpoint files.

## Local Setup

- Install a local server (XAMPP).
- Initialize your database using the provided database/schema.sql.
- Copy or link this repo inside htdocs/unified-nexus.
- Access \http://localhost/unified-nexus/\.
