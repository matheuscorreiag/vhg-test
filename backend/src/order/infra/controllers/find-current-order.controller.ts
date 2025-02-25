import { ResponseHelper } from '@helpers/responses/success';
import { Controller } from '@nestjs/common';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';
import { Order } from '@order/domain/entities/order';

@Controller({
  path: 'orders',
  version: '1',
})
export class FindCurrentOrderController {
  constructor(
    private readonly findCurrentOrderUseCase: FindCurrentOrderUseCase,
  ) {}

  async findCurrentOrder() {
    try {
      const currentOrder = await this.findCurrentOrderUseCase.execute('123');

      return ResponseHelper.success<Order>(currentOrder, 'Order created');
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
