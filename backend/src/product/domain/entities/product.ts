import { randomUUID } from 'crypto';

export class Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  colors: string[];

  constructor(props?: Product) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
    this.rating = props?.rating ?? 0;
  }
}
