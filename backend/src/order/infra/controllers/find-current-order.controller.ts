import { ResponseHelper } from '@helpers/responses';
import { Controller, Get, Req } from '@nestjs/common';
import { FindCurrentOrderUseCase } from '@order/application/use-cases/find-current-order.use-case';
import { Request } from 'express';

@Controller({
  path: 'orders',
  version: '1',
})
export class FindCurrentOrderController {
  constructor(
    private readonly findCurrentOrderUseCase: FindCurrentOrderUseCase,
  ) {}

  @Get('/current')
  async findCurrentOrder(@Req() request: Request) {
    try {
      const currentOrder = await this.findCurrentOrderUseCase.execute(
        request.userPayload.id,
      );

      return ResponseHelper.success(currentOrder);
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
