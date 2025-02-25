import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from '@helpers/responses';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { UpsertProductToOrderUseCase } from '@order/application/use-cases/upsert-product-to-order.use-case';
import { Request } from 'express';

@ApiTags('Order')
@Controller({
  path: 'orders',
  version: '1',
})
export class UpsertProductToOrderController {
  constructor(
    private readonly upsertProductToOrderUseCase: UpsertProductToOrderUseCase,
  ) {}

  @Post()
  async upsertProductToOrder(
    @Body() upsertProductToOrderDto: UpsertProductToOrderDto,
    @Req() request: Request,
  ) {
    try {
      const createdOrder = await this.upsertProductToOrderUseCase.execute(
        upsertProductToOrderDto,
        request.userPayload.id,
      );

      return ResponseHelper.success(createdOrder);
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
