import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

export class mockFindCurrentOrderUseCase implements FindCurrentOrderUseCase {
  constructor(public readonly orderRepository: OrderRepository) {}

  execute(): Promise<Order> {
    return Promise.resolve(new Order());
  }
}
