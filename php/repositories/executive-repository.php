<?php
declare(strict_types=1);

function executive_get_all_active(PDO $pdo): array
{
    $stmt = $pdo->prepare(
        'SELECT id, full_name, role_title, photo_path, display_order
		 FROM executive_members
		 WHERE is_active = 1
		 ORDER BY display_order ASC, id ASC'
    );
    $stmt->execute();
    return $stmt->fetchAll();
}

