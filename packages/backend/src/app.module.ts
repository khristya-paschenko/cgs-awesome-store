import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ProductsModule } from './products/products.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/guards/roles.guard';
import { OrdersModule } from './orders/orders.module';

@Module({
	imports: [
		UsersModule,
		AuthModule,
		ConfigModule,
		EmailModule,
		ProductsModule,
		OrdersModule,
	],
	controllers: [UsersController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
		UsersService,
	],
})
export class AppModule {}
