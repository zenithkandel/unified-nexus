<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/clubs-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();
auth_require_csrf_or_403($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null);

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);
if (!is_array($payload)) {
    json_error('Invalid JSON payload.', ['Malformed request body.'], 422);
}

$errors = [];
$clubId = validate_integer_id('Club ID', $payload['id'] ?? null, $errors);
if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    $deleted = clubs_delete(app_db(), (int) $clubId);
    if (!$deleted) {
        json_error('Delete failed.', ['Club not found.'], 404);
    }
    json_success('Club deleted successfully.');
} catch (Throwable $exception) {
    json_error('Failed to delete club.', [$exception->getMessage()], 500);
}

