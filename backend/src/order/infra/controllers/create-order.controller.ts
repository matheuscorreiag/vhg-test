import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '@order/application/dto/create-order';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { CreateOrderUseCase } from '@order/application/use-cases/create-order.use-case';

@ApiTags('Order')
@Controller({
  path: 'orders',
  version: '1',
})
export class CreateOrderController {
  constructor(
    @Inject(CreateOrderUseCase.TOKEN)
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const mapper = OrderMapper.toDomain(createOrderDto);

    return await this.createOrderUseCase.execute(mapper);
  }
}
