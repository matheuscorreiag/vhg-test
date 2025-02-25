import { Order } from '@order/domain/entities/order.js';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { UpsertProductToOrderUseCase } from '@order/application/use-cases/upsert-product-to-order.use-case';

export class mockUpsertProductToOrderUseCase
  implements UpsertProductToOrderUseCase
{
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(body: UpsertProductToOrderDto, userId: string): Promise<Order> {
    const dbProducts = await this.productRepository.findById(body.productId);

    if (!dbProducts) {
      throw new Error('Product not found');
    }

    const toDomain = OrderMapper.toDomain(body, userId);

    return this.orderRepository.save(toDomain, userId);
  }
}
