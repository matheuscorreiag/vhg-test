import { Inject, Injectable } from '@nestjs/common';
import { UpsertProductToOrderDto } from '@order/application/dto/upsert-product-to-order.dto';
import { Order } from '@order/domain/entities/order';
import { OrderRepository } from '@order/domain/repositories/order.repository';
import { OrderProduct } from '@order/domain/value-objects/order-product';
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

    if (!dbProduct || !dbProduct.id) {
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
      if (body.quantity === 0) {
        const product = currentOrder.products[productAlreadyOnOrder];

        if (!product.id) {
          throw new Error('Product not found');
        }

        currentOrder.products = currentOrder.products.filter(
          (product) => product.productId !== body.productId,
        );

        return await this.orderRepository.deleteOrderProduct(product.id);
      }

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
        dbProduct.id,
        updatedOrderProduct.quantity,
        updatedOrderProduct.color,
      );

      currentOrder.products[productAlreadyOnOrder] = updatedOrderProduct;

      return currentOrder;
    }

    const orderProduct = new OrderProduct({
      productId: dbProduct.id,
      quantity: body.quantity,
      color: body.color,
      name: dbProduct.name,
      price: dbProduct.price,
      imageUrl: dbProduct.imageUrl,
    });

    return await this.orderRepository.saveProductOnCurrentOrder(
      currentOrder.id,
      orderProduct,
    );
  }
}
