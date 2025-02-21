import {
	UpdateUserRequestBody,
	UpdateUserResponseBody,
} from '~/modules/services/user/users.types';
import { usersService } from '~/modules/services/user/users.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '~/shared/componetnts/signup-form';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '~/shared/store';
import { showToast } from '~/shared/utils/show-toast';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import React from 'react';
import { personalInfoSchema } from '~/modules/shop/screens/personal-info/personal-info.schema';

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
	const { setUser, user } = useAuthStore();
	const { control, handleSubmit, reset } = useForm<UserFormFields>({
		mode: 'onChange',
		reValidateMode: 'onChange',
		resolver: yupResolver(personalInfoSchema),
	});

	// React.useEffect(() => {
	// 	reset({
	// 		email: user?.email,
	// 		name: user?.name,
	// 		address: user?.address,
	// 		phone: user?.phone,
	// 		currentPassword: '',
	// 		password: '',
	// 		confirmPassword: '',
	// 	});
	// }, [user]);

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
			showToast('error', err.response?.data.message);
		},
	});

	const onSubmit = async (data: UpdateUserRequestBody): Promise<void> => {
		await mutateAsync(data);
	};

	return {
		onSubmit,
		isPending,
		control,
		handleSubmit,
	};
};
