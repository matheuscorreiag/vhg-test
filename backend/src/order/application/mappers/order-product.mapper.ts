import { Injectable } from '@nestjs/common';
import { OrderProduct } from '@order/domain/entities/order-product';
import { CreateOrderProductDto } from '@order/application/dto/create-order-product.dto';
import { OrderProduct as PrismaOrderProductModel } from '@prisma/client';

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
