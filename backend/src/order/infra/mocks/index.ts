import { Order, OrderState } from '@order/domain/entities/order';
import { Request } from 'express';

export const defaultOrder = new Order({
  id: '123',
  products: [
    {
      color: 'red',
      productId: '123',
      quantity: 1,
      name: 'product',
      price: 10.99,
      imageUrl: 'https://image.com',
    },
  ],
  userId: '123',
  state: OrderState.CART,
});

export const mockRequest: Partial<Request> = {
  userPayload: { id: '123', email: 'test@test.com' },
};
