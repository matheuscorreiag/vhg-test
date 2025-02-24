import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  findAll(): Promise<Product[]> {
    return Promise.resolve([]);
  }

  findById(): Promise<Product> {
    return Promise.resolve(new Product());
  }

  save(product: Product): Promise<Product> {
    return Promise.resolve(product);
  }
}
