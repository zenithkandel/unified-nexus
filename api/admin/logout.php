<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_logout();

json_success('Logout successful.');

