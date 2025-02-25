import { Inject } from '@nestjs/common';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository.TOKEN)
    public readonly userRepository: UserRepository,
  ) {}

  execute(user: User): Promise<User> {
    return this.userRepository.create(user);
  }
}
