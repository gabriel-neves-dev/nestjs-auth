import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// serve para nest se comunicar com prisma
// prisma client é a instancia que fara todas as operacoes

// on module init permite implementar conexão automatica ao iniciar usando a funcao $connect()

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
