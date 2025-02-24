import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/entities/order';
import { CreateOrderDto } from 'src/order/application/dto/create-order';

@Injectable()
export class OrderMapper {
  static toDomain(dto: CreateOrderDto): Order {
    return new Order({
      userId: dto.userId,
      productId: dto.productId,
      quantity: dto.quantity,
      color: dto.color,
    });
  }
}
