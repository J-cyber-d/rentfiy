import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message: string;
  result: T;
}

@Injectable()
export class ResponseService<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((result) => ({
        message:
          this.reflector.get<string>(
            'response_message',
            context.getHandler(),
          ) ||
          result.message ||
          'Success',
        statusCode: context.switchToHttp().getResponse().statusCode || 200,
        result: result.result || result,
      })),
      // tap((result) =>
      //   this.logger.log(result.message || 'Success' + result.result),
      // ),
    );
  }
}
