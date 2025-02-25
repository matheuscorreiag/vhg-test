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
    return await this.findCurrentOrderUseCase.execute('123');
  }
}
