import { Injectable } from '@nestjs/common';
import { Order } from '@order/domain/entities/order';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { OrderProductMapper } from '@order/application/mappers/order-product.mapper';

@Injectable()
export class OrderMapper {
  static toDomain(dto: CreateOrderDto, userId: string): Order {
    const orderProductMapper = OrderProductMapper.toDomain(dto.products);

    return new Order({
      userId: userId,
      products: orderProductMapper,
    });
  }
}
