import { Inject, Injectable } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class RemoveProductFromOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  async execute(productId: string, userId: string): Promise<void> {
    const currentOrder =
      await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!currentOrder?.id) {
      throw new Error('Order not found');
    }

    const productIdInOrder = currentOrder.products.find(
      (product) => product.productId === productId,
    );

    if (!productIdInOrder || !productIdInOrder.id) {
      throw new Error('Product not found');
    }

    await this.orderRepository.deleteOrderProduct(productIdInOrder.id);
  }
}
