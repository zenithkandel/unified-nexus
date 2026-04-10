<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/clubs-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Method not allowed.', [], 405);
}

try {
    $clubs = clubs_get_all_active(app_db());
    json_success('Clubs fetched successfully.', $clubs);
} catch (Throwable $exception) {
    json_error('Failed to fetch clubs.', [$exception->getMessage()], 500);
}

