import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class FindAllProductsUseCase {
  constructor(public productRepository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
