import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@product/application/use-cases/create-product.use-case';
import { CreateProductController } from '@product/infra/controllers/create-product.controller';
import { PrismaProductRepository } from '@product/infra/db/prisma/repositories/prisma-product.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { FindAllProductController } from '@product/infra/controllers/find-all-product.controller';
import { FindAllProductsUseCase } from '@product/application/use-cases/find-all-products.use-case';
import { FindProductByIdController } from '@product/infra/controllers/find-product-by-id-controller';
import { FindProductByIdUseCase } from '@product/application/use-cases/find-product-by-id.use.case';

@Module({
  imports: [],
  controllers: [
    CreateProductController,
    FindAllProductController,
    FindProductByIdController,
  ],
  providers: [
    {
      provide: ProductRepository.TOKEN,
      useClass: PrismaProductRepository,
    },
    CreateProductUseCase,
    FindAllProductsUseCase,
    FindProductByIdUseCase,
  ],
})
export class ProductModule {}
