import jwt_decode from 'jwt-decode';
import * as actions from './auth.actions';
import * as constants from '../../constants';
import { decode } from '../../utils/jwt.util';
import { IUser } from '../../interfaces/auth.interfaces';

jest.mock('jwt-decode', () => jest.fn());

describe('setCurrentUser', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('debería crear una acción con el tipo y el payload correcto', () => {
		const payload: IUser = {
			_id: '1',
			email: 'user1@user1.com',
			roles: ['user'],
			iat: 0,
			exp: 0,
			accessToken: 'token',
		};

		const expectedAction = {
			type: constants.auth.actions.SET_CURRENT_USER,
			payload,
		};

		const action = actions.setCurrentUser(payload);

		expect(action).toEqual(expectedAction);
	});

	it('debería llamar a la función "decode" con el token correcto', () => {
		const payload: IUser = {
			_id: '1',
			email: 'user1@user1.com',
			roles: ['user'],
			iat: 0,
			exp: 0,
			accessToken: 'token',
		};

		(jwt_decode as any).mockResolvedValue(payload);

		const token = 'token';
		decode(token);

		actions.setCurrentUser(payload);

		expect(jwt_decode).toHaveBeenCalledTimes(1);
		expect(jwt_decode).toHaveBeenCalledWith(token);
	});
});
