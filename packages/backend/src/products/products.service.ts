import {
	Injectable,
	HttpStatus,
	NotFoundException,
	InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductsDto } from '@/products/dto/create-products.dto';
import { ResponseDto } from '@/common /dto/response.dto';
import { UpdateProductsDto } from '@/products/dto/update-products.dto';

export interface FilterOptions {
	name?: string;
	sort?: 'asc' | 'desc';
	page?: string;
	limit?: string;
}

@Injectable()
export class ProductsService {
	constructor(private readonly prismaService: PrismaService) {}

	async getAllProducts(
		options: FilterOptions,
	): Promise<ResponseDto<Product[]>> {
		try {
			let limit = 0;
			let page = 0;

			const isPageValid = options?.page ? Number(options.page) > 0 : true;
			const isLimitValid = options?.limit
				? Number(options.limit) > 0
				: true;

			if (isPageValid && isLimitValid) {
				limit = Number(options?.limit) || 10;
				page = Number(options?.page) || 1;
			}

			const skip = Math.max((page - 1) * limit, 0);

			const data = await this.prismaService.product.findMany({
				where: {
					name: options.name
						? { contains: options.name, mode: 'insensitive' }
						: undefined,
				},
				orderBy: { price: options.sort || undefined },
				skip,
				take: limit,
			});

			if (!data || data.length === 0) {
				return {
					statusCode: HttpStatus.NO_CONTENT,
					message: 'No products found.',
					data: [],
				};
			}

			const total = await this.prismaService.product.count();

			return {
				statusCode: HttpStatus.OK,
				message: 'All products have been retrieved successfully.',
				total,
				data: [...data],
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while retrieving products.',
			);
		}
	}
	async createProduct(
		body: CreateProductsDto,
	): Promise<ResponseDto<Product>> {
		try {
			const data = await this.prismaService.product.create({
				data: { ...body },
			});
			return {
				statusCode: HttpStatus.CREATED,
				message: 'The product has been created successfully.',
				data: { ...data },
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while creating the product.',
			);
		}
	}

	async getProductById(id: string): Promise<ResponseDto<Product>> {
		try {
			const data = await this.prismaService.product.findUnique({
				where: { id },
			});

			if (data) {
				return {
					statusCode: HttpStatus.OK,
					message: 'The product was found successfully.',
					data: { ...data },
				};
			}

			throw new NotFoundException(`Product with ID ${id} not found.`);
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while fetching the product.',
			);
		}
	}

	async updateProduct(
		id: string,
		body: UpdateProductsDto,
	): Promise<ResponseDto<Product>> {
		try {
			const data = await this.prismaService.product.update({
				where: { id },
				data: { ...body },
			});

			return {
				statusCode: HttpStatus.OK,
				message: 'Product was updated successfully.',
				data: { ...data },
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while updating the product.',
			);
		}
	}

	async deleteProduct(id: string): Promise<ResponseDto<null>> {
		try {
			await this.prismaService.product.delete({ where: { id } });

			return {
				statusCode: HttpStatus.OK,
				message: 'Product was successfully deleted.',
				data: null,
			};
		} catch (err) {
			throw new InternalServerErrorException(
				'An error occurred while trying to delete the product.',
			);
		}
	}
}
