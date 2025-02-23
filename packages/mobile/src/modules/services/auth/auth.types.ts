import { Response } from '~/modules/services/types/response';

export interface LoginRequestBody {
	email: string;
	password: string;
}

export type LoginResponseBody = AuthEntity;

export interface AuthEntity {
	accessToken: string;
	message: string;
	statusCode: string;
	data: User;
}

export interface SignupRequestBody {
	email: string;
	name: string;
	phone: string;
	address: string;
	password: string;
}

export type SignupResponseBody = Response<null>;

export interface VerifyRequestBody {
	email: string;
	code: string;
}

export type VerifyResponseBody = AuthEntity;

export type SendCodeResponseBody = Response<null>;

export interface User {
	id: string;
	email: string;
	name: string;
	phone: string;
	address: string;
	password: string;
	role: 'ADMIN' | 'USER';
	verificationCode: string;
	isVerified: boolean;
}
