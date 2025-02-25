import { OrderProduct } from '@order/domain/entities/order-product';
import { Order, OrderState } from '../entities/order';

export abstract class OrderRepository {
  static TOKEN = 'OrderRepositoryToken';

  abstract findAll(): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
  abstract save(order: Order, userId: string): Promise<Order>;
  abstract saveItemOnCurrentOrder(
    orderId: string,
    item: OrderProduct,
  ): Promise<Order>;
  abstract findCurrentOrderOrCreate(
    userId?: string,
    orderId?: string,
  ): Promise<Order>;
  abstract updateItemOnCurrentOrder(
    orderId: string,
    item: OrderProduct,
  ): Promise<OrderProduct>;
  abstract updateOrderState(
    userId: string,
    orderId: string,
    state: OrderState,
  ): Promise<Order>;
}
