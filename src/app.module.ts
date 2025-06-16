import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  //registro de artefatos do modulo
  imports: [UsersModule, PrismaModule, AuthModule],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}

// tudo no nest fica no modulo
// modulo é uma classe que tem decorator @Module do javascript es7
// o decorator @Module recebe um objeto com as seguintes propriedades:
// imports: outros modulos que serão importados nesse modulo
// controllers: lista de controllers que serão usados nesse modulo
// providers: lista de providers que serão usados nesse modulo
// exports: lista de providers que serão exportados para outros modulos

// só funcionara se estiver registrado no modulo
