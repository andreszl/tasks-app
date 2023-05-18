import * as React from 'react';

import { Drawer } from '@mui/material';

import { drawerWidth } from '../../../styles/react/drawer.styles';
import DrawerContent from '../drawer-content/drawer-content.atom';

interface Props {
	handleDrawerClose: Function
	open: boolean,
	type: 'persistent' | 'permanent' | 'temporary' | undefined
}

export default (props: Props) => {
	const { open, handleDrawerClose, type } = props;
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
			variant={type}
			anchor="left"
			open={open}
		>
			<DrawerContent handleDrawerClose={handleDrawerClose} />
		</Drawer>
	);
};
