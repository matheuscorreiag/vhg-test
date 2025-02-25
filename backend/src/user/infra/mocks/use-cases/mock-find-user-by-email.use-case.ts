import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class mockCreateUserUseCase implements FindUserByEmailUseCase {
  constructor(public readonly userRepository: UserRepository) {}

  execute(): Promise<User> {
    return Promise.resolve(new User());
  }
}
