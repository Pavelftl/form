import { useState } from 'react';

const useStore = () => {
	const [state, setState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

export default useStore;
