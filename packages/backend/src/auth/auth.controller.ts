import { Controller, Body, Post, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupAuthDto } from '@/auth/dto/signup-auth.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AtGuard } from '@/auth/guard/at-guard.guard';
import { Role } from '@prisma/client';
import { RolesGuard } from '@/guards/roles.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Patch('verify')
	verify(@Body('email') email: string, @Body('code') code: string) {
		return this.authService.verify(email, code);
	}

	@Patch('send-code')
	sendCode(@Body('email') email: string) {
		return this.authService.sendCode(email);
	}

	// USER
	@Post('login')
	@ApiOkResponse({ type: AuthEntity })
	login(@Body() { email, password }: LoginAuthDto) {
		return this.authService.login(email, password);
	}

	@Post('signup')
	signup(@Body() body: SignupAuthDto) {
		return this.authService.signup(body, Role.USER);
	}

	@UseGuards(AtGuard)
	@Post('logout')
	logout() {
		return 'logout';
	}

	// ADMIN
	@UseGuards(RolesGuard)
	@Post('admin/signup')
	adminSignup(@Body() body: SignupAuthDto) {
		return this.authService.signup(body, Role.ADMIN);
	}

	@UseGuards(RolesGuard)
	@Post('admin/login')
	@ApiOkResponse({ type: AuthEntity })
	adminLogin(@Body() { email, password }: LoginAuthDto) {
		return this.authService.adminLogin(email, password);
	}

	@UseGuards(AtGuard)
	@Post('admin/logout')
	adminLogout() {}
}
