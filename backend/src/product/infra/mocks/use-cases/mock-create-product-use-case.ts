import { Product } from '@product/domain/entities/product.js';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case.js';
import { defaultProduct } from '@product/infra/mocks';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class mockCreateProductUseCase implements CreateProductUseCase {
  constructor(public readonly productRepository: ProductRepository) {}
  execute(product: Product): Promise<Product> {
    return Promise.resolve(product ?? defaultProduct);
  }
}
