import request from '../../utils/request.util';

export async function signIn(
	user: {
		email: string,
		password: string
	},
) {
	return request({
		url: 'v1/auth/sign-in',
		method: 'POST',
		body: user,
	});
}

export async function signUp(
	user: {
		email: string,
		password: string
	},
) {
	return request({
		url: 'v1/auth/sign-up',
		method: 'POST',
		body: user,
	});
}

export async function sendChangePasswordCode(email: string) {
	return request({
		url: 'v1/auth/send-change-password-code',
		method: 'POST',
		body: { email },
	});
}

export async function changePassword(email: string, password: string, code: number) {
	return request({
		url: 'v1/auth/change-password',
		method: 'POST',
		body: { email, password, code },
	});
}

export async function authToken(token: string) {
	return request({
		headers: {
			Authorization: `bearer ${token}`,
		},
		url: 'v1/auth/token',
		method: 'GET',
	});
}

export async function logout(token: string) {
	return request({
		url: `v1/auth/logout/${token}`,
		method: 'DELETE',
		body: {},
	});
}
