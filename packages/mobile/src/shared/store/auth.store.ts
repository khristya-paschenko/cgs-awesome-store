import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { asyncStorage } from '~/shared/services/async-storage.service';
import { User } from '~/modules/services/auth';

type TAuthService = {
	token: string | null;
	isAuth: boolean;
	user: User | null;
	setUser: (user: User | null) => void;
	setIsAuth: (auth: boolean) => void;
	setToken: (token: string | null) => void;
	logout: () => void;
};

//TODO: fix user data (user is undefined)
export const useAuthStore = create<TAuthService>()(
	persist(
		(set) => ({
			token: null,
			isAuth: false,
			user: null,
			setUser: (user: User | null) =>
				set({
					user: user,
				}),
			setIsAuth: (auth: boolean) => set({ isAuth: auth }),
			setToken: (token: string | null) => set({ token: token }),
			logout: () => set({ token: null, isAuth: false }),
		}),
		{
			name: 'auth-storage',
			storage: {
				getItem: async (name: string) => {
					const data = await asyncStorage.getData(name);
					return data ? JSON.parse(data) : null;
				},
				setItem: async (
					name: string,
					value: StorageValue<TAuthService>,
				) => {
					await asyncStorage.setData(name, JSON.stringify(value));
				},
				removeItem: async (name: string) => {
					await asyncStorage.removeData(name);
				},
			},
		},
	),
);
