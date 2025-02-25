import { User } from '@user/domain/entities/user';

export const defaultUser = new User({
  email: 'matheuscorreiag@gmail.com',
  password: '123',
});
