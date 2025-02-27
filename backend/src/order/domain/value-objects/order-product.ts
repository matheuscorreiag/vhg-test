import { randomUUID } from 'crypto';

export class OrderProduct {
  id?: string;
  name: string;
  productId: string;
  quantity: number;
  color: string;
  price: number;
  imageUrl: string;

  constructor(props?: OrderProduct) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
  }
}
