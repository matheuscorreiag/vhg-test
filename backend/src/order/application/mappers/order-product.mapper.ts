import { Injectable } from '@nestjs/common';
import { OrderProduct } from '@order/domain/entities/order-product';
import { CreateOrderProductDto } from '@order/application/dto/create-order-product.dto';

@Injectable()
export class OrderProductMapper {
  static toDomain(dto: CreateOrderProductDto[]): OrderProduct[] {
    return dto.map((product) => {
      return new OrderProduct({
        color: product.color,
        productId: product.productId,
        quantity: product.quantity,
      });
    });
  }
}
