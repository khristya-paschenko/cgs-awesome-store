import { Response } from '~/modules/services/types/response';
import { Product } from '~/modules/services/products';

export enum PaymentStatus {
	ALL = undefined,
	COMPLETE = 'COMPLETE',
	FAILED = 'FAILED',
	PENDING = 'PENDING',
}

export enum DeliveryStatus {
	ALL = undefined,
	PENDING = 'PENDING',
	IN_TRANSIT = 'IN_TRANSIT',
	DELIVERED = 'DELIVERED',
}

export enum DateSorting {
	ASC ='asc',
	DESC = 'desc',
	UNSET = undefined,
}

export interface GetOrdersRequestQuery {
	page?: number;
	limit?: number;
	sort?: DateSorting;
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
}

export type GetOrdersResponseBody = Response<Order[]>;

export interface CreateOrderRequestBody {
	orderDetails: {
		productId: string;
		quantity: number;
	}[];
}

export type CreateOrderResponseBody = Response<Order>;

export type GetOrderByIdResponseBody = Response<SingleOrder>;

export interface SingleOrder extends Omit<Order, 'orderDetails'> {
	orderDetails: (OrderDetail & { product: Product })[];
}

export type UpdateOrderResponseBody = Response<Order>;

export interface UpdateOrderRequestBody {
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
	orderDetails?: {
		id?: string;
		quantity?: number;
	}[];
}

export interface Order {
	id: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	paymentStatus: PaymentStatus;
	deliveryStatus: DeliveryStatus;
	total: number;
	orderDetails: OrderDetail[];
}

export interface OrderDetail {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	priceAtPurchase: number;
}
