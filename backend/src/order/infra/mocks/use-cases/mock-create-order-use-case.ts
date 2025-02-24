import { Order } from '@order/domain/entities/order.js';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case.js';
import { defaultOrder } from '@order/infra/mocks';

export class mockCreateOrderUseCase implements CreateOrderUseCase {
  execute(order: Order): Promise<Order> {
    return Promise.resolve(order ?? defaultOrder);
  }
}
