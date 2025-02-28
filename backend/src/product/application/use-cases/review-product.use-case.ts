import { Inject } from '@nestjs/common';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class ReviewProductUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(productId: string, rating: number): Promise<void> {
    const existingProduct = await this.productRepository.findById(productId);

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    existingProduct.rating = rating;

    await this.productRepository.update(productId, existingProduct);
  }
}
