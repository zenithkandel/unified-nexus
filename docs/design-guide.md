You are a senior-level full-stack engineer, UI/UX designer, and system architect.

Your task is to design and build a production-grade, scalable, and modular SPA website for a real-world student-led organization called Unified Nexus (UN).

You MUST follow every instruction strictly and completely.
Do NOT skip, simplify, or ignore any requirement.

🧠 1. PROJECT CONTEXT
Organization: Unified Nexus

Tagline: We Work We Win

Unified Nexus is a student-led creative platform that fosters:

Creativity
Collaboration
Expression
Leadership
Social impact

It includes multiple clubs (music, debate, charity, etc.) and a leadership team.

👉 You MUST incorporate ALL provided content meaningfully into the UI.

🎯 2. OBJECTIVE

Build a fully functional website (frontend + backend) with:

SPA architecture
Professional, premium feel
Mobile-first UX
Clean, modular, scalable codebase
Real backend (PHP + MySQL)

This is a real-world production project, NOT a demo.

🧱 3. TECH STACK (STRICT)

You MUST use:

HTML5
CSS3 (NO inline CSS)
Vanilla JavaScript (or lightweight libraries if necessary)
PHP (backend)
MySQL (database)

Allowed:

Libraries (ONLY if justified and lightweight)
No heavy frameworks unless absolutely necessary
🎨 4. DESIGN SYSTEM (VERY STRICT)
🎨 Color Palette (MANDATORY USE)

You MUST use these colors and derive shades:

#57545B
#716F75
#959294
#AAAAAA
#7F2B3E
#661B28
Rules:
Define ALL colors as global CSS variables
NEVER hardcode colors directly in components
Use mostly:
Muted tones
Black/white base
Subtle accent usage (especially maroon tones)
🧩 Visual Style

STRICT requirements:

Minimalistic
Flat design (NO excessive gradients)
Premium matte feel
Classic / slightly old-school aesthetic
Avoid “AI-generated” look
Avoid flashy or childish UI
UI Details:
Border radius: ~2px (VERY subtle)
Clean spacing
Strong typography hierarchy
Sharp edges
Subtle shadows ONLY when necessary
📱 UX PRIORITY (CRITICAL)
Mobile-first design (START FROM SMALL SCREENS)
Smooth navigation
Clear user intent flows
Primary User Goals:
Understand what Unified Nexus is
Explore clubs
View leadership
Apply to join

👉 UX must directly support these goals.

🌗 5. THEME SYSTEM

You MUST implement:

Light mode
Dark mode

Requirements:

No contrast issues
Maintain premium feel in BOTH modes
Use CSS variables for theme switching
Smooth transition between themes
🧩 6. WEBSITE STRUCTURE (SPA)

You MUST implement the following sections:

1. Loading Screen
   Curtain-style opening animation
   Smooth and premium
   Not overdone
2. Hero Section
   Tagline: We Work We Win
   Background:
   Image OR slider
   Include:
   Subtle animated particles / shapes (slow movement)
   Strong typography
3. About Section
   Organization description
   Vision
   Bullets + paragraphs
   Include relevant imagery
4. Clubs Section

For EACH club:

Name
Description
Theme/motive
Club President (dynamic from backend) 5. Executive Team Section
Cards with:
Image
Name
Position
MUST follow given order 6. Apply Section
Form with:
Name
Contact info
Selected club
Message
Clean UX
Validation required
🛠️ 7. BACKEND SYSTEM (CRITICAL)
Admin Panel (Password Protected)
Password stored in .env
Secure login system
Database (MySQL)

You MUST design schema properly.

Required Tables:
clubs
executive_members
applications
Admin Features (FULL CRUD)

Admin must be able to:

Clubs:
Create
Read
Update
Delete
Executive Team:
Manage members (image, name, role)
Applications:
View submissions
Delete if needed
🔐 Security (STRICT)

You MUST implement:

Input sanitization
Prepared statements (NO SQL injection)
Secure file uploads
Validation on both frontend + backend
Environment-based configs (.env)
📁 8. PROJECT STRUCTURE (MANDATORY)

You MUST structure project like:

/css
/js
/php
/api
/images
/config

Rules:

No monolithic files
Modular architecture
Reusable components
📄 Documentation Requirement

Inside EVERY folder:

Create README.md
Explain:
Purpose of each file
How components interact
⚙️ 9. CODE QUALITY RULES
No inline CSS
No hardcoded values (use variables/configs)
Clean naming conventions
Comment important logic ONLY (avoid clutter)
Scalable structure
🎯 10. OUTPUT REQUIREMENT

You MUST:

Plan architecture FIRST
Show folder structure
Then implement step-by-step:
Frontend
Backend
Database schema
Provide COMPLETE working code (copy-paste ready)
Ensure everything integrates properly
⚠️ 11. STRICT BEHAVIOR RULES
DO NOT skip any section
DO NOT simplify requirements
DO NOT assume missing details — ask if unclear
DO NOT produce low-quality UI
DO NOT generate generic templates

You must behave like a top-tier engineer delivering a real client project.

❓ 12. BEFORE STARTING

Ask questions IF AND ONLY IF something is unclear.
Otherwise, proceed directly with full implementation.
