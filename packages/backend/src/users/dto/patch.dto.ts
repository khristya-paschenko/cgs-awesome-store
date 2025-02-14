import { IsBoolean, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class UpdateDto {
	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name?: string;

	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	password?: string;

	@IsPhoneNumber()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	phone?: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	address?: string;

	@IsBoolean()
	isVerified?: boolean;

	@IsString()
	verificationCode?: string;
}
