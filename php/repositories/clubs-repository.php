<?php
declare(strict_types=1);

function clubs_get_all_active(PDO $pdo): array
{
    $stmt = $pdo->prepare(
        'SELECT id, name, description, theme_motive, president_name, hero_image_path, display_order
		 FROM clubs
		 WHERE is_active = 1
		 ORDER BY display_order ASC, id ASC'
    );
    $stmt->execute();
    return $stmt->fetchAll();
}

function clubs_exists(PDO $pdo, int $clubId): bool
{
    $stmt = $pdo->prepare('SELECT id FROM clubs WHERE id = :id AND is_active = 1 LIMIT 1');
    $stmt->execute([':id' => $clubId]);
    return (bool) $stmt->fetchColumn();
}

function clubs_get_all(PDO $pdo): array
{
    $stmt = $pdo->prepare(
        'SELECT id, name, description, theme_motive, president_name, hero_image_path, is_active, display_order
         FROM clubs
         ORDER BY display_order ASC, id ASC'
    );
    $stmt->execute();
    return $stmt->fetchAll();
}

function clubs_create(PDO $pdo, array $payload): int
{
    $stmt = $pdo->prepare(
        'INSERT INTO clubs (
            name,
            description,
            theme_motive,
            president_name,
            hero_image_path,
            is_active,
            display_order,
            created_at,
            updated_at
        ) VALUES (
            :name,
            :description,
            :theme_motive,
            :president_name,
            :hero_image_path,
            :is_active,
            :display_order,
            NOW(),
            NOW()
        )'
    );

    $stmt->execute([
        ':name' => $payload['name'],
        ':description' => $payload['description'],
        ':theme_motive' => $payload['theme_motive'],
        ':president_name' => $payload['president_name'],
        ':hero_image_path' => $payload['hero_image_path'],
        ':is_active' => $payload['is_active'],
        ':display_order' => $payload['display_order'],
    ]);

    return (int) $pdo->lastInsertId();
}

function clubs_update(PDO $pdo, int $clubId, array $payload): bool
{
    $stmt = $pdo->prepare(
        'UPDATE clubs
         SET
            name = :name,
            description = :description,
            theme_motive = :theme_motive,
            president_name = :president_name,
            hero_image_path = :hero_image_path,
            is_active = :is_active,
            display_order = :display_order,
            updated_at = NOW()
         WHERE id = :id'
    );

    $stmt->execute([
        ':id' => $clubId,
        ':name' => $payload['name'],
        ':description' => $payload['description'],
        ':theme_motive' => $payload['theme_motive'],
        ':president_name' => $payload['president_name'],
        ':hero_image_path' => $payload['hero_image_path'],
        ':is_active' => $payload['is_active'],
        ':display_order' => $payload['display_order'],
    ]);

    return $stmt->rowCount() > 0;
}

function clubs_delete(PDO $pdo, int $clubId): bool
{
    $stmt = $pdo->prepare('DELETE FROM clubs WHERE id = :id');
    $stmt->execute([':id' => $clubId]);
    return $stmt->rowCount() > 0;
}

