import {
	CreateOrderRequestBody,
	CreateOrderResponseBody,
	ordersService,
} from '~/modules/services/orders';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '~/shared/utils/show-toast';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
	NAVIGATION_KEYS,
	RootBottomTabsParamList,
} from '~/modules/navigation/types';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import { useCartStore } from '~/shared/store/cart.store';

export const useCreateOrder = () => {
	const navigation = useNavigation<NavigationProp<RootBottomTabsParamList>>();
	const deleteCart = useCartStore((state) => state.deleteCart);

	const createOrder = async (
		data: CreateOrderRequestBody,
	): Promise<CreateOrderResponseBody> =>
		await ordersService.createOrder(data);

	const { mutateAsync, isPending } = useMutation({
		mutationFn: createOrder,
		onSuccess: (res: CreateOrderResponseBody) => {
			showToast('success', res.message);
			deleteCart();

			navigation.navigate(NAVIGATION_KEYS.TABS, {
				screen: NAVIGATION_KEYS.ORDERS,
			});
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response.data.message);
		},
	});

	const onSubmit = async (data: CreateOrderRequestBody): Promise<void> => {
		await mutateAsync(data);
	};

	return {
		isPending,
		onSubmit,
	};
};
