import { Order } from '../entities/order';

export abstract class OrderRepository {
  static TOKEN = 'OrderRepositoryToken';

  abstract findAll(): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
  abstract save(order: Order): Promise<Order>;
  abstract findCurrentUserOrder(userId: string): Promise<Order>;
}
