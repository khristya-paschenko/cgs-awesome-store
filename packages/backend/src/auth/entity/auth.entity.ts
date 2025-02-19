import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity<T> {
	@ApiProperty()
	accessToken: string;

	message: string;

	statusCode: number;

	data: T;
}
