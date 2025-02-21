import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
	name: yup.string(),
	email: yup.string().email('Please enter a valid email address.'),
	currentPassword: yup.string(),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters long.'),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password')],
			'Passwords do not match. Please try again.',
		),
	address: yup.string(),
	phone: yup
		.string()
		.matches(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number.'),
});
