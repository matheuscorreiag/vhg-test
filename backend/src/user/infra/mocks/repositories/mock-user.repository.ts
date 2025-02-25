import { User } from '@user/domain/entities/user';
import { UserRepository } from '@user/domain/repositories/user.repository';

export class mockUserRepository implements UserRepository {
  create(user: User): Promise<User> {
    return Promise.resolve(user);
  }
  findByEmail(): Promise<User> {
    return Promise.resolve(new User());
  }
}
