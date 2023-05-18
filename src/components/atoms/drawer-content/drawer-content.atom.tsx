import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {
	List, Divider, IconButton, ListItem,
	ListItemIcon, ListItemText, Hidden,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { DrawerHeader } from '../../../styles/react/drawer.styles';
import { menuItems } from '../../../data';
import * as constants from '../../../constants';

export default ({ handleDrawerClose }: any) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<>
			<Hidden mdUp>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
					</IconButton>
				</DrawerHeader>
				<Divider />
			</Hidden>

			{
				menuItems.map((menuItem) => {
					return (
						<List
							key={menuItem.name}
							onClick={() => {
								if (menuItem.onClick) {
									menuItem.onClick();
									dispatch(menuItem.onClick() as any);
								}

								menuItem.redirect ? navigate(constants.routes.tasks.CREATE) : null;
							}}
						>
							<ListItem button>
								<ListItemIcon>
									<menuItem.icon />
								</ListItemIcon>
								<ListItemText primary={menuItem.name} />
							</ListItem>
						</List>
					);
				})
			}
		</>
	);
};
