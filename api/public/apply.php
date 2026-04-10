<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/clubs-repository.php';
require_once __DIR__ . '/../../php/repositories/applications-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);

if (!is_array($payload)) {
    json_error('Invalid JSON payload.', ['Malformed request body.'], 422);
}

$name = sanitize_text($payload['name'] ?? '');
$email = sanitize_email($payload['email'] ?? '');
$phone = sanitize_phone($payload['phone'] ?? '');
$clubId = $payload['clubId'] ?? null;
$message = sanitize_text($payload['message'] ?? '');

$errors = [];
validate_required('Name', $name, $errors);
validate_required('Email', $email, $errors);
validate_email_format('Email', $email, $errors);
validate_required('Message', $message, $errors);
validate_max_length('Name', $name, 120, $errors);
validate_max_length('Email', $email, 150, $errors);
validate_max_length('Phone', $phone, 30, $errors);
validate_max_length('Message', $message, 1500, $errors);

$validatedClubId = validate_integer_id('Selected club', $clubId, $errors);

if ($errors !== []) {
    json_error('Validation failed.', $errors, 422);
}

try {
    $pdo = app_db();
    if ($validatedClubId === null || !clubs_exists($pdo, $validatedClubId)) {
        json_error('Validation failed.', ['Selected club is invalid.'], 422);
    }

    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    $ipHash = $ipAddress !== '' ? hash('sha256', $ipAddress) : null;

    $applicationId = applications_create($pdo, [
        'applicant_name' => $name,
        'contact_email' => $email,
        'contact_phone' => $phone !== '' ? $phone : null,
        'selected_club_id' => $validatedClubId,
        'message' => $message,
        'status' => 'new',
        'ip_hash' => $ipHash,
    ]);

    json_success('Application submitted successfully.', ['id' => $applicationId], 201);
} catch (Throwable $exception) {
    json_error('Failed to submit application.', [$exception->getMessage()], 500);
}

