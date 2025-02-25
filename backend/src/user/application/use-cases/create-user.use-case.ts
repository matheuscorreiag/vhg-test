import { Inject } from '@nestjs/common';
import { Encrypter } from '@user/application/protocols/security/encrypter.security';
import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository.TOKEN)
    public readonly userRepository: UserRepository,
    @Inject(Encrypter.TOKEN)
    public readonly encrypter: Encrypter,
  ) {}

  async execute(user: User): Promise<User> {
    if (!user.password) throw new Error('User does not have a password');

    const userWithEncryptedPassword: User = {
      ...user,
      password: await this.encrypter.execute(user.password),
    };

    return await this.userRepository.create(userWithEncryptedPassword);
  }
}
