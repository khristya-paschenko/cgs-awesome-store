import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { useAuthStore } from '~/shared/store';

export const mainAxios = axios.create({
	withCredentials: true,
});

mainAxios.interceptors.response.use(
	(response): AxiosResponse<unknown, unknown> => {
		return response;
	},
	async (error) => {
		if (Boolean(error.response) && error.response.status === 401) {
			useAuthStore.getState().setIsAuth(false);
			useAuthStore.getState().setToken(null);
		}
		return Promise.reject(error);
	},
);

mainAxios.interceptors.request.use((config) => {
	if (!useAuthStore.getState().token) {
		return config;
	}
	return {
		...config,
		headers: {
			...config.headers,
			Authorization: `Bearer ${useAuthStore.getState().token}`,
		},
	};
});
