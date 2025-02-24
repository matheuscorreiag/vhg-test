import { Product } from '@product/domain/entities/product.js';
import { FindAllProductUseCase } from '@product/application/use-cases/find-all-product.use-case.js';
import { defaultProduct } from '@product/infra/mocks';

export class mockFindAllProductUseCase implements FindAllProductUseCase {
  execute(): Promise<Product[]> {
    return Promise.resolve([defaultProduct]);
  }
}
