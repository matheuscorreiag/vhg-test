import { Module } from '@nestjs/common';
import { PrismaOrderRepository } from '@order/infra/db/prisma/repositories/prisma-order.repository';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { PrismaProductRepository } from '@product/infra/db/prisma/repositories/prisma-product.repository';
import { UpsertProductToOrderController } from '@order/infra/controllers/upsert-product-to-order.controller';
import { UpsertProductToOrderUseCase } from '@order/application/use-cases/upsert-product-to-order.use-case';
import { FindCurrentOrderController } from '@order/infra/controllers/find-current-order.controller';
import { CompleteOrderController } from '@order/infra/controllers/complete-order.controller';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';
import { CompleteOrderUseCase } from '@order/application/use-cases/update-order-state.use-case';
import { RemoveProductFromOrderController } from '@order/infra/controllers/remove-product-from-order.controller';
import { RemoveProductFromOrderUseCase } from '@order/application/use-cases/remove-product-from-order.use-case';

@Module({
  imports: [],
  controllers: [
    UpsertProductToOrderController,
    FindCurrentOrderController,
    CompleteOrderController,
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
    CompleteOrderUseCase,
    UpsertProductToOrderUseCase,
    RemoveProductFromOrderUseCase,
  ],
})
export class OrderModule {}
