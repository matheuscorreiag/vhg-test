import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { Product } from '@domain/entities/product';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCreateProductUseCase implements CreateProductUseCase {
  execute(product: Product): Promise<Product> {
    return Promise.resolve(product);
  }
}
