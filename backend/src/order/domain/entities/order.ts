import { OrderProduct } from '@order/domain/value-objects/order-product';
import { randomUUID } from 'crypto';

export enum OrderState {
  CART = 'CART',
  COMPLETED = 'COMPLETED',
}

export class Order {
  id?: string;
  userId: string;
  products: OrderProduct[];
  total: number;
  state?: OrderState;

  constructor(props?: Partial<Order>) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
    this.state = props?.state ?? OrderState.CART;
    this.products = props?.products ?? [];
    this.total = props?.total ?? 0;
  }

  addProduct(product: OrderProduct): void {
    this.products.push(product);
  }

  calculateTotal(product: OrderProduct[]): void {
    this.total = product.reduce((acc, product) => acc + product.price, 0);
  }
}
