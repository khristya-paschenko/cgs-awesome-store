import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext): User => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;
		return user?.data;
	},
);
