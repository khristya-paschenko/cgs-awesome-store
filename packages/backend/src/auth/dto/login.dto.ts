import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	@ApiProperty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	@ApiProperty()
	@Transform(({ value }: TransformFnParams) => value?.trim())
	password: string;
}
