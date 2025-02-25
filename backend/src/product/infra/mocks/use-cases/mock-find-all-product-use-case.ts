import { Product } from '@product/domain/entities/product.js';
import { FindAllProductsUseCase } from '@product/application/use-cases/find-all-products.use-case.js';
import { defaultProduct } from '@product/infra/mocks';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class mockFindAllProductUseCase implements FindAllProductsUseCase {
  constructor(public productRepository: ProductRepository) {}

  execute(): Promise<Product[]> {
    return Promise.resolve([defaultProduct]);
  }
}
