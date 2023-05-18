import * as React from 'react';
import {
	Toolbar, List, IconButton, ListItem,
	ListItemIcon, ListItemText, Typography, Hidden, Button,
} from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import { Menu } from '@mui/icons-material';
import { connect, useDispatch } from 'react-redux';

import { menuItems } from '../../../data';
import * as constants from '../../../constants';
import * as interfaces from '../../../interfaces';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user,
	};
}

export default connect(mapStateToProps, null)(({
	open, handleDrawerOpen, user,
}: any) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const brand = user.email;
	return (
		<>
			<Hidden mdDown>
				<Toolbar className="w-100p">
					<div className="w-100p d-flex align-items-center justify-content-between">
						<Typography variant="subtitle1" noWrap component="div">
							<Link className="text-decoration-none text-white" to="/">{brand}</Link>
						</Typography>
						<div className="d-flex align-items-center">
							{
								menuItems.filter((i) => !i.onlyMobile).map((menuItem) => {
									return (
										<List
											key={menuItem.name}
											onClick={() => {
												if (menuItem.onClick) {
													menuItem.onClick();
													dispatch(menuItem.onClick() as any);
												}

												menuItem.redirect ? navigate(menuItem.redirect) : null;
											}}
										>
											<ListItem button>
												<ListItemIcon>
													<menuItem.icon color="secondary" />
												</ListItemIcon>
												<ListItemText primary={menuItem.name} />
											</ListItem>
										</List>
									);
								})
							}
						</div>
						<div>
							<Link className="text-decoration-none" to={constants.routes.tasks.CREATE}>
								<Button color="secondary" variant="outlined">Crear tarea</Button>
							</Link>
						</div>
					</div>
				</Toolbar>
			</Hidden>
			<Hidden mdUp>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<Menu />
					</IconButton>
					<Typography className="text-center w-100p ml-40-reverse" variant="h6" noWrap component="div">
						<Link className="text-decoration-none text-white" to="/">{brand}</Link>
					</Typography>
				</Toolbar>
			</Hidden>
		</>
	);
});
