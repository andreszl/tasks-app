import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardActions, Button, CardContent, Typography } from '@mui/material';
import _ from 'lodash';
import { connect } from 'react-redux';
import 'moment/locale/es';

import * as interfaces from '../../../interfaces';
import * as constants from '../../../constants';
import api from '../../../api';
import ModalTaskForm from '../../molecules/modalTaskForm/modalTaskForm.molecule';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user,
	};
}

type MapStateToProps = ReturnType<typeof mapStateToProps>;

interface Props extends MapStateToProps { }

export default connect(mapStateToProps, null)((props: Props) => {
	const { user } = props;
	const [tasks, setTasks] = useState<interfaces.tasks.ITask[]>([]);

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		const tasks = await api.tasks.getByUserEmail(user.email);
		setTasks(tasks.data);
	};

	const onUpdate = (task: interfaces.tasks.ITask) => {
		const index = _.findIndex(tasks, { _id: task._id });
		tasks[index].description = task.description;
		setTasks([...tasks]);
	};

	const onRemove = (_id: string) => {
		_.remove(tasks, { _id });
		setTasks([...tasks]);
	};

	return (
		<div className="w-100p d-flex justify-content-center">
			<div className="w-100p max-width-600">
				<Link className="text-decoration-none" to={constants.routes.tasks.CREATE}>
					<Button variant="contained" className="w-100p">
						Crear tarea
					</Button>
				</Link>
				{
					tasks.map((task, index) => {
						return (
							<div key={`${task._id}-${index}`} data-testid="task-item">
								<Card className="w-100p mt-12">
									<CardContent>
										<Typography variant="body2" color="text.secondary">
											{task.description}
										</Typography>
									</CardContent>

									<CardActions className="d-flex align-items-center justify-content-between">
										<div />
										<div>
											<ModalTaskForm task={task} onUpdate={onUpdate} onRemove={onRemove} />
										</div>
									</CardActions>
								</Card>
							</div>
						);
					})
				}
			</div>
		</div>
	);
});
