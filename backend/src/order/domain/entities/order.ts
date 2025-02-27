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
  state?: OrderState;

  constructor(props?: Partial<Order>) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
    this.state = props?.state ?? OrderState.CART;
    this.products = props?.products ?? [];
  }

  addProduct(product: OrderProduct): void {
    this.products.push(product);
  }
}
