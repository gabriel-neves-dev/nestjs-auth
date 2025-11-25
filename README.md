# NestJS Auth

Este projeto é uma API de autenticação utilizando NestJS, Prisma e PostgreSQL.

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (opcional, para subir o banco de dados)
- [PostgreSQL](https://www.postgresql.org/) (caso não use Docker)

## Instalação

1. **Clone o repositório**
   ```sh
   git clone https://github.com/seu-usuario/nestjs-auth.git
   cd nestjs-auth
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

## Banco de Dados

Você pode subir o PostgreSQL localmente ou via Docker.

### Usando Docker

```sh
docker-compose up -d
```

### Manualmente

Crie um banco chamado `nest-auth` e configure o usuário e senha.

## Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL="postgresql://root:root@localhost:5432/nest-auth"
JWT_SECRET="sua_chave_secreta"
```

Altere os valores conforme sua configuração.

## Prisma

1. **Execute as migrações**
   ```sh
   npx prisma migrate deploy
   ```

2. **Gere o Prisma Client**
   ```sh
   npx prisma generate
   ```

## Rodando o Projeto

```sh
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /auth/login`  
  Autenticação de usuário.  
  **Body:**
  ```json
  {
    "email": "usuario@email.com",
    "password": "senha"
  }
  ```

## Testes

Para rodar os testes:

```sh
npm run test
```

## Estrutura do Projeto

```
src/
  auth/
    auth.controller.ts
    auth.service.ts
    login.dto.ts
  prisma/
    prisma.service.ts
  main.ts
prisma/
  schema.prisma
.env
```

## Observações

- Certifique-se de que o banco está rodando antes de iniciar o projeto.
- Se alterar o schema do Prisma, rode novamente `npx prisma generate`.