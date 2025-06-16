import { Roles } from '@prisma/client';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Roles;
}
// dto -> data transfer object
// sõ tem dados, sem lõgica, possivel transferir entre camadas do projeto
