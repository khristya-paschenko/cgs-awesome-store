import { Controller, Get, Delete, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UpdateDto } from '@/users/dto/patch.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getAllUsers() {
		return this.usersService.getAllUsers();
	}

	@Delete(':id')
	deleteUser(@Param('id') id: string) {
		return this.usersService.deleteUser(id);
	}

	@Patch(':id')
	updateUser(@Body() request: UpdateDto, @Param('id') id: string) {
		return this.usersService.updateUser(id, request);
	}
}
