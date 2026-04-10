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

