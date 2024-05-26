import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { MongooseError } from 'mongoose';
import { Request, Response } from 'express';

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 400;
    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error:
        exception.name === 'ValidationError'
          ? 'MongooseValidationError'
          : exception.name,
      message: exception.message,
    };
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'MongooseExceptionFilter',
    );
    response.status(status).json(errorResponse);
  }
}
