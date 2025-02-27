import { Inject, Injectable } from '@nestjs/common';
import { CompleteOrderDto } from '@order/application/dto/complete-order.dto';
import { OrderState } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class CompleteOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  async execute(userId: string, body: CompleteOrderDto) {
    const currentOrder =
      await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!currentOrder.id) {
      throw new Error('Order not found');
    }

    if (currentOrder.state === OrderState.COMPLETED) {
      throw new Error('Order already completed');
    }

    if (currentOrder.products.length === 0) {
      throw new Error('Order is empty');
    }

    const order = await this.orderRepository.completeOrder(
      userId,
      currentOrder.id,
      body,
    );

    if (!order) {
      throw new Error('Order not found');
    }

    return order;
  }
}
