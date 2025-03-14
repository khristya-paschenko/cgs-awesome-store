import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
