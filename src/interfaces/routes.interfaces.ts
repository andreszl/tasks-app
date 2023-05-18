export interface IRoutes {
	path: string,
	component: JSX.Element,
	useLayout?: boolean,
	layout?: unknown,
	requireLogin?: boolean,
}
