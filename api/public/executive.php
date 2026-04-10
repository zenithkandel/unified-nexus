<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/executive-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Method not allowed.', [], 405);
}

try {
    $executive = executive_get_all_active(app_db());
    json_success('Executive members fetched successfully.', $executive);
} catch (Throwable $exception) {
    json_error('Failed to fetch executive members.', [$exception->getMessage()], 500);
}

