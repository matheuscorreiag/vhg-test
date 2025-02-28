import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { Compare } from '@user/application/protocols/security/compare.security';
import { User } from '@user/domain/entities/user';
import { FindUserByEmailUseCase } from '@user/application/use-cases/find-user-by-email.use-case';

describe('FindUserByEmailUseCase', () => {
  let findUserByEmailUseCase: FindUserByEmailUseCase;
  let userRepository: UserRepository;
  let compare: Compare;

  const mockUser: User = {
    id: '1',
    email: 'john.doe@example.com',
    password: 'hashedPassword123',
  };

  const rawPassword = 'password123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailUseCase,
        {
          provide: UserRepository.TOKEN,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: Compare.TOKEN,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    findUserByEmailUseCase = module.get<FindUserByEmailUseCase>(
      FindUserByEmailUseCase,
    );
    userRepository = module.get<UserRepository>(UserRepository.TOKEN);
    compare = module.get<Compare>(Compare.TOKEN);
  });

  it('should be defined', () => {
    expect(findUserByEmailUseCase).toBeDefined();
  });

  it('should find user by email and validate password', async () => {
    const rawUser = { ...mockUser };
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(rawUser);
    jest.spyOn(compare, 'execute').mockResolvedValue(true);

    const result = await findUserByEmailUseCase.execute(
      rawUser.email,
      rawPassword,
    );

    expect(userRepository.findByEmail).toHaveBeenCalledWith(rawUser.email);

    expect(compare.execute).toHaveBeenCalledWith(
      rawPassword,
      mockUser.password,
    );
    expect(result).toEqual({ ...mockUser, password: undefined });
  });

  it('should throw an error if user is not found', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null as any);

    await expect(
      findUserByEmailUseCase.execute(mockUser.email, rawPassword),
    ).rejects.toThrow('User not found');
    expect(compare.execute).not.toHaveBeenCalled();
  });

  it('should throw an error if user password is not found', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
      ...mockUser,
      password: undefined,
    });

    await expect(
      findUserByEmailUseCase.execute(mockUser.email, rawPassword),
    ).rejects.toThrow('User not found');
    expect(compare.execute).not.toHaveBeenCalled();
  });

  it('should throw an error if password does not match', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
    jest.spyOn(compare, 'execute').mockResolvedValue(false);

    await expect(
      findUserByEmailUseCase.execute(mockUser.email, rawPassword),
    ).rejects.toThrow('Password does not match');
  });

  it('should handle repository failure', async () => {
    jest
      .spyOn(userRepository, 'findByEmail')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      findUserByEmailUseCase.execute(mockUser.email, rawPassword),
    ).rejects.toThrow('Database error');
    expect(compare.execute).not.toHaveBeenCalled();
  });

  it('should handle compare failure', async () => {
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(mockUser);
    jest
      .spyOn(compare, 'execute')
      .mockRejectedValue(new Error('Comparison failed'));

    await expect(
      findUserByEmailUseCase.execute(mockUser.email, rawPassword),
    ).rejects.toThrow('Comparison failed');
  });
});
