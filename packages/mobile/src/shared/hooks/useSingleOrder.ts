import React from 'react';
import {
	GetOrderByIdResponseBody,
	ordersService,
	SingleOrder,
} from '~/modules/services/orders';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';

export const useSingleOrder = () => {
	const [order, setOrder] = React.useState<SingleOrder | undefined>();

	const getOrderById = async (
		id: string,
	): Promise<GetOrderByIdResponseBody> => {
		return await ordersService.getOrderById(id);
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: getOrderById,
		onSuccess: (res: GetOrderByIdResponseBody) => {
			setOrder(res.data);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response?.data.message);
		},
	});

	const getOrder = (id: string) => {
		return mutateAsync(id);
	};

	return {
		isPending,
		getOrder,
		order,
	};
};
