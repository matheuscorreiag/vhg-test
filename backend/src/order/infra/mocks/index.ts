import { Order } from '@order/domain/entities/order';

export const defaultOrder = new Order({
  id: '123',
  color: 'red',
  quantity: 1,
  userId: '123',
  productId: '123',
});
