import { Injectable } from '@nestjs/common';
import { AddItemToOrderDto } from '@order/application/dto/add-item-to-order.dto';
import { OrderProduct } from '@order/domain/entities/order-product';
import { OrderProduct as PrismaOrderProductModel } from '@prisma/client';

@Injectable()
export class OrderProductMapper {
  static toDomain(dto: AddItemToOrderDto): OrderProduct {
    return new OrderProduct({
      color: dto.color,
      productId: dto.productId,
      quantity: dto.quantity,
    });
  }

  static prismaToDomain(
    orderProduct: PrismaOrderProductModel[],
  ): OrderProduct[] {
    return orderProduct.map((product) => {
      return new OrderProduct({
        id: product.id,
        color: product.color,
        productId: product.productId,
        quantity: product.quantity,
      });
    });
  }
}
