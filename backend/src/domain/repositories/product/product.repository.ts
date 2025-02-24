import { Product } from '../../entities/product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  save(product: Product): Promise<Product>;
}
