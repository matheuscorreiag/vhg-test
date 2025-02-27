import { Order } from '@order/domain/entities/order.js';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { UpsertProductToOrderUseCase } from '@order/application/use-cases/upsert-product-to-order.use-case';
import { OrderProduct } from '@order/domain/value-objects/order-product';

export class mockUpsertProductToOrderUseCase
  implements UpsertProductToOrderUseCase
{
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(body: UpsertProductToOrderDto, userId: string): Promise<Order> {
    const dbProducts = await this.productRepository.findById(body.productId);
    const currentOrder =
      await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!dbProducts || !dbProducts.id) {
      throw new Error('Product not found');
    }

    if (!currentOrder.id) {
      throw new Error('Order not found');
    }

    const orderProduct = new OrderProduct({
      productId: dbProducts.id,
      quantity: body.quantity,
      color: body.color,
      name: dbProducts.name,
    });

    return this.orderRepository.saveProductOnCurrentOrder(
      currentOrder.id,
      orderProduct,
    );
  }
}
