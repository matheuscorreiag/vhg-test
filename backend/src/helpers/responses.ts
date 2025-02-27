import { HttpException, HttpStatus } from '@nestjs/common';

export class ResponseHelper {
  static success(data: any, message?: string) {
    return {
      success: true,
      message,
      ...(data ? { data } : {}),
    };
  }

  static error(
    error: any,
    fallbackMessage: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    throw new HttpException(
      {
        success: false,
        message: error?.message || fallbackMessage || 'Unexpected error',
      },
      status,
    );
  }
}
