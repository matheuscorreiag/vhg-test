export abstract class Compare {
  static TOKEN = 'DecrypterToken';

  abstract execute(rawValue: string, encryptedValue: string): Promise<boolean>;
}
