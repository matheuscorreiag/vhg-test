import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { Product } from '@product/domain/entities/product';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepository: ProductRepository;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 10.99,
    colors: ['red', 'green', 'blue'],
    imageUrl: 'https://example.com/image.jpg',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProductUseCase,
        {
          provide: ProductRepository.TOKEN,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createProductUseCase =
      module.get<CreateProductUseCase>(CreateProductUseCase);
    productRepository = module.get<ProductRepository>(ProductRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(createProductUseCase).toBeDefined();
  });

  it('should create a product', async () => {
    jest.spyOn(productRepository, 'save').mockResolvedValue(mockProduct);

    const result = await createProductUseCase.execute(mockProduct);

    expect(productRepository.save).toHaveBeenCalledWith(mockProduct);
    expect(result).toEqual(mockProduct);
  });

  it('should handle repository failure', async () => {
    jest
      .spyOn(productRepository, 'save')
      .mockRejectedValue(new Error('Database error'));

    await expect(createProductUseCase.execute(mockProduct)).rejects.toThrow(
      'Database error',
    );
  });
});
