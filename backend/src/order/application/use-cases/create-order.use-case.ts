import { Order } from '@order/domain/entities/order';

export abstract class CreateOrderUseCase {
  static TOKEN = 'CreateOrderUseCaseToken';

  abstract execute(order: Order): Promise<Order>;
}
