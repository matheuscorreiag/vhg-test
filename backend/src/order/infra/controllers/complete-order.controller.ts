import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Put, Req } from '@nestjs/common';
import { CompleteOrderDto } from '@order/application/dto/complete-order.dto';
import { CompleteOrderUseCase } from '@order/application/use-cases/update-order-state.use-case';
import { Request } from 'express';

@Controller({
  path: 'orders',
  version: '1',
})
export class CompleteOrderController {
  constructor(private readonly completeOrderUseCase: CompleteOrderUseCase) {}

  @Put()
  async completeOrder(
    @Body() completeOrderDto: CompleteOrderDto,
    @Req() request: Request,
  ) {
    try {
      const order = await this.completeOrderUseCase.execute(
        request.userPayload.id,
        completeOrderDto,
      );

      return ResponseHelper.success(order);
    } catch (error) {
      return ResponseHelper.error(error, 'Error trying to update order');
    }
  }
}
