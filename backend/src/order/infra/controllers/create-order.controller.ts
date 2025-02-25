import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';
import { ResponseHelper } from '@helpers/responses/success';
import { Order } from '@order/domain/entities/order';

@ApiTags('Order')
@Controller({
  path: 'orders',
  version: '1',
})
export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const createdOrder = await this.createOrderUseCase.execute(
        createOrderDto,
        '123',
      );

      return ResponseHelper.success<Order>(createdOrder, 'Order created');
    } catch (error) {
      return ResponseHelper.error(error, 'Error creating order');
    }
  }
}
