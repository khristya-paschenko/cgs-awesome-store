import { useAuthStore } from '~/shared/store';

export const useLogout = () => {
	const { setIsAuth, setToken, setUser } = useAuthStore((state) => state);

	const onLogout = () => {
		setIsAuth(false);
		setToken(null);
		setUser(null);
	};

	return { onLogout };
};
