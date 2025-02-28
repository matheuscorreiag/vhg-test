import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { Product } from '@product/domain/entities/product';
import { FindAllProductsUseCase } from '@product/application/use-cases/find-all-products.use-case';

describe('FindAllProductsUseCase', () => {
  let findAllProductsUseCase: FindAllProductsUseCase;
  let productRepository: ProductRepository;

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      imageUrl: 'https://example.com/image.jpg',
      colors: ['red', 'green', 'blue'],
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 20,
      imageUrl: 'https://example.com/image.jpg',
      colors: ['red', 'green', 'blue'],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllProductsUseCase,
        {
          provide: ProductRepository.TOKEN,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findAllProductsUseCase = module.get<FindAllProductsUseCase>(
      FindAllProductsUseCase,
    );
    productRepository = module.get<ProductRepository>(ProductRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(findAllProductsUseCase).toBeDefined();
  });

  it('should find all products', async () => {
    jest.spyOn(productRepository, 'findAll').mockResolvedValue(mockProducts);

    const result = await findAllProductsUseCase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
  });

  it('should handle repository failure', async () => {
    jest
      .spyOn(productRepository, 'findAll')
      .mockRejectedValue(new Error('Database error'));

    await expect(findAllProductsUseCase.execute()).rejects.toThrow(
      'Database error',
    );
  });

  it('should handle empty product list', async () => {
    jest.spyOn(productRepository, 'findAll').mockResolvedValue([]);

    const result = await findAllProductsUseCase.execute();

    expect(productRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
