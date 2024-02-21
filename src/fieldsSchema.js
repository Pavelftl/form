import * as yup from 'yup';

const fieldsSchema = yup.object({
	email: yup
		.string()
		.matches(
			/\S+@\S+\.\S+/,
			'Неверный почтовый адрес. Должны присутствовать символы "@" и "."',
		),

	password: yup
		.string()
		.matches(
			/^(?=.*[A-Z])(?=.*\d).{8,}$/,
			'Пароль должен содержать хотя бы одну цифру, одну прописную букву и не менее 8 символов.',
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают!'),
});

export default fieldsSchema;
