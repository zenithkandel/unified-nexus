<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';
require_once __DIR__ . '/../../php/repositories/applications-repository.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
	json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();

try {
	$rows = applications_get_all(app_db());
	json_success('Applications fetched successfully.', $rows);
} catch (Throwable $exception) {
	json_error('Failed to fetch applications.', [$exception->getMessage()], 500);
}

