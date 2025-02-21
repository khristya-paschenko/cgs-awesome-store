import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class AuthEntity {
	@ApiProperty()
	accessToken: string;

	message: string;

	statusCode: number;

	data: User;
}
