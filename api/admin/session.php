<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

json_success('Session active.', [
    'csrfToken' => $_SESSION['csrf_token'],
    'authenticatedAt' => $_SESSION['authenticated_at'] ?? time(),
]);
