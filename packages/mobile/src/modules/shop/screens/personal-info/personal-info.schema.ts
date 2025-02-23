import * as yup from 'yup';

export const personalInfoSchema = yup.object().shape({
	name: yup.string().optional(),
	email: yup.string().email('Please enter a valid email address.').optional(),
	currentPassword: yup
		.string()
		.min(6, 'Password must be at least 6 characters long.')
		.optional(),
	password: yup
		.string()
		.optional()
		.min(6, 'Password must be at least 6 characters long.'),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password')],
			'Passwords do not match. Please try again.',
		)
		.optional(),
	address: yup.string().optional(),
	phone: yup
		.string()
		.matches(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number.')
		.optional(),
});
