import { HttpFactoryService } from '~/shared/services/http-factory.service';
import {
	GetProductByIdResponseBody,
	GetProductsRequestQuery,
	GetProductsResponseBody,
} from '~/modules/services/products/products.types';

export class ProductsService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async getAllProducts(
		params?: GetProductsRequestQuery,
	): Promise<GetProductsResponseBody> {
		return this.httpService.get('products', { params });
	}

	public async getProductById(
		id: string,
	): Promise<GetProductByIdResponseBody> {
		return this.httpService.get(`products/${id}`);
	}
}

export const productsService = new ProductsService();
