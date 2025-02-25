export class MockEncrypter {
  static TOKEN = 'MockEncrypterToken';

  async execute(value: string): Promise<string> {
    return value;
  }
}
