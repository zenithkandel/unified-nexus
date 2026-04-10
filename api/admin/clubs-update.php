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
$name = sanitize_text($payload['name'] ?? '');
$description = sanitize_text($payload['description'] ?? '');
$motive = sanitize_text($payload['theme_motive'] ?? '');
$president = sanitize_text($payload['president_name'] ?? '');
$heroImagePath = sanitize_text($payload['hero_image_path'] ?? '');
$isActive = !empty($payload['is_active']) ? 1 : 0;
$displayOrder = filter_var($payload['display_order'] ?? null, FILTER_VALIDATE_INT);

validate_required('Name', $name, $errors);
validate_required('Description', $description, $errors);
validate_required('Theme motive', $motive, $errors);
validate_required('President name', $president, $errors);

if ($displayOrder === false) {
    $errors[] = 'Display order must be an integer.';
}

if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    $updated = clubs_update(app_db(), (int) $clubId, [
        'name' => $name,
        'description' => $description,
        'theme_motive' => $motive,
        'president_name' => $president,
        'hero_image_path' => $heroImagePath !== '' ? $heroImagePath : null,
        'is_active' => $isActive,
        'display_order' => (int) $displayOrder,
    ]);

    if (!$updated) {
        json_error('Update failed.', ['Club not found or no changes made.'], 404);
    }

    json_success('Club updated successfully.');
} catch (Throwable $exception) {
    json_error('Failed to update club.', [$exception->getMessage()], 500);
}

