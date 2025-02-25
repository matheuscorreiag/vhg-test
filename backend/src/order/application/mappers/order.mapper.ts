import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from '@order/application/dto/create-order-product.dto';
import { OrderProductMapper } from '@order/application/mappers/order-product.mapper';
import { Order, OrderState } from '@order/domain/entities/order';
import {
  Order as PrismaOrderModel,
  OrderProduct as PrismaOrderProductModel,
} from '@prisma/client';

@Injectable()
export class OrderMapper {
  static toDomain(dto: CreateOrderProductDto, userId: string): Order {
    const orderProductMapper = OrderProductMapper.toDomain(dto);
    return new Order({
      userId: userId,
      products: [orderProductMapper],
    });
  }

  static prismaToDomain(
    order: PrismaOrderModel & { products: PrismaOrderProductModel[] },
  ): Order {
    return new Order({
      id: order.id,
      userId: order.userId,
      products: OrderProductMapper.prismaToDomain(order.products),
      state: order.state as OrderState,
    });
  }

  static prismaArrayToDomain(orders: PrismaOrderModel[]): Order[] {
    return orders.map((order) => {
      return new Order({
        id: order.id,
        userId: order.userId,
        products: [],
        state: order.state as OrderState,
      });
    });
  }
}
