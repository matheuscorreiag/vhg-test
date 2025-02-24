import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { Product } from '@domain/entities/product';
import { defaultProduct } from '.';

export class mockFindAllProductUseCase implements FindAllProductUseCase {
  execute(): Promise<Product[]> {
    return Promise.resolve([defaultProduct]);
  }
}
