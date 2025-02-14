import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
	@ApiProperty()
	accessToken: string;

	message: string;

	statusCode: number;
}
