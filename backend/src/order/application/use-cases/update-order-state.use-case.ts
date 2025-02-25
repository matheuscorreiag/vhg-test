import { Inject, Injectable } from '@nestjs/common';
import { OrderState } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class UpdateOrderStateUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  async execute(userId: string, orderState: OrderState) {
    const currentOrder =
      await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!currentOrder.id) {
      throw new Error('Order not found');
    }

    if (currentOrder.state === orderState) {
      throw new Error('Order already in this state');
    }

    if (currentOrder.products.length === 0) {
      throw new Error('Order is empty');
    }

    const order = await this.orderRepository.updateOrderState(
      userId,
      currentOrder.id,
      orderState,
    );

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
