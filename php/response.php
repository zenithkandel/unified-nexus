<?php
declare(strict_types=1);

function json_response(int $statusCode, bool $success, string $message, mixed $data = null, array $errors = []): void
{
	http_response_code($statusCode);
	header('Content-Type: application/json; charset=utf-8');

	echo json_encode([
		'success' => $success,
		'message' => $message,
		'data' => $data,
		'errors' => $errors,
	], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
	exit;
}

function json_success(string $message, mixed $data = null, int $statusCode = 200): void
{
	json_response($statusCode, true, $message, $data, []);
}

function json_error(string $message, array $errors = [], int $statusCode = 400): void
{
	json_response($statusCode, false, $message, null, $errors);
}

