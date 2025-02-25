import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class mockProductRepository implements ProductRepository {
  findAll(): Promise<Product[]> {
    return Promise.resolve([]);
  }

  findById(): Promise<Product> {
    return Promise.resolve(new Product());
  }

  save(product: Product): Promise<Product> {
    return Promise.resolve(product);
  }

  update(productId: string, product: Product): Promise<Product> {
    return Promise.resolve(product);
  }
  findByIds(): Promise<number> {
    return Promise.resolve(2);
  }
}
