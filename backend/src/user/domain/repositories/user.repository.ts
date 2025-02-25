import { User } from '../entities/user';

export abstract class UserRepository {
  static TOKEN = 'UserRepositoryToken';

  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
}
