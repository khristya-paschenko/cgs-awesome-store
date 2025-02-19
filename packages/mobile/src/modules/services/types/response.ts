export interface Response<T> {
	statusCode: number;
	message: string;
	total?: number;
	token?: string;
	data?: T | null;
}
