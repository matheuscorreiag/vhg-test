import { Injectable } from '@nestjs/common';
import { Order, OrderState } from '@order/domain/entities/order';
import { CreateOrderDto } from '@order/application/dto/create-order.dto';
import { OrderProductMapper } from '@order/application/mappers/order-product.mapper';
import {
  Order as PrismaOrderModel,
  OrderProduct as PrismaOrderProductModel,
} from '@prisma/client';

@Injectable()
export class OrderMapper {
  static toDomain(dto: CreateOrderDto, userId: string): Order {
    const orderProductMapper = OrderProductMapper.toDomain(dto.products);

    return new Order({
      userId: userId,
      products: orderProductMapper,
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
