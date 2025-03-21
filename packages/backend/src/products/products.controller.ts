import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { FilterOptions, ProductsService } from './products.service';
import { CreateProductsDto } from '@/products/dto/create-products.dto';
import { UpdateProductsDto } from '@/products/dto/update-products.dto';
import { Roles } from '@/decorators/role.decorator';
import { Role } from '@prisma/client';
import { Public } from '@/decorators/public.decorator';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Public()
	@Get()
	getAllProducts(@Query() options: FilterOptions) {
		return this.productsService.getAllProducts(options);
	}

	@Public()
	@Get(':id')
	getProductById(@Param('id') id: string) {
		return this.productsService.getProductById(id);
	}

	@Roles(Role.ADMIN)
	@Post()
	createProduct(@Body() body: CreateProductsDto) {
		return this.productsService.createProduct(body);
	}

	@Roles(Role.ADMIN)
	@Patch(':id')
	updateProduct(@Param('id') id: string, @Body() body: UpdateProductsDto) {
		return this.productsService.updateProduct(id, body);
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	deleteProduct(@Param('id') id: string) {
		return this.productsService.deleteProduct(id);
	}
}
