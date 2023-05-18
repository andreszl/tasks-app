import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import routes from './routes';
import Layout from './components/organisms/layout/layout.organism';
import Login from './components/molecules/login/login.molecule';
import * as interfaces from './interfaces';
import actions from './actions';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user,
	};
}

const { signIn } = actions.auth;

const mapDispatchToProps = {
	signIn,
};

type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

export interface Props extends MapStateToProps, MapDispatchToProps {
}

const App = ({ user, signIn }: any) => {
	const [logged, setLogged] = useState<boolean>(false);
	useEffect(() => {
		signIn().then((result: any) => {
			if (result) {
				setLogged(true);
			}
		});
	}, []);

	useEffect(() => {
		if (isEmpty(user._id)) {
			setLogged(false);
		}
	}, [user._id]);

	const onSignIn = (status: boolean) => {
		setLogged(status);
		return status;
	};

	return (
		<div className="bg-blue-light z-index-1001">
			<Router>
				<div>
					<Routes>
						{
							routes.map(({ path, component, useLayout, layout, props, requireLogin }, index) => {
								const key = `${path}-${index}`;
								const RouteComponent = component;

								if (!RouteComponent) return null;

								let CustomLayout = Layout;

								if (useLayout && layout) {
									CustomLayout = layout;
								}

								const CustomComponent = () => {
									if (requireLogin) {
										useLayout = false;
									}
									return (
										<div>
											{requireLogin && !logged ? (
												<div className="vh-100">
													<Login onSignIn={onSignIn} />
												</div>
											) : <RouteComponent {...props} />}
										</div>
									);
								};

								return (
									<Route
										key={key}
										path={path}
										element={(useLayout && logged ? (
											<CustomLayout>
												<CustomComponent />
											</CustomLayout>
										) : <CustomComponent />)}
									/>
								);
							})
						}
					</Routes>
				</div>
			</Router>
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
