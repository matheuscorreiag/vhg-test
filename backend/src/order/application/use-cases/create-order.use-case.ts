import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(body: CreateOrderDto, userId: string): Promise<Order> {
    const mapper = OrderMapper.toDomain(body, userId);
    const productIds = mapper.products.map((product) => product.productId);

    const dbProducts = await this.productRepository.findByIds(productIds);

    if (productIds.length > dbProducts) {
      throw new Error('One or more products are not available');
    }

    return await this.orderRepository.save(mapper);
  }
}
