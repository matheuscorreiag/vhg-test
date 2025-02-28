import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '@user/domain/repositories/user.repository';
import { Encrypter } from '@user/application/protocols/security/encrypter.security';
import { User } from '@user/domain/entities/user';
import { CreateUserUseCase } from '@user/application/use-cases/create-user.use-case';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserRepository;
  let encrypter: Encrypter;

  const mockUser: User = {
    id: '1',
    email: 'john.doe@example.com',
    password: 'password123',
  };

  const mockEncryptedPassword = 'encryptedPassword123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: UserRepository.TOKEN,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: Encrypter.TOKEN,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    userRepository = module.get<UserRepository>(UserRepository.TOKEN);
    encrypter = module.get<Encrypter>(Encrypter.TOKEN);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create a user with encrypted password', async () => {
    jest.spyOn(encrypter, 'execute').mockResolvedValue(mockEncryptedPassword);
    jest.spyOn(userRepository, 'create').mockResolvedValue({
      ...mockUser,
      password: mockEncryptedPassword,
    });

    const result = await createUserUseCase.execute(mockUser);

    expect(encrypter.execute).toHaveBeenCalledWith(mockUser.password);
    expect(userRepository.create).toHaveBeenCalledWith({
      ...mockUser,
      password: mockEncryptedPassword,
    });
    expect(result).toEqual({ ...mockUser, password: mockEncryptedPassword });
  });

  it('should throw an error if user does not have a password', async () => {
    const userWithoutPassword: User = {
      id: '2',
      email: 'jane.doe@example.com',
      password: undefined,
    };

    await expect(
      createUserUseCase.execute(userWithoutPassword),
    ).rejects.toThrow('User does not have a password');
    expect(encrypter.execute).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should handle encrypter failure', async () => {
    jest
      .spyOn(encrypter, 'execute')
      .mockRejectedValue(new Error('Encryption failed'));

    await expect(createUserUseCase.execute(mockUser)).rejects.toThrow(
      'Encryption failed',
    );
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should handle userRepository failure', async () => {
    jest.spyOn(encrypter, 'execute').mockResolvedValue(mockEncryptedPassword);
    jest
      .spyOn(userRepository, 'create')
      .mockRejectedValue(new Error('Database error'));

    await expect(createUserUseCase.execute(mockUser)).rejects.toThrow(
      'Database error',
    );
  });
});
