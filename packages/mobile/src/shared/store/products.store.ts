import {
	GetProductsRequestQuery,
	Product,
} from '~/modules/services/products/products.types';
import { create } from 'zustand';

type TProductsService = {
	products: Product[] | [];
	params: GetProductsRequestQuery;
	totalPages: number;
	setTotalPages: (total: number) => void;
	setProducts: (products: Product[], params: GetProductsRequestQuery) => void;
};

export const useProductsStore = create<TProductsService>((set) => ({
	products: [],
	params: {
		page: 1,
		sort: undefined,
		limit: 10,
		name: '',
	},
	totalPages: 1,
	setTotalPages: (total: number) => {
		set((state) => ({
			totalPages: Math.max(Math.ceil(total / state.params.limit), 1),
		}));
	},
	setProducts: (products: Product[], params: GetProductsRequestQuery) => {
		set((state) => {
			if (
				state.params.limit !== params.limit ||
				state.params.name !== params.name ||
				state.params.sort !== params.sort ||
				state.params.page >= params.page
			) {
				return { products, params };
			}

			return { products: [...state.products, ...products], params };
		});
	},
}));
