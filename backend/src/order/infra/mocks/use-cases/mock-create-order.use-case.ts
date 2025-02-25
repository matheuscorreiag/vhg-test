import { Order } from '@order/domain/entities/order.js';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case.js';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { ProductRepository } from '@product/domain/repositories/product.repository';

export class mockCreateOrderUseCase implements CreateOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(body: CreateOrderDto, userId: string): Promise<Order> {
    const toDomain = OrderMapper.toDomain(body, userId);
    const productIds = body.products.map((product) => product.productId);

    const dbProducts = await this.productRepository.findByIds(productIds);
    console.log(dbProducts);

    if (productIds.length < dbProducts) {
      throw new Error('One or more products are not available');
    }

    return this.orderRepository.save(toDomain);
  }
}
