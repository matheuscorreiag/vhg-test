import { ResponseHelper } from '@helpers/responses';
import { Controller, Delete, Param, Req } from '@nestjs/common';
import { RemoveProductFromOrderUseCase } from '@order/application/use-cases/remove-product-from-order.use-case';
import { Request } from 'express';

@Controller({
  path: 'orders',
  version: '1',
})
export class RemoveProductFromOrderController {
  constructor(
    private readonly removeProductFromOrderUseCase: RemoveProductFromOrderUseCase,
  ) {}
  @Delete('/:productId')
  async removeProductFromOrder(
    @Param('productId') productId: string,
    @Req() request: Request,
  ) {
    try {
      await this.removeProductFromOrderUseCase.execute(
        productId,
        request.userPayload.id,
      );

      return ResponseHelper.success(null, 'Product removed');
    } catch (error) {
      return ResponseHelper.error(error, 'Error removing product');
    }
  }
}
