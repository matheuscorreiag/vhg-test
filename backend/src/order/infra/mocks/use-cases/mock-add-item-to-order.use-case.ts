import { Order } from '@order/domain/entities/order.js';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { AddItemToOrderUseCase } from '@order/application/use-cases/add-item-to-order.use-case';
import { AddItemToOrderDto } from '@order/application/dto/add-item-to-order.dto';

export class mockAddItemToOrderUseCase implements AddItemToOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(body: AddItemToOrderDto, userId: string): Promise<Order> {
    const dbProducts = await this.productRepository.findById(body.productId);

    if (!dbProducts) {
      throw new Error('Product not found');
    }

    const toDomain = OrderMapper.toDomain(body, userId);

    return this.orderRepository.save(toDomain);
  }
}
