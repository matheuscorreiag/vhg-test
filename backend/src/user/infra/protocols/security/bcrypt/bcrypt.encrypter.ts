import { Injectable } from '@nestjs/common';
import { Encrypter } from '@user/application/protocols/security/encrypter.security';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptEncrypter implements Encrypter {
  SALT = 10;

  async execute(rawValue: string): Promise<string> {
    return await bcrypt.hash(rawValue, this.SALT);
  }
}
