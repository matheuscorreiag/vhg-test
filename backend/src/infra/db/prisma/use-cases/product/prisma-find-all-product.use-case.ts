import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { Product } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product/product.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFindAllProductUseCase implements FindAllProductUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    private readonly productRepository: ProductRepository,
  ) {}

  execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
