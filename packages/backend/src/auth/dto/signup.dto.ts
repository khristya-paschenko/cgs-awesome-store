import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
export class SignupDto {
	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	name: string;

	@MinLength(6)
	@Transform(({ value }: TransformFnParams) => value?.trim())
	password: string;

	@IsEmail()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	email: string;

	@IsPhoneNumber()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	phone: string;

	@IsString()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	address: string;
}
