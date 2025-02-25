import { Inject, Injectable } from '@nestjs/common';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class FindCurrentOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  async execute(userId: string): Promise<Order> {
    const order = await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
