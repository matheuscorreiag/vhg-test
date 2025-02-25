import { OrderState } from '@order/domain/entities/order';
import { IsEnum } from 'class-validator';

export class UpdateOrderDto {
  @IsEnum(OrderState)
  state: OrderState;
}
