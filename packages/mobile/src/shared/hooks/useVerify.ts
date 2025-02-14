import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootStackParamList,
} from '~/modules/navigation/types';
import { authService, VerifyRequestBody, VerifyResponseBody } from "~/modules/services/auth";
import { useMutation } from '@tanstack/react-query';
import { AxiosError, HttpStatusCode } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';
import { useAuthStore } from "~/shared/store";

export const useVerify = () => {
	const setToken = useAuthStore((state) => state.setToken);

	const navigation = useNavigation<NavigationProp<RootStackParamList>>();

	const verify = async (data: VerifyRequestBody):Promise<VerifyResponseBody> =>
		await authService.verify(data);

	const verifyEmailMutation = useMutation({
		mutationFn: verify,
		onSuccess: (res) => {
			setToken(res.accessToken);
			showToast('success', res.message)
			navigation.navigate(NAVIGATION_KEYS.CONFIRM);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response.data.message);
		},
	});

	const handleSubmit = (code: string, email: string) => {
		verifyEmailMutation.mutate({
			code,
			email,
		});
	};

	return {
		handleSubmit,
	};
};
