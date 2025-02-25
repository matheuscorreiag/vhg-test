import { PrismaService } from '@libs/prisma.service';
import { Injectable } from '@nestjs/common';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';

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

  async save(order: Order): Promise<Order> {
    const savedOrder = await this.prisma.order.create({
      data: {
        id: order.id,
        userId: order.userId,
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
}
