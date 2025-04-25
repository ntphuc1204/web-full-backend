import { ApiResponseKey } from "src/enum/api-response-key.enum";
import { HttpStatus, } from "@nestjs/common";

export class ApiResponse{
    private static getTimetamp(): string{
        return new Date().toISOString();
    }
    static ok<T>(
        data: T,
        message: string = '',
        httpStatus: number = HttpStatus.OK
    ):Record<string, any> {
        return {
            [ApiResponseKey.STATUS]: true,
            [ApiResponseKey.DATA]: data,
            [ApiResponseKey.CODE]: httpStatus,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.TIMESTAMP]: this.getTimetamp
        }
    }
    static error<T>(
        errors: T,
        message: string = '',
        httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
    ):Record<string, any> {
        return {
            [ApiResponseKey.STATUS]: false,
            [ApiResponseKey.ERRORS]: errors,
            [ApiResponseKey.CODE]: httpStatus,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.TIMESTAMP]:this.getTimetamp,
        }
    }
    static message<T>(
        message: string = '',
        httpStatus: number = HttpStatus.INTERNAL_SERVER_ERROR
    ): Record<string, any> { 
        return {
            [ApiResponseKey.CODE]: httpStatus === HttpStatus.OK||httpStatus === HttpStatus.INTERNAL_SERVER_ERROR,
            [ApiResponseKey.MESSAGE]: message,
            [ApiResponseKey.TIMESTAMP]:this.getTimetamp,
        }
    }
}