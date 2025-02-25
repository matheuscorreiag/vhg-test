import { Module } from '@nestjs/common';
import { PrismaOrderRepository } from '@order/infra/db/prisma/repositories/prisma-order.repository';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { PrismaProductRepository } from '@product/infra/db/prisma/repositories/prisma-product.repository';
import { AddItemToOrderController } from '@order/infra/controllers/add-item-to-order.controller';
import { AddItemToOrderUseCase } from '@order/application/use-cases/add-item-to-order.use-case';
import { FindCurrentOrderController } from '@order/infra/controllers/find-current-order.controller';
import { UpdateOrderStateController } from '@order/infra/controllers/update-order-state.controller';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';
import { UpdateOrderStateUseCase } from '@order/application/use-cases/update-order-state.use-case';
import { RemoveProductFromOrderController } from '@order/infra/controllers/remove-product-from-order.controller';
import { RemoveProductFromOrderUseCase } from '@order/application/use-cases/remove-product-from-order.use-case';

@Module({
  imports: [],
  controllers: [
    AddItemToOrderController,
    FindCurrentOrderController,
    UpdateOrderStateController,
    RemoveProductFromOrderController,
  ],
  providers: [
    {
      provide: OrderRepository.TOKEN,
      useClass: PrismaOrderRepository,
    },
    {
      provide: ProductRepository.TOKEN,
      useClass: PrismaProductRepository,
    },
    FindCurrentOrderUseCase,
    UpdateOrderStateUseCase,
    AddItemToOrderUseCase,
    RemoveProductFromOrderUseCase,
  ],
})
export class OrderModule {}
