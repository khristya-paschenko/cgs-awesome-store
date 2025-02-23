import {
	IsBoolean,
	IsPhoneNumber,
	IsString,
	MinLength,
	IsOptional,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateUsersDto {
	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name?: string;

	@IsOptional()
	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	currentPassword?: string;

	@IsOptional()
	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	password?: string;

	@IsOptional()
	@IsPhoneNumber()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	phone?: string;

	@IsOptional()
	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	address?: string;

	@IsOptional()
	@IsBoolean()
	isVerified?: boolean;

	@IsOptional()
	@IsString()
	verificationCode?: string;
}
