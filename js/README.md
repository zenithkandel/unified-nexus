# JS Folder

Purpose:
- Contains frontend SPA logic, state, rendering, validation, and admin client-side modules.

Files:
- app.js: Public SPA entry and orchestration.
- router.js: Anchor navigation and active section behavior.
- state.js: Shared state for clubs/executive/theme.
- api-client.js: Fetch helpers for API communication.
- theme.js: Theme initialization and toggling.
- loader.js: Loading screen control.
- particles.js: Subtle animated background effects.
- validators.js: Client-side form validators.

Subfolders:
- sections/: Rendering modules for each public section.
- admin/: Admin panel modules.

Interaction:
- app.js composes section modules and utilities.
