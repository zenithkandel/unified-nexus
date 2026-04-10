<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/executive-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();
auth_require_csrf_or_403($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null);

$errors = [];
$memberId = validate_integer_id('Member ID', $_POST['id'] ?? null, $errors);
$fullName = sanitize_text($_POST['full_name'] ?? '');
$roleTitle = sanitize_text($_POST['role_title'] ?? '');
$displayOrder = filter_var($_POST['display_order'] ?? null, FILTER_VALIDATE_INT);
$isActive = !empty($_POST['is_active']) ? 1 : 0;
$photoPath = sanitize_text($_POST['photo_path'] ?? '');

validate_required('Full name', $fullName, $errors);
validate_required('Role title', $roleTitle, $errors);
if ($displayOrder === false) {
    $errors[] = 'Display order must be an integer.';
}

if (isset($_FILES['photo']) && (int) ($_FILES['photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $validation = upload_validate_image($_FILES['photo'], app_config()['uploads']);
    if (!$validation['ok']) {
        $errors = array_merge($errors, $validation['errors']);
    }
}

if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    if (isset($_FILES['photo']) && (int) ($_FILES['photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $uploadDir = __DIR__ . '/../../images/uploads';
        $fileName = upload_store_file($_FILES['photo'], $uploadDir, 'exec_');
        $photoPath = 'images/uploads/' . $fileName;
    }

    $updated = executive_update(app_db(), (int) $memberId, [
        'full_name' => $fullName,
        'role_title' => $roleTitle,
        'photo_path' => $photoPath,
        'display_order' => (int) $displayOrder,
        'is_active' => $isActive,
    ]);

    if (!$updated) {
        json_error('Update failed.', ['Executive member not found or no changes made.'], 404);
    }

    json_success('Executive member updated successfully.', ['photo_path' => $photoPath]);
} catch (Throwable $exception) {
    json_error('Failed to update executive member.', [$exception->getMessage()], 500);
}

