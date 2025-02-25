import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';

@ApiTags('Order')
@Controller({
  path: 'orders',
  version: '1',
})
export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.createOrderUseCase.execute(createOrderDto, '123');
  }
}
