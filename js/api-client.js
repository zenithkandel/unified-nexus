const defaultHeaders = {
	'Content-Type': 'application/json'
};

async function handleResponse(response) {
	const payload = await response.json();
	if (!response.ok || !payload.success) {
		const errors = payload.errors || [];
		throw new Error(errors[0] || payload.message || 'Request failed');
	}
	return payload.data;
}

export async function fetchClubs() {
	const response = await fetch('api/public/clubs.php', { method: 'GET' });
	return handleResponse(response);
}

export async function fetchExecutive() {
	const response = await fetch('api/public/executive.php', { method: 'GET' });
	return handleResponse(response);
}

export async function submitApplication(payload) {
	const response = await fetch('api/public/apply.php', {
		method: 'POST',
		headers: defaultHeaders,
		body: JSON.stringify(payload)
	});
	return handleResponse(response);
}

