/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() loginDto: LoginDto) {}
}
