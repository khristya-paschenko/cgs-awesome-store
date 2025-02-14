import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from '@/decorators/get-user.decorator';
import { SortParams } from '@/orders/orders-types';
import { User } from '@prisma/client';
import { Public } from '@/decorators/public.decorator';
import { UpdateOrderDto } from '@/orders/dto/update-order.dto';
import { AtGuard } from '@/auth/guard/at-guard.guard';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@UseGuards(AtGuard)
	@Public()
	@Get()
	getAllOrders(@GetUser() user: User, @Query() params: SortParams) {
		return this.ordersService.getAllOrders(user.id, params);
	}

	@UseGuards(AtGuard)
	@Public()
	@Get(':id')

	getOrderById(@Param('id') id: string) {
		return this.ordersService.getOrderById(id);
	}

	@UseGuards(AtGuard)
	@Public()
	@Post()
	createOrder(@GetUser() user: User, @Body() body: CreateOrderDto) {
		return this.ordersService.createOrder(user.id, body);
	}

	@UseGuards(AtGuard)
	@Public()
	@Patch(':id')
	updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
		return this.ordersService.updateOrder(id, body);
	}
}
