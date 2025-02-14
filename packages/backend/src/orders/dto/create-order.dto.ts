import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateOrderDetailDto } from '@/orders/dto/create-order-detail.dto';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderDto extends PartialType(CreateOrderDetailDto) {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateOrderDetailDto)
	orderDetails: CreateOrderDetailDto[];
}
