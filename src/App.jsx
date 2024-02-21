import { useRef } from 'react';

import useStore from './hooks/useStore';
import { sendFormData } from './utils';
import useError from './hooks/useError';

function App() {
	const { getErrors, setEmailError, setPasswordError, setConfirmPasswordError } =
		useError();
	const { emailError, passwordError, confirmPasswordError } = getErrors();

	const { getState, updateState } = useStore();
	const { email, password, confirmPassword } = getState();

	const buttonRef = useRef(null);

	const onSubmit = event => {
		event.preventDefault();
		sendFormData(getState());
	};

	const onChange = ({ target }) => {
		updateState(target.name, target.value);
	};

	const onEmailBlur = ({ target }) => {
		let newError = null;

		if (!/\S+@\S+\.\S+/.test(target.value) && target.value.length > 0) {
			newError = 'Неверный почтовый адрес. Должны присутствовать символы "@" и "."';
		}
		setEmailError(newError);

		if (email) {
			buttonRef.current.focus();
		}
	};

	const onPasswordBlur = ({ target }) => {
		let newError = null;

		if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(target.value) && target.value.length > 0) {
			newError =
				'Пароль должен содержать хотя бы одну цифру, одну прописную букву и не менее 8 символов.';
		}
		setPasswordError(newError);
	};

	const onConfirmPassword = ({ target }) => {
		onChange({ target });
		if (target.value.length === password.length) {
			buttonRef.current.focus();
		} else if (target.value.length === 0) {
			setConfirmPasswordError(null);
		}
	};
	const onConfirmPasswordBlur = ({ target }) => {
		let newError = null;

		if (target.value !== password) {
			newError = 'Пароли не совпадают!';
		}

		setConfirmPasswordError(newError);
	};

	return (
		<form onSubmit={onSubmit}>
			<h2>Sign up</h2>
			{emailError && <p>{emailError}</p>}
			{passwordError && <p>{passwordError}</p>}
			{confirmPasswordError && <p>{confirmPasswordError}</p>}
			<div className="inputs">
				<label htmlFor="email">Email</label>
				<input
					id="email"
					name="email"
					placeholder="Your email"
					value={email}
					onChange={onChange}
					onBlur={onEmailBlur}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Your password"
					value={password}
					onChange={onChange}
					onBlur={onPasswordBlur}
				/>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={onConfirmPassword}
					onBlur={onConfirmPasswordBlur}
				/>
				<button
					ref={buttonRef}
					type="submit"
					disabled={
						!!emailError ||
						!!passwordError ||
						!!confirmPasswordError ||
						!email ||
						!password ||
						!confirmPassword
					}
				>
					SIGN UP
				</button>
			</div>
		</form>
	);
}

export default App;
