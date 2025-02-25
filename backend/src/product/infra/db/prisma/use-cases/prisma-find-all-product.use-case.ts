import { Inject, Injectable } from '@nestjs/common';
import { FindAllProductsUseCase } from '@product/application/use-cases/find-all-products.use-case';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

@Injectable()
export class PrismaFindAllProductUseCase implements FindAllProductsUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
