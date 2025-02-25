import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseHelper } from '@helpers/responses';
import { AddItemToOrderDto } from '@order/application/dto/add-item-to-order.dto';
import { AddItemToOrderUseCase } from '@order/application/use-cases/add-item-to-order.use-case';

@ApiTags('Order')
@Controller({
  path: 'orders',
  version: '1',
})
export class AddItemToOrderController {
  constructor(private readonly addItemToOrderUseCase: AddItemToOrderUseCase) {}

  @Post()
  async addItemToOrder(@Body() addItemToOrderDto: AddItemToOrderDto) {
    try {
      const createdOrder = await this.addItemToOrderUseCase.execute(
        addItemToOrderDto,
        '123',
      );

      return ResponseHelper.success(createdOrder, 'Order created');
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
