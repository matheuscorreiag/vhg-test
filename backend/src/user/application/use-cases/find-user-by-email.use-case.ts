import { Inject } from '@nestjs/common';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class FindUserByEmailUseCase {
  constructor(
    @Inject(UserRepository.TOKEN)
    public readonly userRepository: UserRepository,
  ) {}

  execute(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
