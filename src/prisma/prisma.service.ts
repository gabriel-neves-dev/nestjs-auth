// filepath: /Users/gabrielneves/Documents/Projetos/nestjs-auth/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg'; // Instale com npm install pg

// serve para nest se comunicar com prisma
// prisma client é a instancia que fara todas as operacoes

// on module init permite implementar conexão automatica ao iniciar usando a funcao $connect()

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Crie um pool de conexão PostgreSQL
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });

    // Use o adapter PrismaPg para PostgreSQL
    const adapter = new PrismaPg(pool);

    // Passe o adapter ao PrismaClient
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super({ adapter } );
  }

  async onModuleInit() {
    await this.$connect();
  }
}