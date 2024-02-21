import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { sendFormData } from './utils';
import fieldsSchema from './fieldsSchema';

function App() {
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	useEffect(() => {
		if (getValues('password') === getValues('confirmPassword')) {
			buttonRef.current.focus();
		}
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	const buttonRef = useRef();

	return (
		<form onSubmit={handleSubmit(sendFormData)}>
			<h2>Sign up</h2>
			{emailError && <p>{emailError}</p>}
			{passwordError && <p>{passwordError}</p>}
			{confirmPasswordError && <p>{confirmPasswordError}</p>}

			<div className="inputs">
				<label htmlFor="email">Email</label>
				<input id="email" name="email" placeholder="Your email" {...register('email')} />
				<label htmlFor="password">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					placeholder="Your password"
					{...register('password')}
				/>
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					placeholder="Confirm Password"
					{...register('confirmPassword')}
				/>
				<button
					disabled={!!emailError || !!passwordError || confirmPasswordError}
					type="submit"
					ref={buttonRef}
				>
					SIGN UP
				</button>
			</div>
		</form>
	);
}

export default App;
