import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { Product } from '@product/domain/entities/product';
import { ReviewProductUseCase } from '@product/application/use-cases/review-product.use-case';

describe('ReviewProductUseCase', () => {
  let reviewProductUseCase: ReviewProductUseCase;
  let productRepository: ProductRepository;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 10.99,
    rating: 0,
    colors: ['red', 'green', 'blue'],
    imageUrl: 'https://example.com/image.jpg',
  };

  const productId = '1';
  const newRating = 5;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewProductUseCase,
        {
          provide: ProductRepository.TOKEN,
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    reviewProductUseCase =
      module.get<ReviewProductUseCase>(ReviewProductUseCase);
    productRepository = module.get<ProductRepository>(ProductRepository.TOKEN);
  });

  it('should be defined', () => {
    expect(reviewProductUseCase).toBeDefined();
  });

  it('should review a product', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest.spyOn(productRepository, 'update').mockResolvedValue(mockProduct);

    await reviewProductUseCase.execute(productId, newRating);

    expect(productRepository.findById).toHaveBeenCalledWith(productId);
    expect(productRepository.update).toHaveBeenCalledWith(productId, {
      ...mockProduct,
      rating: newRating,
    });
  });

  it('should throw an error if product is not found', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(null as any);

    await expect(
      reviewProductUseCase.execute(productId, newRating),
    ).rejects.toThrow('Product not found');
  });

  it('should handle repository findById failure', async () => {
    jest
      .spyOn(productRepository, 'findById')
      .mockRejectedValue(new Error('Database error'));

    await expect(
      reviewProductUseCase.execute(productId, newRating),
    ).rejects.toThrow('Database error');

    expect(productRepository.update).not.toHaveBeenCalled();
  });

  it('should handle repository update failure', async () => {
    jest.spyOn(productRepository, 'findById').mockResolvedValue(mockProduct);
    jest
      .spyOn(productRepository, 'update')
      .mockRejectedValue(new Error('Update failed'));

    await expect(
      reviewProductUseCase.execute(productId, newRating),
    ).rejects.toThrow('Update failed');
  });
});
