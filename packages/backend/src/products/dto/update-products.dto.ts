import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateProductsDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name?: string;

	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	description?: string;

	@IsInt()
	@IsNotEmpty()
	stock?: number;

	@IsNotEmpty()
	@IsNumber()
	price?: number;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	category?: string;
}
