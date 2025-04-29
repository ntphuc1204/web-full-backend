import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'pipes/validation.pipe';
import { AuthRequest } from './auth.request.dto';
@Controller("/v1/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body(new ValidationPipe()) request: AuthRequest): any {
    try {
      console.log(request);
      return this.authService.attempt();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  @Get('/user-info')
  getUser() {
    return ['phucs', 'trong'];
  }
  
}

