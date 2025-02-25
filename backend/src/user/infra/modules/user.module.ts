import { Module } from '@nestjs/common';
import { CreateUserController } from '@user/infra/controllers/create-user.controller';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PrismaUserRepository } from '@user/infra/db/prisma/repositories/prisma-user.repository';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    {
      provide: UserRepository.TOKEN,
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    FindUserByEmailUseCase,
  ],
})
export class UserModule {}
