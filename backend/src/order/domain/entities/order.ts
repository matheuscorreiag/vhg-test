import { Card } from '@order/domain/value-objects/card';
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
  productCount: number;
  state?: OrderState;
  card?: Card;

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

  calculateTotal(): void {
    this.total = this.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    );
  }

  calculateProductCount(): void {
    this.productCount = this.products.reduce(
      (acc, product) => acc + product.quantity,
      0,
    );
  }

  setCard(card: Card): void {
    this.card = card;
  }
}
