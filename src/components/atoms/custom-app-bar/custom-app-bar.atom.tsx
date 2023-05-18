import * as React from 'react';
import { Hidden } from '@mui/material';

import { AppBar } from '../../../styles/react/drawer.styles';
import CustomToolbar from '../drawer/drawer.atoms';

export default ({ open, handleDrawerOpen }: any) => {
	return (
		<>
			<Hidden mdDown>
				<AppBar
					key="appbar-1"
					position="fixed"
				>
					<CustomToolbar key="toolbar-1" handleDrawerOpen={handleDrawerOpen} />
				</AppBar>
			</Hidden>
			<Hidden mdUp>
				<AppBar key="appbar-2" position="fixed" open={open}>
					<CustomToolbar key="toolbar-2" handleDrawerOpen={handleDrawerOpen} />
				</AppBar>
			</Hidden>
		</>
	);
};
