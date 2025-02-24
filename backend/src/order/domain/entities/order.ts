import { randomUUID } from 'crypto';

export enum OrderState {
  CART = 'CART',
  COMPLETED = 'COMPLETED',
}
export class Order {
  id?: string;
  userId: string;
  productId: string;
  quantity: number;
  color: string;
  state?: OrderState;

  constructor(props?: Order) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
    this.state = props?.state ?? OrderState.CART;
  }
}
