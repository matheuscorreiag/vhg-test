export abstract class Encrypter {
  static TOKEN = 'EncrypterToken';
  abstract execute(value: string): Promise<string>;
}
