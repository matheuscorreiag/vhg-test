import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class PrismaCreateOrderUseCase implements CreateOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    private readonly orderRepository: OrderRepository,
  ) {}

  execute(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }
}
