import { PrismaService } from '@libs/prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderProductMapper } from '@order/application/mappers/order-product.mapper';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderProduct } from '@order/domain/entities/order-product';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderState } from '@prisma/client';

@Injectable()
export class PrismaOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.prisma.order.findMany();
    return OrderMapper.prismaArrayToDomain(orders);
  }

  async findById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return OrderMapper.prismaToDomain(order);
  }

  async findCurrentUserOrder(userId: string): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: { userId },
      include: { products: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return OrderMapper.prismaToDomain(order);
  }

  async save(order: Order, userId: string): Promise<Order> {
    const savedOrder = await this.prisma.order.create({
      data: {
        userId,
        state: order.state,
        products: {
          create: order.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            color: product.color,
          })),
        },
      },
      include: { products: true },
    });

    return OrderMapper.prismaToDomain(savedOrder);
  }

  async findCurrentOrderOrCreate(userId: string): Promise<Order> {
    const order = await this.prisma.order.findFirst({
      where: { userId, state: OrderState.CART },
      include: { products: true },
    });

    if (!order) {
      return await this.save(new Order({ userId, products: [] }), userId);
    }

    return OrderMapper.prismaToDomain(order);
  }

  async saveProductOnCurrentOrder(
    orderId: string,
    product: OrderProduct,
  ): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        products: {
          create: {
            productId: product.productId,
            quantity: product.quantity,
            color: product.color,
          },
        },
      },
      include: { products: true },
    });

    return OrderMapper.prismaToDomain(updatedOrder);
  }

  async updateProductOnCurrentOrder(
    orderId: string,
    product: OrderProduct,
  ): Promise<OrderProduct> {
    const updatedOrder = await this.prisma.orderProduct.update({
      where: {
        id: product.id,
        orderId,
      },
      data: {
        color: product.color,
        quantity: product.quantity,
      },
    });

    return OrderProductMapper.prismaToDomain([updatedOrder])[0];
  }

  async deleteOrderProduct(orderProductId: string): Promise<void> {
    await this.prisma.orderProduct.delete({
      where: {
        id: orderProductId,
      },
    });
  }

  async updateOrderState(
    userId: string,
    orderId: string,
    state: OrderState,
  ): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId, userId },
      data: {
        state,
      },
      include: { products: true },
    });

    return OrderMapper.prismaToDomain(updatedOrder);
  }
}
