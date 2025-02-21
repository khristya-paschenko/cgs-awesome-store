import { User } from '~/modules/services/auth';
import { Response } from '~/modules/services/types/response';

export type UpdateUserResponseBody = Response<User>;

export interface UpdateUserRequestBody {
	name?: string;
	password?: string;
	phone?: string;
	address?: string;
}

export type DeleteUserResponseBody = Response<null>;
