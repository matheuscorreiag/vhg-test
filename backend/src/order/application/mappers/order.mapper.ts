import { Injectable } from '@nestjs/common';
import { Order, OrderState } from '@order/domain/entities/order';
import { OrderProduct } from '@order/domain/value-objects/order-product';
import {
  Order as PrismaOrderModel,
  OrderProduct as PrismaOrderProductModel,
} from '@prisma/client';

@Injectable()
export class OrderMapper {
  static prismaToDomain(
    order: PrismaOrderModel & { products: PrismaOrderProductModel[] },
  ): Order {
    const domainOrder = new Order({
      id: order.id,
      userId: order.userId,
      state: order.state as OrderState,
    });

    order.products.forEach((product) => {
      domainOrder.addProduct(
        new OrderProduct({
          id: product.id,
          name: product.name,
          productId: product.productId,
          quantity: product.quantity,
          color: product.color,
        }),
      );
    });

    return domainOrder;
  }

  static prismaArrayToDomain(orders: PrismaOrderModel[]): Order[] {
    return orders.map((order) => {
      return new Order({
        id: order.id,
        userId: order.userId,
        // Não há necessidade de mapear todos os produtos
        // já que a quantidade de dados pode ser grande e não deve ser usado
        products: [],
        state: order.state as OrderState,
      });
    });
  }
}
