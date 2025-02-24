import { Order, OrderState } from '@order/domain/entities/order';

export const defaultOrder = new Order({
  id: '123',
  products: [
    {
      color: 'red',
      productId: '123',
      quantity: 1,
    },
  ],
  userId: '123',
  state: OrderState.CART,
});
