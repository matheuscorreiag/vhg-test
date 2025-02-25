import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

export class mockOrderRepository implements OrderRepository {
  findAll(): Promise<Order[]> {
    return Promise.resolve([]);
  }

  findById(): Promise<Order> {
    return Promise.resolve(new Order());
  }

  save(order: Order): Promise<Order> {
    return Promise.resolve(order);
  }
}
