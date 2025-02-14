import { HttpFactoryService } from '~/shared/services/http-factory.service';
import {
	CreateOrderRequestBody,
	CreateOrderResponseBody,
	GetOrderByIdResponseBody,
	GetOrdersRequestQuery,
	UpdateOrderResponseBody,
	UpdateOrderRequestBody,
} from '~/modules/services/orders/orders.types';

export class OrdersService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async getAllOrders(
		params?: GetOrdersRequestQuery,
	): Promise<GetOrdersRequestQuery> {
		return this.httpService.get('orders', { params });
	}

	public async getOrderById(id: string): Promise<GetOrderByIdResponseBody> {
		return this.httpService.get(`orders/${id}`);
	}

	public async createOrder(
		data: CreateOrderRequestBody,
	): Promise<CreateOrderResponseBody> {
		return this.httpService.post('orders', data);
	}

	public async updateOrder(
		id: string,
		data: UpdateOrderRequestBody,
	): Promise<UpdateOrderResponseBody> {
		return this.httpService.patch(`orders/${id}`, data);
	}
}

export const ordersService = new OrdersService();
