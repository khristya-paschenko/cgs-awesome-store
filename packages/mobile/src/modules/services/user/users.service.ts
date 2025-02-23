import {
	DeleteUserResponseBody,
	UpdateUserRequestBody,
	UpdateUserResponseBody,
} from '~/modules/services/user/users.types';
import { HttpFactoryService } from '~/shared/services/http-factory.service';

class UsersService {
	private httpService = new HttpFactoryService().createAuthHttpService();

	public async updateUser(
		id: string,
		data: UpdateUserRequestBody,
	): Promise<UpdateUserResponseBody> {
		return this.httpService.patch(`users/${id}`, data);
	}

	public async deleteUser(): Promise<DeleteUserResponseBody> {
		return this.httpService.delete(`users`);
	}
}

export const usersService = new UsersService();
