<?php
declare(strict_types=1);

require_once __DIR__ . '/../../php/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed.', [], 405);
}

auth_start_session(app_config());
auth_require_admin_or_401();
auth_require_csrf_or_403($_SERVER['HTTP_X_CSRF_TOKEN'] ?? null);

$raw = file_get_contents('php://input');
$payload = json_decode($raw ?: '{}', true);

if (!isset($payload['order']) || !is_array($payload['order'])) {
    json_error('Invalid payload. Expected an array of IDs.', [], 422);
}

try {
    $pdo = app_db();
    $pdo->beginTransaction();
    $stmt = $pdo->prepare('UPDATE executive_members SET display_order = :order WHERE id = :id');
    
    foreach ($payload['order'] as $index => $id) {
        $stmt->execute([':order' => $index + 1, ':id' => (int)$id]);
    }
    
    $pdo->commit();
    json_success('Order updated successfully.');
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    json_error('Failed to update order.', [$e->getMessage()], 500);
}