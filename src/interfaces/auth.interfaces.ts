export interface IUser {
	_id: string,
	email: string,
	roles: string[],
	iat: number,
	exp: number,
	accessToken: string,
}

export const initialState: IUser = {
	_id: '',
	email: '',
	roles: [],
	iat: 0,
	exp: 0,
	accessToken: '',
};
