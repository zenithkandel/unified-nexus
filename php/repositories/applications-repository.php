<?php
declare(strict_types=1);

function applications_create(PDO $pdo, array $payload): int
{
    $stmt = $pdo->prepare(
        'INSERT INTO applications (
			applicant_name,
			contact_email,
			contact_phone,
			selected_club_id,
			message,
			status,
			submitted_at,
			ip_hash
		) VALUES (
			:applicant_name,
			:contact_email,
			:contact_phone,
			:selected_club_id,
			:message,
			:status,
			NOW(),
			:ip_hash
		)'
    );

    $stmt->execute([
        ':applicant_name' => $payload['applicant_name'],
        ':contact_email' => $payload['contact_email'],
        ':contact_phone' => $payload['contact_phone'],
        ':selected_club_id' => $payload['selected_club_id'],
        ':message' => $payload['message'],
        ':status' => $payload['status'] ?? 'new',
        ':ip_hash' => $payload['ip_hash'],
    ]);

    return (int) $pdo->lastInsertId();
}

function applications_get_all(PDO $pdo): array
{
	$stmt = $pdo->prepare(
		'SELECT
			a.id,
			a.applicant_name,
			a.contact_email,
			a.contact_phone,
			a.selected_club_id,
			c.name AS club_name,
			a.message,
			a.status,
			a.submitted_at
		 FROM applications a
		 INNER JOIN clubs c ON c.id = a.selected_club_id
		 ORDER BY a.submitted_at DESC, a.id DESC'
	);
	$stmt->execute();
	return $stmt->fetchAll();
}

function applications_delete(PDO $pdo, int $applicationId): bool
{
	$stmt = $pdo->prepare('DELETE FROM applications WHERE id = :id');
	$stmt->execute([':id' => $applicationId]);
	return $stmt->rowCount() > 0;
}

