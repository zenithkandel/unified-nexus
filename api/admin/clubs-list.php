<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/clubs-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();

try {
	$rows = clubs_get_all(app_db());
	json_success('Clubs fetched successfully.', $rows);
} catch (Throwable $exception) {
	json_error('Failed to fetch clubs.', [$exception->getMessage()], 500);
}

