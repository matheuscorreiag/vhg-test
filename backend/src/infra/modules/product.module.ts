import { Module } from '@nestjs/common';
import { CreateProductUseCase } from '@application/use-cases/product/create-product.use-case';
import { CreateProductController } from '@infra/controllers/product/create-product.controller';
import { PrismaCreateProductUseCase } from '@infra/db/prisma/use-cases/product/prisma-create-product.use-case';

@Module({
  imports: [],
  controllers: [CreateProductController],
  providers: [
    {
      provide: CreateProductUseCase.TOKEN,
      useClass: PrismaCreateProductUseCase,
    },
  ],
})
export class ProductModule {}
