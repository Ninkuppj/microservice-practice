// validation.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, from, mergeMap } from 'rxjs';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(private readonly dtoClass: any) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const dtoInstance = plainToClass(this.dtoClass, request.body);
    console.log( request.body);

    // Validate the incoming data using class-validator
    return from(validate(dtoInstance)).pipe(
      mergeMap(validationErrors => {
        if (validationErrors.length > 0) {
          // Throw an exception or return an error response with validation details
          const errorMessage = this.buildErrorMessage(validationErrors);
          console.log(errorMessage);

          throw new HttpException(
            `${this.buildErrorMessage(validationErrors)}`,
            400, // Bad Request
          );
        }

        return next.handle();
      }),
    );
  }

  private buildErrorMessage(errors: any[]): string {
    const errorMessage = errors
      .map(error => Object.values(error.constraints).join(', '))
      .join(', ');

    return `Validation failed: ${errorMessage}`;
  }
}
