import { useAuthStore } from '~/shared/store/auth.store';
import { useForm } from 'react-hook-form';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import {
	authService,
	LoginRequestBody,
	LoginResponseBody,
} from '~/modules/services/auth';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '~/shared/utils/show-toast';
import { AxiosError, HttpStatusCode } from 'axios';
import { IServerError } from '~/shared/services/types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '~/shared/componetnts/login-form/login.schema';

type LoginFormFields = {
	email: string;
	password: string;
};

export const useLogin = () => {
	const setIsAuth = useAuthStore((state) => state.setIsAuth);
	const setToken = useAuthStore((state) => state.setToken);

	const { control, handleSubmit, getValues, watch, setError } =
		useForm<LoginFormFields>({
			mode: 'all',
			reValidateMode: 'onChange',
			resolver: yupResolver(loginSchema),
		});

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const login = async (data: LoginRequestBody): Promise<LoginResponseBody> =>
		await authService.login(data);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: login,
		onSuccess: (res: LoginResponseBody) => {
			setIsAuth(true);
			setToken(res.accessToken);
			showToast('success', res.message);
		},
		onError: async (err: AxiosError<IServerError>) => {
			const notVerified =
				err.response?.data.statusCode === HttpStatusCode.Forbidden;
			const notFound =
				err.response?.data.statusCode === HttpStatusCode.NotFound;
			const notAuthorized =
				err.response?.data.statusCode === HttpStatusCode.Unauthorized;

			if (notFound) {
				setError('email', {
					message: err.response.data.message,
				});
				return;
			}

			if (notVerified) {
				await authService.sendCode({ email: getValues().email });
				navigation.navigate(NAVIGATION_KEYS.VERIFY, {
					email: getValues().email,
				});

				return;
			}

			if (notAuthorized) {
				setError('password', {
					message: err.response.data.message,
				});
				return;
			}

			setError('email', {
				message: err.response.data.message,
			});
			setError('password', {
				message: err.response.data.message,
			});
		},
	});

	const onSubmit = async (data: LoginRequestBody): Promise<void> => {
		await mutateAsync(data);
	};

	const isDisabled = !(watch('email') && watch('password'));

	return {
		isPending,
		onSubmit,
		isDisabled,
		handleSubmit,
		control,
	};
};
