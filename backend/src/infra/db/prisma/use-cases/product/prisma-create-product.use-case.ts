import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaCreateProductUseCase implements CreateProductUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    private readonly productRepository: ProductRepository,
  ) {}

  execute(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
