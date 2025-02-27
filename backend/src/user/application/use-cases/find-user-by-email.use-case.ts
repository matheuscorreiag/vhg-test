import { Inject } from '@nestjs/common';
import { Compare } from '@user/application/protocols/security/compare.security';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class FindUserByEmailUseCase {
  constructor(
    @Inject(UserRepository.TOKEN)
    public readonly userRepository: UserRepository,
    @Inject(Compare.TOKEN)
    public readonly compare: Compare,
  ) {}

  async execute(email: string, rawPassword: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user.password) throw new Error('User not found');

    const isPasswordMatch = await this.compare.execute(
      rawPassword,
      user.password,
    );

    if (!isPasswordMatch) throw new Error('Password does not match');
    delete user.password;
    return user;
  }
}
