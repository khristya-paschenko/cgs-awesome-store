import { useProductsStore } from '~/shared/store/products.store';
import {
	GetProductByIdResponseBody,
	GetProductsRequestQuery,
	GetProductsResponseBody,
	productsService,
} from '~/modules/services/products';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';

export const useProducts = () => {
	const { params, totalPages, setProducts, setTotalPages } = useProductsStore(
		(state) => state,
	);

	const getProducts = async (
		params: GetProductsRequestQuery,
	): Promise<{
		products: GetProductsResponseBody;
		params: GetProductsRequestQuery;
	}> => {
		return {
			products: await productsService.getAllProducts(params),
			params,
		};
	};

	const { mutateAsync, isPending } = useMutation({
		mutationFn: getProducts,
		onSuccess: (res: {
			products: GetProductsResponseBody;
			params: GetProductsRequestQuery;
		}) => {
			setProducts(res.products.data, res.params);
			setTotalPages(res.products.total || 1);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response.data.message);
		},
	});

	const refreshProducts = async (
		params?: GetProductsRequestQuery,
	): Promise<void> => {
		const newParams = {
			page: 1,
			sort: undefined,
			limit: 10,
			name: '',
			...(params || {}),
		};

		await mutateAsync(newParams);
	};

	const handleRefresh = () => {
		refreshProducts({ ...params, page: 1 });
	};
	const handleNextPage = () => {
		if (params.page === totalPages) return;
		refreshProducts({ ...params, page: params.page + 1 });
	};

	return {
		refreshProducts,
		isPending,
		handleRefresh,
		handleNextPage,
	};
};
