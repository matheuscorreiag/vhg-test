import { Encrypter } from '@user/application/protocols/security/encrypter.security';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class mockCreateUserUseCase implements CreateUserUseCase {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly encrypter: Encrypter,
  ) {}

  execute(user: User): Promise<User> {
    return Promise.resolve(user);
  }
}
