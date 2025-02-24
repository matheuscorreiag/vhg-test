import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { Product } from '@domain/entities/product';
import { defaultProduct } from '.';

export class mockCreateProductUseCase implements CreateProductUseCase {
  execute(product: Product): Promise<Product> {
    return Promise.resolve(product ?? defaultProduct);
  }
}
