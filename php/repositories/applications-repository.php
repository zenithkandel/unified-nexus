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

