export class OrderProduct {
  productId: string;
  quantity: number;
  color: string;

  constructor(props?: OrderProduct) {
    Object.assign(this, props);
  }
}
