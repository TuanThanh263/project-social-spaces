import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	home(): string {
		return 'Home page!';
	}
}
