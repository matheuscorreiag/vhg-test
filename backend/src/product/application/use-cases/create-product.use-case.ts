import { Inject } from '@nestjs/common';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class CreateProductUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  execute(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
