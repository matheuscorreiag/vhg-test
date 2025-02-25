import { ResponseHelper } from '@helpers/responses';
import { Controller } from '@nestjs/common';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';

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

      return ResponseHelper.success(currentOrder, 'Order created');
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
