import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { IsExistMiddleware } from '@/middleware/is-exist.middleware';

@Module({
	imports: [PrismaModule],
	controllers: [ProductsController],
	providers: [ProductsService, PrismaService],
	exports: [ProductsService],
})
export class ProductsModule {
	configure(consumer: MiddlewareConsumer) {
		const isExistMiddleware = new IsExistMiddleware(new PrismaService());
		consumer
			.apply(isExistMiddleware.use('product', 'id'))
			.forRoutes(
				{ path: 'products/:id', method: RequestMethod.GET },
				{ path: 'products/:id', method: RequestMethod.PATCH },
				{ path: 'products/:id', method: RequestMethod.DELETE },
			);
	}
}
