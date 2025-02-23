import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
	@IsOptional()
	@IsUUID()
	id?: string;

	@IsOptional()
	@IsNumber()
	quantity?: number;
}
