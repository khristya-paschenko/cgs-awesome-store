export interface Response<T> {
	statusCode: number;
	message: string;
	total?: number;
	data?: T | null;
}
