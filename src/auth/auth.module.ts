import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '2h', algorithm: 'HS256' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
