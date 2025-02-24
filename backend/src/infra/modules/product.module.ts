import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { CreateProductController } from '@infra/controllers/product/create-product.controller';
import { PrismaCreateProductUseCase } from '@infra/db/prisma/use-cases/product/prisma-create-product.use-case';
import { FindAllProductUseCase } from '@application/use-cases/product/find-all-product.use-case';
import { PrismaFindAllProductUseCase } from '@infra/db/prisma/use-cases/product/prisma-find-all-product.use-case';
import { PrismaProductRepository } from '@infra/db/prisma/repositories/product/prisma-product.repository';
import { ProductRepository } from '@domain/repositories/product/product.repository';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [
    {
      provide: ProductRepository.TOKEN,
      useClass: PrismaProductRepository,
    },
    {
      provide: CreateProductUseCase.TOKEN,
      useClass: PrismaCreateProductUseCase,
    },
    {
      provide: FindAllProductUseCase.TOKEN,
      useClass: PrismaFindAllProductUseCase,
    },
  ],
})
export class ProductModule {}
