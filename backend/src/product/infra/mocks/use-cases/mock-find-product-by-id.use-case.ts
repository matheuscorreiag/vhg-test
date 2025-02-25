import { Product } from '@product/domain/entities/product.js';
import { defaultProduct } from '@product/infra/mocks';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { FindProductByIdUseCase } from '@product/application/use-cases/find-product-by-id.use.case';

export class mockFindProductByIdUseCase implements FindProductByIdUseCase {
  constructor(public productRepository: ProductRepository) {}

  execute(): Promise<Product> {
    return Promise.resolve(defaultProduct);
  }
}
