import { useOrdersStore } from '~/shared/store/orders.store';
import {
	DateSorting,
	DeliveryStatus,
	GetOrdersRequestQuery,
	GetOrdersResponseBody,
	ordersService,
	PaymentStatus,
} from '~/modules/services/orders';
import { GetProductsRequestQuery } from '~/modules/services/products';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';

export const useOrders = () => {
	const { params, totalPages, setOrders, setTotalPages } = useOrdersStore(
		(state) => state,
	);

	const getOrders = async (
		params: GetOrdersRequestQuery,
	): Promise<{
		orders: GetOrdersResponseBody;
		params: GetProductsRequestQuery;
	}> => {
		return {
			orders: await ordersService.getAllOrders(params),
			params,
		};
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: getOrders,
		onSuccess: (res: {
			orders: GetOrdersResponseBody;
			params: GetOrdersRequestQuery;
		}) => {
			setOrders(res.orders.data, res.params);
			setTotalPages(res.orders.total || 1);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response.data.message);
		},
	});

	const refreshOrders = async (
		params?: GetOrdersRequestQuery,
	): Promise<void> => {
		const newParams = {
			page: 1,
			sort: DateSorting.UNSET,
			limit: 10,
			paymentStatus: PaymentStatus.ALL,
			deliveryStatus: DeliveryStatus.ALL,
			...(params || {}),
		};

		await mutateAsync(newParams);
	};

	const handleRefresh = () => {
		refreshOrders({ ...params, page: 1 });
	};

	const handleNextPage = () => {
		if (params.page === totalPages) return;
		refreshOrders({ ...params, page: params.page + 1 });
	};

	return {
		refreshOrders,
		isPending,
		handleRefresh,
		handleNextPage,
	};
};
