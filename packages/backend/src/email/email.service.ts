import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SandGrid from '@sendgrid/mail';

@Injectable()
export class EmailService {
	constructor(readonly configService: ConfigService) {
		const apiKey = configService.get('SENDGRID_API_KEY');
		SandGrid.setApiKey(apiKey);
	}

	async verifyEmail(email: string, code: string) {
		const message = {
			to: email,
			from: 'khristya.paschenko@gmail.com',
			subject: 'Email Verification',
			html: `<h1>Your email verification code: ${code}</h1>`,
		};

		await SandGrid.send(message);
	}
}
