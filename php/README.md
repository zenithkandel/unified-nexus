# PHP Folder

Purpose:
- Shared backend logic used by all API endpoints.

Files:
- bootstrap.php: Common initialization and dependency wiring.
- env.php: Environment file parsing.
- db.php: PDO connection factory.
- response.php: Standard JSON responses.
- sanitizer.php: Input sanitization helpers.
- validator.php: Input validation helpers.
- upload.php: Secure upload helper functions.
- auth.php: Admin auth/session helpers.

Subfolders:
- repositories/: Data access modules for each table domain.

Interaction:
- API endpoints include bootstrap and call repositories/helpers.
