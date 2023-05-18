import jwt_decode from 'jwt-decode';
import { IUser } from '../interfaces/auth.interfaces';

export const decode = (token: string): IUser => {
	return jwt_decode(token);
};
