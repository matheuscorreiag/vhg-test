import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';
import { CreateOrderController } from '@order/infra/controllers/create-order.controller';
import { PrismaOrderRepository } from '@order/infra/db/prisma/repositories/prisma-order.repository';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { PrismaProductRepository } from '@product/infra/db/prisma/repositories/prisma-product.repository';

@Module({
  imports: [],
  controllers: [CreateOrderController],
  providers: [
    {
      provide: OrderRepository.TOKEN,
      useClass: PrismaOrderRepository,
    },
    {
      provide: ProductRepository.TOKEN,
      useClass: PrismaProductRepository,
    },
    CreateOrderUseCase,
  ],
})
export class OrderModule {}
