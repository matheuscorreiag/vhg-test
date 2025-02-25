import { ReviewProductUseCase } from '@product/application/use-cases/review-product.use-case';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class mockReviewProductUseCase implements ReviewProductUseCase {
  constructor(public readonly productRepository: ProductRepository) {}

  execute(): Promise<void> {
    return Promise.resolve();
  }
}
