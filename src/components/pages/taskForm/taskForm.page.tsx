import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import * as constants from '../../../constants';
import * as utils from '../../../utils/functions.util';
import * as interfaces from '../../../interfaces';
import api from '../../../api';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user,
	};
}

type MapStateToProps = ReturnType<typeof mapStateToProps>;

interface Props extends MapStateToProps { }

export default connect(mapStateToProps, null)((props: Props) => {
	const navigate = useNavigate();
	const { user } = props;
	const [descriptionError, setDescriptionError] = useState('');
	const [description, setDescription] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const save = async () => {
		try {

			await api.tasks.create(user.email, description);

			navigate(`${constants.routes.tasks.LIST}`);

		} catch (error) {
			console.log(error);
		}
	};

	const onChangeDescription = (value: string) => {
		setDescription(value);
		utils.handleOnChange(
			value,
			setDescriptionError,
			{
				required: { value: true },
				minLength: { value: 3 },
				maxLength: { value: 900 },
			},
			'descripcion',
		);
	};

	return (
		<div className="w-100p h-100p d-flex justify-content-center vh-100">
			<div className="h-100p w-100p max-width-600">

				<h2>Crear tarea</h2>
				<div className="w-100p mt-12">
					<TextField
						className="w-100p mt-12 bg-white"
						label="Descripcion"
						placeholder="descripcion"
						multiline
						minRows={4}
						onChange={(e) => { onChangeDescription(e.target.value); }}
						error={!isEmpty(descriptionError)}
					/>
					<span className="error">{descriptionError}</span>
				</div>
				<div className="d-flex justify-content-end align-items-center mt-12">
					<Link
						className="text-decoration-none"
						to={constants.routes.tasks.LIST}
					>
						<Button className="" variant="contained">
							Cancelar
						</Button>
					</Link>
					<Button
						className="ml-4"
						variant="contained"
						disabled={((isEmpty(description) || !isEmpty(descriptionError)))}
						onClick={save}
					>
						Crear
					</Button>
				</div>
			</div>
		</div>
	);
});
