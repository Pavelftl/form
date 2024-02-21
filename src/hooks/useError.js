import { useState } from 'react';

const useError = () => {
	const [errors, setErrors] = useState({
		emailError: null,
		passwordError: null,
		confirmPasswordError: null,
	});

	return {
		getErrors: () => errors,
		setEmailError: error => {
			setErrors({ ...errors, emailError: error });
		},
		setPasswordError: error => {
			setErrors({ ...errors, passwordError: error });
		},
		setConfirmPasswordError: error => {
			setErrors({ ...errors, confirmPasswordError: error });
		},
	};
};

export default useError;
