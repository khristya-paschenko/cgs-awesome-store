import { Response } from '~/modules/services/types/response';

export interface LoginRequestBody {
	email: string;
	password: string;
}

export type LoginResponseBody = TokenResponse;

export interface SignupRequestBody {
	email: string;
	name: string;
	phone: string;
	address: string;
	password: string;
}

export type SignupResponseBody = Response<User>;

export interface VerifyRequestBody {
	email: string;
	code: string;
}

export type VerifyResponseBody = TokenResponse;

export type SendCodeResponseBody = Response<null>;

export interface TokenResponse {
	accessToken: string;
	message: string;
	statusCode: number;
}

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
