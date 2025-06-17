/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {}
}
