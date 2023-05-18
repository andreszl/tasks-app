import { combineReducers } from 'redux';
import user from './auth/auth.reducer';

const reducers = combineReducers({
	user,
});

export default reducers;
