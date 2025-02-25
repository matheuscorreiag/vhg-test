import { Module } from '@nestjs/common';
import { CreateUserController } from '@user/infra/controllers/create-user.controller';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { PrismaUserRepository } from '@user/infra/db/prisma/repositories/prisma-user.repository';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@user/infra/guards/auth.guard';
import { LoginUserController } from '@user/infra/controllers/login-user.controller';
import { Compare } from '@user/application/protocols/security/compare.security';
import { BcryptCompare } from '@user/infra/protocols/security/bcrypt/bcrypt.compare';
import { Encrypter } from '@user/application/protocols/security/encrypter.security';
import { BcryptEncrypter } from '@user/infra/protocols/security/bcrypt/bcrypt.encrypter';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [CreateUserController, LoginUserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: UserRepository.TOKEN,
      useClass: PrismaUserRepository,
    },
    {
      provide: Compare.TOKEN,
      useClass: BcryptCompare,
    },
    {
      provide: Encrypter.TOKEN,
      useClass: BcryptEncrypter,
    },
    CreateUserUseCase,
    FindUserByEmailUseCase,
  ],
})
export class UserModule {}
