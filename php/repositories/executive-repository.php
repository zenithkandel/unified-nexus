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

function executive_get_all(PDO $pdo): array
{
    $stmt = $pdo->prepare(
        'SELECT id, full_name, role_title, photo_path, display_order, is_active
         FROM executive_members
         ORDER BY display_order ASC, id ASC'
    );
    $stmt->execute();
    return $stmt->fetchAll();
}

function executive_create(PDO $pdo, array $payload): int
{
    $stmt = $pdo->prepare(
        'INSERT INTO executive_members (
            full_name,
            role_title,
            photo_path,
            display_order,
            is_active,
            created_at,
            updated_at
        ) VALUES (
            :full_name,
            :role_title,
            :photo_path,
            :display_order,
            :is_active,
            NOW(),
            NOW()
        )'
    );

    $stmt->execute([
        ':full_name' => $payload['full_name'],
        ':role_title' => $payload['role_title'],
        ':photo_path' => $payload['photo_path'],
        ':display_order' => $payload['display_order'],
        ':is_active' => $payload['is_active'],
    ]);

    return (int) $pdo->lastInsertId();
}

function executive_update(PDO $pdo, int $memberId, array $payload): bool
{
    $stmt = $pdo->prepare(
        'UPDATE executive_members
         SET
            full_name = :full_name,
            role_title = :role_title,
            photo_path = :photo_path,
            display_order = :display_order,
            is_active = :is_active,
            updated_at = NOW()
         WHERE id = :id'
    );

    $stmt->execute([
        ':id' => $memberId,
        ':full_name' => $payload['full_name'],
        ':role_title' => $payload['role_title'],
        ':photo_path' => $payload['photo_path'],
        ':display_order' => $payload['display_order'],
        ':is_active' => $payload['is_active'],
    ]);

    return $stmt->rowCount() > 0;
}

function executive_delete(PDO $pdo, int $memberId): bool
{
    $stmt = $pdo->prepare('DELETE FROM executive_members WHERE id = :id');
    $stmt->execute([':id' => $memberId]);
    return $stmt->rowCount() > 0;
}

