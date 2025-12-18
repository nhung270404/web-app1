import axios from 'axios';

// POST
export async function POST_METHOD(url: string, body: any) {
	const res = await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		throw new Error('POST request failed');
	}

	return res.json();
}

export async function GET_METHOD(url: string) {
	const res = await fetch(url, {
		method: 'GET',
		credentials: 'include',
	});

	if (!res.ok) {
		throw new Error('GET request failed');
	}

	return res.json();
}
