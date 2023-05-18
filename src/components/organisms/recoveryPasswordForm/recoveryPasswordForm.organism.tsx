/* eslint-disable react/no-access-state-in-setstate */
import { Button, DialogActions, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import React from 'react';
import utils from '../../../utils';
import api from '../../../api';

interface Props {

}

interface State {
	email: {
		payload: string,
		error: string,
	},
	password: {
		payload: string,
		error: string,
	},
	confirmPassword: {
		payload: string,
		error: string,
	},
	code: {
		payload: string,
		error: string,
	},
	type: string,
	success: string,
}

export default class extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			email: {
				payload: '',
				error: '',
			},
			password: {
				payload: '',
				error: '',
			},
			confirmPassword: {
				payload: '',
				error: '',
			},
			code: {
				payload: '',
				error: '',
			},
			type: 'sendMail',
			success: '',
		};

		this.onChangeEmail = this.onChangeEmail.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);
		this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
		this.onChangeCode = this.onChangeCode.bind(this);
		this.setError = this.setError.bind(this);
		this.sendMail = this.sendMail.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.reset = this.reset.bind(this);
	}

	onChangeEmail(value: string) {
		const { email } = this.state;
		email.payload = value;
		email.error = '';

		this.setState({ email });
		utils.functions.handleOnChange(
			value,
			this.setError,
			{
				required: { value: true },
				isEmail: { value: true },
				maxLength: { value: 240 },
			},
			' ',
			'email',
		);
	}

	onChangePassword(value: string) {
		const { password } = this.state;
		password.payload = value;
		password.error = '';

		this.setState({ password });
		utils.functions.handleOnChange(
			value,
			this.setError,
			{
				required: { value: true },
				minLength: { value: 8 },
			},
			' ',
			'password',
		);
	}

	onChangeConfirmPassword(value: string) {
		const { confirmPassword, password } = this.state;
		confirmPassword.payload = value;
		confirmPassword.error = '';

		this.setState({ confirmPassword });
		utils.functions.handleOnChange(
			value,
			this.setError,
			{
				required: { value: true },
				minLength: { value: 8 },
				confirmPassword: { value: password.payload },
			},
			' ',
			'confirmPassword',
		);
	}

	onChangeCode(value: string) {
		const { code } = this.state;
		code.payload = value;
		code.error = '';

		this.setState({ code });
		utils.functions.handleOnChange(
			value,
			this.setError,
			{
				required: { value: true },
				maxLength: { value: 240 },
			},
			' ',
			'code',
		);
	}

	setError(error: string, field: string) {
		if ((this.state as any)[field]) {
			(this.state as any)[field].error = error;
		}

		this.setState(this.state);
	}

	sendMail() {
		const { email } = this.state;
		this.setState({ type: 'changePassword' });
		api.auth.sendChangePasswordCode(email.payload);
	}

	changePassword() {
		const { email, password, code } = this.state;
		api.auth.changePassword(email.payload, password.payload, Number(code.payload));
		this.reset();
		this.setState({ type: 'sendMail' });
	}

	reset() {
		const { email, password, code, confirmPassword } = this.state;
		email.payload = '';
		email.error = '';
		password.payload = '';
		password.error = '';
		confirmPassword.payload = '';
		confirmPassword.error = '';
		code.payload = '';
		code.error = '';
		this.setState({ email, password, code, confirmPassword });
	}

	render() {

		const { email, password, confirmPassword, code, type } = this.state;
		return (
			<>

				{
					type === 'sendMail' ? (
						<Box>
							<TextField
								id="login-field"
								value={email.payload}
								className="w-100p mt-12"
								label="Correo electronico"
								placeholder="Correo electronico"
								onChange={(e) => { this.onChangeEmail(e.target.value); }}
								error={!isEmpty(email.error)}
							/>
							<span className="error">{email.error}</span>
						</Box>
					) : null
				}

				{
					type === 'changePassword' ? (
						<>
							<Box>
								<TextField
									id="login-field"
									value={password.payload}
									className="w-100p mt-12"
									label="Contraseña"
									placeholder="Contraseña"
									type="password"
									onChange={(e) => { this.onChangePassword(e.target.value); }}
									error={!isEmpty(password.error)}
								/>
								<span className="error">{password.error}</span>
							</Box>

							<Box>
								<TextField
									id="login-field"
									value={confirmPassword.payload}
									className="w-100p mt-12"
									label="Confirmar Contraseña"
									placeholder="Confirmar Contraseña"
									type="password"
									onChange={(e) => { this.onChangeConfirmPassword(e.target.value); }}
									error={!isEmpty(confirmPassword.error)}
								/>
								<span className="error">{confirmPassword.error}</span>
							</Box>

							<Box>
								<TextField
									id="login-field"
									value={code.payload}
									className="w-100p mt-12"
									label="Codigo enviado al correo electronico"
									placeholder="Codigo enviado al correo electronico"
									onChange={(e) => { this.onChangeCode(e.target.value); }}
									error={!isEmpty(code.error)}
								/>
								<span className="error">{code.error}</span>
							</Box>
						</>
					) : null
				}

				<DialogActions>
					{
						type === 'sendMail' ? (
							<Button
								disabled={(isEmpty(email.payload) || !isEmpty(email.error))}
								autoFocus
								onClick={() => this.sendMail()}
								variant="contained"
								color="primary"
							>
								Enviar correo
							</Button>
						) : null
					}

					{
						type === 'changePassword' ? (
							<>
								<Button
									autoFocus
									onClick={() => this.setState({ type: 'sendMail' })}
									variant="contained"
									color="primary"
								>
									Atras
								</Button>
								<Button
									disabled={(isEmpty(code.payload) || !isEmpty(code.error))
										|| (isEmpty(password.payload) || !isEmpty(password.error))
										|| (isEmpty(confirmPassword.payload) || !isEmpty(confirmPassword.error))}
									autoFocus
									onClick={() => { this.changePassword(); }}
									variant="contained"
									color="primary"
								>
									Cambiar contraseña
								</Button>
							</>
						) : null
					}

				</DialogActions>
			</>
		);
	}
}
