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
		return this.usersService.deleteUser(user.id);
	}

	@Patch(':id')
	updateUser(@Body() body: UpdateUsersDto, @Param('id') id: string) {
		console.log(body, 'patch users body');
		return this.usersService.updateUser(id, body);
	}
}
