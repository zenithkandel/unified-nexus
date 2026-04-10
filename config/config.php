<?php
declare(strict_types=1);

require_once __DIR__ . '/../php/env.php';

$envPath = __DIR__ . '/.env';
$exampleEnvPath = __DIR__ . '/.env.example';

if (file_exists($envPath)) {
	env_load($envPath);
} elseif (file_exists($exampleEnvPath)) {
	env_load($exampleEnvPath);
}

return [
	'app' => [
		'env' => (string) env_value('APP_ENV', 'production'),
		'debug' => env_value('APP_DEBUG', '0') === '1',
		'url' => (string) env_value('APP_URL', 'http://localhost/unified-nexus'),
	],
	'db' => [
		'host' => (string) env_value('DB_HOST', '127.0.0.1'),
		'port' => (int) env_value('DB_PORT', '3306'),
		'name' => (string) env_value('DB_NAME', 'unified_nexus'),
		'user' => (string) env_value('DB_USER', 'root'),
		'pass' => (string) env_value('DB_PASS', ''),
		'charset' => (string) env_value('DB_CHARSET', 'utf8mb4'),
	],
	'security' => [
		'admin_password_hash' => (string) env_value('ADMIN_PASSWORD_HASH', ''),
		'session_timeout_seconds' => (int) env_value('SESSION_TIMEOUT_SECONDS', '3600'),
	],
	'uploads' => [
		'max_bytes' => (int) env_value('UPLOAD_MAX_BYTES', '2097152'),
		'allowed_mimes' => [
			'image/jpeg',
			'image/png',
			'image/webp',
		],
	],
];

