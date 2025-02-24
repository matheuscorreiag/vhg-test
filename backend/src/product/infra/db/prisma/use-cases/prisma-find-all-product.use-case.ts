import { Inject, Injectable } from '@nestjs/common';
import { FindAllProductUseCase } from '@product/application/use-cases/find-all-product.use-case';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

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
