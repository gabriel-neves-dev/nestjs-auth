import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// inicia aplicação NestJS
async function bootstrap() {
  // recebe um modulo apra criar a instancia da aplicação
  // AppModule é o modulo raiz da aplicação
  const app = await NestFactory.create(AppModule);

  // passado porta 3000 ou porta definida na variável de ambiente PORT
  // para iniciar o servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
