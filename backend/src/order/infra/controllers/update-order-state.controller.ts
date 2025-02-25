import { ResponseHelper } from '@helpers/responses';
import { Body, Controller, Put, Req } from '@nestjs/common';
import { UpdateOrderDto } from '@order/application/dto/update-order.dto';
import { UpdateOrderStateUseCase } from '@order/application/use-cases/update-order-state.use-case';
import { Request } from 'express';

@Controller({
  path: 'orders',
  version: '1',
})
export class UpdateOrderStateController {
  constructor(
    private readonly updateOrderStateUseCase: UpdateOrderStateUseCase,
  ) {}

  @Put('/state')
  async updateCurrentOrderState(
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() request: Request,
  ) {
    try {
      const order = await this.updateOrderStateUseCase.execute(
        request.userPayload.id,
        updateOrderDto.state,
      );

      return ResponseHelper.success(order);
    } catch (error) {
      return ResponseHelper.error(error, 'Error trying to update order');
    }
  }
}
