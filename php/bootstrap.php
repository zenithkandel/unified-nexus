<?php
declare(strict_types=1);

header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: strict-origin-when-cross-origin');

require_once __DIR__ . '/env.php';
require_once __DIR__ . '/db.php';
require_once __DIR__ . '/response.php';
require_once __DIR__ . '/sanitizer.php';
require_once __DIR__ . '/validator.php';
require_once __DIR__ . '/upload.php';
require_once __DIR__ . '/auth.php';

$config = require __DIR__ . '/../config/config.php';

if (!function_exists('app_config')) {
    function app_config(): array
    {
        global $config;
        return $config;
    }
}

if (!function_exists('app_db')) {
    function app_db(): PDO
    {
        static $pdo = null;
        if ($pdo instanceof PDO) {
            return $pdo;
        }
        $pdo = db_connect(app_config()['db']);
        return $pdo;
    }
}

