import { randomUUID } from 'crypto';

export class User {
  id?: string;
  email: string;
  password?: string;

  constructor(props?: User) {
    Object.assign(this, props);
    this.id = props?.id ?? randomUUID();
  }
}
