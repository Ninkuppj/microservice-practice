// validation.service.ts

import { HttpException, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationService {
  async validateDTO(dtoClassName: string, data: any): Promise<void> {
    const dtoClass = this.getDTOClass(dtoClassName);
    const dtoInstance = plainToClass(dtoClass, data);
    const validationErrors = await validate(dtoInstance);

    if (validationErrors.length > 0) {
      const errorMessage = this.buildErrorMessage(validationErrors);
      throw new HttpException(
        errorMessage,
        400, // Bad Request
      );
    }
  }

  private getDTOClass(dtoClassName: string): any {
    // Logic to dynamically import and return the DTO class based on the class name
    // You may need to adjust this based on your project structure
    const dtoModule = require('path-to-your-dto-module'); // Replace with the actual path
    return dtoModule[dtoClassName];
  }

  private buildErrorMessage(errors: any[]): string {
    const errorMessage = errors
      .map(error => Object.values(error.constraints).join(', '))
      .join(', ');

    return `Validation failed: ${errorMessage}`;
  }
}
