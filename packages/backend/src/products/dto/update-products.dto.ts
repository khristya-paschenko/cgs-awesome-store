import {
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateProductsDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name?: string;

	@IsOptional()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	description?: string;

	@IsOptional()
	@IsInt()
	@IsNotEmpty()
	stock?: number;

	@IsOptional()
	@IsNotEmpty()
	@IsNumber()
	price?: number;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	category?: string;
}
