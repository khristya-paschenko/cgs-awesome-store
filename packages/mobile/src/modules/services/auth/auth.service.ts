import { HttpService } from '~/shared/services/http.service';
import {
	LoginRequestBody,
	LoginResponseBody, SendCodeResponseBody,
	SignupRequestBody,
	SignupResponseBody,
	VerifyRequestBody, VerifyResponseBody
} from "./index";
import { mainAxios } from '~/shared/services/mainAxios';

class AuthService {
	private httpService: HttpService;
	constructor() {
		this.httpService = new HttpService(
			mainAxios,
			`${process.env.EXPO_PUBLIC_BASE_URL}/auth`,
		);
	}

	public async login(data: LoginRequestBody): Promise<LoginResponseBody> {
		return this.httpService.post('login', data);
	}

	public async signup(data: SignupRequestBody): Promise<SignupResponseBody> {
		return this.httpService.post('signup', data);
	}

	public async verify(data: VerifyRequestBody): Promise<VerifyResponseBody> {
		return this.httpService.patch('verify', data);
	}

	public async sendCode(data: { email: string }): Promise<SendCodeResponseBody> {
		return this.httpService.patch('send-code', data);
	}
}

export const authService = new AuthService();
