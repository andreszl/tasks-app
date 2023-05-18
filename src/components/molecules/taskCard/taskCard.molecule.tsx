/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import 'moment/locale/es';
import moment from 'moment';

export interface Props {
	title: string,
	description: string,
	email: string,
	created_at: Date,
}

export default (props: Props) => {
	const { title, description, email, created_at } = props;
	React.useEffect(() => {
	}, []);

	return (
		<Card className="w-100p mt-12">
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					{`Por ${email} ${moment((created_at as any).toDate()).locale('es').fromNow()}`}
				</Typography>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};
