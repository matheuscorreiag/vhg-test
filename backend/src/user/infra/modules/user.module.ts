import { Module } from '@nestjs/common';
import { CreateUserController } from '@user/infra/controllers/create-user.controller';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PrismaUserRepository } from '@user/infra/db/prisma/repositories/prisma-user.repository';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@user/infra/guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CreateUserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: UserRepository.TOKEN,
      useClass: PrismaUserRepository,
    },
    CreateUserUseCase,
    FindUserByEmailUseCase,
  ],
})
export class UserModule {}
