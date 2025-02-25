import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  async execute(body: CreateOrderDto, userId: string): Promise<Order> {
    const mapper = OrderMapper.toDomain(body, userId);

    return this.orderRepository.save(mapper);
  }
}
