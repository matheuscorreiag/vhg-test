import { Product } from '../../entities/product';

export abstract class ProductRepository {
  static TOKEN = 'ProductRepositoryToken';

  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product>;
  abstract save(product: Product): Promise<Product>;
}
