import { create } from 'zustand';
import {
	DeliveryStatus,
	GetOrdersRequestQuery,
	Order,
	PaymentStatus,
} from '~/modules/services/orders';

type TOrdersService = {
	orders: Order[] | [];
	params: GetOrdersRequestQuery;
	totalPage: number;
	setTotalPages: (total: number) => void;
	setOrders: (orders: Order[], params: GetOrdersRequestQuery) => void;
};
export const useOrdersStore = create<TOrdersService>((set) => ({
	orders: [],
	params: {
		page: 1,
		sort: undefined,
		limit: 10,
		paymentStatus: PaymentStatus.PENDING,
		deliveryStatus: DeliveryStatus.PENDING,
	},
	totalPages: 1,
	setTotalPages: (total: number) => {
		set((state) => ({
			totalPages: Math.max(Math.ceil(total / state.params.limit), 1),
		}));
	},
	setOrders: (orders: Order[], params: GetOrdersRequestQuery) => {
		set((state) => {
			if (
				state.params.limit !== params.limit ||
				state.params.sort !== params.sort ||
				state.params.page >= params.page ||
				state.params.paymentStatus !== params.paymentStatus ||
				state.params.deliveryStatus !== params.deliveryStatus
			) {
				return { orders, params };
			}

			return { orders: [...state.orders, ...orders], params };
		});
	},
}));
