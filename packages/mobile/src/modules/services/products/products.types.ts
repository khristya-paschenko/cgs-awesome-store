import { Response } from '~/modules/services/types/response';

export interface Product {
	id: string;
	name: string;
	description: string;
	stock: number;
	price: number;
	category: string;
}

export interface GetProductsRequestQuery {
	name?: string;
	sort?: 'asc' | 'desc' | undefined;
	page?: number;
	limit?: number;
}

export type GetProductsResponseBody = Response<Product[]>;

export type GetProductByIdResponseBody = Response<Product>;
