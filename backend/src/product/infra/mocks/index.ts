import { Product } from '@product/domain/entities/product';

export const defaultProduct = new Product({
  color: 'red',
  description: 'A product description',
  name: 'Product 1',
  price: 10.99,
  id: '123',
  rating: 0,
});
