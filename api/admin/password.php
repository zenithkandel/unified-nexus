<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';

auth_require_admin_or_401();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);
if (!is_array($payload)) {
    json_error('Invalid JSON payload.', ['Malformed request body.'], 422);
}

auth_require_csrf_or_403($payload['csrf'] ?? null);

$currentPassword = sanitize_text($payload['current_password'] ?? '');
$newPassword = sanitize_text($payload['new_password'] ?? '');

if ($currentPassword === '' || $newPassword === '') {
    json_error('Validation failed.', ['Both current and new passwords are required.'], 422);
}

$config = app_config();
$hash = (string) ($config['security']['admin_password_hash'] ?? '');

if (!password_verify($currentPassword, $hash)) {
    json_error('Unauthorized.', ['Incorrect current password.'], 401);
}

$newHash = password_hash($newPassword, PASSWORD_ARGON2I);

// Update .env file
$envPath = __DIR__ . '/../../config/.env';
if (!file_exists($envPath)) {
    json_error('Configuration Error', ['The .env file does not exist.'], 500);
}

$lines = file($envPath);
$found = false;
foreach ($lines as &$line) {
    if (str_starts_with(trim($line), 'ADMIN_PASSWORD_HASH=')) {
        $line = 'ADMIN_PASSWORD_HASH="' . $newHash . '"' . PHP_EOL;
        $found = true;
        break;
    }
}

if (!$found) {
    $lines[] = 'ADMIN_PASSWORD_HASH="' . $newHash . '"' . PHP_EOL;
}

file_put_contents($envPath, implode('', $lines));

json_success('Password updated successfully.', []);
