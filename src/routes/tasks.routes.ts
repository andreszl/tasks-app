import * as constants from '../constants';
import { TaskForm, Tasks } from '../components/pages';
import Layout from '../components/organisms/layout/layout.organism';

export default [
	{
		path: constants.routes.tasks.CREATE,
		component: TaskForm,
		useLayout: true,
		layout: Layout,
		props: {},
		requireLogin: true,
	},
	{
		path: constants.routes.tasks.LIST,
		component: Tasks,
		useLayout: true,
		layout: Layout,
		props: {},
		requireLogin: true,
	},
];
