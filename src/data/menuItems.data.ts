import { Home, PostAdd, Logout } from '@mui/icons-material';

import * as constants from '../constants';
import { logout } from '../actions/auth/auth.actions';

export default [
	{
		name: 'Inicio',
		icon: Home,
		redirect: constants.routes.tasks.LIST as string,
	},
	{
		name: 'Cerrar Sesion',
		icon: Logout,
		onClick: () => logout(),
	},
	{
		name: 'Crear post',
		icon: PostAdd,
		onlyMobile: true,
		redirect: constants.routes.tasks.CREATE as string,
	},
];
