import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateOrderDetailDto {
	@IsString()
	productId: string;

	@IsNumber()
	quantity: number;
}
