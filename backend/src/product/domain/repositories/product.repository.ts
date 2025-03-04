import { Product } from '../entities/product';

export abstract class ProductRepository {
  static TOKEN = 'ProductRepositoryToken';

  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product>;
  abstract save(product: Product): Promise<Product>;
  abstract update(productId: string, product: Product): Promise<Product>;
  abstract findByIds(productIds: string[]): Promise<number>;
}
