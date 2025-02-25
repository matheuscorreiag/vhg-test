import { randomUUID } from 'crypto';

export class OrderProduct {
  id?: string;
  productId: string;
  quantity: number;
  color: string;

  constructor(props?: OrderProduct) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
  }
}
