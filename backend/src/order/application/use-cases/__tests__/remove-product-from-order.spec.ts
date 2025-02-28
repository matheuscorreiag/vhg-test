import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { Order } from '@order/domain/entities/order';
import { RemoveProductFromOrderUseCase } from '@order/application/use-cases/remove-product-from-order.use-case';
import { OrderProduct } from '@prisma/client';

describe('RemoveProductFromOrderUseCase', () => {
  let removeProductFromOrderUseCase: RemoveProductFromOrderUseCase;
  let orderRepository: OrderRepository;

  const productId = 'product123';
  const userId = 'user123';
  const orderProductId = 'orderProduct123';

  const mockOrderProduct: OrderProduct = {
    id: orderProductId,
    productId: productId,
    orderId: 'order123',
    quantity: 1,
    color: 'red',
    createdAt: new Date(),
    updatedAt: new Date(),
    price: 10.99,
    imageUrl: 'https://example.com/image.jpg',
    name: 'Test Product',
  };

  const mockOrder: Order = {
    id: 'order123',
    userId: userId,
    products: [mockOrderProduct],
    total: 0,
    productCount: 0,
    calculateTotal: jest.fn(),
    calculateProductCount: jest.fn(),
    addProduct: jest.fn(),
    setCard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveProductFromOrderUseCase,
        {
          provide: OrderRepository.TOKEN,
          useValue: {
            findCurrentOrderOrCreate: jest.fn(),
            deleteOrderProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    removeProductFromOrderUseCase = module.get<RemoveProductFromOrderUseCase>(
      RemoveProductFromOrderUseCase,
    );
    orderRepository = module.get<OrderRepository>(OrderRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(removeProductFromOrderUseCase).toBeDefined();
  });

  it('should remove a product from the order', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'deleteOrderProduct')
      .mockResolvedValue(undefined);

    await removeProductFromOrderUseCase.execute(productId, userId);

    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(orderRepository.deleteOrderProduct).toHaveBeenCalledWith(
      orderProductId,
    );
  });

  it('should throw an error if order is not found', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(null as any);

    await expect(
      removeProductFromOrderUseCase.execute(productId, userId),
    ).rejects.toThrow('Order not found');

    expect(orderRepository.deleteOrderProduct).not.toHaveBeenCalled();
  });

  it('should throw an error if product is not found in the order', async () => {
    jest.spyOn(orderRepository, 'findCurrentOrderOrCreate').mockResolvedValue({
      ...mockOrder,
      products: [],
    } as any);

    await expect(
      removeProductFromOrderUseCase.execute(productId, userId),
    ).rejects.toThrow('Product not found');

    expect(orderRepository.deleteOrderProduct).not.toHaveBeenCalled();
  });

  it('should handle repository findCurrentOrderOrCreate failure', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      removeProductFromOrderUseCase.execute(productId, userId),
    ).rejects.toThrow('Database error');

    expect(orderRepository.deleteOrderProduct).not.toHaveBeenCalled();
  });

  it('should handle repository deleteOrderProduct failure', async () => {
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'deleteOrderProduct')
      .mockRejectedValue(new Error('Deletion failed'));

    await expect(
      removeProductFromOrderUseCase.execute(productId, userId),
    ).rejects.toThrow('Deletion failed');
  });
});
