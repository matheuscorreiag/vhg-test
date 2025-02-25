import { ReviewProductController } from '@product/infra/controllers/review-product.controller';
import { mockProductRepository } from '@product/infra/mocks/repositories/mock-product.repository';
import { mockReviewProductUseCase } from '@product/infra/mocks/use-cases/mock-review-order.use-case';

describe('ReviewProductController', () => {
  const repository = new mockProductRepository();
  const useCase = new mockReviewProductUseCase(repository);
  const controller = new ReviewProductController(useCase);

  it('should return correct data', async () => {
    const result = await controller.reviewProduct({
      productId: '123',
      rating: 5,
    });

    expect(result).toBeUndefined();
  });

  it('should return error if the use case return an error', () => {
    jest.spyOn(useCase, 'execute').mockRejectedValue(new Error('Error'));

    expect(
      controller.reviewProduct({ productId: '123', rating: 5 }),
    ).rejects.toThrow('Error');
  });
});
