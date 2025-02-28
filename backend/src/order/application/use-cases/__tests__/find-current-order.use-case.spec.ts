import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { Order } from '@order/domain/entities/order';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';

describe('FindCurrentOrderUseCase', () => {
  let findCurrentOrderUseCase: FindCurrentOrderUseCase;
  let orderRepository: OrderRepository;

  const mockOrder: Order = {
    id: '1',
    userId: 'user123',
    products: [],
    total: 0,
    productCount: 0,
    calculateTotal: jest.fn(),
    calculateProductCount: jest.fn(),
    setCard: jest.fn(),
    addProduct: jest.fn(),
  };

  const userId = 'user123';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCurrentOrderUseCase,
        {
          provide: OrderRepository.TOKEN,
          useValue: {
            findCurrentOrderOrCreate: jest.fn(),
          },
        },
      ],
    }).compile();

    findCurrentOrderUseCase = module.get<FindCurrentOrderUseCase>(
      FindCurrentOrderUseCase,
    );
    orderRepository = module.get<OrderRepository>(OrderRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(findCurrentOrderUseCase).toBeDefined();
  });

  it('should find the current order and calculate total and product count', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);

    const result = await findCurrentOrderUseCase.execute(userId);

    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(mockOrder.calculateTotal).toHaveBeenCalled();
    expect(mockOrder.calculateProductCount).toHaveBeenCalled();
    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order is not found', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(null as any);

    await expect(findCurrentOrderUseCase.execute(userId)).rejects.toThrow(
      'Order not found',
    );
  });

  it('should handle repository failure', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockRejectedValue(new Error('Database error'));

    await expect(findCurrentOrderUseCase.execute(userId)).rejects.toThrow(
      'Database error',
    );
  });
});
