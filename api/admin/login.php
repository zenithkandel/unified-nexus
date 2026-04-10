<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);
if (!is_array($payload)) {
    json_error('Invalid JSON payload.', ['Malformed request body.'], 422);
}

$password = sanitize_text($payload['password'] ?? '');
if ($password === '') {
    json_error('Validation failed.', ['Password is required.'], 422);
}

if (!auth_attempt_login($password, app_config())) {
    json_error('Authentication failed.', ['Invalid admin credentials.'], 401);
}

json_success('Login successful.', [
    'csrfToken' => $_SESSION['csrf_token'] ?? '',
    'authenticatedAt' => $_SESSION['authenticated_at'] ?? time(),
]);

