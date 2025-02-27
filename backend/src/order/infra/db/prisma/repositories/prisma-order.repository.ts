import { PrismaService } from '@libs/prisma.service';
import { Injectable } from '@nestjs/common';
import { CompleteOrderDto } from '@order/application/dto/complete-order.dto';
import { OrderMapper } from '@order/application/mappers/order.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderProduct } from '@order/domain/value-objects/order-product';
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
            name: product.name,
            price: product.price,
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
      return await this.save(new Order(), userId);
    }

    return OrderMapper.prismaToDomain(order);
  }

  async saveProductOnCurrentOrder(
    orderId: string,
    orderProduct: OrderProduct,
  ): Promise<Order> {
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        products: {
          create: {
            productId: orderProduct.productId,
            quantity: orderProduct.quantity,
            color: orderProduct.color,
            name: orderProduct.name,
            price: orderProduct.price,
          },
        },
      },
      include: { products: true },
    });

    return OrderMapper.prismaToDomain(updatedOrder);
  }

  async updateProductOnCurrentOrder(
    orderId: string,
    productId: string,
    quantity: number,
    color: string,
  ): Promise<Order> {
    await this.prisma.orderProduct.updateMany({
      where: {
        productId,
        orderId,
      },
      data: {
        color,
        quantity,
      },
    });

    const order = await this.prisma.order.findFirst({
      where: { id: orderId },
      include: { products: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    return OrderMapper.prismaToDomain(order);
  }

  async deleteOrderProduct(orderProductId: string): Promise<void> {
    await this.prisma.orderProduct.delete({
      where: {
        id: orderProductId,
      },
    });
  }

  async completeOrder(
    userId: string,
    orderId: string,
    body: CompleteOrderDto,
  ): Promise<Order> {
    // Para simplificar, está sendo criado um cartão e endereço para cada pedido
    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId, userId },
      data: {
        paidoutAt: new Date(),
        state: OrderState.COMPLETED,
        card: {
          create: {
            name: body.cardName,
            number: body.cardNumber,
            expiration: body.expiration,
            securityCode: body.securityCode,
          },
        },
        address: {
          create: {
            addressLine1: body.addressLine1,
            addressLine2: body.addressLine2,
            city: body.city,
            state: body.region,
            zipCode: body.zipCode,
            country: body.country,
            name: body.addressName,
          },
        },
      },
      include: { products: true },
    });

    return OrderMapper.prismaToDomain(updatedOrder);
  }
}
