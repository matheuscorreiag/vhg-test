import { Inject, Injectable } from '@nestjs/common';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { OrderProductMapper } from '@order/application/mappers/order-product.mapper';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { ProductRepository } from '@product/domain/repositories/product.repository';

@Injectable()
export class UpsertProductToOrderUseCase {
  constructor(
    @Inject(OrderRepository.TOKEN)
    public readonly orderRepository: OrderRepository,
    @Inject(ProductRepository.TOKEN)
    public readonly productRepository: ProductRepository,
  ) {}

  async execute(
    body: UpsertProductToOrderDto,
    userId: string,
  ): Promise<Order | void> {
    const dbProduct = await this.productRepository.findById(body.productId);

    if (!dbProduct) {
      throw new Error('Product not found');
    }

    const currentOrder =
      await this.orderRepository.findCurrentOrderOrCreate(userId);

    if (!currentOrder.id) {
      throw new Error('Order not found');
    }

    const productAlreadyOnOrder = currentOrder.products.findIndex(
      (product) => product.productId === body.productId,
    );

    if (productAlreadyOnOrder !== -1) {
      currentOrder.products = currentOrder.products.map((product) => {
        if (product.productId === body.productId) {
          return {
            ...product,
            ...body,
          };
        }

        return product;
      });

      const updatedOrderProduct = currentOrder.products[productAlreadyOnOrder];

      await this.orderRepository.updateProductOnCurrentOrder(
        currentOrder.id,
        updatedOrderProduct,
      );

      currentOrder.products[productAlreadyOnOrder] = updatedOrderProduct;

      return currentOrder;
    }

    const orderProduct = OrderProductMapper.toDomain(body);

    return await this.orderRepository.saveProductOnCurrentOrder(
      currentOrder.id,
      orderProduct,
    );
  }
}
