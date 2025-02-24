import { Product } from '@domain/entities/product';

export abstract class FindAllProductUseCase {
  static TOKEN = 'FindAllProductUseCaseToken';

  abstract execute(): Promise<Product[]>;
}
