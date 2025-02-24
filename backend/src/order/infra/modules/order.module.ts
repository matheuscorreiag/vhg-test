import { Module } from '@nestjs/common';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';
import { CreateOrderController } from '@order/infra/controllers/create-order.controller';
import { PrismaCreateOrderUseCase } from '@order/infra/db/prisma/use-cases/prisma-create-order.use-case';
import { PrismaOrderRepository } from '@order/infra/db/prisma/repositories/prisma-order.repository';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Module({
  imports: [],
  controllers: [CreateOrderController],
  providers: [
    {
      provide: OrderRepository.TOKEN,
      useClass: PrismaOrderRepository,
    },
    {
      provide: CreateOrderUseCase.TOKEN,
      useClass: PrismaCreateOrderUseCase,
    },
  ],
})
export class OrderModule {}
