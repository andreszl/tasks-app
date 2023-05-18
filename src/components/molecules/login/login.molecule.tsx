import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { Dialog, Box, DialogContent, Button, DialogActions, TextField, Tab, Tabs } from '@mui/material';
import { connect } from 'react-redux';

import * as utils from '../../../utils/functions.util';
import api from '../../../api';
import { decode } from '../../../utils/jwt.util';
import * as interfaces from '../../../interfaces';
import actions from '../../../actions';
import RecoveryPasswordForm from '../../organisms/recoveryPasswordForm/recoveryPasswordForm.organism';

function mapStateToProps(state: interfaces.redux.Store) {
	return {
		user: state.user,
	};
}

const { logout, setCurrentUser } = actions.auth;

const mapDispatchToProps = {
	logout,
	setCurrentUser,
};
type MapStateToProps = ReturnType<typeof mapStateToProps>;
type MapDispatchToProps = typeof mapDispatchToProps;

interface Props extends MapStateToProps, MapDispatchToProps {
	onSignIn: (_status: boolean) => boolean;
}

export default connect(mapStateToProps, mapDispatchToProps)((props: Props) => {
	const { user, setCurrentUser } = props;
	const [open, setOpen] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [type, setType] = useState(0);

	useEffect(() => {
		if (isEmpty(user.email)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [user.email]);

	const onSignIn = async () => {
		const { onSignIn: onSignInEvent } = props;

		try {
			const data = await api.auth.signIn({
				email,
				password,
			});

			if (data.error) {
				throw data;
			}

			const decoded = decode(data.data.accessToken);

			setCurrentUser({
				_id: decoded._id,
				email: decoded.email,
				roles: decoded.roles,
				iat: decoded.iat,
				exp: decoded.exp,
				accessToken: data.data.accessToken,
			});

			localStorage.setItem('accessToken', data.data.accessToken);

			onSignInEvent(true);
		} catch (error: any) {
			console.log(error);
			if (error.message === 'The item does not exist') {
				setError('Tu cuenta aun no ha sido verificada o no existe');
			} else {
				setError(error.message);
			}
			onSignInEvent(false);
		}
	};

	const onSignUp = async () => {
		try {
			const data = await api.auth.signUp({
				email,
				password,
			});

			if (data.error) {
				throw data;
			}
			setType(0);
			reset();
		} catch (error: any) {
			console.log(error);
			setError(error.message);
		}
	};

	const onChangeEmail = (value: string) => {
		setEmail(value);
		utils.handleOnChange(
			value,
			setEmailError,
			{
				required: { value: true },
				isEmail: { value: true },
			},
		);
	};

	const onChangePassword = (value: string) => {
		setPassword(value);
		utils.handleOnChange(
			value,
			setPasswordError,
			{
				required: { value: true },
				minLength: { value: 8 },
				maxLength: { value: 12 },
			},
		);
	};

	const onChangeConfirmPassword = (value: string) => {
		setConfirmPassword(value);
		utils.handleOnChange(
			value,
			setConfirmPasswordError,
			{
				confirmPassword: { value: password },
				minLength: { value: 8 },
				maxLength: { value: 12 },
			},
		);
	};

	const onChangeTab = (value: number) => {
		setType(value);
		reset();
	};

	const reset = () => {
		setEmailError('');
		setPasswordError('');
		setEmail('');
		setPassword('');
		setError('');
		setConfirmPassword('');
		setConfirmPasswordError('');
	};

	return (
		<Dialog
			open={open}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			fullWidth
			maxWidth="sm"
		>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={type} aria-label="basic tabs example">
					<Tab onClick={() => onChangeTab(0)} label="Iniciar Sesion" />
					<Tab onClick={() => onChangeTab(1)} label="Registrarse" />
					<Tab onClick={() => onChangeTab(2)} label="Recuperar Contraseña" />
				</Tabs>
			</Box>
			<DialogContent>
				{
					type === 1 || type === 0 ? (
						<>
							<Box>
								<TextField
									id="login-field"
									value={email}
									className="w-100p mt-12"
									label="Correo electronico"
									placeholder="Correo electronico"
									onChange={(e) => { onChangeEmail(e.target.value); }}
									error={!isEmpty(emailError)}
								/>
								<span className="error">{emailError}</span>
							</Box>
							<Box>
								<TextField
									id="login-field"
									value={password}
									className="w-100p mt-12"
									label="Contraseña"
									placeholder="Contraseña"
									type="password"
									onChange={(e) => { onChangePassword(e.target.value); }}
									error={!isEmpty(passwordError)}
								/>
								<span className="error">{passwordError}</span>
							</Box>
							{
								type === 1 ? (
									<Box>
										<TextField
											id="login-field"
											value={confirmPassword}
											className="w-100p mt-12"
											label="Confirmar Contraseña"
											placeholder="Confirmar Contraseña"
											type="password"
											onChange={(e) => { onChangeConfirmPassword(e.target.value); }}
											error={!isEmpty(confirmPasswordError)}
										/>
										<span className="error">{confirmPasswordError}</span>
									</Box>
								) : null
							}
							<span className="error">{error}</span>
						</>
					) : null
				}

				{
					type === 2 ? (
						<RecoveryPasswordForm />
					) : null
				}
			</DialogContent>
			<DialogActions>

				{
					type === 0 ? (
						<Button
							disabled={(
								(isEmpty(email) || !isEmpty(emailError))
								|| (isEmpty(password) || !isEmpty(passwordError))
							)}
							autoFocus
							onClick={onSignIn}
							variant="contained"
							color="primary"
						>
							Iniciar sesión
						</Button>
					) : null
				}

				{
					type === 1 ? (
						<Button
							disabled={(isEmpty(email) || !isEmpty(emailError))
								|| (isEmpty(password) || !isEmpty(passwordError))
								|| (isEmpty(confirmPassword) || !isEmpty(confirmPasswordError))}
							autoFocus
							onClick={onSignUp}
							variant="contained"
							color="primary"
						>
							Registrarse
						</Button>
					) : null
				}
			</DialogActions>
		</Dialog>
	);
});
