import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailDto } from './create-order-detail.dto';
import { IsNumber, IsUUID } from 'class-validator';

export class UpdateOrderDetailDto extends PartialType(CreateOrderDetailDto) {
	@IsUUID()
	id?: string;

	@IsNumber()
	quantity?: number;
}
