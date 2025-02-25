import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  findAll(): Promise<Order[]> {
    return Promise.resolve([]);
  }

  findById(): Promise<Order> {
    return Promise.resolve(new Order());
  }

  save(order: Order): Promise<Order> {
    return Promise.resolve(order);
  }
  findCurrentUserOrder(userId: string): Promise<Order> {
    return Promise.resolve(new Order());
  }
}
