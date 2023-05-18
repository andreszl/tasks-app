/* eslint-disable default-param-last */
import * as constants from '../../constants';
import * as interfaces from '../../interfaces';
import { IActions } from '../../actions/auth/auth.actions';

export default (
	state: interfaces.auth.IUser = interfaces.auth.initialState,
	action: IActions,
) => {
	switch (action.type) {
		case constants.auth.actions.SET_CURRENT_USER:
			console.log(action);
			return {
				...state,
				_id: action.payload._id,
				email: action.payload.email,
				roles: action.payload.roles,
				iat: action.payload.iat,
				exp: action.payload.exp,
				accessToken: action.payload.accessToken,
			};

		default:
			return state;
	}
};
