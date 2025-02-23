import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignupAuthDto } from '@/auth/dto/signup-auth.dto';
import { ResponseDto } from '@/common /dto/response.dto';
import { UpdateUsersDto } from '@/users/dto/update-users.dto';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	private handleError(error: unknown): never {
		console.error('Error caught in handleError:', error);
		throw error instanceof HttpException
			? error
			: new InternalServerErrorException('An unexpected error occurred.');
	}

	async createUser(
		body: SignupAuthDto,
		role: Role,
		verificationCode: string,
	): Promise<ResponseDto<User>> {
		try {
			const data = await this.prismaService.user.create({
				data: {
					...body,
					password: await bcrypt.hash(body.password, 10),
					role,
					verificationCode,
				},
			});
			return {
				statusCode: HttpStatus.CREATED,
				message: 'User was successfully created.',
				data: { ...data },
			};
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				if (err.code === 'P2002') {
					throw new UnprocessableEntityException(
						'Email is already used.',
					);
				}
			}
			throw new InternalServerErrorException(
				'An unexpected error occurred while creating the user.',
			);
		}
	}

	async getAllUsers(): Promise<ResponseDto<User[]>> {
		try {
			const data = await this.prismaService.user.findMany();
			if (!data || data.length === 0) {
				return {
					statusCode: HttpStatus.OK,
					message: 'No users found.',
					data: [],
				};
			}

			return {
				statusCode: HttpStatus.OK,
				message: 'All users retrieved successfully.',
				data: [...data],
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while retrieving users.',
			);
		}
	}

	async updateUser(
		id: string,
		body: UpdateUsersDto,
	): Promise<ResponseDto<User>> {
		try {
			if (body.currentPassword || body.password) {
				if (!body.currentPassword) {
					// return this.handleError(
					// 	new BadRequestException(
					// 		'Old password must be provided.',
					// 	),
					// );
					throw new BadRequestException(
						'Old password must be provided.',
					);
				}

				if (!body.password) {
					// return this.handleError(
					// 	new BadRequestException(
					// 		'New password must be provided.',
					// 	),
					// );
					throw new BadRequestException(
						'New password must be provided.',
					);
				}

				const user = await this.prismaService.user.findUnique({
					where: { id },
				});

				if (!user || !user.password) {
					return this.handleError(
						new NotFoundException(`User with id ${id} not found.`),
					);
				}

				const isPasswordValid = await bcrypt.compare(
					body.currentPassword,
					user.password,
				);

				if (!isPasswordValid) {
					return this.handleError(
						new BadRequestException('Incorrect old password.'),
					);
				}

				const updatedUser = await this.prismaService.user.update({
					where: { id },
					data: {
						password: await bcrypt.hash(body.password, 10),
					},
				});

				if (!updatedUser) {
					return this.handleError(
						new InternalServerErrorException(
							'Failed to update user password.',
						),
					);
				}

				return {
					statusCode: HttpStatus.OK,
					message: 'User password updated successfully.',
					data: updatedUser,
				};
			}

			const updatedUser = await this.prismaService.user.update({
				where: { id },
				data: { ...body },
			});

			if (!updatedUser) {
				return this.handleError(
					new InternalServerErrorException('Failed to update user.'),
				);
			}

			return {
				statusCode: HttpStatus.OK,
				message: 'User successfully updated.',
				data: updatedUser,
			};
		} catch (error) {
			return this.handleError(error);
		}
	}

	async deleteUser(id: string): Promise<ResponseDto<null>> {
		try {
			await this.prismaService.user.delete({ where: { id } });

			return {
				statusCode: HttpStatus.OK,
				message: 'User successfully deleted.',
			};
		} catch (err) {
			console.error('Error deleting user:', err);
			if (
				err instanceof Prisma.PrismaClientKnownRequestError &&
				err.code === 'P2025'
			) {
				throw new NotFoundException(`User with id ${id} not found.`);
			}
			throw new InternalServerErrorException(
				'An error occurred while deleting the user.',
			);
		}
	}

	async getUserBy(
		data: Prisma.UserWhereUniqueInput,
	): Promise<ResponseDto<User>> {
		try {
			const user = await this.prismaService.user.findUnique({
				where: data,
			});

			if (!user) {
				return {
					statusCode: HttpStatus.NOT_FOUND,
					message: 'User not found',
					data: null,
				};
			}

			return {
				statusCode: HttpStatus.OK,
				message: 'User fetched successfully.',
				data: { ...user },
			};
		} catch (err) {
			throw new Error('Unable to fetch user. Please try again later.');
		}
	}
}
