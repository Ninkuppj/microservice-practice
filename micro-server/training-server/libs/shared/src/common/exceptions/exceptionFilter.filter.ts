// custom-exception.filter.ts

import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const request = ctx.getRequest<Request>();
    const message = exception.message || 'Internal Server Error';

    response.status(status).json({
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message:message
      });
  }
}
