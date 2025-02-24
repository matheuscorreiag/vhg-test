import { ReviewProductUseCase } from '@product/application/use-cases/review-product.use-case';

export class mockReviewProductUseCase implements ReviewProductUseCase {
  execute(): Promise<void> {
    return Promise.resolve();
  }
}
