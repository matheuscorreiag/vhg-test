import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
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
    const fakeUserId = '123';
    const mapper = OrderMapper.toDomain(createOrderDto, fakeUserId);

    return await this.createOrderUseCase.execute(mapper);
  }
}
