import * as yup from 'yup';

export const signupSchema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup
		.string()
		.email('Please enter a valid email address.')
		.required('Email is required.'),
	password: yup
		.string()
		.required('Password is required.')
		.min(6, 'Password must be at least 6 characters long.'),
	confirmPassword: yup
		.string()
		.oneOf(
			[yup.ref('password')],
			'Passwords do not match. Please try again.',
		)
		.required('Please confirm your password.'),
	address: yup.string().required('Address is required.'),
	phone: yup
		.string()
		.required('Phone number is required.')
		.matches(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number.'),
});
