export interface ResponseDto<T> {
  statusCode: number;
  message: string;
  total?: number;
  data?: T | null;
}
