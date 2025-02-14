import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { IsExistMiddleware } from '@/middleware/is-exist.middleware';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [],
})
export class OrdersModule {
	configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());
		consumer
			.apply(isExistMiddleware.use('order', 'id'))
			.forRoutes(
				{ path: 'orders/:id', method: RequestMethod.GET },
				{ path: 'orders/:id', method: RequestMethod.PATCH },
				{ path: 'orders/:id', method: RequestMethod.DELETE },
			);
	}
}
