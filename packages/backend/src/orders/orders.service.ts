import {
	BadRequestException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import {
	DeliveryStatus,
	Order,
	OrderDetail,
	PaymentStatus,
} from '@prisma/client';
import { ResponseDto } from '@/common /dto/response.dto';
import { SingleOrder, SortParams } from '@/orders/orders-types';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateOrderDto } from '@/orders/dto/update-order.dto';
import { addAbortSignal } from 'node:stream';

@Injectable()
export class OrdersService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllOrders(
		userId: string,
		params: SortParams,
	): Promise<ResponseDto<Order[]>> {
		try {
			let limit = 0;
			let page = 0;

			const isPageValid = params?.page ? Number(params.page) > 0 : true;
			const isLimitValid = params?.limit
				? Number(params.limit) > 0
				: true;

			if (isPageValid && isLimitValid) {
				limit = Number(params?.limit) || 10;
				page = Number(params?.page) || 1;
			}

			const skip = Math.max((page - 1) * limit, 0);

			const data = await this.prismaService.order.findMany({
				where: {
					userId,
					paymentStatus: params.paymentStatus,
					deliveryStatus: params.deliveryStatus,
				},
				orderBy: { createdAt: params.sort || undefined },
				skip,
				take: limit,
				include: {
					orderDetails: true,
				},
			});

			if (!data || data.length === 0) {
				return {
					statusCode: HttpStatus.NO_CONTENT,
					message: 'No orders found',
					data: [],
				};
			}

			const total = await this.prismaService.order.count();

			return {
				statusCode: HttpStatus.OK,
				message: 'All orders have been retrieved successfully.',
				total,
				data: [...data],
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while retrieving orders.',
			);
		}
	}

	async getOrderById(id: string): Promise<ResponseDto<SingleOrder>> {
		try {
			const data = await this.prismaService.order.findUnique({
				where: { id },
				include: { orderDetails: true },
			});

			if (data) {
				const updatedOrder: SingleOrder = { ...data, orderDetails: [] };
				for (const detail of data.orderDetails) {
					const product = await this.prismaService.product.findUnique(
						{
							where: { id: detail.productId },
						},
					);

					if (!product) {
						throw new BadRequestException('Product not found.');
					}
					updatedOrder.orderDetails.push({
						...detail,
						product,
					});
				}

				return {
					statusCode: HttpStatus.OK,
					message: 'Order was retrieved successfully.',
					data: updatedOrder,
				};
			}
			throw new NotFoundException(`Order with ID ${id} not found.`);
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while retrieving orders.',
			);
		}
	}

	async createOrder(
		userId: string,
		body: CreateOrderDto,
	): Promise<ResponseDto<Order>> {
		try {
			const data = await this.prismaService.$transaction(async (tx) => {
				const order = await tx.order.create({
					data: {
						userId,
						total: 0,
					},
				});

				let total = 0;

				for (const item of body.orderDetails) {
					const product = await tx.product.findUnique({
						where: { id: item.productId },
					});

					if (product) {
						await tx.orderDetail.create({
							data: {
								...item,
								priceAtPurchase: product.price * item.quantity,
								orderId: order.id,
							},
						});

						if (product.stock < item.quantity) {
							throw new BadRequestException(
								`Requested quantity (${item.quantity}) exceeds available stock (${product.stock}).`,
							);
						}

						await tx.product.update({
							where: { id: item.productId },
							data: {
								stock: product.stock - item.quantity,
							},
						});

						total += product.price * item.quantity;
					}
				}

				return tx.order.update({
					where: { id: order.id },
					data: { total },
					include: {
						orderDetails: true,
					},
				});
			});

			return {
				statusCode: HttpStatus.CREATED,
				message: 'Order successfully created.',
				data,
			};
		} catch (err) {
			if (err instanceof BadRequestException) {
				throw err;
			}

			throw new InternalServerErrorException(
				'An unexpected error occurred while creating an order.',
			);
		}
	}
	async updateOrder(
		id: string,
		body: UpdateOrderDto,
	): Promise<ResponseDto<Order | null>> {
		try {
			const data = await this.prismaService.$transaction(async (tx) => {
				if (body?.paymentStatus === PaymentStatus.COMPLETE) {
					return tx.order.update({
						where: { id },
						data: { paymentStatus: body.paymentStatus },
						include: { orderDetails: true },
					});
				}

				if (
					body.deliveryStatus === DeliveryStatus.DELIVERED ||
					body.deliveryStatus === DeliveryStatus.IN_TRANSIT
				) {
					const order = await tx.order.findUnique({ where: { id } });

					if (!order) {
						throw new BadRequestException(
							`Order with id ${id} not found.`,
						);
					}

					if (
						order.paymentStatus === PaymentStatus.FAILED ||
						order.paymentStatus === PaymentStatus.PENDING
					) {
						throw new BadRequestException(
							`Cannot update delivery status to ${body.deliveryStatus} when payment status is ${order.paymentStatus}.`,
						);
					}

					return tx.order.update({
						where: { id },
						data: { deliveryStatus: body.deliveryStatus },
						include: { orderDetails: true },
					});
				}

				if (body.orderDetails && body.orderDetails.length > 0) {
					for (const detail of body.orderDetails) {
						if (
							!detail.id ||
							typeof detail?.quantity !== 'number' ||
							detail.quantity < 0
						) {
							throw new BadRequestException(
								'Order detail id and quantity must be provided to update it.',
							);
						}

						const orderDetail = await tx.orderDetail.findUnique({
							where: { id: detail.id, orderId: id },
						});

						if (!orderDetail) {
							throw new BadRequestException(
								`Order detail with id ${detail.id} not found.`,
							);
						}

						const product = await tx.product.findUnique({
							where: { id: orderDetail.productId },
						});

						if (!product) {
							throw new BadRequestException(
								`Product associated with order detail id ${detail.id} not found.`,
							);
						}

						const quantityDif =
							orderDetail.quantity - detail.quantity;

						const stock = product.stock + quantityDif;

						if (stock < 0) {
							throw new BadRequestException(
								`Requested additional quantity (${detail.quantity}) exceeds available stock (${product.stock}).`,
							);
						}

						await tx.product.update({
							where: { id: orderDetail.productId },
							data: {
								stock,
							},
						});

						if (detail.quantity === 0) {
							await tx.orderDetail.delete({
								where: { id: detail.id },
							});
						} else {
							await tx.orderDetail.update({
								where: { id: detail.id },
								data: {
									quantity: detail.quantity,
									priceAtPurchase:
										product.price * detail.quantity,
								},
							});
						}
					}
				}

				const orderDetails = (await tx.orderDetail.findMany({
					where: { orderId: id },
				})) as unknown as OrderDetail[];

				const total = orderDetails.reduce(
					(acc, item) => acc + item.priceAtPurchase,
					0,
				);

				const order = await tx.order.update({
					where: { id },
					data: { total, paymentStatus: body.paymentStatus },
					include: { orderDetails: true },
				});

				if (order.orderDetails.length === 0) {
					await tx.order.delete({ where: { id: order.id } });
					return null;
				} else {
					return order;
				}
			});

			if (data) {
				return {
					statusCode: HttpStatus.OK,
					message: 'Order was updated successfully',
					data,
				};
			} else {
				return {
					statusCode: HttpStatus.OK,
					message: 'Order was deleted successfully',
				};
			}
		} catch (err) {
			if (err instanceof BadRequestException) {
				throw err;
			}

			throw new InternalServerErrorException(
				'An unexpected error occurred while updating an order.',
			);
		}
	}
}
