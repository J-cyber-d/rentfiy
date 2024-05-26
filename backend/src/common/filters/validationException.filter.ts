import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
@Catch(BadRequestException)
export class ValidationExpectionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const errorResponse = {
      statusCode: 400,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error: exception.getResponse()['error'],
      message: exception.getResponse()['message'],
    };
    //console.log(exception);
    Logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'ValidationExceptionFilter',
    );
    response.status(400).json(errorResponse);
  }
}
