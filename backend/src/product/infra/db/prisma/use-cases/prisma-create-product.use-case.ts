import { Inject, Injectable } from '@nestjs/common';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case';
import { Product } from '@product/domain/entities/product';
import { ProductRepository } from '@product/domain/repositories/product.repository';

@Injectable()
export class PrismaCreateProductUseCase implements CreateProductUseCase {
  constructor(
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  execute(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }
}
