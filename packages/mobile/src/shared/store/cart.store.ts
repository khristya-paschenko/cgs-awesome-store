import { create } from 'zustand';
import { persist, StorageValue } from 'zustand/middleware';
import { asyncStorage } from '~/shared/services/async-storage.service';

export type CartItem = {
	productId: string;
	quantity: number;
	price: number;
	name: string;
};

type TCartService = {
	cart: CartItem[];
	total: number;
	setCart: (
		id: string,
		price: number,
		quantity: number,
		name: string,
	) => void;
	deleteCart: () => void;
	removeCartItem: (id: string) => void;
};

// TODO: create update cart item method
export const useCartStore = create<TCartService>()(
	persist(
		(set, get) => ({
			cart: [],
			total: 0,
			setCart: (id, price, quantity, name) => {
				const currentCart = get().cart;
				const existingItemIndex = currentCart.findIndex(
					(item) => item.productId === id,
				);

				let newTotal = get().total + price * quantity;

				if (existingItemIndex !== -1) {
					const updatedCart = [...currentCart];
					updatedCart[existingItemIndex].quantity += quantity;

					newTotal = updatedCart.reduce(
						(sum, item) => sum + item.price * item.quantity,
						0,
					);

					set({
						cart: updatedCart,
						total: Number(newTotal.toFixed(2)),
					});
				} else {
					const updatedCart = [
						...currentCart,
						{ productId: id, quantity, name, price },
					];

					set({
						cart: updatedCart,
						total: Number(newTotal.toFixed(2)),
					});
				}
			},
			deleteCart: () => set({ cart: [], total: 0 }),
			removeCartItem: (id) => {
				const currentCart = get().cart;
				const updatedCart = currentCart.filter(
					(item) => item.productId !== id,
				);
				const removedItem = currentCart.find(
					(item) => item.productId === id,
				);

				let newTotal = get().total;

				if (removedItem) {
					newTotal -= removedItem.price * removedItem.quantity;
				}

				set({
					cart: updatedCart,
					total: Number(newTotal.toFixed(2)),
				});
			},
		}),
		{
			name: 'cart-storage',
			storage: {
				getItem: async (name: string) => {
					const data = await asyncStorage.getData(name);
					return data ? JSON.parse(data) : null;
				},
				setItem: async (
					name: string,
					value: StorageValue<TCartService>,
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
