import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '@/email/email.module';
import { AtStrategy } from '@/auth/strategy/at-strategy';
import { UsersModule } from '@/users/users.module';

@Module({
	imports: [
		EmailModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1w' },
		}),
		UsersModule,
	],
	controllers: [AuthController],
	providers: [AuthService, AtStrategy],
})
export class AuthModule {}
