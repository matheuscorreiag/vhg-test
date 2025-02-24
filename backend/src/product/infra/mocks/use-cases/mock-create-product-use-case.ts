import { Product } from '@product/domain/entities/product.js';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case.js';
import { defaultProduct } from '@product/infra/mocks';

export class mockCreateProductUseCase implements CreateProductUseCase {
  execute(product: Product): Promise<Product> {
    return Promise.resolve(product ?? defaultProduct);
  }
}
