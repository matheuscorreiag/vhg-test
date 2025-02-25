import { Inject } from '@nestjs/common';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class FindProductByIdUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  execute(productId: string): Promise<Product> {
    return this.productRepository.findById(productId);
  }
}
