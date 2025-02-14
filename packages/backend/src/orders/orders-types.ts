import {
	DeliveryStatus,
	Order,
	OrderDetail,
	PaymentStatus,
	Product,
} from '@prisma/client';

export interface SortParams {
	page?: number;
	limit?: number;
	sort?: 'asc' | 'desc';
	paymentStatus?: PaymentStatus;
	deliveryStatus?: DeliveryStatus;
}

export interface SingleOrder extends Omit<Order, 'orderDetails'> {
	orderDetails: (OrderDetail & { product: Product })[];
}
