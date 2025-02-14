import {
	ordersService,
	UpdateOrderRequestBody,
	UpdateOrderResponseBody,
} from '~/modules/services/orders';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '~/shared/utils/show-toast';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';

export const useUpdateOrder = () => {
	const patchOrder = async ({
		id,
		data,
	}: {
		id: string;
		data: UpdateOrderRequestBody;
	}): Promise<UpdateOrderResponseBody> => {
		return await ordersService.updateOrder(id, data);
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: patchOrder,
		onSuccess: (res: UpdateOrderResponseBody) => {
			showToast('success', res.message);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response?.data.message);
		},
	});

	const updateOrder = (id: string, data: UpdateOrderRequestBody) => {
		return mutateAsync({ id, data });
	};

	return { updateOrder, isPending };
};
