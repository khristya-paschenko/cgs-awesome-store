import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '~/shared/componetnts/signup-form/signup.schema';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import {
	authService,
	SignupRequestBody,
	SignupResponseBody,
} from '~/modules/services/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';

type SignupFormFields = {
	email: string;
	name: string;
	address: string;
	phone: string;
	password: string;
	confirmPassword: string;
};
export const useSignup = () => {
	const { control, handleSubmit, getValues, watch, setError } =
		useForm<SignupFormFields>({
			mode: 'all',
			reValidateMode: 'onChange',
			resolver: yupResolver(signupSchema),
		});

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const signup = async (
		data: SignupRequestBody,
	): Promise<SignupResponseBody> => await authService.signup(data);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: signup,
		onSuccess: (res: SignupResponseBody) => {
			showToast(
				'success',
				res.message,
			);
			navigation.navigate(NAVIGATION_KEYS.VERIFY, {
				email: getValues().email,
			});
		},
		onError: (err: AxiosError<IServerError>) => {
			const unprocessableEntity =
				err.response?.data.statusCode ===
				HttpStatusCode.UnprocessableEntity;

			showToast('error', err.response.data.message);

			if (unprocessableEntity) {
				setError('email', {
					message: err.response.data.message,
				});
				return;
			}
		},
	});

	const onSubmit = async (data: SignupFormFields): Promise<void> => {
		await mutateAsync(data);
	};

	const isDisabled = !(
		watch('email') &&
		watch('password') &&
		watch('name') &&
		watch('phone') &&
		watch('address') &&
		watch('confirmPassword')
	);

	return {
		isPending,
		onSubmit,
		isDisabled,
		control,
		handleSubmit,
	};
};
