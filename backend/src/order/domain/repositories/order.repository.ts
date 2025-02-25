import { OrderProduct } from '@order/domain/entities/order-product';
import { Order, OrderState } from '../entities/order';

export abstract class OrderRepository {
  static TOKEN = 'OrderRepositoryToken';

  abstract findAll(): Promise<Order[]>;
  abstract findById(id: string): Promise<Order>;
  abstract save(order: Order, userId: string): Promise<Order>;
  abstract saveProductOnCurrentOrder(
    orderId: string,
    orderProduct: OrderProduct,
  ): Promise<Order>;
  abstract findCurrentOrderOrCreate(
    userId?: string,
    orderId?: string,
  ): Promise<Order>;
  abstract updateProductOnCurrentOrder(
    orderId: string,
    orderProduct: OrderProduct,
  ): Promise<OrderProduct>;
  abstract updateOrderState(
    userId: string,
    orderId: string,
    state: OrderState,
  ): Promise<Order>;
  abstract deleteOrderProduct(orderProductId: string): Promise<void>;
}
