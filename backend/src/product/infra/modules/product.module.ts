import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@application/use-cases/create-product.use-case';
import { CreateProductController } from '@infra/controllers/create-product.controller';
import { PrismaCreateProductUseCase } from '@infra/db/prisma/use-cases/prisma-create-product.use-case';
import { FindAllProductUseCase } from '@application/use-cases/find-all-product.use-case';
import { PrismaFindAllProductUseCase } from '@infra/db/prisma/use-cases/prisma-find-all-product.use-case';
import { PrismaProductRepository } from '@infra/db/prisma/repositories/prisma-product.repository';
import { ProductRepository } from '@domain/repositories/product.repository';
import { FindAllProductController } from '@infra/controllers/find-all-product.controller';

@Module({
  imports: [],
  controllers: [CreateProductController, FindAllProductController],
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
