import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiResponse } from 'src/common/base/api-response';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors = this.formatError(errors);
      const response = ApiResponse.error(formattedErrors, "false", HttpStatus.BAD_REQUEST);
      throw new HttpException(response, HttpStatus.BAD_REQUEST);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatError(errors: ValidationError[]) {
    const result = {};
    errors.forEach(error => {
      if (error.constraints) {
        result[error.property] = Object.values(error.constraints);
      }
    });
    return result;
  }
}
