import { useMutation } from '@tanstack/react-query';
import {
	GetProductByIdResponseBody,
	Product,
	productsService,
} from '~/modules/services/products';
import React from 'react';
import { AxiosError } from 'axios';
import { IServerError } from '~/shared/services/types';
import { showToast } from '~/shared/utils/show-toast';

export const useSingleProduct = () => {
	const [product, setProduct] = React.useState<Product | undefined>();
	const getProductById = async (
		id: string,
	): Promise<GetProductByIdResponseBody> => {
		return await productsService.getProductById(id);
	};
	const { mutateAsync, isPending } = useMutation({
		mutationFn: getProductById,
		onSuccess: (res: GetProductByIdResponseBody) => {
			setProduct(res.data);
		},
		onError: (err: AxiosError<IServerError>) => {
			showToast('error', err.response?.data.message);
		},
	});

	const getProduct = (id: string) => {
		return mutateAsync(id);
	};

	return {
		isPending,
		getProduct,
		product,
	};
};
