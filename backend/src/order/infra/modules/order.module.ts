import { Module } from '@nestjs/common';
import { PrismaOrderRepository } from '@order/infra/db/prisma/repositories/prisma-order.repository';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { PrismaProductRepository } from '@product/infra/db/prisma/repositories/prisma-product.repository';
import { AddItemToOrderController } from '@order/infra/controllers/add-item-to-order.controller';
import { AddItemToOrderUseCase } from '@order/application/use-cases/add-item-to-order.use-case';

@Module({
  imports: [],
  controllers: [AddItemToOrderController],
  providers: [
    {
      provide: OrderRepository.TOKEN,
      useClass: PrismaOrderRepository,
    },
    {
      provide: ProductRepository.TOKEN,
      useClass: PrismaProductRepository,
    },
    AddItemToOrderUseCase,
  ],
})
export class OrderModule {}
