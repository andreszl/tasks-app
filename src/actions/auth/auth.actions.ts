import api from '../../api';
import * as constants from '../../constants';
import * as interfaces from '../../interfaces'; // eslint-disable-line no-unused-vars
import { decode } from '../../utils/jwt.util';

export const setCurrentUser = (payload: interfaces.auth.IUser) => {
	return {
		type: constants.auth.actions.SET_CURRENT_USER,
		payload,
	} as const;
};

export function signIn() {
	return (async (dispatch: interfaces.redux.IDistpatch, _getState: interfaces.redux.IGetState) => {
		try {

			const token = localStorage.getItem('accessToken') as string;
			const decoded = decode(token);

			const data = await api.auth.authToken(token);

			if (data.data.error) {
				throw data.data.error;
			}

			dispatch(
				setCurrentUser({
					_id: decoded._id,
					email: decoded.email,
					roles: decoded.roles,
					iat: decoded.iat,
					exp: decoded.exp,
					accessToken: token,
				}),
			);

			return true;
		} catch (err: any) {
			logout();
			console.log(err);
			return false;
		}
	}) as unknown as Promise<boolean>;
}

export function logout() {
	return (async (dispatch: interfaces.redux.IDistpatch, getState: interfaces.redux.IGetState) => {
		const { user } = getState();
		try {

			localStorage.removeItem('accessToken');

			dispatch(
				setCurrentUser({
					_id: '',
					email: '',
					roles: [],
					iat: 0,
					exp: 0,
					accessToken: '',
				}),
			);

			api.auth.logout(user.accessToken);
			return { message: 'success' };
		} catch (err: any) {
			return { message: err.message };
		}
	}) as unknown as Promise<{ message: string}>;
}

const actions = {
	setCurrentUser,
};

export type IActions = interfaces.redux.IActionUnion<typeof actions>;
