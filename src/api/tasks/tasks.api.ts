import request from '../../utils/request.util';

export async function getByUserEmail(email: string) {
	return request({
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: 'v1/task/get-task-by-user',
		method: 'POST',
		body: {
			email,
		},
	});
}

export async function create(email: string, description: string) {
	return request({
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: 'v1/task/create-task',
		method: 'POST',
		body: {
			email,
			description,
		},
	});
}

export async function remove(id: string) {
	return request({
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: 'v1/task/delete-task-by-id',
		method: 'POST',
		body: {
			id,
		},
	});
}

export async function update(id: string, description: string) {
	return request({
		headers: {
			Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		url: 'v1/task/update-task-description',
		method: 'POST',
		body: {
			id,
			description,
		},
	});
}
