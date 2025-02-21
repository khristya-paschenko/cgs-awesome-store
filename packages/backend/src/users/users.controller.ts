import {
	Controller,
	Get,
	Delete,
	Body,
	Param,
	Patch,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UpdateUsersDto } from '@/users/dto/update-users.dto';
import { AtGuard } from '@/auth/guard/at-guard.guard';
import { GetUser } from '@/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@UseGuards(AtGuard)
	@Delete()
	deleteUser(@GetUser() user: User) {
		console.log(user, '---user');
		return this.usersService.deleteUser(user.id);
	}

	@Patch(':id')
	updateUser(@Body() request: UpdateUsersDto, @Param('id') id: string) {
		return this.usersService.updateUser(id, request);
	}
}
