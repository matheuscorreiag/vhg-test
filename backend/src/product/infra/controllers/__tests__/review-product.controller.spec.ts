import { ReviewProductController } from '@product/infra/controllers/review-product.controller';
import { mockReviewProductUseCase } from '@product/infra/mocks/use-cases/mock-review-order-use-case';

describe('ReviewProductController', () => {
  const useCase = new mockReviewProductUseCase();
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
