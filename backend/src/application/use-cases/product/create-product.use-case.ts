import { Product } from '@domain/entities/product';

export abstract class CreateProductUseCase {
  static TOKEN = 'CreateProductUseCaseToken';

  abstract execute(product: Product): Promise<Product>;
}
