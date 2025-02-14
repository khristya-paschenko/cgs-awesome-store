import { PartialType } from '@nestjs/swagger';
import { DeliveryStatus, PaymentStatus } from '@prisma/client';
import { IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateOrderDetailDto } from '@/orders/dto/update-order-detail.dto';

export class UpdateOrderDto extends PartialType(UpdateOrderDetailDto) {
	@IsOptional()
	@IsEnum(PaymentStatus, {
		message:
			'PaymentStatus must be a valid enum value (COMPLETE, FAILED, PENDING).',
	})
	paymentStatus?: PaymentStatus;

	@IsOptional()
	@IsEnum(DeliveryStatus, {
		message:
			'DeliveryStatus must be a valid enum value (PENDING, IN_TRANSIT, DELIVERED).',
	})
	deliveryStatus?: DeliveryStatus;

	@IsOptional()
	@IsArray({ message: 'Order details must be an array.' })
	@ValidateNested({ each: true })
	@Type(() => UpdateOrderDetailDto)
	orderDetails?: UpdateOrderDetailDto[];
}
