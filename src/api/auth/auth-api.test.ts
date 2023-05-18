import { signIn, signUp, sendChangePasswordCode, changePassword, authToken, logout } from './auth.api';
import request from '../../utils/request.util';

jest.mock('../../utils/request.util', () => jest.fn());

describe('signIn', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		await signIn(user);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: 'v1/auth/sign-in',
			method: 'POST',
			body: user,
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { token: 'abcdefg' };
		(request as any).mockResolvedValue(response);

		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		const result = await signIn(user);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		await expect(signIn(user)).rejects.toThrowError(error);
	});
});

describe('signUp', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		await signUp(user);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: 'v1/auth/sign-up',
			method: 'POST',
			body: user,
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { status: 'success' };
		(request as any).mockResolvedValue(response);

		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		const result = await signUp(user);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const user = {
			email: 'test@example.com',
			password: 'password123',
		};

		await expect(signUp(user)).rejects.toThrowError(error);
	});
});

describe('sendChangePasswordCode', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const email = 'test@example.com';

		await sendChangePasswordCode(email);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: 'v1/auth/send-change-password-code',
			method: 'POST',
			body: { email },
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { status: 'success' };
		(request as any).mockResolvedValue(response);

		const email = 'test@example.com';

		const result = await sendChangePasswordCode(email);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const email = 'test@example.com';

		await expect(sendChangePasswordCode(email)).rejects.toThrowError(error);
	});
});

describe('changePassword', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const email = 'test@example.com';
		const password = 'new_password';
		const code = 123456;

		await changePassword(email, password, code);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: 'v1/auth/change-password',
			method: 'POST',
			body: { email, password, code },
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { status: 'success' };
		(request as any).mockResolvedValue(response);

		const email = 'test@example.com';
		const password = 'new_password';
		const code = 123456;

		const result = await changePassword(email, password, code);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const email = 'test@example.com';
		const password = 'new_password';
		const code = 123456;

		await expect(changePassword(email, password, code)).rejects.toThrowError(error);
	});
});

describe('authToken', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const token = '1234567890abcdef';

		await authToken(token);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			headers: {
				Authorization: `bearer ${token}`,
			},
			url: 'v1/auth/token',
			method: 'GET',
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { status: 'success' };
		(request as any).mockResolvedValue(response);

		const token = '1234567890abcdef';

		const result = await authToken(token);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const token = '1234567890abcdef';

		await expect(authToken(token)).rejects.toThrowError(error);
	});
});

describe('logout', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería llamar a la función "request" con los parámetros correctos', async () => {
		const token = '1234567890abcdef';

		await logout(token);

		expect(request).toHaveBeenCalledTimes(1);
		expect(request).toHaveBeenCalledWith({
			url: `v1/auth/logout/${token}`,
			method: 'DELETE',
			body: {},
		});
	});

	it('debería devolver la respuesta de la función "request"', async () => {
		const response = { status: 'success' };
		(request as any).mockResolvedValue(response);

		const token = '1234567890abcdef';

		const result = await logout(token);

		expect(result).toEqual(response);
	});

	it('debería devolver un error si "request" arroja una excepción', async () => {
		const error = new Error('Error en la solicitud');
		(request as any).mockRejectedValue(error);

		const token = '1234567890abcdef';

		await expect(logout(token)).rejects.toThrowError(error);
	});
});
