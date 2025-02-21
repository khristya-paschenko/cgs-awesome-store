import { usersService } from '~/modules/services/user/users.service';
import { useMutation } from '@tanstack/react-query';
import { DeleteUserResponseBody } from '~/modules/services/user/users.types';
import { useAuthStore } from '~/shared/store';
import { showToast } from '~/shared/utils/show-toast';

export const useDeleteUser = () => {
	const { setToken, setUser, setIsAuth } = useAuthStore((state) => state);

	const deleteUser = async (): Promise<DeleteUserResponseBody> =>
		await usersService.deleteUser();

	const deleteUserMutation = useMutation({
		mutationFn: deleteUser,
		onSuccess: (res) => {
			setToken(null);
			setUser(null);
			setIsAuth(false);
			showToast('success', res.message);
		},
		onError: (err) => {
			showToast('error', err.response.data.message);
		},
	});

	const handleDelete = () => {
		deleteUserMutation.mutate();
	};

	return {
		handleDelete,
	};
};
