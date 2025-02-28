import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { Order } from '@order/domain/entities/order';
import { Product } from '@product/domain/entities/product';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { UpsertProductToOrderUseCase } from '@order/application/use-cases/upsert-product-to-order.use-case';
import { OrderProduct } from '@order/domain/value-objects/order-product';

describe('UpsertProductToOrderUseCase', () => {
  let upsertProductToOrderUseCase: UpsertProductToOrderUseCase;
  let orderRepository: OrderRepository;
  let productRepository: ProductRepository;

  const userId = 'user123';
  const orderId = 'order123';
  const productId = 'product123';
  const orderProductId = 'orderProduct123';

  const mockProduct: Product = {
    id: productId,
    name: 'Test Product',
    description: 'Test Description',
    price: 10,
    imageUrl: 'image.jpg',
    colors: ['red', 'green', 'blue'],
  };

  const mockOrderProduct: OrderProduct = {
    id: orderProductId,
    productId: productId,
    quantity: 1,
    color: 'red',
    name: mockProduct.name,
    price: mockProduct.price,
    imageUrl: mockProduct.imageUrl,
  };

  const mockOrder: Order = {
    id: orderId,
    userId: userId,
    products: [mockOrderProduct],
    total: 10,
    productCount: 1,
    calculateTotal: jest.fn(),
    calculateProductCount: jest.fn(),
    addProduct: jest.fn(),
    setCard: jest.fn(),
  };

  const upsertProductDto: UpsertProductToOrderDto = {
    productId: productId,
    quantity: 2,
    color: 'blue',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpsertProductToOrderUseCase,
        {
          provide: OrderRepository.TOKEN,
          useValue: {
            findCurrentOrderOrCreate: jest.fn(),
            deleteOrderProduct: jest.fn(),
            updateProductOnCurrentOrder: jest.fn(),
            saveProductOnCurrentOrder: jest.fn(),
          },
        },
        {
          provide: ProductRepository.TOKEN,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    upsertProductToOrderUseCase = module.get<UpsertProductToOrderUseCase>(
      UpsertProductToOrderUseCase,
    );
    orderRepository = module.get<OrderRepository>(OrderRepository.TOKEN);
    productRepository = module.get<ProductRepository>(ProductRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(upsertProductToOrderUseCase).toBeDefined();
  });

  it('should add a new product to the order', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, products: [] } as any);
    jest
      .spyOn(orderRepository, 'saveProductOnCurrentOrder')
      .mockResolvedValue(mockOrder);

    await upsertProductToOrderUseCase.execute(upsertProductDto, userId);

    expect(productRepository.findById).toHaveBeenCalledWith(productId);
    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(orderRepository.saveProductOnCurrentOrder).toHaveBeenCalled();
  });

  it('should update an existing product in the order', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'updateProductOnCurrentOrder')
      .mockResolvedValue(undefined as any);

    await upsertProductToOrderUseCase.execute(upsertProductDto, userId);

    expect(productRepository.findById).toHaveBeenCalledWith(productId);
    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(orderRepository.updateProductOnCurrentOrder).toHaveBeenCalled();
  });

  it('should remove a product from the order if quantity is 0', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'deleteOrderProduct')
      .mockResolvedValue(undefined);

    await upsertProductToOrderUseCase.execute(
      { ...upsertProductDto, quantity: 0 },
      userId,
    );

    expect(productRepository.findById).toHaveBeenCalledWith(productId);
    expect(orderRepository.findCurrentOrderOrCreate).toHaveBeenCalledWith(
      userId,
    );
    expect(orderRepository.deleteOrderProduct).toHaveBeenCalledWith(
      orderProductId,
    );
  });

  it('should throw an error if product is not found', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(null as any);

    await expect(
      upsertProductToOrderUseCase.execute(upsertProductDto, userId),
    ).rejects.toThrow('Product not found');
    expect(orderRepository.findCurrentOrderOrCreate).not.toHaveBeenCalled();
  });

  it('should throw an error if order is not found', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, id: undefined } as any);

    await expect(
      upsertProductToOrderUseCase.execute(upsertProductDto, userId),
    ).rejects.toThrow('Order not found');
    expect(orderRepository.saveProductOnCurrentOrder).not.toHaveBeenCalled();
    expect(orderRepository.updateProductOnCurrentOrder).not.toHaveBeenCalled();
    expect(orderRepository.deleteOrderProduct).not.toHaveBeenCalled();
  });

  it('should throw an error if product to be removed not found', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest.spyOn(orderRepository, 'findCurrentOrderOrCreate').mockResolvedValue({
      ...mockOrder,
      products: [{ ...mockOrderProduct, id: undefined }],
    } as any);

    await expect(
      upsertProductToOrderUseCase.execute(
        { ...upsertProductDto, quantity: 0 },
        userId,
      ),
    ).rejects.toThrow('Product not found');
    expect(orderRepository.deleteOrderProduct).not.toHaveBeenCalled();
  });

  it('should handle repository findById failure', async () => {
    jest
      .spyOn(productRepository, 'findById')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      upsertProductToOrderUseCase.execute(upsertProductDto, userId),
    ).rejects.toThrow('Database error');
  });

  it('should handle repository findCurrentOrderOrCreate failure', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      upsertProductToOrderUseCase.execute(upsertProductDto, userId),
    ).rejects.toThrow('Database error');
  });

  it('should handle repository saveProductOnCurrentOrder failure', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue({ ...mockOrder, products: [] } as any);
    jest
      .spyOn(orderRepository, 'saveProductOnCurrentOrder')
      .mockRejectedValue(new Error('Save failed'));

    await expect(
      upsertProductToOrderUseCase.execute(upsertProductDto, userId),
    ).rejects.toThrow('Save failed');
  });

  it('should handle repository updateProductOnCurrentOrder failure', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(orderRepository, 'findCurrentOrderOrCreate')
      .mockResolvedValue(mockOrder);
    jest
      .spyOn(orderRepository, 'updateProductOnCurrentOrder')
      .mockRejectedValue(new Error('Update failed'));
  });
});
