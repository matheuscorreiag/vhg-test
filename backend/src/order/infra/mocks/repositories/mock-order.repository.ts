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

  findCurrentUserOrder(): Promise<Order> {
    return Promise.resolve(new Order());
  }

  findCurrentOrderOrCreate(): Promise<Order> {
    return Promise.resolve(new Order());
  }
  saveProductOnCurrentOrder(): Promise<Order> {
    return Promise.resolve(new Order());
  }
  updateProductOnCurrentOrder(): Promise<Order> {
    return Promise.resolve(new Order());
  }
  deleteOrderProduct(): Promise<void> {
    return Promise.resolve();
  }

  completeOrder(): Promise<Order> {
    return Promise.resolve(new Order());
  }
}
