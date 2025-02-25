import { Injectable } from '@nestjs/common';
import { Compare } from '@user/application/protocols/security/compare.security';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptCompare implements Compare {
  async execute(rawValue: string, encryptedValue: string): Promise<boolean> {
    return await bcrypt.compare(rawValue, encryptedValue);
  }
}
