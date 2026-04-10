<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/applications-repository.php';

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
$applicationId = validate_integer_id('Application ID', $payload['id'] ?? null, $errors);
if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    $deleted = applications_delete(app_db(), (int) $applicationId);
    if (!$deleted) {
        json_error('Delete failed.', ['Application not found.'], 404);
    }
    json_success('Application deleted successfully.');
} catch (Throwable $exception) {
    json_error('Failed to delete application.', [$exception->getMessage()], 500);
}

