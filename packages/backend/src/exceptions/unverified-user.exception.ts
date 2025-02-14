import { HttpException, HttpStatus } from '@nestjs/common';

export class UnverifiedUserException extends HttpException {
	constructor() {
		super('User email is not verified.', HttpStatus.FORBIDDEN);
	}
}
