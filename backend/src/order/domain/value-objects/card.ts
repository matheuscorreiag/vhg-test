export class Card {
  id: string;
  number: string;
  expiration: Date;
  securityCode: string;
  orderId: string;

  constructor(props?: Card) {
    Object.assign(this, props);
    this.id = props?.id ?? Math.random().toString();
  }
}
