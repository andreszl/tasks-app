import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, CardActions } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import React from 'react';
import * as interfaces from '../../../interfaces';
import utils from '../../../utils';
import api from '../../../api';

interface Props {
	task: interfaces.tasks.ITask
	onUpdate: (_data: interfaces.tasks.ITask) => void
	onRemove: (_id: string) => void
}

interface State {
	open: boolean;
	description: {
		payload: string
		error: string
	},
}

export default class extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			open: false,
			description: {
				payload: '',
				error: '',
			},
		};

		this.reset = this.reset.bind(this);
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.setErrorDescription = this.setErrorDescription.bind(this);
		this.update = this.update.bind(this);
	}

	onChangeDescription(value: string) {
		const { description } = this.state;

		description.payload = value;

		this.setState({ description });
		utils.functions.handleOnChange(
			value,
			this.setErrorDescription,
			{
				required: { value: true },
				maxLength: { value: 900 },
			},
		);
	}

	setErrorDescription(error: string) {
		const { description } = this.state;
		description.error = error;
		console.log(error);
		this.setState({ description });
	}

	reset() {
		this.setState({
			open: false,
			description: {
				payload: '',
				error: '',
			},
		});
	}

	async update() {
		const { description } = this.state;
		const { task, onUpdate } = this.props;

		await api.tasks.update(task._id, description.payload);
		onUpdate({
			...task,
			description: description.payload,
		});

		this.reset();
	}

	async remove() {
		const { task, onRemove } = this.props;
		await api.tasks.remove(task._id);
		onRemove(task._id);
	}

	edit() {
		const { task } = this.props;
		const { description } = this.state;

		description.payload = task.description;
		description.error = '';

		this.setState({ open: true, description });
	}

	render() {
		const { open, description } = this.state;

		return (
			<div>
				<Dialog
					open={open}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle id="alert-dialog-title">
						Editar  tarea
					</DialogTitle>

					<DialogContent>

						<Box>
							<TextField
								className="w-100p mt-12"
								label="Descripcion"
								placeholder="Descripcion"
								value={description.payload}
								multiline
								rows={8}
								onChange={(e) => this.onChangeDescription(e.target.value)}
								error={!isEmpty(description.error)}
							/>
							<span className="error">{description.error}</span>
						</Box>
					</DialogContent>

					<DialogActions>
						<Button
							variant="contained"
							color="inherit"
							onClick={this.reset}
						>
							Cancelar
						</Button>
						<Button
							disabled={((isEmpty(description.payload) || !isEmpty(description.error)))}
							autoFocus
							variant="contained"
							color="primary"
							onClick={this.update}
						>
							Editar tarea
						</Button>
					</DialogActions>
				</Dialog>

				<CardActions className="d-flex align-items-center justify-content-between">
					<div>
						<Button
							data-testid="number-of-comments"
							size="small"
							color="primary"
							onClick={this.remove}
						>
							Eliminar
						</Button>
						<Button
							data-testid="number-of-comments"
							size="small"
							color="primary"
							onClick={this.edit}
						>
							Editar
						</Button>
					</div>
				</CardActions>
			</div>
		);
	}
}
