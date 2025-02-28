import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { Order, OrderState } from '@order/domain/entities/order';
import { CompleteOrderDto } from '@order/application/dto/complete-order.dto';
import { CompleteOrderUseCase } from '@order/application/use-cases/update-order-state.use-case';
import { OrderProduct } from '@prisma/client';

describe('CompleteOrderUseCase', () => {
  let completeOrderUseCase: CompleteOrderUseCase;
  let orderRepository: OrderRepository;

  const userId = 'user123';
  const orderId = 'order123';

  const mockOrderProduct: OrderProduct = {
    id: 'product1',
    productId: 'product123',
    orderId: orderId,
    quantity: 1,
    color: 'red',
    createdAt: new Date(),
    updatedAt: new Date(),
    price: 10.99,
    imageUrl: 'https://example.com/image.jpg',
    name: 'Test Product',
  };

  const mockOrder: Order = {
    id: orderId,
    userId: userId,
    addProduct: jest.fn(),
    setCard: jest.fn(),
    products: [mockOrderProduct],
    total: 10,
    productCount: 1,
    state: OrderState.CART,
    calculateTotal: jest.fn(),
    calculateProductCount: jest.fn(),
  };

  const completeOrderDto: CompleteOrderDto = {
    cardName: 'John Doe',
    cardNumber: '1234567890',
    expiration: new Date(),
    securityCode: '123',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 1',
    city: 'New York',
    region: 'NY',
    zipCode: '10001',
    country: 'USA',
    addressName: 'John Doe',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompleteOrderUseCase,
        {
          provide: OrderRepository.TOKEN,
          useValue: {
            findCurrentOrderOrCreate: jest.fn(),
            completeOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    completeOrderUseCase =
      module.get<CompleteOrderUseCase>(CompleteOrderUseCase);
    orderRepository = module.get<OrderRepository>(OrderRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(completeOrderUseCase).toBeDefined();
  });

  it('should complete the order', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest.spyOn(orderRepository, 'completeOrder').mockResolvedValue(mockOrder);

    const result = await completeOrderUseCase.execute(userId, completeOrderDto);

    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(orderRepository.completeOrder).toHaveBeenCalledWith(
      userId,
      orderId,
      completeOrderDto,
    );
    expect(result).toEqual(mockOrder);
  });

  it('should throw an error if order is not found', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, id: undefined } as any);

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Order not found');

    expect(orderRepository.completeOrder).not.toHaveBeenCalled();
  });

  it('should throw an error if order is already completed', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, state: OrderState.COMPLETED } as any);

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Order already completed');

    expect(orderRepository.completeOrder).not.toHaveBeenCalled();
  });

  it('should throw an error if order is empty', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, products: [] } as any);

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Order is empty');

    expect(orderRepository.completeOrder).not.toHaveBeenCalled();
  });

  it('should throw an error if completeOrder repository method returns null', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest.spyOn(orderRepository, 'completeOrder').mockResolvedValue(null as any);

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Order not found');
  });

  it('should handle repository findCurrentOrderOrCreate failure', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Database error');

    expect(orderRepository.completeOrder).not.toHaveBeenCalled();
  });

  it('should handle repository completeOrder failure', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'completeOrder')
      .mockRejectedValue(new Error('Completion failed'));

    await expect(
      completeOrderUseCase.execute(userId, completeOrderDto),
    ).rejects.toThrow('Completion failed');
  });
});
