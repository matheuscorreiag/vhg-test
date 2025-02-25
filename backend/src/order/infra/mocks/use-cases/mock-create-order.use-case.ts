import { Order } from '@order/domain/entities/order.js';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case.js';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderMapper } from '@order/application/mappers/order.mapper';

export class mockCreateOrderUseCase implements CreateOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
  ) {}

  execute(body: CreateOrderDto, userId: string): Promise<Order> {
    const toDomain = OrderMapper.toDomain(body, userId);
    return this.orderRepository.save(toDomain);
  }
}
