<?php
declare(strict_types=1);

function upload_validate_image(array $file, array $uploadConfig): array
{
	$errors = [];
	if (!isset($file['error']) || is_array($file['error'])) {
		$errors[] = 'Invalid upload payload.';
		return ['ok' => false, 'errors' => $errors];
	}

	if ($file['error'] !== UPLOAD_ERR_OK) {
		$errors[] = 'Upload failed with error code ' . $file['error'] . '.';
	}

	$maxBytes = (int) ($uploadConfig['max_bytes'] ?? 2097152);
	if (($file['size'] ?? 0) > $maxBytes) {
		$errors[] = 'File exceeds allowed size.';
	}

	$finfo = new finfo(FILEINFO_MIME_TYPE);
	$mime = $finfo->file($file['tmp_name']);
	$allowed = $uploadConfig['allowed_mimes'] ?? [];
	if (!in_array($mime, $allowed, true)) {
		$errors[] = 'Unsupported file type.';
	}

	if ($errors !== []) {
		return ['ok' => false, 'errors' => $errors];
	}

	return ['ok' => true, 'mime' => $mime, 'errors' => []];
}

function upload_store_file(array $file, string $targetDir, string $prefix = 'img_'): string
{
	if (!is_dir($targetDir)) {
		mkdir($targetDir, 0755, true);
	}

	$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
	$safeExt = preg_replace('/[^a-z0-9]/', '', $extension) ?: 'dat';
	$filename = $prefix . bin2hex(random_bytes(16)) . '.' . $safeExt;
	$targetPath = rtrim($targetDir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . $filename;

	if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
		throw new RuntimeException('Failed to store uploaded file.');
	}

	return $filename;
}

