import * as bcrypt from 'bcrypt';
import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignupAuthDto } from '@/auth/dto/signup-auth.dto';
import { Role, User } from '@prisma/client';
import { AuthEntity } from '@/auth/entity/auth.entity';
import { EmailService } from '@/email/email.service';
import { UnverifiedUserException } from '@/exceptions/unverified-user.exception';
import { UsersService } from '@/users/users.service';
import { GenerateVerificationCode } from '@/utils/generate-verification-code';
import { ResponseDto } from '@/common /dto/response.dto';
@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private usersService: UsersService,
		private readonly emailService: EmailService,
	) {}

	private signJwtToken(payload: Record<string, unknown>): string {
		return this.jwtService.sign(payload);
	}

	async verify(email: string, code: string): Promise<AuthEntity> {
		try {
			const { data } = await this.usersService.getUserBy({ email });

			if (!data) {
				throw new UnauthorizedException(
					'User not found with the provided email.',
				);
			}

			if (data.verificationCode !== code) {
				throw new UnauthorizedException(
					'Wrong verification code provided.',
				);
			}

			await this.usersService.updateUser(data.id, {
				isVerified: true,
			});

			return {
				statusCode: HttpStatus.OK,
				message: 'User successfully verified.',
				accessToken: this.signJwtToken({ userId: data.id }),
			};
		} catch (err) {
			throw new UnauthorizedException(
				'Verification failed. Please check your verification code.',
			);
		}
	}

	async sendCode(email: string): Promise<ResponseDto<null>> {
		try {
			const verificationCode = GenerateVerificationCode();

			const { data } = await this.usersService.getUserBy({ email });
			if (!data) {
				return {
					statusCode: HttpStatus.NOT_FOUND,
					message: `No user found with email: ${email}`,
				};
			}

			await this.usersService.updateUser(data.id, {
				verificationCode,
			});

			await this.emailService.verifyEmail(email, verificationCode);

			return {
				statusCode: HttpStatus.OK,
				message: 'Verification code sent successfully.',
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An unexpected error occurred while sending the verification code.',
			);
		}
	}

	async signup(body: SignupAuthDto, role: Role): Promise<ResponseDto<User>> {
		try {
			const verificationCode = GenerateVerificationCode();

			const { data } = await this.usersService.createUser(
				body,
				role,
				verificationCode,
			);

			if (data) {
				await this.emailService.verifyEmail(
					body.email,
					verificationCode,
				);

				return {
					statusCode: HttpStatus.CREATED,
					message:
						'User successfully created. Please check your email for verification.',
					data: { ...data },
				};
			}

			throw new InternalServerErrorException('Failed to create user.');
		} catch (err) {
			if (err instanceof InternalServerErrorException) {
				throw new InternalServerErrorException(
					'An error occurred during the signup process. Please try again later.',
				);
			}

			throw new UnprocessableEntityException(
				(err as UnprocessableEntityException).message,
			);
		}
	}

	async commonLogin(email: string, password: string): Promise<User> {
		const { data } = await this.usersService.getUserBy({ email });

		if (!data) {
			throw new NotFoundException(`No user found for email: ${email}`);
		}

		const isPasswordValid = await bcrypt.compare(password, data.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException(
				'Incorrect password. Please try again.',
			);
		}

		if (!data.isVerified) {
			throw new UnverifiedUserException();
		}

		return data;
	}

	// User
	async login(email: string, password: string): Promise<AuthEntity> {
		const user = await this.commonLogin(email, password);

		return {
			statusCode: HttpStatus.OK,
			message: 'User successfully logged in.',
			accessToken: this.signJwtToken({ userId: user?.id }),
		};
	}

	// Admin
	async adminLogin(email: string, password: string): Promise<AuthEntity> {
		const user = await this.commonLogin(email, password);

		if (user?.role !== Role.ADMIN) {
			throw new UnauthorizedException(
				'You do not have permission to login.',
			);
		}

		return {
			statusCode: HttpStatus.OK,
			message: 'Admin was successfully logged in.',
			accessToken: this.signJwtToken({ userId: user.id }),
		};
	}
}
