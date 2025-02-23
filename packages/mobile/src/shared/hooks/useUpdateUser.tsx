import {
	UpdateUserRequestBody,
	UpdateUserResponseBody,
} from '~/modules/services/user/users.types';
import { usersService } from '~/modules/services/user/users.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '~/shared/store';
import { showToast } from '~/shared/utils/show-toast';
import { AxiosError, HttpStatusCode } from 'axios';
import { IServerError } from '~/shared/services/types';
import { personalInfoSchema } from '~/modules/shop/screens/personal-info/personal-info.schema';
import { date } from 'yup';

type UserFormFields = {
	email: string;
	name: string;
	address: string;
	phone: string;
	currentPassword: string;
	password: string;
	confirmPassword: string;
};

export const useUpdateUser = () => {
	const { setUser, user } = useAuthStore((state) => state);
	const { control, handleSubmit, watch, setError } = useForm<UserFormFields>({
		mode: 'all',
		reValidateMode: 'onChange',
		resolver: yupResolver(personalInfoSchema),
	});

	const patchUser = async (
		data: UpdateUserRequestBody,
	): Promise<UpdateUserResponseBody> => {
		return await usersService.updateUser(user?.id ? user.id : '', data);
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: patchUser,
		onSuccess: (res: UpdateUserResponseBody) => {
			setUser(res.data ? res.data : null);
			showToast('success', res.message);
		},
		onError: (err: AxiosError<IServerError>) => {
			console.log(err.response?.data.message, 'error');
			const badRequest =
				err.response?.data.statusCode === HttpStatusCode.BadRequest;

			if (badRequest) {
				setError('currentPassword', {
					message: err.response?.data.message,
				});
				return;
			}

			showToast('error', err.response?.data.message);
		},
	});

	const onSubmit = async (data: UpdateUserRequestBody): Promise<void> => {
		await mutateAsync(data);
	};
	console.log(handleSubmit, 'handle submit ');
	return {
		onSubmit,
		isPending,
		control,
		handleSubmit,
		watch,
	};
};
