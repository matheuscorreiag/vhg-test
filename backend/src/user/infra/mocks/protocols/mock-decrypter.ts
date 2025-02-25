export class MockDecrypter {
  static TOKEN = 'MockDecrypterToken';

  async execute(value: string): Promise<string> {
    return value;
  }
}
