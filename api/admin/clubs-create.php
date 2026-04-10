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

$name = sanitize_text($_POST['name'] ?? '');
$description = sanitize_text($_POST['description'] ?? '');
$motive = sanitize_text($_POST['theme_motive'] ?? '');
$president = sanitize_text($_POST['president_name'] ?? '');
$heroImagePath = sanitize_text($_POST['hero_image_path'] ?? '');
$isActive = !empty($_POST['is_active']) ? 1 : 0;
$displayOrder = filter_var($_POST['display_order'] ?? null, FILTER_VALIDATE_INT);

$errors = [];
validate_required('Name', $name, $errors);
validate_required('Description', $description, $errors);
validate_required('Theme motive', $motive, $errors);
validate_required('President name', $president, $errors);
validate_max_length('Name', $name, 120, $errors);
validate_max_length('Description', $description, 3000, $errors);
validate_max_length('Theme motive', $motive, 3000, $errors);
validate_max_length('President name', $president, 120, $errors);

if ($displayOrder === false) {
    $errors[] = 'Display order must be an integer.';
}

if (isset($_FILES['hero_image']) && (int) ($_FILES['hero_image']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $validation = upload_validate_image($_FILES['hero_image'], app_config()['uploads']);
    if (!$validation['ok']) {
        $errors = array_merge($errors, $validation['errors']);
    }
}

if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    if (isset($_FILES['hero_image']) && (int) ($_FILES['hero_image']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $uploadDir = __DIR__ . '/../../images/uploads';
        $fileName = upload_store_file($_FILES['hero_image'], $uploadDir, 'club_');
        $heroImagePath = 'images/uploads/' . $fileName;
    }

    $id = clubs_create(app_db(), [
        'name' => $name,
        'description' => $description,
        'theme_motive' => $motive,
        'president_name' => $president,
        'hero_image_path' => $heroImagePath !== '' ? $heroImagePath : null,
        'is_active' => $isActive,
        'display_order' => (int) $displayOrder,
    ]);

    json_success('Club created successfully.', ['id' => $id, 'hero_image_path' => $heroImagePath], 201);
} catch (Throwable $exception) {
    json_error('Failed to create club.', [$exception->getMessage()], 500);
}

